import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';
import { FEATURED_SERVICES } from '../data/mockData';

interface FeaturedServicesProps {
  onSelectService: (serviceId: string) => void;
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({ onSelectService }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(FEATURED_SERVICES.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const currentServices = FEATURED_SERVICES.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <section id="featured-services-section" className="bg-[#0d0d0f] text-white py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.25em] font-mono">
              GIẢI PHÁP AN NINH TOÀN DIỆN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mt-2 font-['Plus_Jakarta_Sans']">
              Dịch Vụ Tiêu Biểu
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
              Những dịch vụ an ninh tiêu biểu được triển khai bởi đội ngũ chuyên gia và vệ sĩ tinh nhuệ Lâm Sơn Động, giúp khách hàng không chỉ được bảo vệ tối đa mà còn chủ động ứng phó trước mọi nguy cơ rủi ro.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              id="services-prev-btn"
              onClick={handlePrev}
              aria-label="Dịch vụ trước"
              className="w-10 h-10 bg-[#111114] border border-white/10 hover:border-[#c5a059] text-gray-400 hover:text-[#c5a059] flex items-center justify-center transition-all group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              id="services-next-btn"
              onClick={handleNext}
              aria-label="Dịch vụ tiếp theo"
              className="w-10 h-10 bg-[#111114] border border-white/10 hover:border-[#c5a059] text-gray-400 hover:text-[#c5a059] flex items-center justify-center transition-all group"
            >
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-[#111114] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image header with hover zoom */}
                <div className="relative h-56 overflow-hidden bg-[#0d0d0f]">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent"></div>
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-black bg-[#c5a059] px-2.5 py-0.5">
                    {service.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-base font-bold text-white group-hover:text-[#c5a059] transition-colors leading-snug uppercase tracking-tight font-['Plus_Jakarta_Sans']">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#c5a059] font-light mt-1 line-clamp-1">
                    {service.subtitle}
                  </p>

                  <p className="text-xs text-gray-400 font-light mt-3 line-clamp-3 leading-relaxed">
                    {service.summary}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs text-gray-300 font-light">
                    {service.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 truncate">
                        <span className="text-[#c5a059] font-mono font-bold text-xs shrink-0">—</span>
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  id={`service-detail-btn-${service.id}`}
                  onClick={() => onSelectService(service.id)}
                  className="w-full py-3 bg-[#0d0d0f] hover:bg-[#c5a059] text-gray-300 hover:text-black border border-white/10 hover:border-[#c5a059] font-bold text-xs uppercase font-mono tracking-widest transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Chi tiết phương án</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-10">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`h-1.5 transition-all ${
                idx === currentPage ? 'w-8 bg-[#c5a059]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Trang ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

