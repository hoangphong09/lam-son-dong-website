import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  ArrowRight, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { HERO_SLIDES } from '../data/mockData';

interface HeroCarouselProps {
  onOpenQuote: () => void;
  onSelectService: (serviceId: string) => void;
  onScrollToRisk: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onOpenQuote,
  onSelectService,
  onScrollToRisk
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = HERO_SLIDES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section 
      id="hero-section"
      className="relative bg-[#0d0d0f] text-white overflow-hidden min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex items-center border-b border-white/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with transition */}
      {HERO_SLIDES.map((slide, index) => (
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
            className="w-full h-full object-cover object-center brightness-[0.32] filter contrast-125"
          />
          {/* Editorial vignette overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0f] via-[#0d0d0f]/85 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-transparent to-black/50"></div>
        </div>
      ))}

      {/* Ambient gold glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#c5a059]/5 blur-[130px] rounded-full pointer-events-none z-10"></div>

      {/* Editorial Vertical Label (Desktop) */}
      <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 items-center gap-3 select-none pointer-events-none z-20">
        <span className="line-vertical text-[9px] uppercase tracking-[0.35em] text-[#c5a059]/70 font-semibold">
          SECURITY INTELLIGENCE • MMVIII
        </span>
        <div className="w-px h-16 bg-white/10"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tag Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.3em] px-3.5 py-1">
                {currentSlide.tag}
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono hidden sm:inline">
                [ GIAO THỨC: SEC-0{currentIndex + 1} ]
              </span>
            </div>

            {/* Slide Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight uppercase font-['Plus_Jakarta_Sans']">
              {currentSlide.title}
            </h1>

            {/* Slide Description */}
            <p className="text-sm sm:text-lg text-gray-300 font-light leading-relaxed max-w-2xl">
              {currentSlide.description}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-primary-cta-btn"
                onClick={onOpenQuote}
                className="flex items-center justify-center gap-2.5 bg-[#c5a059] text-black text-xs font-bold uppercase font-mono tracking-widest px-8 py-3.5 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-secondary-cta-btn"
                onClick={onScrollToRisk}
                className="flex items-center justify-center bg-transparent hover:bg-white/5 text-white font-bold text-xs uppercase font-mono tracking-widest border border-white/20 hover:border-[#c5a059] hover:text-[#c5a059] px-6 py-3.5 transition-all"
              >
                <span>Đánh giá rủi ro an ninh</span>
              </button>
            </div>

            {/* Key Highlights */}
            <div className="pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-300 font-mono">
              <div className="flex items-center gap-2 bg-[#111114]/80 border border-white/5 p-2.5">
                <span className="w-1.5 h-1.5 bg-[#c5a059]"></span>
                <span className="text-[11px] uppercase tracking-wider">100% Chuẩn C06 Công An</span>
              </div>
              <div className="flex items-center gap-2 bg-[#111114]/80 border border-white/5 p-2.5">
                <span className="w-1.5 h-1.5 bg-[#c5a059]"></span>
                <span className="text-[11px] uppercase tracking-wider">Bảo hiểm 20 Tỷ VNĐ</span>
              </div>
              <div className="flex items-center gap-2 bg-[#111114]/80 border border-white/5 p-2.5">
                <span className="w-1.5 h-1.5 bg-[#c5a059]"></span>
                <span className="text-[11px] uppercase tracking-wider">Cơ động ≤ 15 Phút</span>
              </div>
            </div>
          </div>

          {/* Right Floating Console Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-[#111114]/95 border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55e]"></span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">
                    STATUS: ACTIVE 24/7
                  </span>
                </div>
                <span className="text-[9px] text-[#c5a059] font-mono font-bold uppercase tracking-wider">
                  C06 COMPLIANT
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-light">Lực lượng thường trực:</span>
                  <strong className="text-white font-mono text-sm">3.500+ Quân số</strong>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-light">Bảo hiểm rủi ro:</span>
                  <strong className="text-[#c5a059] font-mono text-sm">20 Tỷ VNĐ</strong>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-light">Tỷ lệ an toàn mục tiêu:</span>
                  <strong className="text-emerald-400 font-mono text-sm">99.98%</strong>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-light">Địa bàn phủ sóng:</span>
                  <strong className="text-white font-mono text-sm">32 Tỉnh thành</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5">
                <button
                  onClick={() => onSelectService('srv-factory')}
                  className="w-full py-2 bg-black border border-[#c5a059]/40 text-[#c5a059] hover:bg-[#c5a059] hover:text-black text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  Khám phá quy chuẩn tác chiến →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Controls & Numbers */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/5">
          {/* Number Indicators */}
          <div className="flex items-center gap-4">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                id={`hero-dot-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Đi tới slide ${idx + 1}`}
                className={`text-xs font-mono font-bold tracking-widest transition-all pb-1 ${
                  idx === currentIndex
                    ? 'text-[#c5a059] border-b-2 border-[#c5a059]'
                    : 'text-white/30 hover:text-white border-b-2 border-transparent'
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
              className="w-10 h-10 border border-white/10 bg-[#111114] hover:border-[#c5a059] text-white flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              id="hero-next-slide-btn"
              onClick={handleNext}
              aria-label="Slide tiếp theo"
              className="w-10 h-10 border border-white/10 bg-[#111114] hover:border-[#c5a059] text-white flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

