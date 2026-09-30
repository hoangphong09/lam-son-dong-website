import React, { useState, useEffect, useRef } from 'react';
import { Users, Layers, Award, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { StatMetric } from '../types';
import { getStats, INITIAL_STATS } from '../lib/supabase';

interface KeyStatsFootprintProps {
  stats?: StatMetric[];
}

const AnimatedCounter: React.FC<{ value: string; isVisible: boolean }> = ({ value, isVisible }) => {
  const [displayValue, setDisplayValue] = useState<string>(isVisible ? value : '0');
  const numericTarget = parseFloat(value.replace(/,/g, ''));
  const isNumeric = !isNaN(numericTarget);
  const decimals = value.includes('.') ? value.split('.')[1].length : 0;

  useEffect(() => {
    if (!isVisible) return;
    if (!isNumeric) {
      setDisplayValue(value);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 1800; // 1.8s smooth duration

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = easeProgress * numericTarget;

      if (decimals > 0) {
        setDisplayValue(current.toFixed(decimals));
      } else {
        setDisplayValue(Math.floor(current).toLocaleString('en-US'));
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    const animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [isVisible, numericTarget, isNumeric, decimals, value]);

  return <>{displayValue}</>;
};

// Strategic Enterprise Partners & Clients (Corporate Clients Only - No Country Flags)
interface EnterprisePartner {
  id: string;
  name: string;
  renderLogo: () => React.ReactNode;
}

const ENTERPRISE_PARTNERS: EnterprisePartner[] = [
  {
    id: 'samsung',
    name: 'SAMSUNG',
    renderLogo: () => (
      <span className="text-[11px] sm:text-xs font-black tracking-tight text-[#1428A0] font-sans">
        SAMSUNG
      </span>
    ),
  },
  {
    id: 'vingroup',
    name: 'VINGROUP',
    renderLogo: () => (
      <div className="flex flex-col items-center">
        <svg className="w-5 h-5 text-[#c8102e]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L16 19l4-14-3 3-1-5-4 13L8 6 5 3l7 16z" />
        </svg>
        <span className="text-[9px] font-black text-[#c8102e] tracking-tighter -mt-0.5">VIN</span>
      </div>
    ),
  },
  {
    id: 'lg',
    name: 'LG DISPLAY',
    renderLogo: () => (
      <div className="relative w-8 h-8 rounded-full bg-[#a50034] flex items-center justify-center">
        <span className="text-white font-black text-xs">L</span>
        <span className="w-1.5 h-1.5 rounded-full bg-white absolute top-2 right-2" />
      </div>
    ),
  },
  {
    id: 'honda',
    name: 'HONDA',
    renderLogo: () => (
      <span className="text-[#cc0000] font-black text-xl font-serif leading-none">
        H
      </span>
    ),
  },
  {
    id: 'aeon',
    name: 'AEON MALL',
    renderLogo: () => (
      <span className="text-[#e4007f] font-black text-xs font-sans tracking-tight">
        ÆON
      </span>
    ),
  },
  {
    id: 'foxconn',
    name: 'FOXCONN',
    renderLogo: () => (
      <span className="text-[#005a9c] font-black text-[11px] tracking-tight font-sans">
        FOXCONN
      </span>
    ),
  },
  {
    id: 'canon',
    name: 'CANON',
    renderLogo: () => (
      <span className="text-[#cc0000] font-black text-xs font-serif tracking-tight">
        Canon
      </span>
    ),
  },
  {
    id: 'viettel',
    name: 'VIETTEL',
    renderLogo: () => (
      <span className="text-[#ee0033] font-black text-xs font-sans">
        viettel
      </span>
    ),
  },
  {
    id: 'vinfast',
    name: 'VINFAST',
    renderLogo: () => (
      <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
        <span className="text-white font-black text-sm italic font-sans">V</span>
      </div>
    ),
  },
  {
    id: 'panasonic',
    name: 'PANASONIC',
    renderLogo: () => (
      <span className="text-[#004098] font-black text-[10px] tracking-tighter font-sans">
        Panasonic
      </span>
    ),
  },
  {
    id: 'techcombank',
    name: 'TECHCOMBANK',
    renderLogo: () => (
      <div className="w-6 h-6 bg-[#ea1c24] rotate-45 flex items-center justify-center">
        <div className="w-2.5 h-2.5 bg-white" />
      </div>
    ),
  },
  {
    id: 'masan',
    name: 'MASAN',
    renderLogo: () => (
      <span className="text-[#e31e24] font-black text-xs tracking-tight font-sans">
        MASAN
      </span>
    ),
  },
  {
    id: 'fpt',
    name: 'FPT CORP',
    renderLogo: () => (
      <div className="flex items-center gap-0.5 font-black text-xs font-sans">
        <span className="text-[#f37021]">F</span>
        <span className="text-[#005ba9]">P</span>
        <span className="text-[#00a84f]">T</span>
      </div>
    ),
  },
  {
    id: 'hyundai',
    name: 'HYUNDAI',
    renderLogo: () => (
      <span className="text-[#002c5f] font-black text-lg font-sans italic leading-none">
        H
      </span>
    ),
  },
  {
    id: 'toyota',
    name: 'TOYOTA',
    renderLogo: () => (
      <svg className="w-8 h-6 text-[#eb0a1e]" viewBox="0 0 40 28" fill="currentColor">
        <ellipse cx="20" cy="14" rx="18" ry="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <ellipse cx="20" cy="14" rx="7" ry="10" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <ellipse cx="20" cy="9" rx="13" ry="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    id: 'thaco',
    name: 'THACO',
    renderLogo: () => (
      <span className="text-[#004f9e] font-black text-xs tracking-wider font-sans">
        THACO
      </span>
    ),
  },
];

export const KeyStatsFootprint: React.FC<KeyStatsFootprintProps> = ({ stats: propStats }) => {
  const [stats, setStats] = useState<StatMetric[]>(propStats || []);
  const [loading, setLoading] = useState(!propStats || propStats.length === 0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (propStats && propStats.length > 0) {
      setStats(propStats);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchStats = async () => {
      try {
        const data = await getStats();
        if (isMounted) {
          setStats(data);
          setLoading(false);
        }
      } catch (err) {
        console.warn('Failed to load dynamic stats:', err);
        if (isMounted) {
          setStats(INITIAL_STATS);
          setLoading(false);
        }
      }
    };

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, [propStats]);

  // Scroll-triggered Intersection Observer for counter
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Filter active stats and sort by display_order
  const activeStats = (stats && stats.length > 0 ? stats : INITIAL_STATS)
    .filter((s) => s.is_active !== false)
    .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));

  // Map 4 icons for the 4 key metrics
  const metricIcons = [
    <Users key="users" className="w-8 h-8 sm:w-9 sm:h-9 text-slate-500 group-hover:text-amber-700 transition-colors" strokeWidth={1.75} />,
    <Layers key="layers" className="w-8 h-8 sm:w-9 sm:h-9 text-slate-500 group-hover:text-amber-700 transition-colors" strokeWidth={1.75} />,
    <Award key="award" className="w-8 h-8 sm:w-9 sm:h-9 text-slate-500 group-hover:text-amber-700 transition-colors" strokeWidth={1.75} />,
    <Globe key="globe" className="w-8 h-8 sm:w-9 sm:h-9 text-slate-500 group-hover:text-amber-700 transition-colors" strokeWidth={1.75} />,
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = direction === 'left' ? -320 : 320;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section 
      ref={sectionRef} 
      id="stats-footprint-section" 
      aria-label="Chỉ số năng lực & Khách hàng đồng hành"
      className="bg-slate-50 text-slate-900 py-16 sm:py-20 border-b border-slate-200 scroll-mt-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* SECTION HEADER: Standard Title & Description Matching All Other Sections */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 uppercase tracking-wide sm:tracking-wider leading-[1.35] sm:leading-[1.3] font-['Plus_Jakarta_Sans',sans-serif]">
            Chỉ Số Năng Lực & Khách Hàng Đồng Hành
          </h2>
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Khẳng định vị thế uy tín hàng đầu qua số liệu định lượng minh bạch và sự tín nhiệm vững chắc từ các tập đoàn kinh tế, khu công nghiệp và doanh nghiệp lớn.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CARD CONTAINER: Unified Elevated White Container for Metrics & Partners   */}
        {/* ========================================================================= */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 sm:p-8 lg:p-10">
          {/* ======================================================================= */}
          {/* ROW 1: KEY PERFORMANCE METRICS                                          */}
          {/* Icon on left, Bold Crimson Red Metric on top right, Label below         */}
          {/* ======================================================================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 items-center">
            {loading && activeStats.length === 0 ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-4 animate-pulse">
                  <div className="w-10 h-10 bg-slate-200 rounded-lg" />
                  <div className="space-y-2">
                    <div className="h-6 w-20 bg-slate-200 rounded" />
                    <div className="h-3 w-28 bg-slate-100 rounded" />
                  </div>
                </div>
              ))
            ) : (
              activeStats.slice(0, 4).map((stat, idx) => {
                const unit = stat.unit || stat.suffix || '';
                return (
                  <div 
                    key={stat.id || idx}
                    className="flex items-center gap-3.5 sm:gap-4.5 justify-start lg:justify-center group"
                  >
                    {/* Left Metric Icon */}
                    <div className="shrink-0 p-2.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-amber-400 group-hover:bg-amber-50/70 transition-all shadow-2xs">
                      {metricIcons[idx % metricIcons.length]}
                    </div>

                    {/* Right Metric Details */}
                    <div className="min-w-0">
                      <div className="flex items-baseline text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-amber-700 font-mono tracking-tight leading-none group-hover:text-amber-800 transition-colors">
                        <AnimatedCounter value={stat.numeric_value} isVisible={hasTriggered} />
                        {unit && (
                          <span className="ml-1 text-xl sm:text-2xl font-bold text-amber-800 font-mono">
                            {unit}
                          </span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-slate-950 mt-1.5 leading-snug line-clamp-1 transition-colors">
                        {stat.title}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Divider Spacing */}
          <div className="my-8 sm:my-10 border-t border-slate-100" />

          {/* ======================================================================= */}
          {/* ROW 2: ENTERPRISE PARTNERS SLIDER CAROUSEL                              */}
          {/* Single clean circular border, corporate logos only, synchronized buttons*/}
          {/* ======================================================================= */}
          <div className="relative flex items-center gap-3 sm:gap-4">
            {/* Left Arrow Button */}
            <button
              onClick={() => handleScroll('left')}
              aria-label="Đối tác trước"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-500 text-slate-700 hover:text-amber-900 flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Center Scrollable Slider Track */}
            <div 
              ref={sliderRef}
              className="flex-1 overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-6 sm:gap-8 py-2 px-1 select-none"
            >
              {ENTERPRISE_PARTNERS.map((partner) => (
                <div 
                  key={partner.id}
                  className="flex flex-col items-center shrink-0 group cursor-pointer w-20 sm:w-24 text-center"
                >
                  {/* Single Clean Circular Border (No inner duplicated border) */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-slate-200 group-hover:border-amber-500 shadow-2xs group-hover:shadow-md flex items-center justify-center p-2.5 transition-all duration-300 group-hover:scale-105 overflow-hidden">
                    {partner.renderLogo()}
                  </div>

                  {/* Name Underneath (Uppercase & Bold) */}
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mt-2.5 group-hover:text-amber-900 transition-colors line-clamp-1">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={() => handleScroll('right')}
              aria-label="Đối tác tiếp theo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-500 text-slate-700 hover:text-amber-900 flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
