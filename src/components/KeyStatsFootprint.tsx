import React, { useState, useEffect, useRef } from 'react';
import { Users, Layers, Award, Globe } from 'lucide-react';
import { StatMetric } from '../types';
import { getStats, INITIAL_STATS } from '../lib/supabase';

interface KeyStatsFootprintProps {
  stats?: StatMetric[];
}

const AnimatedCounter: React.FC<{ value: string; isVisible: boolean }> = ({ value, isVisible }) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const numericTarget = parseFloat(value.replace(/,/g, ''));
  const isNumeric = !isNaN(numericTarget);
  const decimals = value.includes('.') ? value.split('.')[1].length : 0;

  useEffect(() => {
    if (!isVisible) {
      setDisplayValue('0');
      return;
    }

    if (!isNumeric) {
      setDisplayValue(value);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds smooth, premium counting animation
    let animFrame: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Quartic ease-out: brisk start, buttery smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = easeProgress * numericTarget;

      if (decimals > 0) {
        setDisplayValue(current.toFixed(decimals));
      } else {
        setDisplayValue(Math.round(current).toLocaleString('en-US'));
      }

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animFrame = requestAnimationFrame(step);
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
  const [stats, setStats] = useState<StatMetric[]>(
    propStats && propStats.length > 0 ? propStats : INITIAL_STATS
  );
  const [loading, setLoading] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (propStats && propStats.length > 0) {
      setStats(propStats);
      return;
    }

    let isMounted = true;
    const fetchStats = async () => {
      try {
        const data = await getStats();
        if (isMounted && data && data.length > 0) {
          setStats(data);
        }
      } catch (err) {
        console.warn('Failed to load dynamic stats:', err);
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

    const targetNode = metricsRef.current || sectionRef.current;
    if (!targetNode) return;

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
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(targetNode);

    return () => observer.disconnect();
  }, [stats]);

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

  return (
    <section 
      ref={sectionRef} 
      id="stats-footprint-section" 
      aria-label="Chỉ số năng lực & Khách hàng đồng hành"
      className="bg-white text-slate-900 py-16 sm:py-24 border-b border-slate-200 scroll-mt-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* SECTION HEADER: Standard Title & Description Matching All Other Sections */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 uppercase tracking-wide sm:tracking-wider leading-[1.35] sm:leading-[1.3] font-['Plus_Jakarta_Sans',sans-serif]">
            Chỉ Số Năng Lực & Khách Hàng Đồng Hành
          </h2>
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Khẳng định vị thế uy tín hàng đầu qua số liệu định lượng minh bạch và sự tín nhiệm vững chắc từ các tập đoàn kinh tế, khu công nghiệp và doanh nghiệp lớn.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* METRICS & PARTNERS (SEAMLESS, NO ENCLOSING CARD BOX OR DUPLICATE BORDERS) */}
        {/* ========================================================================= */}
        <div className="w-full">
          {/* ======================================================================= */}
          {/* ROW 1: KEY PERFORMANCE METRICS                                          */}
          {/* ======================================================================= */}
          <div ref={metricsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {loading && activeStats.length === 0 ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex flex-col items-center animate-pulse space-y-3 text-center">
                  <div className="h-12 w-28 bg-slate-100 rounded-lg" />
                  <div className="h-4 w-36 bg-slate-100 rounded" />
                  <div className="h-3 w-44 bg-slate-50 rounded" />
                </div>
              ))
            ) : (
              activeStats.slice(0, 4).map((stat, idx) => {
                const unit = stat.unit || stat.suffix || '';
                return (
                  <div 
                    key={stat.id || idx}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Minimalist Metric Icon */}
                    <div className="mb-3 text-slate-400 group-hover:text-[#c5a059] transition-colors">
                      {metricIcons[idx % metricIcons.length]}
                    </div>

                    {/* Bold High-Contrast Metric Value */}
                    <div className="inline-flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-none group-hover:text-slate-800 transition-colors">
                        <AnimatedCounter value={stat.numeric_value} isVisible={hasTriggered} />
                      </span>
                      {unit && (
                        <span className="ml-1 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#c5a059] leading-none self-center flex items-center justify-center">
                          {unit}
                        </span>
                      )}
                    </div>

                    {/* Metric Title (Full Text, Never Truncated) */}
                    <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-slate-950 mt-2.5 leading-snug transition-colors">
                      {stat.title}
                    </div>

                    {/* Metric Description */}
                    {stat.description && (
                      <p className="text-xs text-slate-500 mt-1.5 max-w-[240px] leading-relaxed hidden sm:block">
                        {stat.description}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Soft Elegant Divider */}
          <div className="my-12 sm:my-16 border-t border-slate-100" />

          {/* ======================================================================= */}
          {/* ROW 2: ENTERPRISE PARTNERS CONVEYOR BELT (BĂNG CHUYỀN TỰ ĐỘNG VÔ TẬN)   */}
          {/* ======================================================================= */}
          <div className="relative w-full overflow-hidden marquee-container py-2">
            {/* Left & Right Soft Fade Gradients */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

            {/* Continuous Conveyor Track (Seamless loop) */}
            <div className="flex items-center marquee-track-left">
              {[...ENTERPRISE_PARTNERS, ...ENTERPRISE_PARTNERS].map((partner, idx) => (
                <div 
                  key={`${partner.id}-${idx}`}
                  className="flex flex-col items-center shrink-0 group cursor-pointer w-28 sm:w-36 text-center mx-3 sm:mx-6"
                >
                  {/* Clean Corporate Logo Container */}
                  <div className="h-12 sm:h-14 w-full flex items-center justify-center p-1 transition-all duration-300 group-hover:scale-110">
                    {partner.renderLogo()}
                  </div>

                  {/* Name Underneath */}
                  <span className="text-[11px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider mt-2 group-hover:text-slate-950 transition-colors">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
