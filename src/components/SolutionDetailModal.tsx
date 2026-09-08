import React from 'react';
import { 
  X, 
  ShieldCheck, 
  PhoneCall, 
  Cpu, 
  ArrowRight, 
  UserCheck, 
  CheckCircle2, 
  CalendarCheck, 
  AlertTriangle, 
  ClipboardList 
} from 'lucide-react';

interface SolutionDetailModalProps {
  solution: {
    id: string;
    title: string;
    description: string;
    keySpecs: string[];
    tag: string;
  } | null;
  categoryName?: string;
  onClose: () => void;
  onOpenQuote: () => void;
  onOpenConsultation?: () => void;
}

export const SolutionDetailModal: React.FC<SolutionDetailModalProps> = ({ 
  solution, 
  categoryName = 'Giải Pháp An Ninh Theo Ngành Nghề',
  onClose,
  onOpenQuote,
  onOpenConsultation
}) => {
  if (!solution) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl text-slate-900 rounded-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng chi tiết giải pháp"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header - Clean, minimal, non-distracting */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 bg-white border-b border-slate-200 relative shrink-0">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-amber-800">
            <span>{categoryName}</span>
            <span className="text-slate-300 font-normal">•</span>
            <span className="text-slate-500 font-medium">{solution.tag}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-normal leading-snug pr-8">
            {solution.title}
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            {solution.description}
          </p>
        </div>

        {/* Modal Body - Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-7 overflow-y-auto flex-1 text-slate-800">
          
          {/* Section 1: Key Specifications & Metrics */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-3.5 font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
              <span>Chỉ Số Nghiệp Vụ & Cam Kết Trọng Tâm</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {solution.keySpecs.map((spec, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 flex flex-col justify-between"
                >
                  <span className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-wider">
                    Tiêu chí 0{idx + 1}
                  </span>
                  <p className="mt-1.5 text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {spec}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Standard 4-Step Operational Procedure (SOP) */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-3.5 font-mono flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-[#c5a059]" />
              <span>Quy Trình Triển Khai 4 Giai Đoạn Chuẩn Hóa</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
                  <span className="w-5 h-5 rounded-full bg-[#c5a059] text-slate-950 flex items-center justify-center font-mono text-[11px] font-black">1</span>
                  <span>Khảo Sát Thực Địa & Điểm Mù</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal pl-7">
                  Chuyên viên chỉ huy an ninh trực tiếp đo đạc mặt bằng cơ sở, vẽ sơ đồ góc khuất camera, thẩm định luồng giao thông và đánh giá rủi ro đột nhập.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
                  <span className="w-5 h-5 rounded-full bg-[#c5a059] text-slate-950 flex items-center justify-center font-mono text-[11px] font-black">2</span>
                  <span>Lập Phương Án & Sơ Đồ Chốt Chặn</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal pl-7">
                  Thiết lập nội quy kiểm soát cổng, quy trình bàn giao ca, phân bổ quân số các vị trí hiểm yếu và thống nhất phương án phối hợp cùng Ban Giám Đốc.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
                  <span className="w-5 h-5 rounded-full bg-[#c5a059] text-slate-950 flex items-center justify-center font-mono text-[11px] font-black">3</span>
                  <span>Huấn Luyện Nhân Sự Theo Đặc Thù</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal pl-7">
                  Đào tạo tác phong giao tiếp chuẩn mực, kỹ năng nhận diện rủi ro theo từng ngành, thực hành sử dụng công cụ hỗ trợ và diễn tập PCCC định kỳ.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
                  <span className="w-5 h-5 rounded-full bg-[#c5a059] text-slate-950 flex items-center justify-center font-mono text-[11px] font-black">4</span>
                  <span>Vận Hành & Thanh Tra Đột Xuất 24/7</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal pl-7">
                  Áp dụng hệ thống tuần tra định vị chống bỏ sót điểm trực, kết hợp Đội Cơ Động Thanh Tra kiểm tra bất ngờ ban đêm nhằm duy trì kỷ luật tuyệt đối.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Trang thiết bị & Cam kết chất lượng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm uppercase tracking-wide">
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 shrink-0" />
                <span>Trang Bị Kỹ Thuật Nghiệp Vụ</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed pl-1">
                <li>Bộ đàm tầm xa mã hóa kênh riêng, kết nối tức thì không độ trễ</li>
                <li>Máy tuần tra điện tử thông minh ghi nhận tọa độ thời gian thực</li>
                <li>Hệ thống đèn pin chiếu xa 1.000m, dùi cui cao su, gậy chỉ huy</li>
                <li>Trang phục chuyên nghiệp, quân hàm nghiêm trang theo quy chuẩn</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm uppercase tracking-wide">
                <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 shrink-0" />
                <span>Cam Kết Trách Nhiệm & Chất Lượng Nghiệp Vụ</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed pl-1">
                <li><strong>100%</strong> nhân viên có chứng chỉ nghiệp vụ được Bộ Công An cấp</li>
                <li>Cam kết <strong>bồi thường 100%</strong> tổn thất tài sản do lỗi an ninh bảo vệ</li>
                <li>Đội phản ứng nhanh cơ động tiếp ứng trong vòng <strong>3 - 5 phút</strong></li>
                <li>Thay thế nhân sự trong vòng <strong>2 giờ</strong> nếu khách hàng không hài lòng</li>
              </ul>
            </div>
          </div>

          {/* Note Box */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Lưu ý chuyên môn:</strong> Mỗi mục tiêu có quy mô, góc khuất và lưu lượng khách ra vào khác nhau. Để phương án an ninh phát huy tối đa hiệu quả và tối ưu chi phí, cán bộ nghiệp vụ Lâm Sơn Động sẽ đến <strong>khảo sát thực địa trực tiếp miễn phí</strong> trước khi gửi bản đề xuất bố trí quân số chính thức.
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Khảo sát thực địa & Lập phương án an ninh miễn phí 100%</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="tel:0908113888"
              className="px-4 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl shadow-2xs transition-colors shrink-0"
            >
              <PhoneCall className="w-4 h-4 text-amber-700" />
              <span className="font-mono">0908.113.888</span>
            </a>

            <button
              onClick={() => {
                onClose();
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  onOpenQuote();
                }
              }}
              className="flex-1 sm:flex-initial px-6 py-3 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all rounded-xl shadow-sm hover:shadow-md cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Đăng Ký Khảo Sát Thực Địa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
