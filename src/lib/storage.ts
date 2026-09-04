import { supabase } from './supabase';

export const POST_IMAGES_BUCKET = 'post-images';
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
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
 * Upload an image file directly to the Supabase Storage 'post-images' bucket
 * and return the permanent public URL.
 * 
 * @param file The image File selected from the client's machine
 * @returns The permanent publicUrl of the uploaded image
 */
export async function uploadPostImage(file: File): Promise<string> {
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
  const filePath = `uploads/${timestamp}-${randomSuffix}-${cleanBaseName}`;

  // 3. Upload to Supabase Storage
  try {
    const { data, error } = await supabase.storage
      .from(POST_IMAGES_BUCKET)
      .upload(filePath, file, {
        cacheControl: '31536000', // 1 year cache
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      
      // Provide actionable hint if bucket is missing or RLS rejected
      if (error.message.includes('bucket not found') || error.message.includes('not found')) {
        throw new Error(
          `Bucket "${POST_IMAGES_BUCKET}" chưa được tạo trên Supabase Storage. Vui lòng tạo bucket "post-images" (Public) trong Supabase Dashboard hoặc chạy script SQL khởi tạo.`
        );
      }
      
      if (error.message.includes('row-level security') || error.message.includes('policy')) {
        throw new Error(
          'Từ chối quyền tải lên (RLS Policy). Vui lòng đăng nhập với tư cách Quản trị viên hoặc kiểm tra quyền INSERT cho bucket "post-images".'
        );
      }

      throw new Error(error.message || 'Lỗi khi tải ảnh lên máy chủ Supabase.');
    }

    // 4. Retrieve permanent public URL
    const { data: publicUrlData } = supabase.storage
      .from(POST_IMAGES_BUCKET)
      .getPublicUrl(data.path);

    if (!publicUrlData?.publicUrl) {
      throw new Error('Không thể tạo đường dẫn công khai (Public URL) cho ảnh đã tải lên.');
    }

    return publicUrlData.publicUrl;
  } catch (err: any) {
    console.error('Storage upload failure:', err);
    throw err;
  }
}

/**
 * Helper to optionally delete an image from the 'post-images' bucket
 */
export async function deletePostImage(urlOrPath: string): Promise<boolean> {
  try {
    let filePath = urlOrPath;
    
    // Extract relative path if a full Supabase URL was passed
    if (urlOrPath.includes(POST_IMAGES_BUCKET)) {
      const parts = urlOrPath.split(`${POST_IMAGES_BUCKET}/`);
      if (parts.length > 1) {
        filePath = parts[1].split('?')[0]; // strip query params
      }
    }

    const { error } = await supabase.storage
      .from(POST_IMAGES_BUCKET)
      .remove([filePath]);

    if (error) {
      console.warn('Could not delete file from Supabase storage:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('deletePostImage error:', err);
    return false;
  }
}

/**
 * SQL migration script for Supabase Storage setup
 */
export const STORAGE_SETUP_SQL = `-- ==============================================================================
-- CẤU HÌNH SUPABASE STORAGE - BUCKET 'post-images'
-- Bản quyền (c) 2026 Công Ty Bảo Vệ Lâm Sơn Động
-- Hướng dẫn: Mở Supabase Dashboard -> SQL Editor -> Dán đoạn mã này và bấm RUN
-- ==============================================================================

-- 1. Tạo bucket lưu trữ công khai 'post-images' (chấp nhận tối đa 5MB)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'post-images',
  'post-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- 2. Xóa các chính sách RLS cũ nếu đã tồn tại
DROP POLICY IF EXISTS "Public Access - Cho phép mọi người xem ảnh post-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload - Cho phép admin tải ảnh lên post-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update - Cho phép admin cập nhật ảnh post-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete - Cho phép admin xóa ảnh post-images" ON storage.objects;

-- 3. Policy: Cho phép mọi người xem ảnh công khai (SELECT)
CREATE POLICY "Public Access - Cho phép mọi người xem ảnh post-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

-- 4. Policy: Chỉ người dùng đã đăng nhập / quản trị viên mới được tải ảnh lên (INSERT)
CREATE POLICY "Authenticated Upload - Cho phép admin tải ảnh lên post-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'post-images'
  AND (auth.role() = 'authenticated')
);

-- 5. Policy: Chỉ quản trị viên mới được cập nhật ảnh (UPDATE)
CREATE POLICY "Authenticated Update - Cho phép admin cập nhật ảnh post-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'post-images'
  AND (auth.role() = 'authenticated')
)
WITH CHECK (
  bucket_id = 'post-images'
  AND (auth.role() = 'authenticated')
);

-- 6. Policy: Chỉ quản trị viên mới được xóa ảnh (DELETE)
CREATE POLICY "Authenticated Delete - Cho phép admin xóa ảnh post-images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'post-images'
  AND (auth.role() = 'authenticated')
);
`;
