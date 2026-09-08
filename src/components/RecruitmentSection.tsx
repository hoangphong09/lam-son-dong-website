import React from 'react';
import { Search, Phone, ArrowRight } from 'lucide-react';

interface RecruitmentSectionProps {
  onOpenRecruitmentModal: () => void;
}

export const RecruitmentSection: React.FC<RecruitmentSectionProps> = ({
  onOpenRecruitmentModal,
}) => {
  return (
    <section 
      id="recruitment-section" 
      className="relative bg-white text-slate-900 py-16 sm:py-20 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ========================================================
             LEFT: PHOTO FRAME WITH WATERMARK EMBEDDED LOGO
             ======================================================== */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 group bg-slate-900">
              {/* Photo of Lâm Sơn Động Security Personnel */}
              <img 
                src="https://i.postimg.cc/k5dkdVmG/7c332534-4aaa-48bc-9d3b-46c81b752efc.jpg" 
                alt="Đội ngũ nhân viên bảo vệ Lâm Sơn Động"
                className="w-full h-[380px] sm:h-[450px] object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />

              {/* Watermark / Logo Chìm (No White Box, Clean Transparent Watermark) */}
              <div className="absolute top-4 right-4 pointer-events-none select-none">
                <img 
                  src="https://i.postimg.cc/4dWvw0PJ/logo.png" 
                  alt="Logo Lâm Sơn Động" 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] opacity-75 group-hover:opacity-90 transition-opacity"
                />
              </div>

              {/* Minimal Bottom Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-5 text-white">
                <div className="text-xs font-semibold tracking-wide uppercase text-amber-200 mb-1">
                  Đội Ngũ An Ninh Lâm Sơn Động
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Đồng phục chính quy, nghiệp vụ bài bản, môi trường làm việc văn minh và kỷ luật thép.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================
             RIGHT: TYPOGRAPHY & RECRUITMENT CONTENT (CLEAN UI/UX)
             ======================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-slate-950 uppercase font-['Plus_Jakarta_Sans'] leading-tight mb-4">
              LIÊN TỤC TUYỂN DỤNG
            </h2>

            {/* Position Pill with Search Icon */}
            <div className="mb-6 inline-flex">
              <div className="bg-slate-100 text-slate-900 font-bold px-5 py-2.5 rounded-full flex items-center gap-3 text-base border border-slate-200">
                <span>Nhân viên bảo vệ – Hà Nội</span>
                <Search className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            {/* 4 Core Bullet Points - Clean, Minimal Typography (No Cluttered Icons) */}
            <ul className="space-y-3 mb-8 text-base text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-amber-700 font-bold text-lg leading-none mt-0.5">•</span>
                <span className="leading-relaxed">
                  Yêu cầu tốt nghiệp THPT, THCS trở lên, sức khoẻ tốt, không có hình xăm lớn.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-amber-700 font-bold text-lg leading-none mt-0.5">•</span>
                <span className="leading-relaxed text-slate-950">
                  Thu nhập lên tới <strong className="text-amber-800 font-bold text-lg">10.000.000 VNĐ / tháng</strong>
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-amber-700 font-bold text-lg leading-none mt-0.5">•</span>
                <span className="leading-relaxed">
                  Được đào tạo miễn phí và hưởng lương trong thời gian đào tạo.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-amber-700 font-bold text-lg leading-none mt-0.5">•</span>
                <span className="leading-relaxed">
                  Tham gia đầy đủ BHXH, BHYT và các chế độ theo luật Lao động hiện hành.
                </span>
              </li>
            </ul>

            {/* Contact Box - Clean, Uncluttered Layout */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl mb-7">
              <div className="text-sm font-semibold text-slate-800 mb-3">
                Liên hệ để nhận tư vấn và hướng dẫn nộp hồ sơ:
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a 
                  href="tel:0981962288" 
                  className="flex items-center justify-between p-3.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 rounded-lg text-slate-900 transition-colors group"
                >
                  <div>
                    <div className="font-mono text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      0981 962 288
                    </div>
                    <div className="text-xs text-slate-500">Mr. Phúc</div>
                  </div>
                  <div className="text-slate-400 group-hover:text-amber-700 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                </a>

                <a 
                  href="tel:0975751246" 
                  className="flex items-center justify-between p-3.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 rounded-lg text-slate-900 transition-colors group"
                >
                  <div>
                    <div className="font-mono text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      0975 751 246
                    </div>
                    <div className="text-xs text-slate-500">Mrs. Luyến</div>
                  </div>
                  <div className="text-slate-400 group-hover:text-amber-700 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                </a>
              </div>
            </div>

            {/* Action Buttons - Clean & Focused */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="recruitment-apply-now-btn"
                onClick={onOpenRecruitmentModal}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <span>Nộp Đơn Ứng Tuyển Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:0981962288"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 text-sm font-medium px-5 py-3 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-500" />
                <span>Hotline: 0981.962.288</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
