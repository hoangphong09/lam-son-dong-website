import React, { useState } from 'react';
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
        return <ShieldCheck className="w-6 h-6 text-[#c5a059]" />;
      case 'badge-check':
        return <CheckCircle2 className="w-6 h-6 text-emerald-400" />;
      case 'flame':
        return <Flame className="w-6 h-6 text-[#c5a059]" />;
      case 'award':
        return <Award className="w-6 h-6 text-[#c5a059]" />;
      default:
        return <Lock className="w-6 h-6 text-[#c5a059]" />;
    }
  };

  return (
    <section id="certifications-section" className="bg-[#0d0d0f] text-white py-16 sm:py-20 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-mono font-bold text-[#c5a059] uppercase tracking-[0.3em] bg-[#c5a059]/10 border border-[#c5a059]/30 px-3 py-1">
            NĂNG LỰC & PHÁP LÝ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mt-4 font-['Plus_Jakarta_Sans']">
            Thành Tựu Nổi Bật & Chứng Nhận Tiêu Chuẩn
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
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
                className="bg-[#111114] border border-white/5 hover:border-[#c5a059]/50 p-6 flex flex-col justify-between transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                {/* Subtle top indicator */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#c5a059] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                <div>
                  {/* Badge & Icon Area */}
                  <div className="w-12 h-12 border border-[#c5a059]/30 bg-[#c5a059]/10 flex items-center justify-center mb-5 group-hover:bg-[#c5a059] group-hover:text-black transition-all">
                    {getIcon(cert.iconType)}
                  </div>

                  {/* Code Tag */}
                  <span className="inline-block text-[10px] font-mono font-bold tracking-wider text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 px-2 py-0.5 uppercase mb-2">
                    {cert.code}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-white group-hover:text-[#c5a059] transition-colors uppercase tracking-wide leading-snug">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-400 font-light mt-2.5 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Footer Organization */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                  <span className="font-light text-[10px] truncate">
                    {cert.organization}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#c5a059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-10 bg-[#111114] border border-white/5 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 border border-[#c5a059]/30 bg-[#c5a059]/10 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5 text-[#c5a059]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">Giấy Phép Hoạt Động Kinh Doanh Dịch Vụ Bảo Vệ Hợp Pháp</h4>
              <p className="text-xs text-gray-400 font-light">Được Bộ Công An cấp phép hoạt động trên toàn lãnh thổ 63 tỉnh thành Việt Nam</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 px-3 py-1 uppercase tracking-wider">
              Kiểm toán định kỳ 6 tháng/lần
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

