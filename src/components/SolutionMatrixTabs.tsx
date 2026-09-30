import React, { useState } from 'react';
import { 
  ArrowRight, 
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

  return (
    <section id="solutions-matrix-section" className="bg-slate-50 text-slate-900 py-16 sm:py-20 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 uppercase tracking-wide sm:tracking-wider leading-[1.35] sm:leading-[1.3] font-['Plus_Jakarta_Sans',sans-serif]">
            Giải Pháp Chuyên Sâu Theo Từng Ngành Nghề
          </h2>
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Mỗi lĩnh vực đòi hỏi một phương án bảo vệ chuyên biệt. Khám phá các giải pháp an ninh tiêu chuẩn được Lâm Sơn Động thiết kế riêng cho từng loại hình cơ sở.
          </p>
        </div>

        {/* Layout: Sidebar Select Tabs on Left + Solutions on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Vertical Select Tabs (No icons at the start of industries) */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {SOLUTION_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeTab;
              return (
                <button
                  key={cat.id}
                  id={`solution-tab-${cat.id}`}
                  onClick={() => setActiveTab(cat.id)}
                  className={`group relative p-3.5 sm:p-4 rounded-xl border cursor-pointer select-none transition-colors duration-150 flex items-center justify-between text-left shrink-0 lg:shrink whitespace-nowrap lg:whitespace-normal bg-white ${
                    isActive
                      ? 'border-amber-500'
                      : 'border-slate-200 hover:bg-slate-50/60'
                  }`}
                >
                  {/* Clean text block without leading icon */}
                  <div className="min-w-0 pr-2">
                    <span className={`block text-xs sm:text-[13.5px] tracking-normal transition-colors leading-snug ${
                      isActive ? 'text-slate-950 font-bold' : 'text-slate-800 font-semibold group-hover:text-slate-950'
                    }`}>
                      {cat.name}
                    </span>
                    <span className={`block text-[11px] font-medium mt-1 tracking-normal transition-colors ${
                      isActive ? 'text-amber-800 font-semibold' : 'text-slate-500'
                    }`}>
                      {cat.solutions.length} giải pháp tiêu chuẩn
                    </span>
                  </div>

                  {/* Right indicator chevron */}
                  <div className="hidden lg:flex items-center justify-center pl-2 shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isActive 
                        ? 'bg-amber-50 text-amber-900' 
                        : 'text-slate-400'
                    }`}>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right 4 Solution Cards (Without tags like Cổng chính, Hàng rào, ...) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentCategory.solutions.map((sol) => (
              <div
                key={sol.id}
                id={`sol-card-${sol.id}`}
                className="bg-white border border-slate-200/90 hover:border-amber-400 rounded-xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group shadow-xs hover:shadow-md relative overflow-hidden"
              >
                <div>
                  {/* Title - Clean font without tag */}
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
