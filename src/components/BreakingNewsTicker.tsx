import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { BreakingNewsItem } from '../types';
import { getBreakingNews, INITIAL_BREAKING_NEWS } from '../lib/supabase';

interface BreakingNewsTickerProps {
  newsItems?: BreakingNewsItem[];
  onOpenNewsModal: (newsText: string) => void;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({ newsItems, onOpenNewsModal }) => {
  const [items, setItems] = useState<BreakingNewsItem[]>(newsItems || []);

  useEffect(() => {
    if (newsItems && newsItems.length > 0) {
      setItems(newsItems);
    } else {
      getBreakingNews().then((data) => {
        if (data && data.length > 0) {
          setItems(data);
        }
      });
    }
  }, [newsItems]);

  // Filter only active items and sort by display_order
  const activeItems = useMemo(() => {
    const valid = items
      .filter((item) => item.is_active !== false)
      .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    return valid.length > 0 ? valid : INITIAL_BREAKING_NEWS;
  }, [items]);

  // Construct a seamless repeating array for infinite smooth sliding marquee
  const tickerItems = useMemo(() => {
    const list: BreakingNewsItem[] = [];
    const repeatCount = Math.max(3, Math.ceil(8 / activeItems.length));
    for (let i = 0; i < repeatCount; i++) {
      list.push(...activeItems);
    }
    // Duplicate the entire sequence for the -50% translateX CSS keyframe
    return [...list, ...list];
  }, [activeItems]);

  const handleItemClick = (item: BreakingNewsItem) => {
    if (item.link) {
      const link = item.link.trim();
      if (link.startsWith('#')) {
        const el = document.getElementById(link.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      } else if (link.startsWith('http://') || link.startsWith('https://')) {
        window.open(link, '_blank', 'noopener,noreferrer');
        return;
      } else if (link.startsWith('/')) {
        window.location.href = link;
        return;
      }
    }
    onOpenNewsModal(item.title);
  };

  const handleViewMore = () => {
    const newsSection = document.getElementById('news-section');
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: 'smooth' });
    } else if (activeItems.length > 0) {
      onOpenNewsModal(activeItems[0].title);
    }
  };

  return (
    <section 
      id="breaking-news-ticker-section" 
      aria-label="Tin nhanh an ninh 24/7"
      className="relative z-30 -mt-6 sm:-mt-7 lg:-mt-8 mb-4 sm:mb-6 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8"
    >
      {/* Prominent floating capsule bar */}
      <div 
        className="ticker-slide-container relative flex items-center justify-between gap-2.5 sm:gap-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl sm:rounded-full border border-amber-500/40 shadow-[0_14px_40px_rgba(0,0,0,0.65)] ring-1 ring-white/10 p-2 sm:p-2.5 pl-3.5 sm:pl-6 overflow-hidden"
      >
        {/* Left Label: "Tin nóng:" with live radar beacon indicator */}
        <div className="flex items-center gap-2 shrink-0 select-none py-1">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-amber-400 tracking-wide font-['Plus_Jakarta_Sans',sans-serif] whitespace-nowrap">
            Tin nóng:
          </span>
        </div>

        {/* Center: Smooth continuous sliding track with soft edge masks */}
        <div className="relative flex-1 overflow-hidden h-7 sm:h-8 flex items-center [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]">
          <div className="ticker-slide-track flex items-center whitespace-nowrap">
            {tickerItems.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`}
                className="inline-flex items-center group/item cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <span className="text-xs sm:text-sm text-slate-100 group-hover/item:text-amber-300 font-medium transition-colors">
                  {item.title}
                </span>
                <span className="mx-5 sm:mx-7 text-amber-500/60 font-bold select-none text-xs">
                  •
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Action Button: "Xem thêm" */}
        <button
          id="ticker-read-more-btn"
          onClick={handleViewMore}
          aria-label="Xem thêm tin tức"
          className="bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-950 font-bold text-xs sm:text-sm px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer whitespace-nowrap hover:scale-105 active:scale-95 flex items-center gap-1 group/btn"
        >
          <span>Xem thêm</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-950 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
