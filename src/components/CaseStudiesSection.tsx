import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { CASE_STUDIES } from '../data/mockData';
import { CaseStudy } from '../types';

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
  onOpenAllCaseStudies: () => void;
  caseStudies?: CaseStudy[];
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ 
  onSelectCaseStudy,
  onOpenAllCaseStudies,
  caseStudies
}) => {
  const activeCaseStudies = caseStudies && caseStudies.length > 0 ? caseStudies : CASE_STUDIES;

  return (
    <section id="casestudies-section" className="bg-slate-50 text-slate-900 py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans']">
            Giá Trị Từ Sự Đồng Hành
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Mỗi câu chuyện là minh chứng cho sự đồng hành bền bỉ giữa Lâm Sơn Động và quý khách hàng - cùng chia sẻ mục tiêu, vượt qua thách thức và kiến tạo giá trị an toàn vững chắc cho hành trình phát triển bền vững.
          </p>
        </div>

        {/* Case Studies 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeCaseStudies.map((cs) => (
            <div
              key={cs.id}
              id={`case-card-${cs.id}`}
              className="bg-white border border-slate-200 hover:border-amber-500 rounded shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={cs.imageUrl}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded shadow-sm">
                    {cs.sector}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 mb-2">
                    <Clock className="w-3 h-3 text-amber-700" />
                    <span>{cs.readTime || '5 phút đọc'}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug uppercase tracking-tight line-clamp-2">
                    {cs.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-normal mt-2 line-clamp-3 leading-relaxed">
                    {cs.result}
                  </p>
                </div>
              </div>

              {/* Read button */}
              <div className="p-5 pt-0">
                <button
                  id={`read-case-${cs.id}`}
                  onClick={() => onSelectCaseStudy(cs)}
                  className="w-full py-2.5 bg-slate-50 hover:bg-[#c5a059] text-slate-800 hover:text-black border border-slate-200 hover:border-amber-500 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 rounded"
                >
                  <span>Đọc chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="mt-12 text-center">
          <button
            id="explore-all-casestudies-btn"
            onClick={onOpenAllCaseStudies}
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-slate-300 hover:border-amber-600 text-slate-800 hover:text-amber-800 text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all bg-white rounded shadow-sm"
          >
            <span>Khám phá thêm các dự án tiêu biểu khác</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
