import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  PhoneCall,
  ShieldCheck,
  X,
} from 'lucide-react';

export interface FAQItem {
  id: string;
  category: 'legal' | 'operations' | 'pricing' | 'technology';
  categoryLabel: string;
  question: string;
  answer: string;
  highlightPoints?: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'legal',
    categoryLabel: 'Pháp lý & Giấy phép',
    question: 'Lâm Sơn Động có đầy đủ tư cách pháp nhân và chứng chỉ hành nghề theo quy định không?',
    answer:
      'Lâm Sơn Động hoạt động hoàn toàn chính quy và được cấp Giấy chứng nhận đủ điều kiện về An ninh Trật tự số bởi Cục Cảnh sát Quản lý hành chính về Trật tự xã hội (C06 - Bộ Công An) theo Nghị định 96/2016/NĐ-CP. 100% nhân viên bảo vệ đều có hồ sơ lý lịch trong sạch (xác nhận tư pháp không tiền án, tiền sự), trải qua sát hạch nghiêm ngặt và được cấp Chứng chỉ nghiệp vụ bảo vệ chuyên nghiệp cùng Chứng nhận huấn luyện PCCC & Cứu nạn cứu hộ theo quy chuẩn nhà nước.',
    highlightPoints: [
      'Giấy phép đủ điều kiện ANTT chính thức do Bộ Công An chứng nhận',
      '100% nhân viên được cấp thẻ hành nghề và chứng chỉ PCCC chính quy',
      'Hồ sơ năng lực pháp lý minh bạch cho các gói thầu FDI và tập đoàn lớn',
    ],
  },
  {
    id: 'faq-2',
    category: 'operations',
    categoryLabel: 'Quy trình & Nghiệp vụ',
    question: 'Thời gian khảo sát thực địa và triển khai tiếp quản mục tiêu mất bao lâu?',
    answer:
      'Sau khi tiếp nhận yêu cầu từ đối tác, Ban Tác Chiến Lâm Sơn Động sẽ cử cán bộ chỉ huy có mặt tại mục tiêu trong vòng 2 – 4 giờ tại Hà Nội và các vùng kinh tế trọng điểm phía Bắc để khảo sát địa hình, sơ đồ giao thông, đánh giá các điểm mù an ninh và lập "Phương Án Bảo Vệ Mục Tiêu Toàn Diện". Thời gian triển khai bàn giao và tiếp quản lực lượng diễn ra trong vòng 24 – 48 giờ kể từ khi ký kết hợp đồng. Đối với tình huống khẩn cấp hoặc sự kiện đột xuất, Đội Cơ Động Phản Ứng Nhanh có thể xuất quân trong vòng 15 – 30 phút.',
    highlightPoints: [
      'Khảo sát thực địa và đánh giá rủi ro an ninh miễn phí trong 2–4 giờ',
      'Lập phương án tác chiến chi tiết, sơ đồ chốt trực và quy trình xử lý sự cố',
      'Đội phản ứng nhanh thường trực sẵn sàng chi viện khẩn cấp 24/7',
    ],
  },
  {
    id: 'faq-3',
    category: 'pricing',
    categoryLabel: 'Chi phí & Bồi thường',
    question: 'Chính sách bồi thường và bảo hiểm trách nhiệm pháp lý khi xảy ra mất mát, sự cố tài sản ra sao?',
    answer:
      'Lâm Sơn Động áp dụng chính sách bảo vệ tài sản tuyệt đối với hợp đồng kinh tế rõ ràng: Cam kết bồi thường 100% giá trị thiệt hại tài sản thực tế nếu để xảy ra mất mát, thất thoát hoặc hư hỏng do lỗi tác trách từ nhân sự ca trực. Đồng thời, chúng tôi duy trì gói Bảo Hiểm Trách Nhiệm Dân Sự & Nghề Nghiệp có giá trị bồi thường lên tới 20.000.000.000 VNĐ (20 tỷ đồng) tại các công ty bảo hiểm uy tín hàng đầu (Bảo Việt / PVI), giúp khách hàng giảm thiểu hoàn toàn mọi rủi ro tài chính.',
    highlightPoints: [
      'Bồi thường 100% giá trị thiệt hại theo thỏa thuận hợp đồng minh bạch',
      'Gói bảo hiểm trách nhiệm nghề nghiệp giá trị cao 20 tỷ đồng',
      'Biên bản bàn giao kiểm đếm niêm phong tài sản trước và sau mỗi ca trực',
    ],
  },
  {
    id: 'faq-4',
    category: 'operations',
    categoryLabel: 'Quy trình & Nghiệp vụ',
    question: 'Tiêu chuẩn tuyển dụng và nội dung huấn luyện nhân viên bảo vệ của Lâm Sơn Động có gì khác biệt?',
    answer:
      'Chúng tôi áp dụng mô hình đào tạo kết hợp "Kỷ luật thép - Võ thuật thực chiến - Văn hóa ứng xử 5 sao". Nguồn nhân sự tuyển chọn ưu tiên từ lực lượng Bộ đội đặc nhiệm, Cảnh sát cơ động xuất ngũ và các võ sinh phái Lâm Sơn Động có thể lực, chiều cao chuẩn. Học viên phải trải qua khóa đào tạo nội trú 60 ngày bao gồm: Võ thuật đối kháng khống chế tội phạm không vũ khí, kỹ năng sử dụng công cụ hỗ trợ, nghiệp vụ PCCC & thoát hiểm khói độc, sơ cấp cứu chấn thương và kỹ năng mềm giải quyết khiếu nại, giữ thái độ nhã nhặn, tôn trọng đối tác.',
    highlightPoints: [
      'Ưu tiên bộ đội xuất ngũ, quân nhân đặc nhiệm và võ sinh chính phái',
      'Đào tạo võ thuật thực chiến Lâm Sơn Động và kỹ năng khống chế cận chiến',
      'Bộ quy chuẩn giao tiếp văn minh, cúi chào 15 độ tại sảnh tòa nhà hạng A',
    ],
  },
  {
    id: 'faq-5',
    category: 'pricing',
    categoryLabel: 'Chi phí & Bồi thường',
    question: 'Chi phí dịch vụ bảo vệ được tính như thế nào? Có phát sinh thêm phụ phí nào không?',
    answer:
      'Chi phí dịch vụ của Lâm Sơn Động được tính toán trọn gói theo vị trí chốt trực (ca 24/24 hoặc ca 12/24) hoặc theo giờ thực tế cho các sự kiện ngắn hạn. Đơn giá ký kết là trọn gói 100%, bao gồm: lương nhân sự, phụ cấp độc hại/ca đêm, thưởng lễ Tết, BHXH/BHYT/BHTN, đồng phục tác chiến, toàn bộ công cụ hỗ trợ (bộ đàm tần số riêng, máy tuần tra bấm giờ, đèn pin chiếu xa, dùi cui cao su) và chi phí bảo hiểm rủi ro. Khách hàng hoàn toàn không phải chi trả thêm bất kỳ khoản phí phát sinh nào ngoài hợp đồng.',
    highlightPoints: [
      'Đơn giá trọn gói minh bạch, cam kết không phát sinh bất kỳ phụ phí nào',
      'Bao gồm toàn bộ trang thiết bị công cụ hỗ trợ và đồng phục chuẩn',
      'Chính sách thanh toán linh hoạt theo tháng kèm hóa đơn VAT hợp lệ',
    ],
  },
  {
    id: 'faq-6',
    category: 'technology',
    categoryLabel: 'Công nghệ & Giám sát',
    question: 'Lâm Sơn Động kiểm soát chất lượng ca trực đêm và lộ trình tuần tra bằng công nghệ gì?',
    answer:
      'Chúng tôi triển khai hệ thống quản lý tuần tra thông minh Smart Patrol 4.0: Các điểm hiểm yếu (kho hóa chất, trạm biến áp, cửa thoát hiểm, góc chết camera) được gắn chip cảm biến RFID/QR bảo mật. Bảo vệ đi tuần phải quét xác thực tại từng điểm theo lộ trình ngẫu nhiên, hệ thống tự động ghi nhận thời gian và tọa độ GPS thời gian thực. Trung tâm Chỉ Huy Giám Sát 24/7 lập tức nhận cảnh báo nếu nhân viên bỏ sót điểm tuần tra, đứng im quá thời gian quy định hoặc có tín hiệu SOS khẩn cấp.',
    highlightPoints: [
      'Hệ thống tuần tra điện tử Smart Patrol tích hợp GPS và chip RFID',
      'Trung tâm giám sát trực ban 24/7 theo dõi từ xa theo thời gian thực',
      'Báo cáo tự động xuất file nhật ký tuần tra hàng ngày cho Ban Quản Lý',
    ],
  },
  {
    id: 'faq-7',
    category: 'operations',
    categoryLabel: 'Quy trình & Nghiệp vụ',
    question: 'Nếu khách hàng cảm thấy nhân viên trực không phù hợp thì có được đổi người không?',
    answer:
      'Có. Quyền lợi và sự hài lòng của khách hàng là ưu tiên số một của chúng tôi. Nếu bất kỳ nhân viên nào có thái độ, tác phong chưa chuẩn mực hoặc không đáp ứng yêu cầu công việc tại mục tiêu, khách hàng chỉ cần thông báo tới Đội Trưởng mục tiêu hoặc Hotline điều hành. Lâm Sơn Động cam kết thay thế nhân sự mới có trình độ chuyên môn tương đương hoặc xuất sắc hơn trong vòng tối đa 12 đến 24 giờ mà không phát sinh thêm bất cứ chi phí nào.',
    highlightPoints: [
      'Cam kết đổi nhân sự trong vòng 12–24 giờ khi khách hàng có yêu cầu',
      'Đội trưởng mục tiêu túc trực giải quyết khiếu nại tức thì',
      'Định kỳ lấy ý kiến khảo sát mức độ hài lòng khách hàng hàng tháng',
    ],
  },
  {
    id: 'faq-8',
    category: 'operations',
    categoryLabel: 'Quy trình & Nghiệp vụ',
    question: 'Công ty có nhận hợp đồng bảo vệ sự kiện, lễ hội hoặc hộ tống yếu nhân ngắn hạn không?',
    answer:
      'Có. Lâm Sơn Động sở hữu Biệt Đội Vệ Sĩ Đặc Nhiệm chuyên trách các hợp đồng ngắn hạn: Lễ hội âm nhạc quy mô hàng chục nghìn khán giả, triển lãm quốc tế, đại hội cổ đông, hội nghị ngoại giao, tiệc VIP riêng tư, cũng như áp tải hàng hóa giá trị cao và bảo vệ yếu nhân/nghệ sĩ/chuyên gia nước ngoài. Các phương án đều được xây dựng nhiều tầng lớp bảo vệ, trang bị phương tiện cơ động và phối hợp chặt chẽ với cơ quan công an sở tại.',
    highlightPoints: [
      'Đội ngũ vệ sĩ VIP thể hình chuẩn, thông thạo võ thuật cận chiến',
      'Kế hoạch kiểm soát đám đông và luồng di chuyển yếu nhân tuyệt mật',
      'Hợp đồng linh hoạt tính theo ngày, theo ca hoặc theo giờ sự kiện',
    ],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Tất cả câu hỏi' },
  { id: 'legal', label: 'Pháp lý & Giấy phép' },
  { id: 'operations', label: 'Quy trình & Nghiệp vụ' },
  { id: 'pricing', label: 'Chi phí & Bồi thường' },
  { id: 'technology', label: 'Công nghệ & Giám sát' },
];

interface FAQSectionProps {
  onOpenQuote?: () => void;
  onScrollToConsultation?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onOpenQuote,
  onScrollToConsultation,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<string[]>(['faq-1']);

  // Filter FAQ items
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        (item.highlightPoints &&
          item.highlightPoints.some((pt) => pt.toLowerCase().includes(query)));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Toggle single accordion item
  const toggleFAQ = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Expand all / Collapse all helper
  const handleToggleAll = () => {
    if (expandedIds.length === filteredFAQs.length) {
      setExpandedIds([]);
    } else {
      setExpandedIds(filteredFAQs.map((f) => f.id));
    }
  };

  return (
    <section
      id="faq-section"
      className="bg-slate-50/80 text-slate-900 py-16 sm:py-24 border-b border-slate-200 scroll-mt-20 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 px-2">
          <h2 className="text-base min-[380px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-950 uppercase tracking-tight sm:tracking-wide leading-tight font-['Plus_Jakarta_Sans',sans-serif] whitespace-nowrap">
            Câu Hỏi Thường Gặp Về Dịch Vụ An Ninh
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed text-balance">
            Những thông tin pháp lý, cơ chế bồi thường 100% rủi ro, quy trình đào tạo võ thuật và cách thức triển khai quân số tiếp quản mục tiêu được khách hàng quan tâm nhiều nhất.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="space-y-4 mb-8">
          {/* Search Input Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm câu hỏi theo từ khóa (pháp lý, bồi thường, ca trực, chi phí, PCCC...)..."
              className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-500 rounded-xl text-slate-900 text-sm shadow-xs focus:outline-hidden transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                title="Xóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-amber-300 shadow-sm border border-slate-900'
                    : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick controls status bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-1">
            <div>
              Hiển thị <strong className="text-slate-800">{filteredFAQs.length}</strong> câu hỏi giải đáp
            </div>
            {filteredFAQs.length > 0 && (
              <button
                type="button"
                onClick={handleToggleAll}
                className="text-amber-800 hover:text-amber-950 hover:underline font-mono font-medium cursor-pointer"
              >
                {expandedIds.length === filteredFAQs.length ? 'Thu gọn tất cả' : 'Mở rộng tất cả'}
              </button>
            )}
          </div>
        </div>

        {/* Accordion FAQ List */}
        {filteredFAQs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              Không tìm thấy câu hỏi phù hợp với "{searchQuery}"
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Quý khách có thể thử tìm kiếm với từ khóa khác, hoặc kết nối trực tiếp với Ban Chỉ Huy trực ban 24/7 để được giải đáp tức thì.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer"
              >
                Đặt lại bộ lọc
              </button>
              <a
                href="tel:0339269524"
                className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-mono font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Gọi 0339.269.524</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredFAQs.map((faq, index) => {
              const isExpanded = expandedIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`bg-white border rounded-xl transition-all duration-200 shadow-2xs overflow-hidden ${
                    isExpanded
                      ? 'border-amber-400 ring-1 ring-amber-400/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Accordion Header / Question */}
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isExpanded}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-4.5 flex items-start justify-between gap-4 cursor-pointer select-none group"
                  >
                    <div className="space-y-1.5 pr-2">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                        <span className="text-amber-800 font-bold">
                          {(index + 1).toString().padStart(2, '0')}.
                        </span>
                        <span>{faq.categoryLabel}</span>
                      </div>
                      <h3
                        className={`text-sm sm:text-base font-bold leading-snug transition-colors ${
                          isExpanded
                            ? 'text-amber-900'
                            : 'text-slate-900 group-hover:text-amber-800'
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center shrink-0 transition-transform duration-200 mt-0.5 ${
                        isExpanded
                          ? 'bg-amber-500/10 border-amber-300 text-amber-700 rotate-180'
                          : 'bg-slate-50 border-slate-200 text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-800'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Body / Answer */}
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal animate-fadeIn">
                      <p className="whitespace-pre-line leading-relaxed text-slate-700 mb-3.5">
                        {faq.answer}
                      </p>

                      {/* Highlighted Takeaways */}
                      {faq.highlightPoints && faq.highlightPoints.length > 0 && (
                        <div className="p-3.5 bg-amber-50/60 border border-amber-200/60 rounded-lg space-y-2 mt-2">
                          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-900 uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                            <span>Điểm cốt lõi cam kết:</span>
                          </div>
                          <ul className="space-y-1.5">
                            {faq.highlightPoints.map((point, ptIdx) => (
                              <li
                                key={ptIdx}
                                className="flex items-start gap-2 text-xs text-slate-700"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
