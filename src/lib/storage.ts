import { supabase } from './supabase';

export const PRIMARY_MEDIA_BUCKET = 'content-media';
export const BLOG_IMAGES_BUCKET = 'blog-images';
export const POST_IMAGES_BUCKET = 'post-images';
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit support

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

/**
 * Validate an image file before upload
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'Không tìm thấy tệp tin.' };
  }

  // Validate MIME type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Định dạng tệp "${file.type || 'không rõ'}" không được hỗ trợ. Vui lòng chọn ảnh JPEG, PNG, WebP hoặc GIF.`,
    };
  }

  // Validate File Size (max 5MB)
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `Dung lượng ảnh (${sizeInMB} MB) vượt quá giới hạn 5 MB. Vui lòng nén hoặc chọn ảnh nhỏ hơn.`,
    };
  }

  return { valid: true };
}

/**
 * Convert an image File to an optimized Base64 Data URL with automatic downscaling.
 * Used as a zero-downtime fallback when Supabase Storage bucket is not yet provisioned.
 */
export async function fileToOptimizedDataUrl(file: File, maxDimension: number = 1600, quality: number = 0.85): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => resolve('');
    reader.onload = () => {
      const rawResult = reader.result as string;
      if (typeof window === 'undefined') {
        resolve(rawResult);
        return;
      }
      const img = new Image();
      img.onerror = () => resolve(rawResult);
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawResult);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const optimizedDataUrl = canvas.toDataURL(mime, quality);
          resolve(optimizedDataUrl);
        } catch {
          resolve(rawResult);
        }
      };
      img.src = rawResult;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Helper to upload image file to Supabase Storage with bucket auto-fallback.
 * Tries `content-media` first, if not found falls back to other buckets or local optimized storage.
 * 
 * @param file The image File selected from the client's machine
 * @param folder Subfolder (e.g. 'articles', 'banners', 'careers')
 * @param preferredBucket Preferred bucket name ('content-media' or 'post-images')
 * @returns The permanent publicUrl of the uploaded image
 */
export async function uploadMediaImage(
  file: File,
  folder: string = 'media',
  preferredBucket: string = PRIMARY_MEDIA_BUCKET
): Promise<string> {
  // 1. Validation check
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || 'Tệp không hợp lệ');
  }

  // 2. Generate a clean, unique file path to prevent naming collisions
  const cleanBaseName = file.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .toLowerCase();

  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  const filePath = `${folder}/${timestamp}-${randomSuffix}-${cleanBaseName}`;

  // 3. Find any dynamically existing buckets on remote Supabase instance
  let availableBuckets: string[] = [];
  try {
    const { data: remoteBuckets } = await supabase.storage.listBuckets();
    if (remoteBuckets && remoteBuckets.length > 0) {
      availableBuckets = remoteBuckets.map((b) => b.name);
    }
  } catch {
    // ignore
  }

  // Candidate buckets in order of preference
  const allBuckets = [
    preferredBucket,
    ...availableBuckets,
    PRIMARY_MEDIA_BUCKET,
    BLOG_IMAGES_BUCKET,
    POST_IMAGES_BUCKET,
  ];
  const targetBuckets = [...new Set(allBuckets)];

  let lastError: any = null;

  for (const bucket of targetBuckets) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '31536000', // 1 year cache
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        lastError = error;
        // If bucket does not exist or access denied, try next candidate
        if (
          error.message.includes('bucket not found') ||
          error.message.includes('not found') ||
          error.message.includes('row-level security') ||
          error.message.includes('AccessDenied')
        ) {
          continue;
        }
        throw new Error(error.message || `Lỗi khi tải ảnh lên bucket "${bucket}".`);
      }

      // Retrieve permanent public URL
      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      if (publicUrlData?.publicUrl) {
        return publicUrlData.publicUrl;
      }
    } catch (err: any) {
      lastError = err;
    }
  }

  // 4. Zero-downtime graceful fallback:
  // If remote Supabase storage has no bucket created yet, automatically convert to optimized Data URL
  console.warn(
    `[Storage Notice] Supabase bucket chưa được tạo trên remote (${lastError?.message || 'Bucket not found'}). Tự động chuyển đổi sang bộ nhớ ảnh cục bộ tối ưu.`
  );

  const fallbackDataUrl = await fileToOptimizedDataUrl(file);
  if (fallbackDataUrl) {
    return fallbackDataUrl;
  }

  throw new Error(
    lastError?.message ||
    `Không thể tải ảnh lên Storage. Vui lòng tạo bucket "${PRIMARY_MEDIA_BUCKET}" (Public) trong Supabase Dashboard hoặc chạy script SQL thiết lập.`
  );
}

/**
 * Backward-compatible wrapper for article post image uploads
 */
export async function uploadPostImage(file: File): Promise<string> {
  return uploadMediaImage(file, 'articles', PRIMARY_MEDIA_BUCKET);
}

/**
 * Helper to delete an image from Supabase Storage
 */
export async function deleteMediaImage(urlOrPath: string, bucket: string = PRIMARY_MEDIA_BUCKET): Promise<boolean> {
  try {
    if (!urlOrPath || urlOrPath.startsWith('data:')) {
      return true;
    }
    let filePath = urlOrPath;
    let targetBucket = bucket;

    // Detect bucket from URL if provided
    if (urlOrPath.includes(PRIMARY_MEDIA_BUCKET)) {
      targetBucket = PRIMARY_MEDIA_BUCKET;
      const parts = urlOrPath.split(`${PRIMARY_MEDIA_BUCKET}/`);
      if (parts.length > 1) filePath = parts[1].split('?')[0];
    } else if (urlOrPath.includes(BLOG_IMAGES_BUCKET)) {
      targetBucket = BLOG_IMAGES_BUCKET;
      const parts = urlOrPath.split(`${BLOG_IMAGES_BUCKET}/`);
      if (parts.length > 1) filePath = parts[1].split('?')[0];
    } else if (urlOrPath.includes(POST_IMAGES_BUCKET)) {
      targetBucket = POST_IMAGES_BUCKET;
      const parts = urlOrPath.split(`${POST_IMAGES_BUCKET}/`);
      if (parts.length > 1) filePath = parts[1].split('?')[0];
    }

    const { error } = await supabase.storage.from(targetBucket).remove([filePath]);
    if (error) {
      console.warn(`Could not delete file from ${targetBucket}:`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('deleteMediaImage error:', err);
    return false;
  }
}

/**
 * Convenience wrapper for career / recruitment job banner uploads
 */
export async function uploadCareerImage(file: File): Promise<string> {
  return uploadMediaImage(file, 'careers', PRIMARY_MEDIA_BUCKET);
}

/**
 * Convenience wrapper for hero slide / homepage banner uploads
 */
export async function uploadBannerImage(file: File): Promise<string> {
  return uploadMediaImage(file, 'banners', PRIMARY_MEDIA_BUCKET);
}

/**
 * Backward-compatible wrapper for deleting post images
 */
export async function deletePostImage(urlOrPath: string): Promise<boolean> {
  return deleteMediaImage(urlOrPath, POST_IMAGES_BUCKET);
}
