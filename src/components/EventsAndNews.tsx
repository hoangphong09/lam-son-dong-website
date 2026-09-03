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
    <section id="news-section" className="bg-[#0d0d0f] text-white py-16 sm:py-24 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-[10px] font-mono font-bold text-[#c5a059] uppercase tracking-[0.3em] bg-[#c5a059]/10 border border-[#c5a059]/30 px-3.5 py-1">
            BẢN TIN HOẠT ĐỘNG
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mt-4 font-['Plus_Jakarta_Sans']">
            Sự Kiện & Tin Tức
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            Cập nhật những hoạt động đào tạo, diễn tập võ thuật, sự kiện nội bộ và tin tức mới nhất từ Lâm Sơn Động Security.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            id="tab-events-btn"
            onClick={() => setActiveTab('events')}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === 'events'
                ? 'bg-[#c5a059] text-black font-black'
                : 'bg-[#111114] text-gray-300 hover:text-white border border-white/10'
            }`}
          >
            Sự Kiện Tiêu Biểu
          </button>
          <button
            id="tab-news-btn"
            onClick={() => setActiveTab('news')}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === 'news'
                ? 'bg-[#c5a059] text-black font-black'
                : 'bg-[#111114] text-gray-300 hover:text-white border border-white/10'
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
            className="lg:col-span-7 bg-[#111114] border border-white/5 hover:border-[#c5a059]/50 transition-all flex flex-col justify-between group overflow-hidden"
          >
            <div>
              <div className="relative h-64 sm:h-80 overflow-hidden bg-black">
                <img
                  src={featuredNews.imageUrl}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 text-[9px] font-mono font-bold uppercase text-black bg-[#c5a059] px-3 py-1 tracking-wider">
                  {featuredNews.category}
                </span>
                <span className="absolute bottom-4 left-4 text-[10px] font-mono text-gray-300 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 border border-white/10">
                  <Calendar className="w-3 h-3 text-[#c5a059]" />
                  {featuredNews.date}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#c5a059] transition-colors leading-snug uppercase tracking-wide">
                  {featuredNews.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-light mt-3 leading-relaxed">
                  {featuredNews.summary}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <button
                onClick={() => onSelectNews(featuredNews)}
                className="py-2.5 px-6 bg-[#c5a059] hover:brightness-110 text-black font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
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
                className="bg-[#111114] border border-white/5 hover:border-[#c5a059]/50 transition-all p-5 flex flex-col justify-between group"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-36 h-28 shrink-0 overflow-hidden bg-black border border-white/5">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 brightness-90"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono mb-1">
                      <span className="font-bold text-[#c5a059] uppercase">{item.category}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#c5a059] transition-colors leading-snug line-clamp-2 uppercase tracking-wide">
                      {item.title}
                    </h4>

                    <p className="text-xs text-gray-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => onSelectNews(item)}
                    className="text-[10px] font-black uppercase tracking-widest text-[#c5a059] hover:text-white flex items-center gap-1 transition-colors"
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
            className="px-6 py-3 bg-[#111114] border border-white/10 hover:border-[#c5a059] text-gray-300 hover:text-[#c5a059] font-bold text-xs uppercase tracking-widest transition-all"
          >
            Xem thêm toàn bộ sự kiện & hoạt động
          </button>
        </div>
      </div>
    </section>
  );
};

