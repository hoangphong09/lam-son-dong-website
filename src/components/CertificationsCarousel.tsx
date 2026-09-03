import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Flame, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  Building
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/mockData';
import { Certification } from '../types';

interface CertificationsCarouselProps {
  onSelectCert: (cert: Certification) => void;
}

export const CertificationsCarousel: React.FC<CertificationsCarouselProps> = ({ onSelectCert }) => {
  const getIcon = (type: Certification['iconType']) => {
    switch (type) {
      case 'shield-check':
        return <ShieldCheck className="w-6 h-6 text-amber-700" />;
      case 'badge-check':
        return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
      case 'flame':
        return <Flame className="w-6 h-6 text-amber-700" />;
      case 'award':
        return <Award className="w-6 h-6 text-amber-700" />;
      default:
        return <Lock className="w-6 h-6 text-amber-700" />;
    }
  };

  return (
    <section id="certifications-section" className="bg-white text-slate-900 py-16 sm:py-20 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-mono font-bold text-amber-900 uppercase tracking-[0.3em] bg-amber-100 border border-amber-300 px-3 py-1 rounded">
            NĂNG LỰC & PHÁP LÝ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight mt-4 font-['Plus_Jakarta_Sans']">
            Thành Tựu Nổi Bật & Chứng Nhận Tiêu Chuẩn
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Những giấy phép, chứng nhận danh giá trong nước và quốc tế là minh chứng cho năng lực vững vàng của Lâm Sơn Động. Chúng tôi cam kết mang đến các giải pháp an ninh với tiêu chuẩn chất lượng cao nhất.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                id={`cert-card-${cert.id}`}
                onClick={() => onSelectCert(cert)}
                className="bg-white border border-slate-200 hover:border-amber-500 rounded p-6 flex flex-col justify-between transition-all duration-300 group cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md"
              >
                {/* Subtle top indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#c5a059] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                <div>
                  {/* Badge & Icon Area */}
                  <div className="w-12 h-12 border border-amber-300 bg-amber-50 rounded flex items-center justify-center mb-5 group-hover:bg-[#c5a059] group-hover:text-black transition-all">
                    {getIcon(cert.iconType)}
                  </div>

                  {/* Code Tag */}
                  <span className="inline-block text-[10px] font-mono font-bold tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 uppercase mb-2 rounded">
                    {cert.code}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors uppercase tracking-wide leading-snug">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 font-normal mt-2.5 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Footer Organization */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-normal text-[10px] truncate">
                    {cert.organization}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-10 bg-slate-50 border border-slate-200 rounded p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 border border-amber-300 bg-amber-50 rounded flex items-center justify-center shrink-0">
              <Building className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">Giấy Phép Hoạt Động Kinh Doanh Dịch Vụ Bảo Vệ Hợp Pháp</h4>
              <p className="text-xs text-slate-600 font-normal">Được Bộ Công An cấp phép hoạt động trên toàn lãnh thổ 63 tỉnh thành Việt Nam</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 uppercase tracking-wider rounded font-bold">
              Kiểm toán định kỳ 6 tháng/lần
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
