import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { NEWS_EVENTS } from '../data/mockData';
import { NewsItem } from '../types';
import { Post } from '../lib/supabase';

interface EventsAndNewsProps {
  onSelectNews: (item: NewsItem) => void;
  posts?: Post[];
}

export const EventsAndNews: React.FC<EventsAndNewsProps> = ({ onSelectNews, posts }) => {
  const newsItems: NewsItem[] = posts && posts.length > 0
    ? posts.filter(p => p.published !== false).map(p => ({
        id: String(p.id),
        title: p.title,
        date: p.created_at ? new Date(p.created_at).toLocaleDateString('vi-VN') : '2026',
        category: p.category || 'Tin tức',
        summary: p.excerpt || p.content.slice(0, 150) + '...',
        content: p.content,
        imageUrl: p.cover_image || '/images/training.jpg',
        isFeatured: true,
      }))
    : NEWS_EVENTS;

  // Only take the 4 newest articles
  const latestFour = newsItems.slice(0, 4);
  const featuredNews = latestFour[0] || NEWS_EVENTS[0];
  const sideNews = latestFour.slice(1, 4);

  return (
    <section id="news-section" className="bg-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 uppercase tracking-wide sm:tracking-wider leading-[1.35] sm:leading-[1.3] font-['Plus_Jakarta_Sans',sans-serif]">
            Sự Kiện & Tin Tức
          </h2>
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Cập nhật những hoạt động đào tạo, diễn tập võ thuật, sự kiện an ninh và tin tức mới nhất từ Lâm Sơn Động Security.
          </p>
        </div>

        {/* 4 Newest Articles Layout: 1 Featured Spotlight (Left) + 3 Stacked Recent (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Big Spotlight Featured Card */}
          {featuredNews && (
            <div 
              id="featured-news-card"
              className="lg:col-span-7 bg-white border border-slate-200 hover:border-amber-500 rounded-2xl transition-all flex flex-col justify-between group overflow-hidden shadow-xs hover:shadow-md"
            >
              <div>
                <div className="relative h-64 sm:h-76 lg:h-[300px] overflow-hidden bg-slate-100">
                  <img
                    src={featuredNews.imageUrl}
                    alt={`Tin tức an ninh: ${featuredNews.title} - Lâm Sơn Động`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/training.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"></div>
                  <span className="absolute top-4 left-4 text-[9px] font-mono font-bold uppercase text-slate-950 bg-[#c5a059] px-3 py-1 tracking-wider rounded-md shadow-xs">
                    {featuredNews.category}
                  </span>
                  <span className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-200 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-xs">
                    <Calendar className="w-3 h-3 text-[#c5a059]" />
                    {featuredNews.date}
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug uppercase tracking-wide">
                    {featuredNews.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal mt-3 leading-relaxed line-clamp-3">
                    {featuredNews.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={() => onSelectNews(featuredNews)}
                  className="py-2.5 px-6 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 rounded-lg shadow-xs hover:shadow cursor-pointer"
                >
                  <span>Đọc bài viết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Right Column: 3 Stacked Recent Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {sideNews.map((item) => (
              <div
                key={item.id}
                id={`side-news-${item.id}`}
                className="bg-white border border-slate-200 hover:border-amber-500 rounded-2xl transition-all p-4 sm:p-5 flex flex-col justify-between group shadow-xs hover:shadow-md flex-1"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                  <div className="w-full sm:w-32 h-28 sm:h-24 shrink-0 overflow-hidden bg-slate-100 border border-slate-200 rounded-xl">
                    <img
                      src={item.imageUrl}
                      alt={`Tin sự kiện: ${item.title} - Lâm Sơn Động`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/training.jpg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mb-1">
                      <span className="font-bold text-amber-800 uppercase">{item.category}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug line-clamp-2 uppercase tracking-wide">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 font-normal mt-1.5 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => onSelectNews(item)}
                    className="text-[10px] font-black uppercase tracking-widest text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Đọc thêm</span>
                    <ArrowRight className="w-3 h-3" />
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
