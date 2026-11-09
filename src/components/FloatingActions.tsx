import React, { useState, useEffect } from 'react';
import { PhoneCall, ArrowUp } from 'lucide-react';
import { trackHotlineClick, trackZaloChatClick } from '../lib/analytics';

interface FloatingActionsProps {
  onOpenQuote?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="floating-actions-container"
      className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3 select-none pointer-events-auto"
    >
      {/* 1. Chat Zalo 24/7 Quick Connect Button */}
      <a
        id="float-zalo-btn"
        href="https://zalo.me/0985507624"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackZaloChatClick('floating_button')}
        title="Chat Zalo 24/7 - Nhận báo giá tức thì"
        aria-label="Chat Zalo 24/7"
        className="relative group flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
      >
        {/* Tooltip / Label: Chỉ hiển thị khi hover vào icon zalo */}
        <span className="pointer-events-none absolute right-full mr-3 px-3 py-1.5 bg-slate-900/95 backdrop-blur-xs text-white text-xs font-bold rounded-xl shadow-xl border border-slate-700 whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-200">
          Chat Zalo 24/7
        </span>

        {/* Circular Button Icon */}
        <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-[#0068FF] shadow-lg flex items-center justify-center p-1.5 overflow-hidden transition-transform group-hover:shadow-[#0068FF]/30">
          <span className="absolute inset-0 rounded-full bg-[#0068FF] animate-ping opacity-20 pointer-events-none" />
          <img
            src="/images/zalo.svg"
            alt="Chat Zalo 24/7 Bảo Vệ Lâm Sơn Động"
            className="w-full h-full object-contain relative z-10"
            width="40"
            height="40"
          />
        </div>
      </a>

      {/* 2. Hotline 24/7 Call Pulse Button */}
      <a
        id="float-hotline-btn"
        href="tel:0985507624"
        onClick={() => trackHotlineClick('floating_button')}
        title="Gọi Hotline khẩn cấp 24/7: 0985.507.624"
        aria-label="Gọi Hotline 0985.507.624"
        className="relative group flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
      >
        {/* Tooltip / Label: Chỉ hiển thị khi hover vào icon phone */}
        <span className="pointer-events-none absolute right-full mr-3 px-3 py-1.5 bg-slate-900/95 backdrop-blur-xs text-amber-300 text-xs font-mono font-bold rounded-xl shadow-xl border border-slate-700 whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-200">
          Hotline: 0985.507.624
        </span>

        {/* Circular Button Icon */}
        <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 text-white border-2 border-amber-300 shadow-lg flex items-center justify-center transition-transform group-hover:from-amber-500 group-hover:to-amber-600">
          <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-30 pointer-events-none" />
          <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 text-white animate-bounce-subtle" />
        </div>
      </a>

      {/* 3. Back to top button */}
      {showBackToTop && (
        <button
          id="float-backtotop-btn"
          type="button"
          onClick={scrollToTop}
          title="Lên đầu trang"
          aria-label="Cuộn lên đầu trang"
          className="w-10 h-10 bg-white hover:bg-[#c5a059] text-slate-700 hover:text-slate-950 border border-slate-300 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
