import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/mockData';
import { HeroSlide } from '../types';

interface HeroCarouselProps {
  onOpenQuote?: () => void;
  onSelectService?: (serviceId: string) => void;
  onScrollToRisk: () => void;
  onScrollToServices?: () => void;
  slides?: HeroSlide[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  onScrollToRisk,
  onScrollToServices,
  slides
}) => {
  const activeSlides = slides && slides.length > 0 ? slides : HERO_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto transition slide every 6 seconds (6000ms)
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeSlides.length]);

  const handleGoToServices = () => {
    if (onScrollToServices) {
      onScrollToServices();
    } else {
      const el = document.getElementById('featured-services-section') || document.getElementById('solutions-matrix-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleGoToRisk = () => {
    if (onScrollToRisk) {
      onScrollToRisk();
    } else {
      const el = document.getElementById('risk-assessment-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (activeSlides.length === 0) return null;
  const currentSlide = activeSlides[currentIndex];

  // Helper to format headline gracefully with balanced hierarchy and gold accent
  const renderFormattedTitle = (rawTitle: string) => {
    if (rawTitle.includes(':')) {
      const parts = rawTitle.split(':');
      return (
        <span className="flex flex-col gap-2 sm:gap-2.5">
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-white tracking-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {parts[0].trim()}
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-black text-[#e5be5a] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {parts.slice(1).join(':').trim()}
          </span>
        </span>
      );
    }
    
    // Check for strategic keyword highlights
    const keywords = ['An Ninh 4.0', 'Nhân viên Bảo vệ', 'Lâm Sơn Động', 'Thành Phố Hà Nội'];
    for (const kw of keywords) {
      if (rawTitle.includes(kw)) {
        const parts = rawTitle.split(kw);
        return (
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-white leading-[1.2] tracking-tight">
            <span>{parts[0]}</span>
            <span className="text-[#e5be5a] font-black">{kw}</span>
            <span>{parts.slice(1).join(kw)}</span>
          </span>
        );
      }
    }

    return (
      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-white leading-[1.2] tracking-tight">
        {rawTitle}
      </span>
    );
  };

  return (
    <section 
      id="hero-section"
      className="relative bg-slate-950 text-white overflow-hidden min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] flex items-center border-b border-slate-800"
    >
      {/* Background Image Carousel Layer */}
      {activeSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          {/* Crisp photo: full background immersion across the canvas */}
          <img
            src={slide.imageUrl}
            alt={`Lâm Sơn Động Security - ${slide.title}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'auto'}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/hero-1.jpg';
            }}
            className={`w-full h-full object-cover object-[70%_center] sm:object-center lg:object-[78%_center] filter contrast-[1.08] saturate-[1.12] brightness-[0.96] transition-transform duration-7000 ease-out ${
              index === currentIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            }`}
          />

          {/* Left-to-right subtle dark gradient overlay for optimal text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent pointer-events-none"></div>

          {/* Subtle bottom gradient transition */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/75 to-transparent pointer-events-none"></div>
        </div>
      ))}

      {/* Main Content Container - Vertically Centered */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full flex flex-col justify-center min-h-[520px] sm:min-h-[580px] lg:min-h-[620px]">
        
        {/* Content Box with Refined Typography & Alignment */}
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Primary Headline */}
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] mb-5">
            {renderFormattedTitle(currentSlide.title)}
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-100 font-normal leading-relaxed max-w-xl lg:max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-8">
            {currentSlide.description}
          </p>

          {/* Action Buttons: Clean text without leading icons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            {/* Primary Action Button: Dịch Vụ Bảo Vệ */}
            <button
              id="hero-services-cta-btn"
              onClick={handleGoToServices}
              className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#c5a059] to-[#b8860b] hover:from-[#d4af37] hover:to-[#c5a059] text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif] px-7 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-black/40 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group"
            >
              <span>Dịch Vụ Bảo Vệ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Action Button: Đánh Giá Rủi Ro */}
            <button
              id="hero-risk-cta-btn"
              onClick={handleGoToRisk}
              className="flex items-center justify-center backdrop-blur-md bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/40 text-xs sm:text-sm font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif] px-7 py-3.5 sm:py-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Đánh Giá Rủi Ro</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
