import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [isPaused, setIsPaused] = useState(false);

  // Helper to optimize external hero image URLs for crisp retina display without excessive file size
  const getOptimizedHeroImageUrl = (url: string) => {
    if (!url) return '/images/hero-1.jpg';
    if (url.includes('images.unsplash.com')) {
      const cleanUrl = url.split('?')[0];
      return `${cleanUrl}?auto=format&fit=crop&w=1920&q=85`;
    }
    return url;
  };

  // Progressive next-slide preloader: Only preloads the upcoming slide during browser idle time
  // This avoids blocking LCP (Largest Contentful Paint) and saving bandwidth on initial page load
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const nextIdx = (currentIndex + 1) % activeSlides.length;
    const nextSlide = activeSlides[nextIdx];
    if (nextSlide?.imageUrl) {
      const timer = setTimeout(() => {
        const img = new Image();
        img.src = getOptimizedHeroImageUrl(nextSlide.imageUrl);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, activeSlides]);

  // Next / Previous slide handlers
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  }, [activeSlides.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  // Auto-advance interval (5 seconds) with pause-on-hover behavior
  useEffect(() => {
    if (activeSlides.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeSlides.length, isPaused, handleNext]);

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
      aria-label="Banner Giới Thiệu Lâm Sơn Động Security"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative bg-slate-950 text-white overflow-hidden min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] flex items-center border-b border-slate-800 select-none"
    >
      {/* ========================================================================= */}
      {/* CONTINUOUS HORIZONTAL SLIDER TRACK: Hardware-accelerated flex row         */}
      {/* Uses translate3d with cubic-bezier easing to completely eliminate flicker */}
      {/* ========================================================================= */}
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
        style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
      >
        {activeSlides.map((slide, index) => (
          <div
            key={slide.id || index}
            className="w-full min-w-full shrink-0 relative flex items-center min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] overflow-hidden"
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={getOptimizedHeroImageUrl(slide.imageUrl)}
                alt={`Lâm Sơn Động Security - ${slide.title}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'low'}
                width={1920}
                height={1080}
                sizes="100vw"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/hero-1.jpg';
                }}
                className="w-full h-full object-cover object-[70%_center] sm:object-center lg:object-[78%_center] filter contrast-[1.08] saturate-[1.12] brightness-[0.96]"
              />

              {/* Left-to-right subtle dark gradient overlay for optimal text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/20 sm:to-transparent pointer-events-none" />

              {/* Bottom gradient transition */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent pointer-events-none" />
            </div>

            {/* Slide Content Box: Stays perfectly in sync with the slide background */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full flex flex-col justify-center">
              <div className="max-w-2xl lg:max-w-3xl">
                {/* Primary Headline */}
                <h1 className="font-['Plus_Jakarta_Sans',sans-serif] mb-5">
                  {renderFormattedTitle(slide.title)}
                </h1>

                {/* Subtitle Description */}
                <p className="text-base sm:text-lg md:text-xl text-slate-100 font-normal leading-relaxed max-w-xl lg:max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-8">
                  {slide.description}
                </p>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                  {/* Primary Action Button: Dịch Vụ Bảo Vệ */}
                  <button
                    id={`hero-services-cta-btn-${index}`}
                    onClick={handleGoToServices}
                    className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#c5a059] to-[#b8860b] hover:from-[#d4af37] hover:to-[#c5a059] text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif] px-7 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-black/40 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group"
                  >
                    <span>Dịch Vụ Bảo Vệ</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Secondary Action Button: Đánh Giá Rủi Ro */}
                  <button
                    id={`hero-risk-cta-btn-${index}`}
                    onClick={handleGoToRisk}
                    className="flex items-center justify-center backdrop-blur-md bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/40 text-xs sm:text-sm font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif] px-7 py-3.5 sm:py-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Đánh Giá Rủi Ro</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* NAVIGATION CONTROLS: Next/Prev Arrows & Active Pagination Dots            */}
      {/* ========================================================================= */}
      {activeSlides.length > 1 && (
        <>
          {/* Previous Arrow Button: Instant color change on hover, no transitions or transforms */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Slide trước"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-white/20 hover:border-amber-400 text-white/80 hover:text-amber-400 flex items-center justify-center cursor-pointer shadow-xl"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Arrow Button: Instant color change on hover, no transitions or transforms */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Slide tiếp theo"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-white/20 hover:border-amber-400 text-white/80 hover:text-amber-400 flex items-center justify-center cursor-pointer shadow-xl"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Pagination Indicators (Simple Circular Dots) */}
          <div className="absolute bottom-11 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 shadow-lg">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Chuyển tới slide ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                  idx === currentIndex 
                    ? 'bg-white' 
                    : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
