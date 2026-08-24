import React from 'react';
import { 
  Users, 
  Building2, 
  ShieldAlert, 
  MapPin, 
  Shield
} from 'lucide-react';
import { KEY_STATS } from '../data/mockData';

export const KeyStatsFootprint: React.FC = () => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-5 h-5 text-[#c5a059]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#c5a059]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-[#c5a059]" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-[#c5a059]" />;
      default:
        return <Shield className="w-5 h-5 text-[#c5a059]" />;
    }
  };

  return (
    <section id="stats-footprint-section" className="bg-[#0d0d0f] text-white py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Big Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {KEY_STATS.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-start p-6 sm:p-8 bg-[#111114] hover:bg-[#16161a] transition-all"
            >
              <div className="mb-4 w-9 h-9 border border-[#c5a059]/40 bg-[#c5a059]/10 flex items-center justify-center">
                {renderIcon(stat.iconName)}
              </div>
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
                {stat.value}
              </span>
              <h3 className="text-xs font-bold text-gray-200 mt-2 uppercase tracking-wider">
                {stat.label}
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-light line-clamp-2 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


