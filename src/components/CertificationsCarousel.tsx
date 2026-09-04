import React from 'react';
import { ExternalLink } from 'lucide-react';
import { CERTIFICATIONS } from '../data/mockData';
import { Certification } from '../types';

interface CertificationsCarouselProps {
  onSelectCert: (cert: Certification) => void;
}

export const CertificationsCarousel: React.FC<CertificationsCarouselProps> = ({ onSelectCert }) => {
  return (
    <section id="certifications-section" className="bg-white text-slate-900 py-16 sm:py-20 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans']">
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

                <div className="text-center flex flex-col items-center">
                  {/* Code Tag */}
                  <span className="inline-block text-[10px] font-mono font-bold tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 uppercase mb-3 rounded">
                    {cert.code}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors uppercase tracking-wide leading-snug text-center">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 font-normal mt-2.5 leading-relaxed text-center">
                    {cert.description}
                  </p>
                </div>

                {/* Footer Organization */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 w-full">
                  <span className="font-normal text-[10px] truncate">
                    {cert.organization}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
