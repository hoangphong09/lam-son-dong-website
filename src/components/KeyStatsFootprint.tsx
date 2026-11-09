import React, { useState, useEffect, useRef } from 'react';
import { Users, Layers, Award, Globe } from 'lucide-react';
import { StatMetric } from '../types';
import { getStats, INITIAL_STATS } from '../lib/supabase';

interface KeyStatsFootprintProps {
  stats?: StatMetric[];
}

// Bot detection helper to ensure search engine crawlers always see real stats immediately
const isSearchBot = (): boolean => {
  if (typeof navigator === 'undefined' || !navigator.userAgent) return true;
  return /bot|crawler|spider|googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|sogou|exabot|facebot|facebookexternalhit|ia_archiver/i.test(navigator.userAgent);
};

const AnimatedCounter: React.FC<{ value: string; isVisible: boolean }> = ({ value, isVisible }) => {
  // Initialize with real actual target value (500+, 150+, 100%, 28+) rather than 0
  const [displayValue, setDisplayValue] = useState<string>(value);
  const numericTarget = parseFloat(value.replace(/,/g, ''));
  const isNumeric = !isNaN(numericTarget);
  const decimals = value.includes('.') ? value.split('.')[1].length : 0;
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // If the visitor is a search engine crawler, never reset to 0 and skip animation
    if (isSearchBot()) {
      setDisplayValue(value);
      return;
    }

    // Only start counting animation when real user scrolls to it for the first time
    if (!isVisible) {
      return;
    }

    if (hasAnimatedRef.current) {
      setDisplayValue(value);
      return;
    }

    hasAnimatedRef.current = true;

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

// Strategic Enterprise Partners & Clients with fully branded SVG logos (No loose single letters)
interface EnterprisePartner {
  id: string;
  name: string;
  logoSrc: string;
}

const svgDataUri = (svgString: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

const ENTERPRISE_PARTNERS: EnterprisePartner[] = [
  {
    id: 'samsung',
    name: 'Samsung',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 32" fill="none"><text x="70" y="23" text-anchor="middle" fill="#1428A0" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="20" letter-spacing="2">SAMSUNG</text></svg>`),
  },
  {
    id: 'vingroup',
    name: 'Vingroup',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 32" fill="none"><g transform="translate(6, 3)"><path d="M14 26L20 4l6 22-3.5-3.5L20 12l-2.5 10.5L14 26z" fill="#C5A059"/><path d="M7 11c4.5 1 9 4.5 13 11-3.5-6.5-6.5-9-13-11z" fill="#B8860B"/><path d="M33 11c-4.5 1-9 4.5-13 11 3.5-6.5 6.5-9 13-11z" fill="#B8860B"/></g><text x="44" y="22" fill="#C8102E" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="1">VINGROUP</text></svg>`),
  },
  {
    id: 'lg-display',
    name: 'LG Display',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 32" fill="none"><g transform="translate(6, 3)"><circle cx="13" cy="13" r="13" fill="#A50034"/><path d="M13 7v8h7" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="10" r="1.5" fill="white"/></g><text x="38" y="21" fill="#A50034" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="15">LG Display</text></svg>`),
  },
  {
    id: 'honda',
    name: 'Honda',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 32" fill="none"><g transform="translate(6, 3)"><rect x="1" y="1" width="24" height="24" rx="4" stroke="#CC0000" stroke-width="2" fill="none"/><path d="M6 6v14h3v-5h8v5h3V6h-3v5H9V6H6z" fill="#CC0000"/></g><text x="38" y="22" fill="#CC0000" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="2">HONDA</text></svg>`),
  },
  {
    id: 'aeon-mall',
    name: 'Aeon Mall',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 32" fill="none"><text x="6" y="23" fill="#E4007F" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="20" letter-spacing="0.5">ÆON</text><text x="62" y="23" fill="#0F172A" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" letter-spacing="1">MALL</text></svg>`),
  },
  {
    id: 'foxconn',
    name: 'Foxconn',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 32" fill="none"><text x="65" y="22" text-anchor="middle" fill="#005A9C" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="18" letter-spacing="1">FOXCONN</text></svg>`),
  },
  {
    id: 'canon',
    name: 'Canon',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 32" fill="none"><text x="60" y="23" text-anchor="middle" fill="#CC0000" font-family="'Plus Jakarta Sans', Georgia, serif" font-weight="900" font-size="20" letter-spacing="1.5">Canon</text></svg>`),
  },
  {
    id: 'viettel',
    name: 'Viettel',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 32" fill="none"><text x="60" y="22" text-anchor="middle" fill="#EE0033" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="19" letter-spacing="0.5">viettel</text></svg>`),
  },
  {
    id: 'vinfast',
    name: 'VinFast',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 32" fill="none"><g transform="translate(6, 3)"><path d="M4 4l8 17 8-17-3 1-5 11-5-11L4 4z" fill="#1B5EE2"/><path d="M1 6l11 17 11-17-2 0-9 14L3 6H1z" fill="#0F172A"/></g><text x="34" y="21" fill="#1B5EE2" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="1">VINFAST</text></svg>`),
  },
  {
    id: 'panasonic',
    name: 'Panasonic',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 32" fill="none"><text x="65" y="22" text-anchor="middle" fill="#004098" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="0.5">Panasonic</text></svg>`),
  },
  {
    id: 'techcombank',
    name: 'Techcombank',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 32" fill="none"><g transform="translate(4, 3)"><path d="M13 2l11 11-11 11L2 13 13 2z" fill="#EA1C24"/><path d="M18 7l6 6-6 6-6-6 6-6z" fill="white"/></g><text x="33" y="21" fill="#0F172A" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="13" letter-spacing="1">TECHCOMBANK</text></svg>`),
  },
  {
    id: 'masan',
    name: 'Masan',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 32" fill="none"><g transform="translate(6, 4)"><path d="M4 4c5 0 9 4 9 9s-4 9-9 9" stroke="#E31E24" stroke-width="2.8" stroke-linecap="round"/><path d="M8 8c3 0 5 2.2 5 5s-2 5-5 5" stroke="#F68B1F" stroke-width="2" stroke-linecap="round"/></g><text x="28" y="22" fill="#0F172A" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="1.5">MASAN</text></svg>`),
  },
  {
    id: 'fpt',
    name: 'FPT Corp',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 32" fill="none"><g transform="translate(6, 4)"><circle cx="8" cy="12" r="5.5" fill="#F37021"/><circle cx="19" cy="12" r="5.5" fill="#005BA9"/><circle cx="30" cy="12" r="5.5" fill="#00A84F"/></g><text x="44" y="21" fill="#005BA9" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" letter-spacing="1">FPT CORP</text></svg>`),
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 32" fill="none"><g transform="translate(6, 3)"><ellipse cx="13" cy="13" rx="13" ry="9" stroke="#002C5F" stroke-width="1.8" fill="none"/><path d="M8 9v8h2v-3.5h6v3.5h2V9h-2v3H10V9H8z" fill="#002C5F"/></g><text x="34" y="21" fill="#002C5F" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" letter-spacing="1.5">HYUNDAI</text></svg>`),
  },
  {
    id: 'toyota',
    name: 'Toyota',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 32" fill="none"><g transform="translate(6, 3)"><ellipse cx="14" cy="13" rx="13" ry="9" fill="none" stroke="#EB0A1E" stroke-width="1.8"/><ellipse cx="14" cy="13" rx="5" ry="7.5" fill="none" stroke="#EB0A1E" stroke-width="1.5"/><ellipse cx="14" cy="9" rx="9.5" ry="3.8" fill="none" stroke="#EB0A1E" stroke-width="1.5"/></g><text x="38" y="21" fill="#EB0A1E" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" letter-spacing="1.5">TOYOTA</text></svg>`),
  },
  {
    id: 'thaco',
    name: 'THACO',
    logoSrc: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 32" fill="none"><text x="60" y="22" text-anchor="middle" fill="#004F9E" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="18" letter-spacing="2">THACO</text></svg>`),
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
              {/* Primary list of 16 Enterprise Partners for SEO and accessibility */}
              <div className="flex items-center">
                {ENTERPRISE_PARTNERS.map((partner) => (
                  <div 
                    key={`partner-primary-${partner.id}`}
                    className="flex flex-col items-center shrink-0 group cursor-pointer w-28 sm:w-36 text-center mx-3 sm:mx-6"
                  >
                    {/* Clean Corporate Logo Container */}
                    <div className="h-12 sm:h-14 w-full flex items-center justify-center p-1 transition-all duration-300 group-hover:scale-110">
                      <img
                        src={partner.logoSrc}
                        alt={`Đối tác dịch vụ bảo vệ an ninh ${partner.name} - Công ty Bảo vệ Lâm Sơn Động`}
                        width="130"
                        height="32"
                        className="h-7 sm:h-8 w-auto max-w-[120px] object-contain"
                        loading="lazy"
                      />
                    </div>

                    {/* Name Underneath */}
                    <span className="text-[11px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider mt-2 group-hover:text-slate-950 transition-colors">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cloned marquee list for CSS infinite loop - excluded from search crawlers & screen readers */}
              <div className="flex items-center" aria-hidden="true" data-nosnippet>
                {ENTERPRISE_PARTNERS.map((partner, idx) => (
                  <div 
                    key={`partner-clone-${partner.id}-${idx}`}
                    className="flex flex-col items-center shrink-0 group cursor-pointer w-28 sm:w-36 text-center mx-3 sm:mx-6"
                  >
                    {/* Clean Corporate Logo Container */}
                    <div className="h-12 sm:h-14 w-full flex items-center justify-center p-1 transition-all duration-300 group-hover:scale-110">
                      <img
                        src={partner.logoSrc}
                        alt=""
                        width="130"
                        height="32"
                        className="h-7 sm:h-8 w-auto max-w-[120px] object-contain"
                        loading="lazy"
                      />
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
      </div>
    </section>
  );
};
