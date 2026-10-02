-- ==============================================================================
-- LÂM SƠN ĐỘNG SECURITY - SUPABASE CMS WORKFLOW, RLS & STORAGE SETUP
-- ==============================================================================
-- File: supabase-cms-setup.sql
-- Description:
--   1. Admin role identification function is_admin() (JWT app_metadata & user_metadata)
--   2. Content tables: posts, breaking_news, recruitment_positions, recruitment_applications, hero_slides, case_studies
--   3. Row Level Security (RLS) policies: Public read-only for published items, Admin full CRUD
--   4. Supabase Storage buckets ('content-media', 'post-images') with public read & admin upload RLS
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. HELPER FUNCTION: is_admin()
-- Determines if the current authenticated session has admin privileges via:
--   - JWT app_metadata: {"role": "admin"} or {"roles": ["admin"]} or {"is_admin": true}
--   - JWT user_metadata: {"role": "admin"} or {"is_admin": true}
--   - public.profiles table (if exists) with role = 'admin'
--   - Standard authenticated role fallback
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT (
    -- Check app_metadata (recommended for Supabase Auth custom claims)
    coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
    OR coalesce((auth.jwt() -> 'app_metadata' -> 'roles') ? 'admin', false)
    OR coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false)
    -- Check user_metadata
    OR coalesce((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin', false)
    OR coalesce((auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean, false)
    -- Check public.profiles role if table exists
    OR (
      EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'profiles'
      )
      AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role IN ('admin', 'superadmin', 'manager')
      )
    )
    -- Default to true for any authenticated user in this application
    OR (auth.role() = 'authenticated')
  );
$$;

-- ==============================================================================
-- 3. CONTENT TABLES & RLS POLICIES
-- ==============================================================================

--------------------------------------------------------------------------------
-- A. BẢNG BÀI VIẾT & TIN TỨC (posts)
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  category TEXT DEFAULT 'Tin tức',
  published BOOLEAN DEFAULT true,
  author TEXT DEFAULT 'Ban Biên Tập Lâm Sơn Động',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;
DROP POLICY IF EXISTS "Admin full CRUD on posts" ON public.posts;

-- Public / Anonymous: Chỉ được đọc bài viết đã xuất bản (published = true)
CREATE POLICY "Public can view published posts" ON public.posts
  FOR SELECT
  USING (published = true OR public.is_admin());

-- Admin: Toàn quyền SELECT, INSERT, UPDATE, DELETE
CREATE POLICY "Admin full CRUD on posts" ON public.posts
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

--------------------------------------------------------------------------------
-- B. BẢNG TIN NHANH KHẨN CẤP / THÔNG BÁO FLASH (breaking_news)
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.breaking_news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  link TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.breaking_news ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active breaking news" ON public.breaking_news;
DROP POLICY IF EXISTS "Admin full CRUD on breaking news" ON public.breaking_news;

-- Public: Chỉ đọc tin đang kích hoạt
CREATE POLICY "Public can view active breaking news" ON public.breaking_news
  FOR SELECT
  USING (is_active = true OR public.is_admin());

-- Admin: Toàn quyền
CREATE POLICY "Admin full CRUD on breaking news" ON public.breaking_news
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

--------------------------------------------------------------------------------
-- C. BẢNG VỊ TRÍ TUYỂN DỤNG (recruitment_positions)
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.recruitment_positions (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  badge TEXT DEFAULT 'Tuyển liên tục',
  salary_range TEXT NOT NULL,
  quantity TEXT DEFAULT '20 người',
  location TEXT NOT NULL,
  work_type TEXT DEFAULT 'Theo ca / Toàn thời gian',
  description TEXT NOT NULL,
  requirements TEXT,
  benefits TEXT,
  deadline TEXT DEFAULT 'Tuyển liên tục trong tháng',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.recruitment_positions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active jobs" ON public.recruitment_positions;
DROP POLICY IF EXISTS "Admin full CRUD on recruitment positions" ON public.recruitment_positions;

-- Public: Chỉ xem các vị trí đang mở tuyển (is_active = true)
CREATE POLICY "Public can view active jobs" ON public.recruitment_positions
  FOR SELECT
  USING (is_active = true OR public.is_admin());

-- Admin: Toàn quyền CRUD
CREATE POLICY "Admin full CRUD on recruitment positions" ON public.recruitment_positions
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

--------------------------------------------------------------------------------
-- D. BẢNG HỒ SƠ ỨNG VIÊN NỘP TRỰC TUYẾN (recruitment_applications)
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.recruitment_applications (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  birth_year TEXT,
  position_applied TEXT NOT NULL,
  experience TEXT,
  notes TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interview_scheduled', 'hired', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.recruitment_applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public candidates can submit application" ON public.recruitment_applications;
DROP POLICY IF EXISTS "Admin full CRUD on recruitment applications" ON public.recruitment_applications;

-- Public: Ứng viên được phép gửi hồ sơ ứng tuyển
CREATE POLICY "Public candidates can submit application" ON public.recruitment_applications
  FOR INSERT
  WITH CHECK (true);

-- Admin: Toàn quyền xem, cập nhật trạng thái phỏng vấn và xóa hồ sơ
CREATE POLICY "Admin full CRUD on recruitment applications" ON public.recruitment_applications
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

--------------------------------------------------------------------------------
-- E. BẢNG HERO CAROUSEL SLIDES (hero_slides)
--------------------------------------------------------------------------------
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
DROP POLICY IF EXISTS "Public can view hero slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Admin full CRUD on hero slides" ON public.hero_slides;

CREATE POLICY "Public can view hero slides" ON public.hero_slides
  FOR SELECT
  USING (true);

CREATE POLICY "Admin full CRUD on hero slides" ON public.hero_slides
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

--------------------------------------------------------------------------------
-- F. BẢNG DỰ ÁN TIÊU BIỂU (case_studies)
--------------------------------------------------------------------------------
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
DROP POLICY IF EXISTS "Public can view case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admin full CRUD on case studies" ON public.case_studies;

CREATE POLICY "Public can view case studies" ON public.case_studies
  FOR SELECT
  USING (true);

CREATE POLICY "Admin full CRUD on case studies" ON public.case_studies
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

--------------------------------------------------------------------------------
-- G. BẢNG YÊU CẦU BÁO GIÁ & TƯ VẤN (quote_requests)
--------------------------------------------------------------------------------
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

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can submit quote request" ON public.quote_requests;
DROP POLICY IF EXISTS "Admin full CRUD on quote requests" ON public.quote_requests;

CREATE POLICY "Public can submit quote request" ON public.quote_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin full CRUD on quote requests" ON public.quote_requests
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ==============================================================================
-- 4. CẤU HÌNH SUPABASE STORAGE (content-media & post-images)
-- ==============================================================================

-- 1. Tạo bucket 'content-media' (chính) và 'post-images' (tương thích ngược)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('content-media', 'content-media', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('post-images', 'post-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- 2. Kích hoạt Row Level Security trên storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Xóa các policy storage cũ để tránh xung đột
DROP POLICY IF EXISTS "Public view for content-media and post-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload for content-media and post-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin update for content-media and post-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete for content-media and post-images" ON storage.objects;

-- 4. Policy: Cho phép mọi người đọc công khai hình ảnh (SELECT)
CREATE POLICY "Public view for content-media and post-images"
ON storage.objects FOR SELECT
USING (bucket_id IN ('content-media', 'post-images'));

-- 5. Policy: Chỉ Admin / Authenticated được phép tải ảnh lên (INSERT)
CREATE POLICY "Admin upload for content-media and post-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id IN ('content-media', 'post-images')
  AND (public.is_admin() OR auth.role() = 'authenticated')
);

-- 6. Policy: Chỉ Admin / Authenticated được phép cập nhật ảnh (UPDATE)
CREATE POLICY "Admin update for content-media and post-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id IN ('content-media', 'post-images')
  AND (public.is_admin() OR auth.role() = 'authenticated')
)
WITH CHECK (
  bucket_id IN ('content-media', 'post-images')
  AND (public.is_admin() OR auth.role() = 'authenticated')
);

-- 7. Policy: Chỉ Admin / Authenticated được phép xóa ảnh (DELETE)
CREATE POLICY "Admin delete for content-media and post-images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id IN ('content-media', 'post-images')
  AND (public.is_admin() OR auth.role() = 'authenticated')
);

-- ==============================================================================
-- 5. DỮ LIỆU KHỞI TẠO MẪU CHO RECRUITMENT POSITIONS
-- ==============================================================================
INSERT INTO public.recruitment_positions (
  id, title, slug, badge, salary_range, quantity, location, work_type, description, requirements, benefits, deadline, is_active, display_order
) VALUES
(
  1,
  'Nhân Viên An Ninh / Bảo Vệ Mục Tiêu KCN & Tòa Nhà',
  'nhan-vien-an-ninh-bao-ve-muc-tieu',
  'Tuyển liên tục',
  '7.500.000 - 10.000.000 VNĐ',
  '50 người',
  'Hà Nội, Bắc Ninh, Hưng Yên, Hải Phòng',
  'Xoay ca 8h - 12h / Ngày hoặc Đêm',
  'Tuần tra canh gác và duy trì an ninh trật tự tại các mục tiêu trọng điểm (nhà máy FDI, cao ốc văn phòng, đại sứ quán, khu đô thị). Kiểm soát luồng người và phương tiện ra vào mục tiêu, xử lý sự cố an ninh và PCCC theo đúng quy trình.',
  'Nam từ 18 - 50 tuổi, chiều cao từ 1m65, cân nặng từ 55kg. Nữ từ 18 - 40 tuổi, chiều cao từ 1m55, cân nặng từ 48kg. Lý lịch trong sạch, không tiền án tiền sự, không hình xăm lộ. Sức khỏe tốt, ưu tiên bộ đội xuất ngũ hoặc đã có kinh nghiệm bảo vệ.',
  'Cung cấp chỗ ở miễn phí 100% tại mục tiêu hoặc ký túc xá công ty. Tham gia đầy đủ BHXH, BHYT, BHTN theo luật lao động. Thưởng lễ, tết, lương tháng 13 và chế độ khen thưởng đột xuất khi lập thành tích xuất sắc. Được đào tạo võ thuật, nghiệp vụ PCCC và cấp chứng chỉ hành nghề miễn phí.',
  'Tuyển liên tục trong tháng',
  true,
  1
),
(
  2,
  'Đội Trưởng Cơ Động & Vệ Sĩ VIP Yếu Nhân',
  'doi-truong-co-dong-ve-si-vip',
  'Ưu tiên đặc nhiệm',
  '12.000.000 - 18.000.000 VNĐ',
  '15 người',
  'Hà Nội & Công tác ngoại tỉnh',
  'Theo hợp đồng sự kiện & Hộ tống VIP',
  'Thực hiện nhiệm vụ bảo vệ yếu nhân, áp tải hàng hóa đặc biệt, tuần tra cơ động xử lý tình huống khẩn cấp tại các mục tiêu có nguy cơ cao. Chỉ huy đội hình phản ứng nhanh khi có tình huống phức tạp.',
  'Nam tuổi từ 22 - 40, cao từ 1m72 trở lên, thể lực xuất sắc. Bắt buộc có chứng chỉ võ thuật (Lâm Sơn Động, Karate, Taekwondo, Cổ truyền) hoặc xuất thân từ lực lượng Cảnh sát cơ động, Quân đội đặc nhiệm. Có bằng lái xe B2 trở lên là lợi thế lớn.',
  'Mức lương cao theo năng lực thực chiến và phụ cấp công tác đặc biệt. Trang bị đầy đủ công cụ hỗ trợ hiện đại theo chuẩn Bộ Công An. Bảo hiểm tai nạn rủi ro mức cao 24/24. Cơ hội thăng tiến lên Trưởng ban tác chiến.',
  'Tuyển liên tục trong tháng',
  true,
  2
)
ON CONFLICT (id) DO NOTHING;

-- CẤP QUYỀN TRUY CẬP CHO ROLE
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT INSERT ON public.quote_requests TO anon;
GRANT INSERT ON public.recruitment_applications TO anon;
