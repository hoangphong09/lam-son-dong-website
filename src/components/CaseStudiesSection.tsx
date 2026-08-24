import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { CASE_STUDIES } from '../data/mockData';
import { CaseStudy } from '../types';

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
  onOpenAllCaseStudies: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ 
  onSelectCaseStudy,
  onOpenAllCaseStudies
}) => {
  return (
    <section id="casestudies-section" className="bg-[#0d0d0f] text-white py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.25em] font-mono">
            HIỆU QUẢ THỰC TẾ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mt-2 font-['Plus_Jakarta_Sans']">
            Giá Trị Từ Sự Đồng Hành
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            Mỗi câu chuyện là minh chứng cho sự đồng hành bền bỉ giữa Lâm Sơn Động và quý khách hàng - cùng chia sẻ mục tiêu, vượt qua thách thức và kiến tạo giá trị an toàn vững chắc cho hành trình phát triển bền vững.
          </p>
        </div>

        {/* Case Studies 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              id={`case-card-${cs.id}`}
              className="bg-[#111114] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-[#0d0d0f]">
                  <img
                    src={cs.imageUrl}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[9px] font-mono font-bold uppercase tracking-wider text-black bg-[#c5a059] px-2 py-0.5">
                    {cs.sector}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 mb-2">
                    <Clock className="w-3 h-3 text-[#c5a059]" />
                    <span>{cs.readTime}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-[#c5a059] transition-colors leading-snug uppercase tracking-tight line-clamp-2">
                    {cs.title}
                  </h3>

                  <p className="text-xs text-gray-400 font-light mt-2 line-clamp-3 leading-relaxed">
                    {cs.result}
                  </p>
                </div>
              </div>

              {/* Read button */}
              <div className="p-5 pt-0">
                <button
                  id={`read-case-${cs.id}`}
                  onClick={() => onSelectCaseStudy(cs)}
                  className="w-full py-2.5 bg-[#0d0d0f] hover:bg-[#c5a059] text-gray-300 hover:text-black border border-white/10 hover:border-[#c5a059] font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
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
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/10 hover:border-[#c5a059] text-gray-300 hover:text-[#c5a059] text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all bg-[#111114]"
          >
            <span>Khám phá thêm các dự án tiêu biểu khác</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

