import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
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
      // Smooth easeOutExpo curve
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

export const KeyStatsFootprint: React.FC<KeyStatsFootprintProps> = ({ stats: propStats }) => {
  const [stats, setStats] = useState<StatMetric[]>(propStats || []);
  const [loading, setLoading] = useState(!propStats || propStats.length === 0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Scroll-triggered Intersection Observer for smooth counter animation
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

  return (
    <section 
      ref={sectionRef} 
      id="stats-footprint-section" 
      className="bg-slate-50 text-slate-900 py-16 sm:py-20 border-b border-slate-200 scroll-mt-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans']">
            Chỉ Số Năng Lực & Dấu Ấn Phủ Sóng Toàn Quốc
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Dữ liệu định lượng minh bạch từ hơn 100+ mục tiêu trọng điểm, cao ốc văn phòng hạng A và tổ hợp công nghiệp được bảo vệ an toàn 24/7.
          </p>
        </div>

        {/* Dynamic Key Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded overflow-hidden shadow-sm">
          {loading && activeStats.length === 0 ? (
            // Skeleton loader
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="p-8 sm:p-10 bg-white animate-pulse flex flex-col items-center text-center space-y-3">
                <div className="h-10 bg-slate-200 rounded w-28" />
                <div className="h-4 bg-slate-200 rounded w-36" />
                <div className="h-3 bg-slate-100 rounded w-48" />
              </div>
            ))
          ) : (
            activeStats.map((stat, idx) => (
              <div 
                key={stat.id || idx} 
                className="flex flex-col items-center text-center p-6 sm:p-10 bg-white hover:bg-slate-50/90 transition-all duration-200 group relative"
              >
                {/* Subtle top indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#c5a059] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />

                {/* Stat Large Number & Unit */}
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-mono tabular-nums">
                    <AnimatedCounter value={stat.numeric_value} isVisible={hasTriggered} />
                  </span>
                  {(stat.unit || stat.suffix) && (
                    <span className="text-2xl sm:text-3xl font-black text-amber-700 font-mono">
                      {stat.unit || stat.suffix}
                    </span>
                  )}
                </div>

                {/* Stat Title */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-3 sm:mt-4 uppercase tracking-wide leading-snug">
                  {stat.title}
                </h3>

                {/* Stat Description */}
                <p className="text-xs text-slate-600 mt-2 font-normal leading-relaxed max-w-xs">
                  {stat.description}
                </p>

                {/* Subtle bottom indicator bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-amber-600 transition-colors" />
              </div>
            ))
          )}
        </div>

        {/* Footprint commitment badge */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-slate-600 pt-6 border-t border-slate-200/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% Cán bộ có lý lịch tư pháp sạch</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Tuần tra định vị GPS Smart Patrol</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Đội cơ động phản ứng nhanh 15 phút</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Cam kết an toàn & bồi thường 100% tài sản</span>
          </div>
        </div>
      </div>
    </section>
  );
};
