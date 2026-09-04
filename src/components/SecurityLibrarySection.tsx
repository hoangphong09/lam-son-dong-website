import React from 'react';
import { BookOpen, Calendar, ArrowRight, FileText } from 'lucide-react';
import { RESEARCH_ARTICLES } from '../data/mockData';
import { ResearchArticle } from '../types';

interface SecurityLibrarySectionProps {
  onSelectArticle: (article: ResearchArticle) => void;
}

export const SecurityLibrarySection: React.FC<SecurityLibrarySectionProps> = ({ onSelectArticle }) => {
  return (
    <section id="library-section" className="bg-white text-slate-900 py-16 sm:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans']">
            Thư Viện - Nghiên Cứu Chuyên Sâu & Cẩm Nang PCCC
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Nơi tập hợp tri thức nghiệp vụ đúc kết từ thực tiễn hoạt động của đội ngũ chuyên gia an ninh Lâm Sơn Động, cung cấp góc nhìn chuyên sâu và cẩm nang phòng ngừa rủi ro cho doanh nghiệp.
          </p>
        </div>

        {/* 3 Columns Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESEARCH_ARTICLES.map((art) => (
            <div
              key={art.id}
              id={`library-card-${art.id}`}
              className="bg-white border border-slate-200 hover:border-amber-500 rounded p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-md"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#c5a059] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

              <div>
                {/* Category & Date */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                    <Calendar className="w-3 h-3 text-amber-700" />
                    {art.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug uppercase tracking-wide">
                  {art.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 font-normal mt-3 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>

                {/* Author */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                  <FileText className="w-3.5 h-3.5 text-amber-700" />
                  <span>Tác giả: <strong className="text-slate-800 font-semibold">{art.author}</strong></span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <button
                  id={`view-article-${art.id}`}
                  onClick={() => onSelectArticle(art)}
                  className="w-full py-2.5 bg-slate-50 hover:bg-[#c5a059] border border-slate-200 hover:border-[#b8860b] text-slate-800 hover:text-slate-950 font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 rounded shadow-xs"
                >
                  <span>Xem tài liệu đầy đủ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
