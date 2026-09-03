import React, { useState, useEffect } from 'react';
import { PhoneCall, ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  onOpenQuote: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenQuote }) => {
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
    <div id="floating-actions-container" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      {/* Hotline 24/7 Call Pulse Button */}
      <a
        id="float-hotline-btn"
        href="tel:0908113888"
        title="Gọi Hotline khẩn cấp 24/7"
        className="relative flex items-center justify-center w-12 h-12 bg-white border-2 border-amber-600 text-amber-700 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all group"
      >
        {/* Radar wave animation */}
        <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-25"></span>
        <PhoneCall className="w-5 h-5 relative z-10" />
      </a>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          id="float-backtotop-btn"
          onClick={scrollToTop}
          title="Lên đầu trang"
          className="w-10 h-10 bg-white hover:bg-[#c5a059] text-slate-700 hover:text-slate-950 border border-slate-300 rounded-full flex items-center justify-center shadow-lg transition-all"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
