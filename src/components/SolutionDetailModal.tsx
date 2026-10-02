import React from 'react';
import { 
  X, 
  PhoneCall, 
  ArrowRight, 
  CalendarCheck,
  Check
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-slate-200 w-[95vw] md:w-[85vw] lg:w-[75vw] max-w-5xl h-[90vh] md:h-[80vh] lg:h-[75vh] flex flex-col shadow-2xl text-slate-900 rounded-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sleek Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng chi tiết giải pháp"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all z-20 cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header: Clean, Editorial Whitepaper Style */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 bg-white border-b border-slate-100 relative shrink-0 pr-16">
          <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-mono font-bold text-amber-800">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80">
              {categoryName}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">Chuyên đề an ninh ứng dụng</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
            {solution.title}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-3xl">
            {solution.description}
          </p>
        </div>

        {/* Modal Body - Full Blog Post Format (Scrollable, Reading-focused) */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto flex-1 text-slate-800 leading-relaxed font-sans">
          
          {/* Key Metric Highlights - Clean pill cards without clipart */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
              Mục tiêu định lượng & Chỉ số cam kết
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {solution.keySpecs.map((spec, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#c5a059] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                      Tiêu chuẩn 0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                      {spec}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Article Section 1: Bối cảnh thực tế & Thách thức đặc thù */}
          <section className="space-y-3 pt-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              1. Bối Cảnh Thực Tế & Thách Thức Nghiệp Vụ Tại Mục Tiêu
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Tại các cơ sở như nhà máy sản xuất, cao ốc văn phòng hay chuỗi phân phối hiện đại, nguy cơ an ninh không còn dừng lại ở các hành vi trộm cắp đơn lẻ mà thường diễn ra phức tạp, có tổ chức và lợi dụng triệt để những kẽ hở trong quy trình vận hành ca đêm hoặc các khung giờ cao điểm xuất nhập.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Thực tế cho thấy, việc bố trí lực lượng bảo vệ truyền thống thiếu chuyên môn hóa thường dẫn tới ba điểm yếu chí mạng:
            </p>
            <div className="pl-4 border-l-2 border-amber-400/80 space-y-2 text-xs sm:text-sm text-slate-700 italic">
              <p>• <strong>Kiểm soát hình thức:</strong> Kiểm tra phương tiện và nhân sự qua loa, không đối chiếu mã đơn hoặc lệnh xuất nhập bằng mã vạch số hóa.</p>
              <p>• <strong>Bỏ lọt điểm mù:</strong> Thiếu cơ chế giám sát tuần tra theo tọa độ định vị, tạo điều kiện cho các đối tượng bên ngoài xâm nhập hàng rào vành đai.</p>
              <p>• <strong>Bị động khi phát sinh sự cố:</strong> Nhân viên lúng túng khi đối mặt với các tình huống xung đột, trộm cắp quả tang hoặc sự cố chập cháy PCCC khẩn cấp.</p>
            </div>
          </section>

          {/* Article Section 2: Phương Án Kiến Trúc An Ninh Đa Tầng */}
          <section className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              2. Phương Án Kiến Trúc An Ninh Đa Tầng Của Lâm Sơn Động
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Nhằm giải quyết triệt để bài toán an toàn cho đối tác, Lâm Sơn Động Security áp dụng phương án bảo vệ đa tầng khép kín, phối hợp nhịp nhàng giữa con người tinh nhuệ và công nghệ giám sát hiện đại:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-[11px] font-mono font-bold text-amber-800 uppercase">
                  Tầng 1: Kiểm soát chốt chặn ngoại vi
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thiết lập quy trình phân luồng người và phương tiện khoa học. 100% khách vãng lai, nhà thầu phụ và xe vận chuyển phải đăng ký số hóa, kiểm tra niêm phong chì và đối chiếu lệnh xuất kho trước khi mở barie.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-[11px] font-mono font-bold text-amber-800 uppercase">
                  Tầng 2: Tuần tra cơ động Smart Patrol
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Đội tuần tra cơ động sử dụng thiết bị định vị GPS xác thực qua thẻ chip RFID gắn tại các góc khuất, hàng rào và kho nhạy cảm. Chu kỳ tuần tra ngẫu nhiên 30 phút/lượt, triệt tiêu hoàn toàn điểm mù thời gian.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-[11px] font-mono font-bold text-amber-800 uppercase">
                  Tầng 3: Giám sát trung tâm SOC 24/7
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kíp trực phòng camera theo dõi liên tục hệ thống cảnh báo hàng rào ảo, cảm biến nhiệt sớm và chuông báo động PCCC. Khi phát hiện dấu hiệu bất thường, lập tức điều động lực lượng tại chỗ xử lý trong 60 giây.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-[11px] font-mono font-bold text-amber-800 uppercase">
                  Tầng 4: Thanh tra tác chiến cơ động
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Đội Đặc Nhiệm Thanh Tra Lâm Sơn Động kiểm tra bất ngờ ca đêm từ 00h00 đến 04h00 sáng. Đảm bảo nhân sự giữ vững kỷ luật quân ngũ, tuyệt đối không lơ là, ngủ gật hay tự ý rời bỏ vị trí trực chiến.
                </p>
              </div>
            </div>
          </section>

          {/* Article Section 3: Quy Trình Vận Hành Chuẩn Hóa (SOP 4 Bước) */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              3. Quy Trình 4 Bước Triển Khai Thực Tế
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-slate-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Khảo Sát Thực Địa & Thiết Lập Bản Đồ Rủi Ro</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Cán bộ chỉ huy an ninh trực tiếp đo đạc mặt bằng, xác định lưu lượng người - xe, các điểm mù camera và đánh giá các nguy cơ cháy nổ, trộm cắp đặc thù của cơ sở.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-slate-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Ban Hành Phương Án Bố Trí Quân Số & Nội Quy</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Xây dựng sơ đồ chốt chặn tối ưu, quy chuẩn bàn giao ca trực, phân bổ vị trí trực chiến 24/7 và thống nhất phương án xử lý tình huống khẩn cấp cùng Ban Lãnh Đạo khách hàng.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-slate-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Đào Tạo & Sát Hạch Nhân Sự Theo Đặc Thù Mục Tiêu</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Tập huấn tác phong văn hóa giao tiếp lịch thiệp, kỹ năng nhận diện thủ đoạn gian lận, thao tác sử dụng công cụ hỗ trợ và diễn tập phương án PCCC thoát hiểm tại chỗ.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-slate-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Tiếp Quản Vận Hành & Đo Lường Chất Lượng Định Kỳ</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Bàn giao ca trực chính thức, cập nhật nhật ký an ninh số hóa hàng ngày và tổ chức các buổi đánh giá định kỳ hàng tháng để không ngừng tối ưu hiệu quả bảo vệ.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Article Section 4: Cam Kết Pháp Lý & Bảo Hiểm Bồi Hoàn */}
          <section className="p-5 sm:p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
            <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-900">
              Cam Kết Trách Nhiệm & Pháp Lý Bằng Văn Bản
            </h3>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#c5a059] font-bold">—</span>
                <span><strong>Cam kết bồi thường 100%</strong> giá trị tổn thất tài sản nếu xảy ra mất mát do lỗi nghiệp vụ của nhân viên an ninh.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c5a059] font-bold">—</span>
                <span><strong>100% nhân viên</strong> có lý lịch tư pháp trong sạch, được cấp chứng chỉ nghiệp vụ chính quy bởi Cục Cảnh sát QLHC về TTXH (C06 - Bộ Công An).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c5a059] font-bold">—</span>
                <span><strong>Đội Cơ Động Phản Ứng Nhanh</strong> thường trực tiếp ứng hỗ trợ trong vòng <strong>3 - 5 phút</strong> khi phát sinh sự cố khẩn cấp.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c5a059] font-bold">—</span>
                <span>Thay thế ngay lập tức nhân sự trong vòng <strong>2 giờ</strong> nếu khách hàng có bất kỳ điểm nào chưa hài lòng về tác phong làm việc.</span>
              </li>
            </ul>
          </section>

          {/* Expert Callout Box */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed">
            <strong className="text-amber-950 font-bold block mb-1">Khuyến nghị từ Ban Chỉ Huy Lâm Sơn Động:</strong>
            Mỗi cơ sở sản xuất và kinh doanh đều sở hữu diện tích mặt bằng, luồng giao thông và đặc thù rủi ro hoàn toàn riêng biệt. Để giải pháp phát huy tối đa hiệu quả an ninh và tối ưu ngân sách chi phí, chúng tôi khuyến khích quý doanh nghiệp đăng ký <strong>khảo sát thực địa miễn phí</strong>. Cán bộ nghiệp vụ sẽ đến trực tiếp đánh giá và lập bản đề xuất phương án chi tiết trong vòng 24 giờ.
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 md:p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs sm:text-sm text-slate-600 hidden sm:block">
            <span>Khảo sát thực địa & tư vấn phương án bảo vệ <strong className="text-slate-900 font-bold">hoàn toàn miễn phí</strong></span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            {/* Phone Button */}
            <a
              href="tel:0339269524"
              className="h-11 sm:h-12 px-4 sm:px-5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
            >
              <PhoneCall className="w-4 h-4 text-amber-700" />
              <span className="font-mono font-bold tracking-tight">0339.269.524</span>
            </a>

            {/* Consultation CTA */}
            <button
              onClick={() => {
                onClose();
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  onOpenQuote();
                }
              }}
              className="h-11 sm:h-12 px-5 sm:px-6 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all rounded-xl shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
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
