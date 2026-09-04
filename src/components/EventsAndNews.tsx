import React, { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { NEWS_EVENTS } from '../data/mockData';
import { NewsItem } from '../types';
import { Post } from '../lib/supabase';

interface EventsAndNewsProps {
  onSelectNews: (item: NewsItem) => void;
  posts?: Post[];
}

export const EventsAndNews: React.FC<EventsAndNewsProps> = ({ onSelectNews, posts }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'news'>('events');

  const newsItems: NewsItem[] = posts && posts.length > 0
    ? posts.filter(p => p.published !== false).map(p => ({
        id: String(p.id),
        title: p.title,
        date: p.created_at ? new Date(p.created_at).toLocaleDateString('vi-VN') : '2026',
        category: p.category || 'Tin tức',
        summary: p.excerpt || p.content.slice(0, 150) + '...',
        imageUrl: p.cover_image || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
        isFeatured: true,
      }))
    : NEWS_EVENTS;

  const featuredNews = newsItems[0] || NEWS_EVENTS[0];
  const sideNews = newsItems.length > 1 ? newsItems.slice(1, 4) : NEWS_EVENTS.slice(1);

  return (
    <section id="news-section" className="bg-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans']">
            Sự Kiện & Tin Tức
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Cập nhật những hoạt động đào tạo, diễn tập võ thuật, sự kiện nội bộ và tin tức mới nhất từ Lâm Sơn Động Security.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            id="tab-events-btn"
            onClick={() => setActiveTab('events')}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded shadow-xs ${
              activeTab === 'events'
                ? 'bg-[#c5a059] text-slate-950 font-black'
                : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-300'
            }`}
          >
            Sự Kiện Tiêu Biểu
          </button>
          <button
            id="tab-news-btn"
            onClick={() => setActiveTab('news')}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded shadow-xs ${
              activeTab === 'news'
                ? 'bg-[#c5a059] text-slate-950 font-black'
                : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-300'
            }`}
          >
            Tin Tức Nổi Bật
          </button>
        </div>

        {/* Layout: Big Left Card + 2 Right Stacked Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Big Left Featured Card */}
          <div 
            id="featured-news-card"
            className="lg:col-span-7 bg-white border border-slate-200 hover:border-amber-500 rounded transition-all flex flex-col justify-between group overflow-hidden shadow-sm hover:shadow-md"
          >
            <div>
              <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-100">
                <img
                  src={featuredNews.imageUrl}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 text-[9px] font-mono font-bold uppercase text-slate-950 bg-[#c5a059] px-3 py-1 tracking-wider rounded shadow-xs">
                  {featuredNews.category}
                </span>
                <span className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-200 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs">
                  <Calendar className="w-3 h-3 text-[#c5a059]" />
                  {featuredNews.date}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug uppercase tracking-wide">
                  {featuredNews.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal mt-3 leading-relaxed">
                  {featuredNews.summary}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <button
                onClick={() => onSelectNews(featuredNews)}
                className="py-2.5 px-6 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 rounded shadow"
              >
                <span>Đọc bài viết</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right 2 Stacked Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sideNews.map((item) => (
              <div
                key={item.id}
                id={`side-news-${item.id}`}
                className="bg-white border border-slate-200 hover:border-amber-500 rounded transition-all p-5 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-36 h-28 shrink-0 overflow-hidden bg-slate-100 border border-slate-200 rounded">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div>
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

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => onSelectNews(item)}
                    className="text-[10px] font-black uppercase tracking-widest text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-colors"
                  >
                    <span>Đọc thêm</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onSelectNews(featuredNews)}
            className="px-6 py-3 bg-white border border-slate-300 hover:border-amber-600 text-slate-700 hover:text-amber-800 font-bold text-xs uppercase tracking-widest transition-all rounded shadow-xs"
          >
            Xem thêm toàn bộ sự kiện & hoạt động
          </button>
        </div>
      </div>
    </section>
  );
};
