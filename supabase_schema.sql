-- ==============================================================================
-- CƠ SỞ DỮ LIỆU SUPABASE - LÂM SƠN ĐỘNG SECURITY
-- Bản quyền (c) 2026 Công Ty Bảo Vệ Lâm Sơn Động
-- Hướng dẫn: Mở Supabase Dashboard -> SQL Editor -> New Query -> Dán toàn bộ script và nhấn Run.
-- ==============================================================================

-- 1. BẢNG HIỆU QUẢ THỰC TẾ / CHỈ SỐ NĂNG LỰC (STATS)
CREATE TABLE IF NOT EXISTS public.stats (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  numeric_value TEXT NOT NULL,
  unit TEXT DEFAULT '+',
  suffix TEXT DEFAULT '+',
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS cho bảng stats
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép xem stats công khai" ON public.stats;
CREATE POLICY "Cho phép xem stats công khai" ON public.stats FOR SELECT USING (true);

DROP POLICY IF EXISTS "Cho phép quản trị viên thêm stats" ON public.stats;
CREATE POLICY "Cho phép quản trị viên thêm stats" ON public.stats FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Cho phép quản trị viên cập nhật stats" ON public.stats;
CREATE POLICY "Cho phép quản trị viên cập nhật stats" ON public.stats FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Cho phép quản trị viên xóa stats" ON public.stats;
CREATE POLICY "Cho phép quản trị viên xóa stats" ON public.stats FOR DELETE USING (true);

-- Dữ liệu mẫu ban đầu cho bảng stats (nếu chưa có)
INSERT INTO public.stats (id, title, numeric_value, unit, suffix, description, display_order, is_active)
VALUES 
  (1, 'Nhân sự bảo vệ & Vệ sĩ', '300', '+', '+', 'Huấn luyện võ thuật, nghiệp vụ, pháp luật định kỳ', 1, true),
  (2, 'Mục tiêu trọng điểm bảo vệ', '100', '+', '+', 'KCN, Cao ốc, Ngân hàng, Bệnh viện, Nhà máy 24/7', 2, true),
  (3, 'Chứng chỉ PCCC & Võ thuật', '100', '%', '%', 'Được cấp chứng chỉ hành nghề chính quy bởi Bộ Công An', 3, true),
  (4, 'Tỉnh thành phủ sóng', '20', '+', '+', 'Đội cơ động phản ứng nhanh có mặt trong 15 phút', 4, true)
ON CONFLICT (id) DO NOTHING;


-- 2. BẢNG YÊU CẦU BÁO GIÁ & KHÁCH HÀNG TIỀM NĂNG (QUOTE_REQUESTS)
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id BIGSERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_needed TEXT DEFAULT 'Bảo vệ Mục tiêu Cố định',
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed', 'processing', 'completed', 'cancelled')),
  company_name TEXT,
  total_estimate NUMERIC,
  estimated_price_formatted TEXT,
  source TEXT DEFAULT 'consultation_form',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS cho bảng quote_requests
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép khách gửi yêu cầu báo giá" ON public.quote_requests;
CREATE POLICY "Cho phép khách gửi yêu cầu báo giá" ON public.quote_requests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Cho phép xem và cập nhật yêu cầu báo giá" ON public.quote_requests;
CREATE POLICY "Cho phép xem và cập nhật yêu cầu báo giá" ON public.quote_requests FOR ALL USING (true);


-- 3. BẢNG BÀI VIẾT (POSTS)
CREATE TABLE IF NOT EXISTS public.posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  category TEXT DEFAULT 'Tin tức',
  published BOOLEAN DEFAULT true,
  author TEXT DEFAULT 'Ban Quản Trị',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép xem bài viết công khai" ON public.posts;
CREATE POLICY "Cho phép xem bài viết công khai" ON public.posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Cho phép quản lý bài viết" ON public.posts;
CREATE POLICY "Cho phép quản lý bài viết" ON public.posts FOR ALL USING (true);


-- 4. BẢNG HERO SLIDES
CREATE TABLE IF NOT EXISTS public.hero_slides (
  id TEXT PRIMARY KEY,
  tag TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  ctaText TEXT,
  secondaryCtaText TEXT,
  category TEXT
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép xem hero slides" ON public.hero_slides FOR SELECT USING (true);

DROP POLICY IF EXISTS "Cho phép quản lý hero slides" ON public.hero_slides FOR ALL USING (true);


-- 5. BẢNG DỰ ÁN TIÊU BIỂU (CASE_STUDIES)
CREATE TABLE IF NOT EXISTS public.case_studies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  sector TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  result TEXT NOT NULL,
  readTime TEXT DEFAULT '5 phút đọc',
  summary TEXT,
  period TEXT,
  guardCount TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép xem case studies" ON public.case_studies FOR SELECT USING (true);

DROP POLICY IF EXISTS "Cho phép quản lý case studies" ON public.case_studies FOR ALL USING (true);
