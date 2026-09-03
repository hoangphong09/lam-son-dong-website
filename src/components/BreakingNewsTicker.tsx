import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { BREAKING_NEWS } from '../data/mockData';

interface BreakingNewsTickerProps {
  onOpenNewsModal: (newsText: string) => void;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({ onOpenNewsModal }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % BREAKING_NEWS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="breaking-news-ticker-section" className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Ticker Content */}
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
          {/* Gold Pill Badge */}
          <div className="flex items-center gap-1.5 bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-[0.25em] px-2.5 py-1 rounded shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
            <span>TIN NHANH:</span>
          </div>

          {/* Scrolling text */}
          <div className="overflow-hidden relative h-6 flex items-center flex-1">
            <p 
              key={currentIdx}
              className="text-xs sm:text-sm font-normal text-slate-700 truncate animate-in fade-in slide-in-from-bottom-2 duration-300 hover:text-amber-800 cursor-pointer tracking-normal"
              onClick={() => onOpenNewsModal(BREAKING_NEWS[currentIdx])}
            >
              {BREAKING_NEWS[currentIdx]}
            </p>
          </div>
        </div>

        {/* Action button */}
        <button
          id="ticker-read-more-btn"
          onClick={() => onOpenNewsModal(BREAKING_NEWS[currentIdx])}
          className="shrink-0 flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 px-3 py-1 border border-slate-300 hover:border-amber-600 transition-all rounded shadow-xs"
        >
          <span>Chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5 text-amber-700" />
        </button>
      </div>
    </section>
  );
};
