import React from 'react';
import { FOOTER_DATA } from '../data/mockData';

interface RecruitmentPageProps {
  onNavigateToHome: (sectionId?: string) => void;
  onOpenRecruitmentModal: () => void;
}

export const RecruitmentPage: React.FC<RecruitmentPageProps> = ({
  onNavigateToHome,
  onOpenRecruitmentModal,
}) => {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-['Be_Vietnam_Pro',sans-serif]">
      
      {/* ================================================================= */}
      {/* 1. HERO BANNER: MINIMALIST, HIGH CONTRAST                         */}
      {/* ================================================================= */}
      <section className="relative bg-slate-950 text-white pt-14 pb-18 sm:pt-20 sm:pb-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/training.jpg" 
            alt="Lực lượng tuyển dụng Lâm Sơn Động" 
            className="w-full h-full object-cover object-center filter brightness-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
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
                Tuyển dụng
              </li>
            </ol>
          </nav>

          {/* Main Title */}
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif] text-white leading-tight">
              TUYỂN DỤNG NHÂN SỰ
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Công ty Cổ phần Dịch vụ Bảo vệ Lâm Sơn Động liên tục tuyển dụng nhân viên an ninh, chỉ huy ca và vệ sĩ chuyên nghiệp với thu nhập ổn định, đào tạo bài bản và chế độ phúc lợi đầy đủ theo quy định.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. QUICK METRIC HIGHLIGHTS                                        */}
      {/* ================================================================= */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-mono font-bold text-slate-900 uppercase">THU NHẬP HẤP DẪN</div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">Lên tới 10 triệu</div>
              <div className="text-xs text-slate-600 mt-0.5">VNĐ / tháng theo ca trực</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-mono font-bold text-slate-900 uppercase">ĐỊA ĐIỂM LÀM VIỆC</div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">Hà Nội & KCN</div>
              <div className="text-xs text-slate-600 mt-0.5">Bố trí gần nơi cư trú</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-mono font-bold text-slate-900 uppercase">KINH NGHIỆM</div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">Không yêu cầu</div>
              <div className="text-xs text-slate-600 mt-0.5">Đào tạo miễn phí có lương</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-mono font-bold text-slate-900 uppercase">CHẾ ĐỘ ĐÃI NGỘ</div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">BHXH + Nhà ở</div>
              <div className="text-xs text-slate-600 mt-0.5">Hỗ trợ 100% chỗ ở miễn phí</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. MAIN CONTENT: 2 COLUMNS (JOB OPENINGS & DETAILS)               */}
      {/* ================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Job Openings & Requirements */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Section 1: Vị trí tuyển dụng */}
            <div className="space-y-6">
              <div>
                <h2 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif] pb-2 border-b-2 border-slate-900">
                  VỊ TRÍ TUYỂN DỤNG
                </h2>
              </div>

              {/* Job 1 */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-900 uppercase">TUYỂN LIÊN TỤC</span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                      Nhân Viên Bảo Vệ Mục Tiêu – Hà Nội
                    </h3>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-base sm:text-lg font-extrabold text-slate-900">
                      Lên tới 10.000.000 VNĐ
                    </span>
                    <div className="text-xs text-slate-600">/ tháng</div>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                  <div>
                    <strong className="text-slate-900">Nơi làm việc:</strong> Tòa nhà văn phòng, khu đô thị, trung tâm thương mại và nhà máy KCN tại các quận huyện Hà Nội.
                  </div>
                  <div>
                    <strong className="text-slate-900">Ca làm việc:</strong> Ca 12h hoặc xoay ca linh hoạt, có chế độ nghỉ tuần.
                  </div>
                  <div>
                    <strong className="text-slate-900">Yêu cầu ứng viên:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Nam/Nữ từ 18 đến 50 tuổi, lý lịch trong sạch, không tiền án tiền sự.</li>
                      <li>Tốt nghiệp THCS, THPT trở lên, sức khỏe tốt, không có hình xăm lớn.</li>
                      <li>Tác phong nghiêm túc, trung thực, có tinh thần trách nhiệm và kỷ luật.</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-slate-900">Quyền lợi được hưởng:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Được đào tạo nghiệp vụ miễn phí và hưởng lương trong suốt thời gian đào tạo.</li>
                      <li>Tham gia đầy đủ BHXH, BHYT và các chế độ theo Luật Lao động hiện hành.</li>
                      <li>Hỗ trợ 100% chỗ ở miễn phí gần vị trí trực cho nhân viên ở xa.</li>
                      <li>Cấp phát đồng phục và trang thiết bị làm việc theo quy chuẩn.</li>
                      <li>Xét tăng lương định kỳ và cơ hội thăng tiến lên Ca trưởng, Đội phó, Đội trưởng.</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={onOpenRecruitmentModal}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Nộp Đơn Ứng Tuyển
                  </button>
                  <a
                    href="tel:0981962288"
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors border border-slate-300"
                  >
                    Gọi: 0981 962 288
                  </a>
                </div>
              </div>

              {/* Job 2 */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-900 uppercase">QUẢN LÝ VẬN HÀNH</span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                      Chỉ Huy Ca & Đội Trưởng Mục Tiêu KCN
                    </h3>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-base sm:text-lg font-extrabold text-slate-900">
                      12.000.000 – 18.000.000 VNĐ
                    </span>
                    <div className="text-xs text-slate-600">/ tháng + Thưởng trách nhiệm</div>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                  <div>
                    <strong className="text-slate-900">Mô tả công việc:</strong> Quản lý điều phối ca trực từ 10 - 50 nhân viên, phân ca, kiểm tra điều lệnh, giám sát quy trình an ninh và làm việc trực tiếp với ban quản lý khách hàng.
                  </div>
                  <div>
                    <strong className="text-slate-900">Yêu cầu:</strong> Tối thiểu 2 năm kinh nghiệm quản lý mục tiêu an ninh, hoặc quân nhân, công an xuất ngũ có phẩm chất chỉ huy tốt.
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={onOpenRecruitmentModal}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Nộp Đơn Ứng Tuyển
                  </button>
                  <a
                    href="tel:0975751246"
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors border border-slate-300"
                  >
                    Gọi: 0975 751 246
                  </a>
                </div>
              </div>

            </div>

            {/* Section 2: Quy trình tuyển dụng & Đào tạo */}
            <div className="space-y-6">
              <div>
                <h2 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif] pb-2 border-b-2 border-slate-900">
                  QUY TRÌNH TUYỂN DỤNG
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <div className="font-mono text-xs font-bold text-slate-900">BƯỚC 01</div>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">Nộp Hồ Sơ & Sơ Tuyển</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Ứng viên đăng ký trực tuyến hoặc nộp hồ sơ tại văn phòng, phỏng vấn sơ loại về nguyện vọng và điều kiện công tác.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <div className="font-mono text-xs font-bold text-slate-900">BƯỚC 02</div>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">Kiểm Tra Thể Lực & Hồ Sơ</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Kiểm tra chiều cao, cân nặng, sức khỏe tổng quát và xác minh lý lịch tư pháp của ứng viên.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <div className="font-mono text-xs font-bold text-slate-900">BƯỚC 03</div>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">Đào Tạo Nghiệp Vụ Có Lương</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Huấn luyện võ thuật Lâm Sơn Động, PCCC, kỹ năng điều lệnh và văn hóa ứng xử chuyên nghiệp.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <div className="font-mono text-xs font-bold text-slate-900">BƯỚC 04</div>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">Cấp Đồng Phục & Nhận Mục Tiêu</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Ký hợp đồng lao động chính thức, nhận trang thiết bị và được bàn giao về mục tiêu làm việc gần nơi cư trú.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Hồ sơ cần chuẩn bị */}
            <div className="space-y-6">
              <div>
                <h2 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif] pb-2 border-b-2 border-slate-900">
                  HỒ SƠ ỨNG TUYỂN
                </h2>
              </div>

              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200">
                <p className="text-xs sm:text-sm text-slate-600 mb-4">
                  Ứng viên chuẩn bị 01 bộ hồ sơ xin việc (có thể nộp bản photo khi phỏng vấn và hoàn thiện bản công chứng khi ký hợp đồng):
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 list-disc pl-5">
                  <li>01 Bản Sơ yếu lý lịch tự thuật có dán ảnh và xác nhận của UBND xã/phường nơi cư trú.</li>
                  <li>01 Bản sao công chứng Căn cước công dân gắn chip (còn hạn).</li>
                  <li>01 Giấy khám sức khỏe do cơ sở y tế từ cấp huyện trở lên cấp (thời hạn trong vòng 06 tháng).</li>
                  <li>01 Giấy xác nhận không tiền án tiền sự (xác nhận hạnh kiểm hoặc phiếu lý lịch tư pháp).</li>
                  <li>01 Bản sao bằng tốt nghiệp THCS hoặc THPT trở lên.</li>
                  <li>04 Ảnh chân dung 3x4 hoặc 4x6 (chụp trên phông nền trắng/xanh trong 6 tháng gần nhất).</li>
                  <li>Bản sao Quyết định xuất ngũ (nếu là quân nhân hoặc công an hoàn thành nghĩa vụ).</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Cards & Photo */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-slate-900 uppercase">LIÊN HỆ TRỰC TIẾP</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Phòng Tuyển Dụng & Đào Tạo
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Liên hệ ngay để được hướng dẫn nộp hồ sơ và xếp lịch phỏng vấn nhanh nhất:
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <a
                  href="tel:0981962288"
                  className="block p-3.5 rounded-xl border border-slate-200 hover:border-slate-900 transition-colors"
                >
                  <div className="text-xs text-slate-600 font-medium">Mr. Phúc • Phụ trách Tuyển dụng</div>
                  <div className="font-mono text-base font-bold text-slate-900 mt-0.5">
                    0981 962 288
                  </div>
                </a>

                <a
                  href="tel:0975751246"
                  className="block p-3.5 rounded-xl border border-slate-200 hover:border-slate-900 transition-colors"
                >
                  <div className="text-xs text-slate-600 font-medium">Mrs. Luyến • Phòng Nhân sự</div>
                  <div className="font-mono text-base font-bold text-slate-900 mt-0.5">
                    0975 751 246
                  </div>
                </a>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <p><strong className="text-slate-900">Địa chỉ nộp hồ sơ:</strong></p>
                <p>{FOOTER_DATA.companyInfo.headquarters}</p>
                <p className="pt-1 text-slate-500">Giờ làm việc: 08:00 - 17:30 (Thứ 2 - Thứ 7)</p>
              </div>

              <button
                onClick={onOpenRecruitmentModal}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
              >
                Nộp Hồ Sơ Trực Tuyến
              </button>
            </div>

            {/* Photo Preview Card */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <img 
                src="/images/training.jpg" 
                alt="Đào tạo nhân sự Lâm Sơn Động" 
                className="w-full h-[260px] object-cover"
              />
              <div className="p-4 bg-white">
                <div className="text-xs font-bold text-slate-900">Môi Trường Kỷ Luật & Chuyên Nghiệp</div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Đồng phục chính quy, nghiệp vụ bài bản, môi trường làm việc văn minh và đoàn kết.
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ================================================================= */}
      {/* 4. BOTTOM CTA BANNER: MINIMALIST                                  */}
      {/* ================================================================= */}
      <section className="bg-slate-950 border-t border-slate-800 text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif] text-white max-w-2xl mx-auto leading-snug">
            Gia Nhập Lực Lượng An Ninh Lâm Sơn Động Ngay Hôm Nay
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Chúng tôi luôn chào đón những ứng viên có phẩm chất đạo đức tốt, tinh thần trách nhiệm và mong muốn gắn bó lâu dài.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={onOpenRecruitmentModal}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Nộp Đơn Ứng Tuyển Ngay
            </button>

            <a
              href="tel:0981962288"
              className="px-6 py-3 bg-transparent hover:bg-slate-900 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
            >
              Hotline Tuyển Dụng: 0981 962 288
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
