import React, { useState } from 'react';
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Send, 
  ChevronRight, 
  ShieldCheck, 
  Lock,
  KeyRound
} from 'lucide-react';
import { FOOTER_DATA } from '../data/mockData';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenQuote: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onOpenQuote, onOpenAdmin }) => {
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub) {
      setSubSuccess(true);
      setEmailSub('');
      setTimeout(() => setSubSuccess(false), 4000);
    }
  };

  return (
    <footer id="main-footer" className="bg-white text-slate-900 border-t border-slate-200">
      {/* Top Newsletter & Emergency Strip */}
      <div className="border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans']">
              Đăng Ký Nhận Bản Tin Cảnh Báo Rủi Ro Doanh Nghiệp
            </h3>
            <p className="text-xs text-slate-600 font-normal mt-1">
              Nhận tài liệu phân tích rủi ro an ninh, quy định PCCC mới nhất và cẩm nang quản trị mục tiêu hàng tháng.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subSuccess ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 rounded">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cảm ơn bạn! Chúng tôi đã lưu email của bạn vào danh sách nhận bản tin bảo mật.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  placeholder="Nhập địa chỉ email của bạn..."
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-600 rounded"
                />
                <button
                  id="newsletter-subscribe-btn"
                  type="submit"
                  className="px-6 py-3 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs uppercase tracking-widest flex items-center gap-1.5 shrink-0 transition-all rounded shadow"
                >
                  <span>Đăng ký</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Locations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 text-amber-700">
                <img src="https://i.postimg.cc/4dWvw0PJ/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                  LÂM SƠN ĐỘNG
                </span>
                <p className="text-[9px] text-amber-800 uppercase tracking-[0.25em] font-mono font-bold">
                  DỊCH VỤ BẢO VỆ CHUYÊN NGHIỆP
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-normal leading-relaxed pr-4">
              Công ty Cổ phần Dịch vụ Bảo vệ Lâm Sơn Động là đơn vị tiên phong trong lĩnh vực bảo vệ chuyên nghiệp và giải pháp an ninh doanh nghiệp toàn diện tại Việt Nam. Chúng tôi cam kết mang lại sự an tâm tuyệt đối với tinh thần trách nhiệm, kỷ luật quân đội và công nghệ giám sát hiện đại.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span className="font-normal">{FOOTER_DATA.companyInfo.headquarters}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Hotline: <strong className="text-slate-900 font-mono">{FOOTER_DATA.companyInfo.hotline}</strong> (24/7/365)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-normal">Email: {FOOTER_DATA.companyInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2 font-mono">
              Dịch Vụ Bảo Vệ
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {FOOTER_DATA.services.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onScrollToSection('featured-services-section')}
                    className="hover:text-amber-800 transition-colors text-left flex items-center gap-2 font-normal"
                  >
                    <span className="text-amber-700 font-mono text-xs">—</span>
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2 font-mono">
              Giải Pháp Theo Ngành
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {FOOTER_DATA.solutions.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onScrollToSection('solutions-matrix-section')}
                    className="hover:text-amber-800 transition-colors text-left flex items-center gap-2 font-normal"
                  >
                    <span className="text-amber-700 font-mono text-xs">—</span>
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal & Standards */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2 font-mono">
              Pháp Lý & Tiêu Chuẩn
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <span className="text-[9px] text-amber-800 block uppercase font-mono font-bold">Giấy phép hoạt động:</span>
                <span className="text-slate-800 font-semibold">{FOOTER_DATA.companyInfo.license}</span>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <span className="text-[9px] text-amber-800 block uppercase font-mono font-bold">Đăng ký kinh doanh:</span>
                <span className="text-slate-800 font-semibold">{FOOTER_DATA.companyInfo.taxId}</span>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <span className="text-[9px] text-amber-800 block uppercase font-mono font-bold">Tiêu chuẩn nghiệp vụ:</span>
                <span className="text-emerald-700 font-mono font-bold">ISO 9001:2015 & C06 BCA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Security Certificate */}
      <div className="border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© 2026 Công Ty Cổ Phần Dịch Vụ Bảo Vệ Lâm Sơn Động. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4 text-slate-600">
            <span className="flex items-center gap-1 text-[11px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              ISO 9001:2015
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[11px] font-mono">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              C06 BỘ CÔNG AN
            </span>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  id="footer-admin-link"
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-600 hover:text-amber-800 transition-colors font-bold"
                  title="Cổng Quản trị viên Lâm Sơn Động"
                >
                  <KeyRound className="w-3 h-3 text-amber-700" />
                  <span>Admin</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
