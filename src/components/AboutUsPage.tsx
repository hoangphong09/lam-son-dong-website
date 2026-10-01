import React, { useState } from 'react';
import { FOOTER_DATA } from '../data/mockData';

interface AboutUsPageProps {
  onNavigateToHome: (sectionId?: string) => void;
  onOpenQuote: () => void;
  onOpenRecruitment?: () => void;
}

type TabType = 'intro' | 'achievements' | 'partnerships' | 'policies';

interface TabItem {
  id: TabType;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'intro', label: 'Giới thiệu công ty' },
  { id: 'achievements', label: 'Thành tích nổi bật' },
  { id: 'partnerships', label: 'Cơ hội hợp tác' },
  { id: 'policies', label: 'Tiêu chí hoạt động và chính sách' },
];

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigateToHome,
  onOpenQuote,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('intro');

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-['Be_Vietnam_Pro',sans-serif]">
      
      {/* ================================================================= */}
      {/* 1. HERO BANNER: MINIMALIST, HIGH CONTRAST (NO ICONS, NO TAG BADGES) */}
      {/* ================================================================= */}
      <section className="relative bg-slate-950 text-white pt-14 pb-18 sm:pt-20 sm:pb-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/training.jpg" 
            alt="Đội ngũ Lâm Sơn Động" 
            className="w-full h-full object-cover object-center filter brightness-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb (2 colors: white & slate-300) */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <li>
                <button
                  onClick={() => onNavigateToHome()}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Trang chủ
                </button>
              </li>
              <li className="text-slate-500">›</li>
              <li className="text-white font-semibold" aria-current="page">
                Giới thiệu Lâm Sơn Động
              </li>
            </ol>
          </nav>

          {/* Clean Main Title */}
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif] text-white leading-tight">
              VỀ LÂM SƠN ĐỘNG
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Kế thừa tinh hoa võ thuật cổ truyền kết hợp cùng chuẩn mực an ninh công nghiệp. Chúng tôi cam kết bảo vệ an toàn mọi mục tiêu với kỷ luật và trách nhiệm cao nhất.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. SUB-NAV TABS: CLEAN, FLAT & ACCESSIBLE (NO ICONS)              */}
      {/* ================================================================= */}
      <section className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none -mb-px">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    const el = document.getElementById('about-tab-content');
                    if (el) {
                      const offsetTop = el.getBoundingClientRect().top + window.scrollY - 150;
                      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                    }
                  }}
                  className={`relative py-4 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap cursor-pointer select-none font-medium transition-colors ${
                    isActive
                      ? 'text-slate-950 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  {/* Clean active indicator sitting directly on the baseline border */}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-[2px] bg-slate-900 z-10" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. MAIN CONTENT: 2 TEXT COLORS ONLY (SLATE-900 & SLATE-600)       */}
      {/* ================================================================= */}
      <main id="about-tab-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* =============================================================== */}
        {/* TAB 1: GIỚI THIỆU CÔNG TY                                       */}
        {/* =============================================================== */}
        {activeTab === 'intro' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Narrative History */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h2 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif] pb-2 border-b-2 border-slate-900">
                    LỊCH SỬ HÌNH THÀNH
                  </h2>
                </div>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    <strong className="text-slate-900">Công ty Cổ phần Dịch vụ Bảo vệ Lâm Sơn Động</strong> khởi nguồn từ tinh hoa võ học cổ truyền môn phái Lâm Sơn Động – môn phái võ thuật nổi tiếng với tinh thần thượng võ, ý chí kiên định và tính kỷ luật tối cao. Doanh nghiệp kết hợp nền tảng võ thuật và kỷ luật vũ trang cùng quy chuẩn an ninh công nghiệp tiên tiến.
                  </p>

                  <p>
                    Với triết lý hoạt động <strong className="text-slate-900">“Kỷ luật – Trách nhiệm – Tin cậy”</strong>, công ty đã khẳng định được uy tín trong hơn 15 năm hoạt động, trở thành đối tác an ninh tin cậy của nhiều doanh nghiệp, nhà máy, khu công nghiệp và tòa nhà văn phòng tại miền Bắc.
                  </p>

                  <p>
                    Chúng tôi chú trọng xây dựng đội ngũ nhân sự chính quy, tác phong chuẩn mực và khả năng phản ứng kịp thời trong mọi tình huống, mang lại sự an tâm cao nhất cho khách hàng.
                  </p>
                </div>

                {/* 3 Clean Minimalist Cards: Vision, Mission & Core Values */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-sm mb-1.5 uppercase font-['Plus_Jakarta_Sans']">
                      Tầm Nhìn
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Trở thành đơn vị an ninh chuyên nghiệp chuẩn mực, được khách hàng tin tưởng lựa chọn lâu dài.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-sm mb-1.5 uppercase font-['Plus_Jakarta_Sans']">
                      Sứ Mệnh
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Bảo vệ an toàn con người, tài sản và duy trì trật tự ổn định cho hoạt động của khách hàng.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-sm mb-1.5 uppercase font-['Plus_Jakarta_Sans']">
                      Giá Trị
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Kỷ luật nghiêm minh, trách nhiệm rõ ràng, trung thực và tận tụy trong từng nhiệm vụ.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Imagery (No Badges, No Watermark Boxes) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                  <img 
                    src="/images/service-factory.jpg" 
                    alt="Lực lượng bảo vệ Lâm Sơn Động"
                    className="w-full h-[280px] sm:h-[320px] object-cover" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img 
                      src="/images/service-office.jpg" 
                      alt="Kiểm soát an ninh tòa nhà"
                      className="w-full h-[180px] object-cover" 
                    />
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img 
                      src="/images/training.jpg" 
                      alt="Huấn luyện nghiệp vụ bảo vệ"
                      className="w-full h-[180px] object-cover" 
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* TAB 2: THÀNH TÍCH NỔI BẬT                                        */}
        {/* =============================================================== */}
        {activeTab === 'achievements' && (
          <div className="space-y-10">
            <div>
              <h2 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif] pb-2 border-b-2 border-slate-900">
                THÀNH TÍCH NỔI BẬT
              </h2>
              <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-3xl">
                Những kết quả và chỉ số thực tế sau hơn 15 năm hoạt động liên tục.
              </p>
            </div>

            {/* 4 Clean Metric Cards (Strictly 2 Text Colors) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="text-3xl font-extrabold text-slate-900 font-mono">15+ Năm</div>
                <div className="text-sm font-bold text-slate-900 mt-2">Kinh Nghiệm Thực Tế</div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Hoạt động ổn định, duy trì kỷ luật và nâng cao chất lượng dịch vụ qua từng năm.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="text-3xl font-extrabold text-slate-900 font-mono">500+</div>
                <div className="text-sm font-bold text-slate-900 mt-2">Mục Tiêu Đã Đảm Nhiệm</div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Bảo vệ an toàn cho nhà máy, khu công nghiệp, tòa nhà văn phòng và sự kiện.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="text-3xl font-extrabold text-slate-900 font-mono">1.500+</div>
                <div className="text-sm font-bold text-slate-900 mt-2">Nhân Viên An Ninh</div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Được tuyển chọn nghiêm túc và trải qua các khóa huấn luyện chuyên môn.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="text-3xl font-extrabold text-slate-900 font-mono">98%</div>
                <div className="text-sm font-bold text-slate-900 mt-2">Tỷ Lệ Tái Ký Hợp Đồng</div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Khẳng định sự tín nhiệm và hợp tác lâu dài của các đối tác doanh nghiệp.
                </p>
              </div>
            </div>

            {/* Development Milestones (Clean Minimalist Timeline) */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
              <h3 className="text-base font-bold text-slate-900 uppercase font-['Plus_Jakarta_Sans'] mb-6">
                Các Mốc Phát Triển
              </h3>

              <div className="space-y-6 border-l border-slate-300 pl-6 ml-1">
                <div>
                  <div className="font-mono text-xs font-bold text-slate-900">GIAI ĐOẠN KHỞI ĐẦU</div>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">Xây dựng quy chuẩn an ninh từ môn phái Lâm Sơn Động</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Tập hợp các võ sư và cán bộ nghiệp vụ để chuẩn hóa giáo trình huấn luyện điều lệnh và kỹ năng bảo vệ.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-xs font-bold text-slate-900">GIAI ĐOẠN MỞ RỘNG</div>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">Phát triển dịch vụ tại các khu công nghiệp miền Bắc</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Triển khai lực lượng an ninh tại Hà Nội, Bắc Ninh, Hưng Yên, Hải Dương và Hà Nam.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-xs font-bold text-slate-900">GIAI ĐOẠN CHUẨN HÓA</div>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">Thiết lập đội cơ động phản ứng nhanh và chính sách bảo hiểm</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Duy trì lực lượng cơ động hỗ trợ 24/7 và trang bị bảo hiểm trách nhiệm nghề nghiệp đầy đủ.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-xs font-bold text-slate-900">GIAI ĐOẠN HIỆN NAY</div>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">Ứng dụng công nghệ giám sát và số hóa quy trình tuần tra</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Kết hợp lực lượng tại chỗ cùng hệ thống camera giám sát và báo cáo điện tử định kỳ cho khách hàng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* TAB 3: CƠ HỘI HỢP TÁC                                           */}
        {/* =============================================================== */}
        {activeTab === 'partnerships' && (
          <div className="space-y-10">
            <div>
              <h2 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif] pb-2 border-b-2 border-slate-900">
                CƠ HỘI HỢP TÁC
              </h2>
              <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-3xl">
                Các phương án hợp tác bảo vệ và quy trình tiếp nhận mục tiêu an ninh.
              </p>
            </div>

            {/* 4 Models of Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 uppercase font-['Plus_Jakarta_Sans']">
                  Khu Công Nghiệp & Nhà Máy
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kiểm soát cổng, điều tiết phương tiện hàng hóa, tuần tra khuôn viên và phòng ngừa thất thoát.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 uppercase font-['Plus_Jakarta_Sans']">
                  Tòa Nhà & Văn Phòng
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lễ tân an ninh sảnh, kiểm soát khách ra vào, quản lý hầm xe và giữ gìn trật tự chung.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 uppercase font-['Plus_Jakarta_Sans']">
                  Ngân Hàng & Tài Chính
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trực quầy giao dịch, hỗ trợ khách hàng và áp tải tài sản giá trị theo hợp đồng.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 uppercase font-['Plus_Jakarta_Sans']">
                  Sự Kiện & Bảo Vệ VIP
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thiết lập vành đai bảo vệ, điều phối đám đông và hộ tống khách mời theo yêu cầu.
                </p>
              </div>
            </div>

            {/* 4-Step Process */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
              <h3 className="text-base font-bold text-slate-900 uppercase font-['Plus_Jakarta_Sans'] mb-6">
                Quy Trình Hợp Tác 4 Bước
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-mono text-xs font-bold text-slate-900">BƯỚC 01</div>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">Khảo Sát Thực Địa</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Khảo sát vị trí, đánh giá rủi ro an ninh và lắng nghe yêu cầu cụ thể từ khách hàng.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-mono text-xs font-bold text-slate-900">BƯỚC 02</div>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">Lập Phương Án & Báo Giá</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Thiết kế sơ đồ bố trí chốt, mô tả công việc và gửi bảng báo giá chi tiết, rõ ràng.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-mono text-xs font-bold text-slate-900">BƯỚC 03</div>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">Ký Kết Hợp Đồng</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Thống nhất các điều khoản pháp lý, trách nhiệm bồi thường và quyền lợi hai bên.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-mono text-xs font-bold text-slate-900">BƯỚC 04</div>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">Triển Khai Quân Số</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Bàn giao nhân sự đúng thời hạn, diễn tập phương án và duy trì kiểm tra định kỳ.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-600">
                  Bạn có nhu cầu tìm hiểu phương án bảo vệ cho mục tiêu của mình?
                </p>
                <button
                  onClick={onOpenQuote}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Yêu Cầu Báo Giá
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* TAB 5: TIÊU CHÍ HOẠT ĐỘNG VÀ CHÍNH SÁCH                           */}
        {/* =============================================================== */}
        {activeTab === 'policies' && (
          <div className="space-y-10">
            <div>
              <h2 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif] pb-2 border-b-2 border-slate-900">
                TIÊU CHÍ HOẠT ĐỘNG VÀ CHÍNH SÁCH
              </h2>
              <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-3xl">
                Các nguyên tắc tuyển chọn, huấn luyện và cam kết trách nhiệm dịch vụ.
              </p>
            </div>

            {/* 4 Pillars (Clean Minimalist Lists, No Icons) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
                <div className="font-mono text-xs font-bold text-slate-900 uppercase">TIÊU CHUẨN 01</div>
                <h3 className="font-bold text-slate-900 text-base">Tuyển Chọn Nhân Sự</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
                  <li>Lý lịch tư pháp rõ ràng, không có tiền án tiền sự.</li>
                  <li>Sức khỏe đạt tiêu chuẩn, thể lực tốt, không có hình xăm lộ diện.</li>
                  <li>Ưu tiên quân nhân xuất ngũ và người có kinh nghiệm bảo an.</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
                <div className="font-mono text-xs font-bold text-slate-900 uppercase">TIÊU CHUẨN 02</div>
                <h3 className="font-bold text-slate-900 text-base">Huấn Luyện & Đào Tạo</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
                  <li>Huấn luyện kỹ năng võ thuật cận chiến và tự vệ từ môn phái Lâm Sơn Động.</li>
                  <li>Đào tạo kiến thức phòng cháy chữa cháy và sơ cấp cứu cơ bản.</li>
                  <li>Rèn luyện tác phong giao tiếp văn minh, tôn trọng khách hàng.</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
                <div className="font-mono text-xs font-bold text-slate-900 uppercase">TIÊU CHUẨN 03</div>
                <h3 className="font-bold text-slate-900 text-base">Trang Bị & Tác Phong</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
                  <li>Đồng phục chỉnh tề, chuẩn quy cách tại vị trí trực ban.</li>
                  <li>Trang bị công cụ hỗ trợ và bộ đàm liên lạc thông suốt 24/7.</li>
                  <li>Ghi chép sổ sách và báo cáo diễn biến ca trực đầy đủ.</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
                <div className="font-mono text-xs font-bold text-slate-900 uppercase">TIÊU CHUẨN 04</div>
                <h3 className="font-bold text-slate-900 text-base">Chính Sách Cam Kết</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
                  <li>Trang bị gói bảo hiểm trách nhiệm nghề nghiệp đầy đủ.</li>
                  <li>Cam kết bồi thường rõ ràng nếu xảy ra thất thoát do lỗi nhân viên trực.</li>
                  <li>Bảo mật tuyệt đối thông tin nội bộ và hoạt động của khách hàng.</li>
                </ul>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ================================================================= */}
      {/* 4. BOTTOM CTA: MINIMALIST, NO TAGS, NO ICONS                      */}
      {/* ================================================================= */}
      <section className="bg-slate-950 border-t border-slate-800 text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif] text-white max-w-2xl mx-auto leading-snug">
            Tư Vấn Phương Án An Ninh Cho Doanh Nghiệp Của Bạn
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Liên hệ ngay để nhận phương án bảo vệ chi tiết và báo giá phù hợp nhất.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={onOpenQuote}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Yêu Cầu Báo Giá
            </button>

            <a
              href={`tel:${FOOTER_DATA.companyInfo.hotline.replace(/\./g, '')}`}
              className="px-6 py-3 bg-transparent hover:bg-slate-900 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
            >
              Hotline: {FOOTER_DATA.companyInfo.hotline}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
