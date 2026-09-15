import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Shield,
  ShieldAlert
} from 'lucide-react';
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
  onOpenQuote, 
  onSelectService,
  onScrollToRisk,
  onScrollToServices,
  slides
}) => {
  const activeSlides = slides && slides.length > 0 ? slides : HERO_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, activeSlides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

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

  // Helper to format headline gracefully with brand gold highlight
  const renderFormattedTitle = (rawTitle: string) => {
    // If title has a colon separator, highlight the second clause
    if (rawTitle.includes(':')) {
      const parts = rawTitle.split(':');
      return (
        <>
          <span>{parts[0].trim()}: </span>
          <span className="text-[#e5be5a] font-black">{parts.slice(1).join(':').trim()}</span>
        </>
      );
    }
    
    // Check for strategic keyword highlights
    const keywords = ['Lâm Sơn Động', 'Thành Phố Hà Nội', 'An Toàn', 'Kỉ Luật', 'Trách Nhiệm', 'Trí Tuệ Nhân Tạo'];
    for (const kw of keywords) {
      if (rawTitle.includes(kw)) {
        const parts = rawTitle.split(kw);
        return (
          <>
            {parts[0]}
            <span className="text-[#e5be5a] font-black">{kw}</span>
            {parts.slice(1).join(kw)}
          </>
        );
      }
    }

    return rawTitle;
  };

  return (
    <section 
      id="hero-section"
      className="relative bg-slate-950 text-white overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center border-b border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel Layer - Full immersion without opaque containers */}
      {activeSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          {/* Crisp, sharp photo: full background immersion across the canvas */}
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

          {/* Soft, subtle horizontal gradient mask: dark on left for text legibility, transparent on right to let imagery shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent pointer-events-none"></div>

          {/* Subtle bottom gradient transition */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none"></div>
        </div>
      ))}

      {/* Main Content Container - Background-First Layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full flex flex-col justify-between min-h-[540px] sm:min-h-[600px] lg:min-h-[640px]">
        
        {/* Top & Middle: Typography & CTA Buttons */}
        <div className="max-w-3xl my-auto">
          {/* Primary Headline with Refined Typography and Gold Accents */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-extrabold text-white leading-[1.22] sm:leading-[1.16] tracking-tight font-['Plus_Jakarta_Sans',sans-serif] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] mb-5">
            {renderFormattedTitle(currentSlide.title)}
          </h1>

          {/* Subtext: High Contrast & Legibility */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] mb-8">
            {currentSlide.description}
          </p>

          {/* Dual Action Buttons Group Aligned with Header Navigation */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            {/* Primary Action Button: Dịch Vụ Bảo Vệ */}
            <button
              id="hero-services-cta-btn"
              onClick={handleGoToServices}
              className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#c5a059] to-[#b8860b] hover:from-[#d4af37] hover:to-[#c5a059] text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif] px-7 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-black/40 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group"
            >
              <Shield className="w-4 h-4 text-slate-950" />
              <span>Dịch Vụ Bảo Vệ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Action Button: Đánh Giá Rủi Ro */}
            <button
              id="hero-risk-cta-btn"
              onClick={handleGoToRisk}
              className="flex items-center justify-center gap-2.5 backdrop-blur-md bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/40 text-xs sm:text-sm font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif] px-7 py-3.5 sm:py-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShieldAlert className="w-4 h-4 text-[#e5be5a]" />
              <span>Đánh Giá Rủi Ro</span>
            </button>
          </div>
        </div>

        {/* Bottom Corner: Minimalist Unified Slide Navigation Controls */}
        <div className="pt-8 sm:pt-10 flex items-center justify-start">
          <div className="inline-flex items-center gap-1.5 backdrop-blur-md bg-black/40 border border-white/15 rounded-full px-2 py-1.5 shadow-xl ring-1 ring-white/10">
            {/* Prev Button */}
            <button
              id="hero-prev-slide-btn"
              onClick={handlePrev}
              aria-label="Slide trước"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Slide Number Indicators */}
            <div className="flex items-center gap-1 px-1">
              {activeSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  id={`hero-dot-${idx}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Đi tới slide ${idx + 1}`}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'bg-[#c5a059] text-slate-950 shadow-md ring-1 ring-amber-300'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              id="hero-next-slide-btn"
              onClick={handleNext}
              aria-label="Slide tiếp theo"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};


