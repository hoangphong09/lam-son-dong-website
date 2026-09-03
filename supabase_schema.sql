-- ==============================================================================
-- CƠ SỞ DỮ LIỆU SUPABASE - LÂM SƠN ĐỘNG SECURITY
-- Bản quyền (c) 2026 Công Ty Bảo Vệ Lâm Sơn Động
-- Hướng dẫn: Mở Supabase Dashboard -> SQL Editor -> New Query -> Dán toàn bộ script và nhấn RUN.
-- ==============================================================================

-- Bật tiện ích pgcrypto để mã hóa mật khẩu an toàn
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- PHẦN 1: KHỞI TẠO TÀI KHOẢN QUẢN TRỊ VIÊN MẶC ĐỊNH (DEFAULT ADMIN SEED)
-- Email: admin@lamsondong.com
-- Mật khẩu: lamsondong
-- Quyền hạn: Super Admin / Full CRUD Access
-- ==============================================================================

DO $$
DECLARE
  super_user_id UUID := gen_random_uuid();
  existing_user_id UUID;
BEGIN
  -- Kiểm tra xem tài khoản admin@lamsondong.com đã tồn tại trong auth.users chưa
  SELECT id INTO existing_user_id FROM auth.users WHERE email = 'admin@lamsondong.com';

  IF existing_user_id IS NULL THEN
    -- 1. Tạo mới tài khoản admin trong auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token,
      is_super_admin
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      super_user_id,
      'authenticated',
      'authenticated',
      'admin@lamsondong.com',
      crypt('lamsondong', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"],"role":"superadmin","is_super_admin":true}'::jsonb,
      '{"name":"Tổng Chỉ Huy Trưởng","role":"superadmin","full_name":"Ban Lãnh Đạo Lâm Sơn Động"}'::jsonb,
      NOW(),
      NOW(),
      '',
      '',
      '',
      '',
      TRUE
    );

    -- 2. Đăng ký thông tin identity cho Supabase Auth để hỗ trợ đăng nhập email/password
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      super_user_id,
      super_user_id,
      format('{"sub":"%s","email":"%s"}', super_user_id::text, 'admin@lamsondong.com')::jsonb,
      'email',
      super_user_id::text,
      NOW(),
      NOW(),
      NOW()
    );
  ELSE
    -- 3. Cập nhật mật khẩu và đồng bộ quyền Super Admin cho tài khoản hiện có
    UPDATE auth.users
    SET 
      encrypted_password = crypt('lamsondong', gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
      raw_app_meta_data = raw_app_meta_data || '{"provider":"email","providers":["email"],"role":"superadmin","is_super_admin":true}'::jsonb,
      raw_user_meta_data = raw_user_meta_data || '{"name":"Tổng Chỉ Huy Trưởng","role":"superadmin","full_name":"Ban Lãnh Đạo Lâm Sơn Động"}'::jsonb,
      is_super_admin = TRUE,
      updated_at = NOW()
    WHERE id = existing_user_id;
  END IF;
END $$;

-- ==============================================================================
-- PHẦN 2: HÀM KIỂM TRA QUYỀN QUẢN TRỊ (ADMIN HELPER FUNCTION)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.jwt() ->> 'email' = 'admin@lamsondong.com'
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'superadmin'
    OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'superadmin'
    OR (auth.jwt() -> 'app_metadata' ->> 'is_super_admin')::boolean = true
    OR auth.role() = 'authenticated'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==============================================================================
-- PHẦN 3: BẢNG VÀ PHÂN QUYỀN ROW LEVEL SECURITY (RLS)
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

ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép xem stats công khai" ON public.stats;
DROP POLICY IF EXISTS "Cho phép quản trị viên thêm stats" ON public.stats;
DROP POLICY IF EXISTS "Cho phép quản trị viên cập nhật stats" ON public.stats;
DROP POLICY IF EXISTS "Cho phép quản trị viên xóa stats" ON public.stats;
DROP POLICY IF EXISTS "Cho phép quản trị viên quản lý stats" ON public.stats;
DROP POLICY IF EXISTS "Admin toàn quyền quản lý stats" ON public.stats;

CREATE POLICY "Cho phép xem stats công khai" ON public.stats
  FOR SELECT USING (true);

CREATE POLICY "Admin toàn quyền quản lý stats" ON public.stats
  FOR ALL
  USING (public.is_admin() OR auth.role() = 'authenticated')
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');

-- Dữ liệu mẫu ban đầu cho bảng stats
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

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép khách gửi yêu cầu báo giá" ON public.quote_requests;
DROP POLICY IF EXISTS "Cho phép xem và cập nhật yêu cầu báo giá" ON public.quote_requests;
DROP POLICY IF EXISTS "Cho phép thêm yêu cầu báo giá" ON public.quote_requests;
DROP POLICY IF EXISTS "Admin toàn quyền quản lý quote_requests" ON public.quote_requests;

CREATE POLICY "Cho phép khách gửi yêu cầu báo giá" ON public.quote_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin toàn quyền quản lý quote_requests" ON public.quote_requests
  FOR ALL
  USING (public.is_admin() OR auth.role() = 'authenticated')
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');


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
DROP POLICY IF EXISTS "Cho phép quản lý bài viết" ON public.posts;
DROP POLICY IF EXISTS "Admin toàn quyền quản lý posts" ON public.posts;

CREATE POLICY "Cho phép xem bài viết công khai" ON public.posts
  FOR SELECT USING (published = true OR public.is_admin() OR auth.role() = 'authenticated');

CREATE POLICY "Admin toàn quyền quản lý posts" ON public.posts
  FOR ALL
  USING (public.is_admin() OR auth.role() = 'authenticated')
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');


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
DROP POLICY IF EXISTS "Cho phép xem hero slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Cho phép xem hero_slides công khai" ON public.hero_slides;
DROP POLICY IF EXISTS "Cho phép quản lý hero slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Admin toàn quyền quản lý hero_slides" ON public.hero_slides;

CREATE POLICY "Cho phép xem hero_slides công khai" ON public.hero_slides
  FOR SELECT USING (true);

CREATE POLICY "Admin toàn quyền quản lý hero_slides" ON public.hero_slides
  FOR ALL
  USING (public.is_admin() OR auth.role() = 'authenticated')
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');


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
DROP POLICY IF EXISTS "Cho phép xem case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Cho phép xem case_studies công khai" ON public.case_studies;
DROP POLICY IF EXISTS "Cho phép quản lý case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admin toàn quyền quản lý case_studies" ON public.case_studies;

CREATE POLICY "Cho phép xem case_studies công khai" ON public.case_studies
  FOR SELECT USING (true);

CREATE POLICY "Admin toàn quyền quản lý case_studies" ON public.case_studies
  FOR ALL
  USING (public.is_admin() OR auth.role() = 'authenticated')
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');


-- 6. BẢNG CẤU HÌNH TÙY CHỌN BÁO GIÁ & GÓI DỊCH VỤ (QUOTE_OPTIONS)
CREATE TABLE IF NOT EXISTS public.quote_options (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('service_type', 'target_objective', 'pricing_tier')),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  price_estimate NUMERIC DEFAULT 0,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.quote_options ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép xem tùy chọn báo giá công khai" ON public.quote_options;
DROP POLICY IF EXISTS "Cho phép quản trị viên quản lý tùy chọn báo giá" ON public.quote_options;
DROP POLICY IF EXISTS "Cho phép quản lý tùy chọn báo giá" ON public.quote_options;
DROP POLICY IF EXISTS "Admin toàn quyền quản lý quote_options" ON public.quote_options;

CREATE POLICY "Cho phép xem tùy chọn báo giá công khai" ON public.quote_options
  FOR SELECT USING (true);

CREATE POLICY "Admin toàn quyền quản lý quote_options" ON public.quote_options
  FOR ALL
  USING (public.is_admin() OR auth.role() = 'authenticated')
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');

-- Dữ liệu mẫu ban đầu cho quote_options
INSERT INTO public.quote_options (category, label, value, price_estimate, description, is_active, display_order)
VALUES
  -- Loại hình mục tiêu (target_objective)
  ('target_objective', 'Nhà máy / Khu Công Nghiệp', 'kcn', 0, 'Kiểm soát cổng chính, hàng rào, xuất nhập kho bãi, PCCC ca đêm', true, 1),
  ('target_objective', 'Tòa nhà / Cao ốc Văn phòng', 'building', 0, 'Lễ tân, thẻ từ thang máy, tuần tra bãi đỗ xe hầm, an ninh sảnh', true, 2),
  ('target_objective', 'Showroom / TTTM', 'retail', 0, 'Chống thất thoát tài sản, đón tiếp khách hàng văn minh, kiểm soát quầy thu ngân', true, 3),
  ('target_objective', 'Vệ sĩ VIP / Yếu nhân', 'bodyguard', 0, 'Bảo vệ áp tải, hộ tống sự kiện, tháp tùng lãnh đạo cấp cao 24/7', true, 4),
  ('target_objective', 'Công trình Xây dựng / Dự án', 'construction', 0, 'Quản lý máy móc, sắt thép vật tư, kiểm soát công nhân ra vào công trường', true, 5),
  ('target_objective', 'Bệnh viện / Trường học', 'education_health', 0, 'Phòng ngừa gây rối trật tự, đảm bảo an toàn tuyệt đối khuôn viên', true, 6),

  -- Ca trực / Định giá vị trí (pricing_tier)
  ('pricing_tier', 'Chốt trực 24/24 (3 ca/ngày)', 'guard_24h', 16500000, 'Ca luân phiên 8 tiếng, trực liên tục 24/7 không ngắt quãng', true, 1),
  ('pricing_tier', 'Chốt trực 12/24 (Ngày hoặc Đêm)', 'guard_12h', 9500000, 'Khung giờ hành chính 07:00 - 19:00 hoặc ca đêm 19:00 - 07:00', true, 2),
  ('pricing_tier', 'Bảo vệ cơ động / Tuần tra định kỳ', 'mobile_patrol', 4500000, 'Xe mô tô cơ động tuần tra kiểm tra đột xuất 4-6 lần/ngày đêm', true, 3),
  ('pricing_tier', 'Sự kiện ngắn hạn theo giờ', 'event_hourly', 180000, 'Bảo vệ hội nghị, lễ khai trương, triển lãm tính theo giờ/vị trí', true, 4),

  -- Gói dịch vụ & Trang bị kèm theo (service_type)
  ('service_type', 'Chứng chỉ PCCC & Cứu nạn cứu hộ', 'addon_pccc', 500000, 'Nhân sự có chứng chỉ nghiệp vụ PCCC do Bộ Công An cấp', true, 1),
  ('service_type', 'Hệ thống Smart Patrol GPS', 'addon_gps', 1200000, 'Điểm danh thẻ chip RFID, lộ trình tuần tra thời gian thực qua app', true, 2),
  ('service_type', 'Bodycam Giám sát Ca Đêm 4K', 'addon_bodycam', 800000, 'Trang bị camera ghi hình sắc nét góc rộng có đèn hồng ngoại ban đêm', true, 3),
  ('service_type', 'Chó nghiệp vụ K9 tuần tra hàng rào', 'addon_k9', 3500000, 'K9 huấn luyện đặc biệt răn đe chống đột nhập khuôn viên rộng', true, 4)
ON CONFLICT DO NOTHING;

-- Cấp quyền bảng cho vai trò authenticated và anon
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT INSERT ON public.quote_requests TO anon;
