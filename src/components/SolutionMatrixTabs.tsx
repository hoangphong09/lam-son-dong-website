import React, { useState } from 'react';
import { 
  Building2, 
  Building, 
  Landmark, 
  Calendar, 
  ShoppingBag, 
  ArrowRight, 
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
    <section id="solutions-matrix-section" className="bg-slate-50 text-slate-900 py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans']">
            Giải Pháp Chuyên Sâu Theo Từng Ngành Nghề
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
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
                  className={`flex items-center justify-between p-4 font-bold text-xs uppercase tracking-wider text-left transition-all whitespace-nowrap lg:whitespace-normal border rounded ${
                    isActive
                      ? 'bg-[#c5a059] text-slate-950 border-[#b8860b] shadow-xs'
                      : 'bg-white text-slate-700 hover:text-slate-950 hover:border-slate-300 border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 border rounded ${isActive ? 'bg-black/10 border-black/20 text-slate-950' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{cat.name}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 hidden lg:block ${isActive ? 'text-slate-950 translate-x-1' : 'text-slate-400'} transition-transform`} />
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
                className="bg-white border border-slate-200 hover:border-amber-500 rounded p-6 flex flex-col justify-between transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug uppercase tracking-tight font-['Plus_Jakarta_Sans']">
                    {sol.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 font-normal mt-2.5 leading-relaxed">
                    {sol.description}
                  </p>

                  {/* Specs */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700 font-normal">
                    {sol.keySpecs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-amber-700 font-mono font-bold text-xs shrink-0">—</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="mt-6 pt-2">
                  <button
                    onClick={() => onOpenSolutionDetail(sol)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-[#c5a059] text-slate-800 hover:text-slate-950 border border-slate-200 hover:border-[#b8860b] font-bold text-xs uppercase font-mono tracking-widest transition-all flex items-center justify-center gap-2 rounded group/btn shadow-xs"
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
