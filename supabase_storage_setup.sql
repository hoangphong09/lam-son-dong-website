-- ==============================================================================
-- CẤU HÌNH SUPABASE STORAGE - BUCKET 'post-images'
-- Bản quyền (c) 2026 Công Ty Cổ Phần Dịch Vụ Bảo Vệ Lâm Sơn Động
-- Hướng dẫn: Mở Supabase Dashboard (https://supabase.com/dashboard)
--            -> Vào mục SQL Editor -> New Query -> Dán toàn bộ file này và bấm RUN.
-- ==============================================================================

-- 1. Tạo bucket lưu trữ công khai 'post-images' với giới hạn dung lượng 5MB
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'post-images',
  'post-images',
  true,
  5242880, -- Giới hạn 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- 2. Kích hoạt Row Level Security (RLS) trên bảng storage.objects nếu chưa bật
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Xóa các chính sách RLS cũ nếu đã tồn tại để tránh xung đột trùng tên
DROP POLICY IF EXISTS "Public Access - Cho phép mọi người xem ảnh post-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload - Cho phép admin tải ảnh lên post-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update - Cho phép admin cập nhật ảnh post-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete - Cho phép admin xóa ảnh post-images" ON storage.objects;

-- 4. Policy: Cho phép mọi người xem ảnh công khai (SELECT) trên bucket 'post-images'
CREATE POLICY "Public Access - Cho phép mọi người xem ảnh post-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

-- 5. Policy: Chỉ người dùng đã xác thực (authenticated) mới được tải ảnh lên (INSERT)
CREATE POLICY "Authenticated Upload - Cho phép admin tải ảnh lên post-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'post-images'
  AND (auth.role() = 'authenticated')
);

-- 6. Policy: Chỉ người dùng đã xác thực mới được cập nhật ảnh (UPDATE)
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

-- 7. Policy: Chỉ người dùng đã xác thực mới được xóa ảnh (DELETE)
CREATE POLICY "Authenticated Delete - Cho phép admin xóa ảnh post-images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'post-images'
  AND (auth.role() = 'authenticated')
);
