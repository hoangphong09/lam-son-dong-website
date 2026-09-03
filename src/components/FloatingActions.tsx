import React, { useState, useEffect } from 'react';
import { PhoneCall, Calculator, ArrowUp } from 'lucide-react';

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
      {/* Quick Quote Calculator button */}
      {/* Hotline 24/7 Call Pulse Button */}
      <a
        id="float-hotline-btn"
        href="tel:0908113888"
        title="Gọi Hotline khẩn cấp 24/7"
        className="relative flex items-center justify-center w-12 h-12 bg-[#0d0d0f] border border-[#c5a059] text-[#c5a059] shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        {/* Radar wave animation */}
        <span className="absolute inset-0 bg-[#c5a059] animate-ping opacity-20"></span>
        <PhoneCall className="w-5 h-5 relative z-10" />
      </a>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          id="float-backtotop-btn"
          onClick={scrollToTop}
          title="Lên đầu trang"
          className="w-10 h-10 bg-[#111114] hover:bg-[#c5a059] text-gray-400 hover:text-black border border-white/10 flex items-center justify-center shadow-lg transition-all"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

