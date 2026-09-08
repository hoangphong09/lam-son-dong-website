import React, { useState } from 'react';
import { 
  Building2, 
  Building, 
  Landmark, 
  Calendar, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { SOLUTION_CATEGORIES } from '../data/mockData';

interface SolutionMatrixTabsProps {
  onOpenSolutionDetail: (solution: any, categoryName?: string) => void;
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
    <section id="solutions-matrix-section" className="bg-slate-50 text-slate-900 py-16 sm:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-50 border border-amber-200 text-amber-800 uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Phương Án An Ninh Theo Đặc Thù</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 uppercase tracking-normal">
            Giải Pháp Chuyên Sâu Theo Từng Ngành Nghề
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed tracking-normal">
            Mỗi lĩnh vực đòi hỏi một phương án bảo vệ chuyên biệt. Khám phá các giải pháp an ninh tiêu chuẩn được Lâm Sơn Động thiết kế riêng cho từng loại hình cơ sở.
          </p>
        </div>

        {/* Layout: Sidebar Select Tabs on Left + Solutions on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Vertical Select Tabs */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {SOLUTION_CATEGORIES.map((cat) => {
              const Icon = getTabIcon(cat.id);
              const isActive = cat.id === activeTab;
              return (
                <button
                  key={cat.id}
                  id={`solution-tab-${cat.id}`}
                  onClick={() => setActiveTab(cat.id)}
                  className={`group relative p-3.5 sm:p-4 rounded-xl border cursor-pointer select-none transition-all duration-200 flex items-center justify-between text-left shrink-0 lg:shrink whitespace-nowrap lg:whitespace-normal ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-50/90 via-amber-50/40 to-white border-amber-400 ring-2 ring-amber-400/25 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300/80 hover:bg-slate-50/70 hover:shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Icon Badge */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-br from-[#c5a059] to-[#b8860b] text-white shadow-xs border border-[#996515]/30 scale-105' 
                        : 'bg-slate-100 border border-slate-200 text-slate-600 group-hover:text-amber-800 group-hover:border-amber-300/70 group-hover:bg-amber-50/60'
                    }`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>

                    {/* Text block */}
                    <div className="min-w-0">
                      <span className={`block text-xs sm:text-[13px] tracking-normal transition-colors leading-snug ${
                        isActive ? 'text-slate-950 font-black' : 'text-slate-800 font-bold group-hover:text-slate-950'
                      }`}>
                        {cat.name}
                      </span>
                      <span className={`block text-[11px] font-medium mt-0.5 tracking-normal transition-colors ${
                        isActive ? 'text-amber-800 font-semibold' : 'text-slate-500'
                      }`}>
                        {cat.solutions.length} giải pháp tiêu chuẩn
                      </span>
                    </div>
                  </div>

                  {/* Right indicator chevron */}
                  <div className="hidden lg:flex items-center justify-center pl-2 shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-amber-100/90 text-amber-900' 
                        : 'text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5'
                    }`}>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                    </div>
                  </div>
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
                className="bg-white border border-slate-200/90 hover:border-amber-400 rounded-xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group shadow-xs hover:shadow-md relative overflow-hidden"
              >
                <div>
                  {/* Category Tag */}
                  {sol.tag && (
                    <div className="mb-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200">
                        {sol.tag}
                      </span>
                    </div>
                  )}

                  {/* Title - Refined font & normal tracking for legible Vietnamese characters */}
                  <h3 className="text-[15px] sm:text-base font-bold text-slate-900 group-hover:text-amber-900 transition-colors leading-snug tracking-normal">
                    {sol.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 font-normal mt-2.5 leading-relaxed tracking-normal">
                    {sol.description}
                  </p>

                  {/* Specs with checkmark icons */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2.5 text-xs sm:text-[13px] text-slate-700 font-normal tracking-normal">
                    {sol.keySpecs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-medium text-slate-700">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="mt-6 pt-2">
                  <button
                    onClick={() => onOpenSolutionDetail(sol, currentCategory.name)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-[#c5a059] text-slate-800 hover:text-slate-950 border border-slate-200 hover:border-[#b8860b] font-bold text-xs uppercase font-mono tracking-wider transition-all flex items-center justify-center gap-2 rounded-lg group/btn shadow-2xs hover:shadow-xs cursor-pointer"
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
