import React, { useState, useEffect } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { BreakingNewsItem } from '../types';
import { getBreakingNews } from '../lib/supabase';

interface BreakingNewsTickerProps {
  newsItems?: BreakingNewsItem[];
  onOpenNewsModal: (newsText: string) => void;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({ newsItems, onOpenNewsModal }) => {
  const [items, setItems] = useState<BreakingNewsItem[]>(newsItems || []);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (newsItems && newsItems.length > 0) {
      setItems(newsItems);
    } else {
      getBreakingNews().then((data) => {
        setItems(data);
      });
    }
  }, [newsItems]);

  // Filter only active items and sort by display_order
  const activeItems = items
    .filter((item) => item.is_active !== false)
    .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));

  useEffect(() => {
    if (activeItems.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activeItems.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [activeItems.length, isPaused]);

  // Keep index within bounds if active items change
  const currentItem = activeItems[currentIdx % (activeItems.length || 1)] || {
    id: 0,
    title: 'Lâm Sơn Động Security - Hệ thống an ninh chuẩn hóa toàn diện 24/7',
    link: '',
    is_active: true,
    display_order: 1,
  };

  const handleClickItem = () => {
    if (currentItem.link) {
      const link = currentItem.link.trim();
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
    onOpenNewsModal(currentItem.title);
  };

  return (
    <section 
      id="breaking-news-ticker-section" 
      className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8 transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Ticker Content */}
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
          {/* Gold Pill Badge */}
          <div className="flex items-center gap-1.5 bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-[0.25em] px-2.5 py-1 rounded shrink-0 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
            <span>TIN NHANH:</span>
          </div>

          {/* Scrolling / Animated text */}
          <div className="overflow-hidden relative h-6 flex items-center flex-1">
            <p 
              key={currentItem.id}
              className="text-xs sm:text-sm font-normal text-slate-700 truncate animate-in fade-in slide-in-from-bottom-2 duration-300 hover:text-amber-800 cursor-pointer tracking-normal transition-colors"
              onClick={handleClickItem}
              title={currentItem.title}
            >
              {currentItem.title}
            </p>
          </div>
        </div>

        {/* Action button */}
        <button
          id="ticker-read-more-btn"
          onClick={handleClickItem}
          className="shrink-0 flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 px-3 py-1 border border-slate-300 hover:border-amber-600 transition-all rounded shadow-xs"
        >
          <span>Chi tiết</span>
          {currentItem.link && (currentItem.link.startsWith('http') || currentItem.link.startsWith('/')) ? (
            <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-amber-700" />
          )}
        </button>
      </div>
    </section>
  );
};
