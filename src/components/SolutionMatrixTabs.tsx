import React, { useState } from 'react';
import { 
  Building2, 
  Building, 
  Landmark, 
  Calendar, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { SOLUTION_CATEGORIES } from '../data/mockData';

interface SolutionMatrixTabsProps {
  onOpenSolutionDetail: (solution: any) => void;
}

export const SolutionMatrixTabs: React.FC<SolutionMatrixTabsProps> = ({ onOpenSolutionDetail }) => {
  const [activeTab, setActiveTab] = useState<string>(SOLUTION_CATEGORIES[0].id);

  const currentCategory = SOLUTION_CATEGORIES.find((c) => c.id === activeTab) || SOLUTION_CATEGORIES[0];

  const getTabIcon = (catId: string) => {
    switch (catId) {
      case 'cat-kcn':
        return Building2;
      case 'cat-building':
        return Building;
      case 'cat-bank':
        return Landmark;
      case 'cat-event':
        return Calendar;
      case 'cat-retail':
        return ShoppingBag;
      default:
        return ShieldCheck;
    }
  };

  return (
    <section id="solutions-matrix-section" className="bg-[#0d0d0f] text-white py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.25em] font-mono">
            MA TRẬN GIẢI PHÁP AN NINH
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mt-2 font-['Plus_Jakarta_Sans']">
            Giải Pháp Chuyên Sâu Theo Từng Ngành Nghề
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            Mỗi lĩnh vực đòi hỏi một phương án bảo vệ chuyên biệt. Khám phá các giải pháp an ninh tiêu chuẩn được Lâm Sơn Động thiết kế riêng cho từng loại hình cơ sở.
          </p>
        </div>

        {/* Layout: Sidebar Tabs on Left + 4 Solutions on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Vertical Tabs */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {SOLUTION_CATEGORIES.map((cat) => {
              const Icon = getTabIcon(cat.id);
              const isActive = cat.id === activeTab;
              return (
                <button
                  key={cat.id}
                  id={`solution-tab-${cat.id}`}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center justify-between p-4 font-bold text-xs uppercase tracking-wider text-left transition-all whitespace-nowrap lg:whitespace-normal border ${
                    isActive
                      ? 'bg-[#c5a059] text-black border-[#c5a059]'
                      : 'bg-[#111114] text-gray-400 hover:text-white hover:border-white/20 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 border ${isActive ? 'bg-black/10 border-black/20 text-black' : 'bg-[#0d0d0f] border-white/10 text-[#c5a059]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{cat.name}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 hidden lg:block ${isActive ? 'text-black translate-x-1' : 'text-gray-600'} transition-transform`} />
                </button>
              );
            })}
          </div>

          {/* Right 4 Solution Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentCategory.solutions.map((sol) => (
              <div
                key={sol.id}
                id={`sol-card-${sol.id}`}
                className="bg-[#111114] border border-white/10 hover:border-[#c5a059]/50 p-6 flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  {/* Tag */}
                  <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 px-2 py-0.5 mb-3">
                    {sol.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#c5a059] transition-colors leading-snug uppercase tracking-tight">
                    {sol.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-400 font-light mt-2.5 leading-relaxed">
                    {sol.description}
                  </p>

                  {/* Specs */}
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-xs text-gray-300 font-light">
                    {sol.keySpecs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[#c5a059] font-mono font-bold text-xs shrink-0">—</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="mt-6 pt-2">
                  <button
                    onClick={() => onOpenSolutionDetail(sol)}
                    className="w-full py-2.5 bg-[#0d0d0f] hover:bg-[#c5a059] text-gray-300 hover:text-black border border-white/10 hover:border-[#c5a059] font-bold text-xs uppercase font-mono tracking-widest transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Chi tiết giải pháp</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

