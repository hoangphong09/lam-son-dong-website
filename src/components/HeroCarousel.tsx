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
          {/* Enhanced Background Image: High opacity, prominent security details */}
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className={`w-full h-full object-cover object-center lg:object-right filter contrast-[1.08] saturate-[1.15] brightness-[1.0] transition-transform duration-7000 ease-out ${
              index === currentIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            }`}
          />

          {/* 
            DIRECTIONAL SOFT GRADIENT OVERLAY (Left-to-Right)
            Covers only the typography area on the left to ensure strict WCAG contrast for dark text,
            leaving the center and right operations details clear and vibrant.
          */}
          <div className="absolute inset-y-0 left-0 w-full md:w-4/5 lg:w-7/12 bg-gradient-to-r from-white/95 via-white/80 to-transparent pointer-events-none"></div>

          {/* Bottom subtle anchoring gradient */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none"></div>
        </div>
      ))}

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column Content (with uncrowded typography & clean vertical rhythm) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
            
            {/* Tag Pill with Badge depth and breathing room */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-amber-500/80 text-amber-950 text-xs font-mono font-black uppercase tracking-[0.2em] px-4 py-2 rounded-lg shadow-sm ring-1 ring-amber-400/40">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059] animate-pulse"></span>
                {currentSlide.tag}
              </span>

              {currentSlide.category && (
                <span className="hidden sm:inline-flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  {currentSlide.category}
                </span>
              )}
            </div>

            {/* Slide Title: Bold, crisp, relaxed line-height without collision */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-black text-slate-950 leading-[1.22] tracking-tight uppercase font-['Plus_Jakarta_Sans'] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] mb-6">
              {currentSlide.title}
            </h1>

            {/* Slide Description: High legibility & generous spacing */}
            <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed max-w-2xl drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] mb-8">
              {currentSlide.description}
            </p>

            {/* Action CTAs with elevated depth & contrast */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                id="hero-primary-cta-btn"
                onClick={onOpenQuote}
                className="flex items-center justify-center gap-2.5 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 text-xs sm:text-sm font-black uppercase font-mono tracking-wider px-8 py-4 shadow-lg shadow-amber-900/25 hover:shadow-xl hover:shadow-amber-900/35 hover:-translate-y-0.5 active:translate-y-0 transition-all rounded-lg ring-1 ring-amber-400/50 cursor-pointer"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>          
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
                className={`text-xs font-mono tracking-wider transition-all px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                  idx === currentIndex
                    ? 'bg-[#c5a059] text-slate-950 font-black shadow-md ring-2 ring-amber-400/60'
                    : 'bg-white/90 hover:bg-white text-slate-800 hover:text-slate-950 border border-slate-300/90 shadow-xs font-bold'
                }`}
              >
                <span>0{idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Navigation Control Arrows */}
          <div className="flex items-center justify-end gap-2.5">
            <button
              id="hero-prev-slide-btn"
              onClick={handlePrev}
              aria-label="Slide trước"
              className="w-12 h-12 border border-slate-300/90 bg-white/95 hover:bg-white hover:border-[#c5a059] text-slate-800 hover:text-slate-950 flex items-center justify-center transition-all rounded-lg shadow-md hover:shadow-lg hover:scale-105 active:scale-95 backdrop-blur-xs cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              id="hero-next-slide-btn"
              onClick={handleNext}
              aria-label="Slide tiếp theo"
              className="w-12 h-12 border border-slate-300/90 bg-white/95 hover:bg-white hover:border-[#c5a059] text-slate-800 hover:text-slate-950 flex items-center justify-center transition-all rounded-lg shadow-md hover:shadow-lg hover:scale-105 active:scale-95 backdrop-blur-xs cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
