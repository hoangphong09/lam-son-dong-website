import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck,
  Award,
  Radio,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles
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
      className="relative bg-slate-900 text-slate-900 overflow-hidden min-h-[600px] sm:min-h-[680px] lg:min-h-[720px] flex items-center border-b border-slate-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with transition */}
      {activeSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          {/* Enhanced Vibrant Background Image: Prominent, sharp & authentic */}
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className={`w-full h-full object-cover object-center lg:object-right filter contrast-[1.06] saturate-[1.12] brightness-[1.0] transition-transform duration-7000 ease-out ${
              index === currentIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            }`}
          />

          {/* 
            FOCUSED DIRECTIONAL GRADIENT MASK (Left-to-Right only)
            Covers only the left typography column (~58% width on desktop) to ensure 
            superior contrast and legibility, leaving the center & right completely clear,
            vibrant and sharp without milky fog.
          */}
          <div className="absolute inset-y-0 left-0 w-full md:w-4/5 lg:w-7/12 bg-gradient-to-r from-slate-50/95 via-slate-50/80 sm:via-slate-50/65 to-transparent pointer-events-none"></div>

          {/* Subtle bottom grounding to connect to next section */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-100/70 to-transparent pointer-events-none"></div>
        </div>
      ))}

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column Content (with uncrowded typography & clean vertical rhythm) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
            
            {/* Tag Pill with Badge depth and breathing room */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-amber-400/90 text-amber-950 text-[11px] sm:text-xs font-mono font-black uppercase tracking-[0.25em] px-4 py-2 rounded shadow-sm ring-1 ring-amber-400/30">
                <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse"></span>
                {currentSlide.tag}
              </span>

              {currentSlide.category && (
                <span className="hidden sm:inline-flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md border border-slate-700 text-white text-[11px] font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  {currentSlide.category}
                </span>
              )}
            </div>

            {/* Slide Title: Bold, crisp, relaxed line-height without collision */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black text-slate-950 leading-[1.25] tracking-tight uppercase font-['Plus_Jakarta_Sans'] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] mb-6">
              {currentSlide.title}
            </h1>

            {/* Slide Description: High legibility & generous spacing */}
            <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed max-w-2xl drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] mb-8">
              {currentSlide.description}
            </p>

            {/* Action CTAs with elevated depth & contrast */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <button
                id="hero-primary-cta-btn"
                onClick={onOpenQuote}
                className="flex items-center justify-center gap-2.5 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 text-xs sm:text-sm font-black uppercase font-mono tracking-wider px-8 py-4 shadow-lg shadow-amber-900/20 hover:shadow-xl hover:shadow-amber-900/30 hover:-translate-y-0.5 active:translate-y-0 transition-all rounded-md ring-1 ring-amber-500/40"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column Spacer / Future Floating Console Card */}
          
        </div>

        {/* Slide Controls & Numbers Bar with generous vertical rhythm */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-16 sm:mt-20 pt-6 border-t border-slate-300/60">
          
          {/* Number & Topic Indicators with Enhanced Contrast */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {activeSlides.map((slide, idx) => (
              <button
                key={slide.id}
                id={`hero-dot-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Đi tới slide ${idx + 1}`}
                className={`text-xs font-mono tracking-wider transition-all px-3.5 py-1.5 rounded-md flex items-center gap-2 ${
                  idx === currentIndex
                    ? 'bg-[#c5a059] text-slate-950 font-black shadow-md ring-1 ring-amber-400/50'
                    : 'bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-300 shadow-xs font-bold'
                }`}
              >
                <span>0{idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Navigation Control Arrows */}
          <div className="flex items-center justify-end gap-2">
            <button
              id="hero-prev-slide-btn"
              onClick={handlePrev}
              aria-label="Slide trước"
              className="w-11 h-11 border border-slate-300/90 bg-white/95 hover:bg-white hover:border-[#c5a059] text-slate-800 hover:text-slate-950 flex items-center justify-center transition-all rounded-md shadow-md hover:shadow-lg hover:scale-105 active:scale-95 backdrop-blur-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              id="hero-next-slide-btn"
              onClick={handleNext}
              aria-label="Slide tiếp theo"
              className="w-11 h-11 border border-slate-300/90 bg-white/95 hover:bg-white hover:border-[#c5a059] text-slate-800 hover:text-slate-950 flex items-center justify-center transition-all rounded-md shadow-md hover:shadow-lg hover:scale-105 active:scale-95 backdrop-blur-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
