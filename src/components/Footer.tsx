import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  Loader2, 
  X,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { sendNewsletterNotification } from '../lib/emailService';
import { FOOTER_DATA } from '../data/mockData';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenQuote: () => void;
  onOpenAdmin?: () => void;
  onOpenRecruitment?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onScrollToSection, 
  onOpenQuote, 
  onOpenAdmin, 
  onOpenRecruitment 
}) => {
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setSubLoading(true);
      try {
        await sendNewsletterNotification({
          email: emailSub.trim(),
          sourcePage: 'Chân trang Website (Footer - Hộp Nhận Bản Tin)',
        });
      } catch (err) {
        console.warn('Lỗi khi đăng ký nhận bản tin:', err);
      } finally {
        setSubLoading(false);
        setSubSuccess(true);
        setEmailSub('');
        setTimeout(() => setSubSuccess(false), 6000);
      }
    }
  };

  return (
    <footer 
      id="main-footer" 
      className="bg-[#1a1d24] text-slate-300 border-t border-slate-800 relative select-none"
    >
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ================================================================= */}
          {/* LEFT & CENTER: NAVIGATION COLUMNS (Spans 7 cols on desktop)      */}
          {/* ================================================================= */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-6">
            
            {/* Column 1: Thư viện & Sự kiện và Tin tức (Stacked vertically) */}
            <div className="sm:col-span-4 space-y-8">
              {/* Thư viện */}
              <div>
                <h4 className="text-[15px] font-bold text-white tracking-wide mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
                  Thư viện
                </h4>
                <ul className="space-y-3 text-[13px] text-slate-300">
                  <li>
                    <button
                      onClick={() => onScrollToSection('library-section')}
                      className="hover:text-[#e5be5a] transition-colors text-left cursor-pointer font-normal"
                    >
                      Bách khoa an ninh số & PCCC
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onScrollToSection('library-section')}
                      className="hover:text-[#e5be5a] transition-colors text-left cursor-pointer font-normal text-slate-400 hover:text-[#e5be5a]"
                    >
                      Cẩm nang quản trị rủi ro
                    </button>
                  </li>
                </ul>
              </div>

              {/* Sự kiện và Tin tức */}
              <div>
                <h4 className="text-[15px] font-bold text-white tracking-wide mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
                  Sự kiện và Tin tức
                </h4>
                <ul className="space-y-3 text-[13px] text-slate-300">
                  <li>
                    <button
                      onClick={() => onScrollToSection('news-section')}
                      className="hover:text-[#e5be5a] transition-colors text-left cursor-pointer font-normal"
                    >
                      Sự kiện
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onScrollToSection('news-section')}
                      className="hover:text-[#e5be5a] transition-colors text-left cursor-pointer font-normal"
                    >
                      Tin tức
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 2: Giới thiệu */}
            <div className="sm:col-span-3">
              <h4 className="text-[15px] font-bold text-white tracking-wide mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
                Giới thiệu
              </h4>
              <ul className="space-y-3 text-[13px] text-slate-300">
                <li>
                  <button
                    onClick={() => onScrollToSection('hero-section')}
                    className="hover:text-[#e5be5a] transition-colors text-left cursor-pointer font-normal"
                  >
                    Về chúng tôi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onScrollToSection('stats-footprint-section')}
                    className="hover:text-[#e5be5a] transition-colors text-left cursor-pointer font-normal"
                  >
                    Năng lực & Đối tác
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPolicyModal('terms')}
                    className="hover:text-[#e5be5a] transition-colors text-left cursor-pointer font-normal"
                  >
                    Điều khoản sử dụng
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPolicyModal('privacy')}
                    className="hover:text-[#e5be5a] transition-colors text-left cursor-pointer font-normal"
                  >
                    Chính sách bảo mật
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onScrollToSection('consultation-section')}
                    className="hover:text-[#e5be5a] transition-colors text-left cursor-pointer font-normal"
                  >
                    Liên hệ với chúng tôi
                  </button>
                </li>
                {onOpenRecruitment && (
                  <li>
                    <button
                      onClick={onOpenRecruitment}
                      className="hover:text-[#e5be5a] transition-colors text-left cursor-pointer font-normal text-amber-400"
                    >
                      Tuyển dụng nhân sự
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Column 3: Kết nối thêm với Lâm Sơn Động */}
            <div className="sm:col-span-5">
              <h4 className="text-[15px] font-bold text-white tracking-wide mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
                Kết nối thêm với Lâm Sơn Động
              </h4>
              
              {/* Social Media Icons (Square & Compact) */}
              <div className="flex items-center gap-2.5 mb-4">
                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/lamsondongbv/" 
                  target="_blank" 
                  rel="noreferrer"
                  title="Facebook: Công ty Cổ phần Dịch vụ Bảo vệ Lâm Sơn Động"
                  aria-label="Facebook Lâm Sơn Động"
                  className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg overflow-hidden flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 hover:shadow-sm active:scale-95 group border border-slate-700/60"
                >
                  <img 
                    src="/images/facebook.svg" 
                    alt="Facebook Lâm Sơn Động" 
                    width="32" 
                    height="32" 
                    className="w-full h-full object-contain" 
                  />
                </a>

                {/* Zalo */}
                <a 
                  href="https://zalo.me/0339269524" 
                  target="_blank" 
                  rel="noreferrer"
                  title="Zalo Trực ban: 0339.269.524"
                  aria-label="Zalo Lâm Sơn Động"
                  className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg overflow-hidden flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 hover:shadow-sm active:scale-95 group bg-white border border-slate-700/60 p-0.5"
                >
                  <img 
                    src="/images/zalo.svg" 
                    alt="Zalo Lâm Sơn Động" 
                    width="32" 
                    height="32" 
                    className="w-full h-full object-contain" 
                  />
                </a>
              </div>

              {/* Direct Contact Snippet with Full Email Display */}
              <div className="space-y-2.5 text-[12px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Hotline: <strong className="text-white font-mono">{FOOTER_DATA.companyInfo.hotline}</strong></span>
                </div>
                <div className="flex items-start gap-2 pt-0.5">
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <a 
                    href={`mailto:${FOOTER_DATA.companyInfo.email}`}
                    title={FOOTER_DATA.companyInfo.email}
                    className="break-all sm:break-normal text-[11.5px] text-slate-300 hover:text-[#e5be5a] transition-colors leading-snug"
                  >
                    {FOOTER_DATA.companyInfo.email}
                  </a>
                </div>
                <div className="flex items-start gap-2 pt-0.5 text-[11px] leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{FOOTER_DATA.companyInfo.headquarters}</span>
                </div>
              </div>
            </div>

          </div>

          {/* ================================================================= */}
          {/* RIGHT: INTEGRATED NEWSLETTER CARD (Matching Reference Image)      */}
          {/* ================================================================= */}
          <div className="lg:col-span-5">
            <div className="bg-[#21242c] border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              
              {/* Gold/Amber pin accent */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e5be5a] shadow-[0_0_10px_rgba(229,190,90,0.8)] inline-block" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#e5be5a] font-bold">
                  BẢN TIN BẢO MẬT & PCCC
                </span>
              </div>

              {/* Card Headline */}
              <h3 className="text-base sm:text-[17px] font-bold text-white leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
                Đăng ký nhận những tài liệu chuyên sâu và các sự kiện, hoạt động mới nhất từ Lâm Sơn Động
              </h3>

              {/* Form or Success State */}
              {subSuccess ? (
                <div className="mt-5 p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-emerald-200">Đăng ký thành công!</strong>
                    <span>Chúng tôi đã lưu email của bạn vào danh sách nhận tài liệu chuyên sâu định kỳ.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-5 space-y-3">
                  {/* Email Input */}
                  <div>
                    <input
                      id="footer-integrated-newsletter-input"
                      type="email"
                      required
                      placeholder="Email doanh nghiệp của bạn"
                      value={emailSub}
                      onChange={(e) => setEmailSub(e.target.value)}
                      className="w-full px-4 py-3 bg-[#16181e] border border-slate-700 text-sm text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all"
                    />
                  </div>

                  {/* Primary CTA Submit Button with Theme Colors */}
                  <button
                    id="footer-integrated-subscribe-btn"
                    type="submit"
                    disabled={subLoading}
                    className="w-full py-3 bg-gradient-to-r from-[#c5a059] to-[#b8860b] hover:from-[#d4af37] hover:to-[#c5a059] disabled:opacity-70 text-slate-950 font-bold text-sm tracking-wide rounded-lg transition-all shadow-md active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    {subLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang xử lý...</span>
                      </>
                    ) : (
                      <>
                        <span>Đăng ký</span>
                        <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Legal Consent Disclaimer */}
                  <p className="text-[11px] text-slate-400 font-normal leading-relaxed pt-1.5">
                    Bằng cách gửi biểu mẫu này, bạn đồng ý với{' '}
                    <button
                      type="button"
                      onClick={() => setPolicyModal('terms')}
                      className="text-[#e5be5a] hover:underline cursor-pointer font-medium"
                    >
                      Điều khoản sử dụng
                    </button>{' '}
                    của chúng tôi và đồng ý{' '}
                    <button
                      type="button"
                      onClick={() => setPolicyModal('privacy')}
                      className="text-[#e5be5a] hover:underline cursor-pointer font-medium"
                    >
                      Chính sách bảo vệ dữ liệu cá nhân
                    </button>{' '}
                    của chúng tôi.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* ================================================================= */}
      {/* BOTTOM COPYRIGHT BAR                                              */}
      {/* ================================================================= */}
      <div className="border-t border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8 bg-[#14161c]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p className="text-center sm:text-left">
            © 2026 Công ty Cổ phần Dịch vụ Bảo vệ Lâm Sơn Động. Đã đăng ký bản quyền.
          </p>

          <div className="flex items-center gap-6 text-[12px] font-sans">
            <button
              onClick={() => setPolicyModal('privacy')}
              className="text-slate-400 hover:text-[#e5be5a] transition-colors cursor-pointer"
            >
              Chính sách bảo mật
            </button>
            <button
              onClick={() => setPolicyModal('terms')}
              className="text-slate-400 hover:text-[#e5be5a] transition-colors cursor-pointer"
            >
              Điều khoản sử dụng
            </button>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer text-[11px]"
              >
                Quản trị
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* MODAL: CHÍNH SÁCH BẢO MẬT & ĐIỀU KHOẢN SỬ DỤNG                    */}
      {/* ================================================================= */}
      {policyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-white max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
                {policyModal === 'privacy' 
                  ? 'Chính Sách Bảo Mật' 
                  : 'Điều Khoản Sử Dụng'}
              </h3>
              <button
                onClick={() => setPolicyModal(null)}
                aria-label="Đóng cửa sổ"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {policyModal === 'privacy' ? (
                <>
                  <p>
                    Công ty Cổ phần Dịch vụ Bảo vệ Lâm Sơn Động cam kết bảo vệ thông tin cá nhân và dữ liệu doanh nghiệp của khách hàng theo đúng Nghị định 13/2023/NĐ-CP của Chính phủ về bảo vệ dữ liệu cá nhân.
                  </p>
                  <h4 className="font-bold text-white text-sm">1. Mục đích thu thập dữ liệu</h4>
                  <p>
                    Thông tin email, số điện thoại và tên doanh nghiệp chỉ được sử dụng để: gửi tài liệu an ninh chuyên sâu, gửi báo giá và thông báo các sự kiện nghiệp vụ quan trọng theo yêu cầu của quý khách.
                  </p>
                  <h4 className="font-bold text-white text-sm">2. Cam kết bảo mật tuyệt đối</h4>
                  <p>
                    Chúng tôi cam kết không chia sẻ, bán hoặc chuyển giao dữ liệu khách hàng cho bất kỳ bên thứ ba nào vì mục đích thương mại. Toàn bộ dữ liệu được lưu trữ mã hóa an toàn trên máy chủ.
                  </p>
                  <h4 className="font-bold text-white text-sm">3. Quyền của chủ thể dữ liệu</h4>
                  <p>
                    Quý khách có toàn quyền yêu cầu chỉnh sửa, cập nhật hoặc hủy bỏ việc nhận bản tin bất kỳ lúc nào thông qua đường link hủy đăng ký ở cuối mỗi email hoặc liên hệ hotline: 0339.269.524.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Chào mừng quý khách truy cập website của Công ty Cổ phần Dịch vụ Bảo vệ Lâm Sơn Động. Khi tiếp tục sử dụng website này, quý khách đồng ý tuân thủ các điều khoản sau:
                  </p>
                  <h4 className="font-bold text-white text-sm">1. Quyền sở hữu trí tuệ</h4>
                  <p>
                    Toàn bộ nội dung, tài liệu cẩm nang PCCC, quy trình an ninh và hình ảnh trên website đều thuộc quyền sở hữu của Công ty Lâm Sơn Động. Nghiêm cấm sao chép cho mục đích thương mại trái phép.
                  </p>
                  <h4 className="font-bold text-white text-sm">2. Khảo sát & Báo giá</h4>
                  <p>
                    Các thông tin báo giá trên website hoặc tính toán từ công cụ mang tính chất tham khảo. Chi phí thực tế sẽ được xác nhận sau khi cán bộ phòng nghiệp vụ hoàn thành khảo sát thực địa tại mục tiêu.
                  </p>
                  <h4 className="font-bold text-white text-sm">3. Trách nhiệm pháp lý</h4>
                  <p>
                    Lâm Sơn Động được cấp phép hoạt động đầy đủ theo quy định của Cục Cảnh sát Quản lý hành chính về trật tự xã hội (C06 - Bộ Công An) và có bảo hiểm trách nhiệm dân sự nghề nghiệp toàn diện.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setPolicyModal(null)}
                className="px-5 py-2 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Đã hiểu & Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
