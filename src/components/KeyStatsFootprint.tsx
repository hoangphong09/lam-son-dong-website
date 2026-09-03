import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  ShieldAlert, 
  MapPin, 
  Shield,
  Award,
  Flame,
  CheckCircle2,
  Activity,
  Globe
} from 'lucide-react';
import { StatMetric } from '../types';
import { getStats, INITIAL_STATS } from '../lib/supabase';

interface KeyStatsFootprintProps {
  stats?: StatMetric[];
}

export const KeyStatsFootprint: React.FC<KeyStatsFootprintProps> = ({ stats: propStats }) => {
  const [stats, setStats] = useState<StatMetric[]>(propStats || []);
  const [loading, setLoading] = useState(!propStats || propStats.length === 0);

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

  // Pick appropriate icon based on keywords
  const renderStatIcon = (title: string, index: number) => {
    const t = title.toLowerCase();
    if (t.includes('nhân sự') || t.includes('vệ sĩ') || t.includes('quân số') || t.includes('bảo vệ')) {
      return <Users className="w-5 h-5 text-amber-700" />;
    }
    if (t.includes('mục tiêu') || t.includes('kcn') || t.includes('tòa nhà') || t.includes('doanh nghiệp') || t.includes('nhà máy')) {
      return <Building2 className="w-5 h-5 text-amber-700" />;
    }
    if (t.includes('chứng chỉ') || t.includes('bộ công an') || t.includes('pháp luật') || t.includes('huấn luyện')) {
      return <Award className="w-5 h-5 text-amber-700" />;
    }
    if (t.includes('pccc') || t.includes('cứu hộ') || t.includes('khẩn cấp') || t.includes('cháy')) {
      return <Flame className="w-5 h-5 text-amber-700" />;
    }
    if (t.includes('tỉnh') || t.includes('phủ sóng') || t.includes('toàn quốc') || t.includes('địa bàn')) {
      return <MapPin className="w-5 h-5 text-amber-700" />;
    }
    if (t.includes('phản ứng') || t.includes('cơ động') || t.includes('tốc độ') || t.includes('thời gian')) {
      return <Activity className="w-5 h-5 text-amber-700" />;
    }
    // Fallback based on index
    const fallbackIcons = [
      <Users key="1" className="w-5 h-5 text-amber-700" />,
      <Building2 key="2" className="w-5 h-5 text-amber-700" />,
      <ShieldAlert key="3" className="w-5 h-5 text-amber-700" />,
      <MapPin key="4" className="w-5 h-5 text-amber-700" />,
    ];
    return fallbackIcons[index % fallbackIcons.length] || <Shield className="w-5 h-5 text-amber-700" />;
  };

  // Filter active stats and sort by display_order
  const activeStats = (stats && stats.length > 0 ? stats : INITIAL_STATS)
    .filter((s) => s.is_active !== false)
    .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));

  return (
    <section id="stats-footprint-section" className="bg-slate-50 text-slate-900 py-16 sm:py-20 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded">
            <Shield className="w-3.5 h-3.5 text-amber-800" />
            <span>HIỆU QUẢ THỰC TẾ • NĂNG LỰC THỰC CHIẾN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-3 font-['Plus_Jakarta_Sans']">
            Chỉ Số Năng Lực & Dấu Ấn Phủ Sóng Toàn Quốc
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Dữ liệu định lượng minh bạch từ hơn 100+ mục tiêu trọng điểm, cao ốc văn phòng hạng A và tổ hợp công nghiệp được bảo vệ an toàn 24/7.
          </p>
        </div>

        {/* Dynamic Key Stats Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(activeStats.length, 4)} gap-px bg-slate-200 border border-slate-200 rounded overflow-hidden shadow-sm`}>
          {loading && activeStats.length === 0 ? (
            // Skeleton loader
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="p-8 bg-white animate-pulse space-y-3">
                <div className="w-9 h-9 bg-slate-200 rounded" />
                <div className="h-8 bg-slate-200 rounded w-24" />
                <div className="h-4 bg-slate-200 rounded w-36" />
                <div className="h-3 bg-slate-100 rounded w-full" />
              </div>
            ))
          ) : (
            activeStats.map((stat, idx) => (
              <div 
                key={stat.id || idx} 
                className="flex flex-col items-start p-6 sm:p-8 bg-white hover:bg-slate-50/90 transition-all duration-200 group relative"
              >
                <div className="mb-4 w-10 h-10 border border-amber-300 bg-amber-50 group-hover:bg-amber-100 transition-colors rounded flex items-center justify-center">
                  {renderStatIcon(stat.title, idx)}
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
                    {stat.numeric_value}
                  </span>
                  {(stat.unit || stat.suffix) && (
                    <span className="text-2xl font-black text-amber-700 font-mono">
                      {stat.unit || stat.suffix}
                    </span>
                  )}
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-2 uppercase tracking-wide">
                  {stat.title}
                </h3>

                <p className="text-xs text-slate-600 mt-1 font-normal line-clamp-2 leading-relaxed">
                  {stat.description}
                </p>

                {/* Subtle indicator bar */}
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
            <span>Bảo hiểm trách nhiệm pháp lý 20 tỷ VNĐ</span>
          </div>
        </div>
      </div>
    </section>
  );
};
