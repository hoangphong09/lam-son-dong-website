import React from 'react';
import { BookOpen, Calendar, ArrowRight, FileText } from 'lucide-react';
import { RESEARCH_ARTICLES } from '../data/mockData';
import { ResearchArticle } from '../types';

interface SecurityLibrarySectionProps {
  onSelectArticle: (article: ResearchArticle) => void;
}

export const SecurityLibrarySection: React.FC<SecurityLibrarySectionProps> = ({ onSelectArticle }) => {
  return (
    <section id="library-section" className="bg-[#0d0d0f] text-white py-16 sm:py-24 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-mono font-bold text-[#c5a059] uppercase tracking-[0.3em] bg-[#c5a059]/10 border border-[#c5a059]/30 px-3.5 py-1">
            TRI THỨC & NGHIỆP VỤ AN NINH
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mt-4 font-['Plus_Jakarta_Sans']">
            Thư Viện - Nghiên Cứu Chuyên Sâu & Cẩm Nang PCCC
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            Nơi tập hợp tri thức nghiệp vụ đúc kết từ thực tiễn hoạt động của đội ngũ chuyên gia an ninh Lâm Sơn Động, cung cấp góc nhìn chuyên sâu và cẩm nang phòng ngừa rủi ro cho doanh nghiệp.
          </p>
        </div>

        {/* 3 Columns Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESEARCH_ARTICLES.map((art) => (
            <div
              key={art.id}
              id={`library-card-${art.id}`}
              className="bg-[#111114] border border-white/5 hover:border-[#c5a059]/50 p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#c5a059] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

              <div>
                {/* Category & Date */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 px-2 py-0.5">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                    <Calendar className="w-3 h-3 text-[#c5a059]" />
                    {art.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white group-hover:text-[#c5a059] transition-colors leading-snug uppercase tracking-wide">
                  {art.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-gray-400 font-light mt-3 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>

                {/* Author */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-gray-400">
                  <FileText className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Tác giả: <strong className="text-gray-200 font-medium">{art.author}</strong></span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <button
                  id={`view-article-${art.id}`}
                  onClick={() => onSelectArticle(art)}
                  className="w-full py-2.5 bg-black border border-[#c5a059]/40 text-[#c5a059] hover:bg-[#c5a059] hover:text-black font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <span>Xem tài liệu đầy đủ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Explore Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onSelectArticle(RESEARCH_ARTICLES[0])}
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-[#c5a059] text-gray-300 hover:text-[#c5a059] text-xs font-bold uppercase tracking-widest transition-all bg-[#111114] hover:bg-white/5"
          >
            <BookOpen className="w-4 h-4 text-[#c5a059]" />
            <span>Khám phá toàn bộ Thư viện Nghiệp vụ & Cẩm nang</span>
          </button>
        </div>
      </div>
    </section>
  );
};

