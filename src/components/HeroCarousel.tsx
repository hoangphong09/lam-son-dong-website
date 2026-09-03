import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { HERO_SLIDES } from '../data/mockData';
import { HeroSlide } from '../types';

interface HeroCarouselProps {
  onOpenQuote: () => void;
  onSelectService: (serviceId: string) => void;
  onScrollToRisk: () => void;
  slides?: HeroSlide[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onOpenQuote,
  onSelectService,
  onScrollToRisk,
  slides,
}) => {
  const activeSlides = slides && slides.length > 0 ? slides : HERO_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, activeSlides.length]);

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  return (
    <section 
      id="hero-section"
      className="relative bg-slate-50 text-slate-900 overflow-hidden min-h-[580px] sm:min-h-[660px] lg:min-h-[700px] flex items-center border-b border-slate-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with transition */}
      {activeSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          {/* Background Image */}
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-right opacity-30 filter saturate-125"
          />
          {/* Editorial Light Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/95 to-slate-50/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-white/40"></div>
        </div>
      ))}

      {/* Subtle gold decorative glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-amber-200/30 blur-[130px] rounded-full pointer-events-none z-10"></div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tag Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block bg-amber-50 border border-amber-300 text-amber-900 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.3em] px-3.5 py-1 rounded">
                {currentSlide.tag}
              </span>
            </div>

            {/* Slide Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight uppercase font-['Plus_Jakarta_Sans']">
              {currentSlide.title}
            </h1>

            {/* Slide Description */}
            <p className="text-sm sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
              {currentSlide.description}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-primary-cta-btn"
                onClick={onOpenQuote}
                className="flex items-center justify-center gap-2.5 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 text-xs font-black uppercase font-mono tracking-widest px-8 py-3.5 shadow-md active:scale-[0.98] transition-all rounded"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-secondary-cta-btn"
                onClick={onScrollToRisk}
                className="flex items-center justify-center bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase font-mono tracking-widest border border-slate-300 hover:border-amber-600 hover:text-amber-800 px-6 py-3.5 shadow-sm transition-all rounded"
              >
                <span>Đánh giá rủi ro an ninh</span>
              </button>
            </div>
          </div>

          {/* Right Floating Console Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-white/95 border border-slate-200 p-6 space-y-4 shadow-xl rounded-sm backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55e]"></span>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-slate-800 font-mono">
                    Trực ban tác chiến 24/7
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Lực lượng thường trực:</span>
                  <strong className="text-slate-900 font-mono text-sm font-bold">250+ Quân số</strong>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Tỷ lệ an toàn mục tiêu:</span>
                  <strong className="text-emerald-700 font-mono text-sm font-bold">99.98%</strong>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Địa bàn phủ sóng:</span>
                  <strong className="text-slate-900 font-mono text-sm font-bold">07 tỉnh thành</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => onSelectService('srv-factory')}
                  className="w-full py-2.5 bg-amber-50 border border-amber-300 text-amber-900 hover:bg-[#c5a059] hover:text-black text-xs font-bold font-mono uppercase tracking-wider transition-all rounded"
                >
                  Khám phá quy chuẩn tác chiến →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Controls & Numbers */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-slate-200">
          {/* Number Indicators */}
          <div className="flex items-center gap-4">
            {activeSlides.map((slide, idx) => (
              <button
                key={slide.id}
                id={`hero-dot-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Đi tới slide ${idx + 1}`}
                className={`text-xs font-mono font-bold tracking-widest transition-all pb-1 ${
                  idx === currentIndex
                    ? 'text-amber-800 border-b-2 border-amber-600'
                    : 'text-slate-400 hover:text-slate-700 border-b-2 border-transparent'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          {/* Nav Arrows */}
          <div className="flex items-center gap-2">
            <button
              id="hero-prev-slide-btn"
              onClick={handlePrev}
              aria-label="Slide trước"
              className="w-10 h-10 border border-slate-300 bg-white hover:border-amber-600 hover:bg-slate-50 text-slate-700 hover:text-black flex items-center justify-center transition-all rounded shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              id="hero-next-slide-btn"
              onClick={handleNext}
              aria-label="Slide tiếp theo"
              className="w-10 h-10 border border-slate-300 bg-white hover:border-amber-600 hover:bg-slate-50 text-slate-700 hover:text-black flex items-center justify-center transition-all rounded shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
