import React from 'react';
import { X, Calendar, Clock, User, PhoneCall, ArrowRight, ShieldCheck, Share2 } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsDetailModalProps {
  news: NewsItem | null;
  onClose: () => void;
  onOpenConsultation?: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  news,
  onClose,
  onOpenConsultation,
}) => {
  if (!news) return null;

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: news.title,
        text: news.summary,
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép liên kết bài viết vào bộ nhớ tạm!');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 w-[95vw] md:w-[85vw] lg:w-[75vw] max-w-5xl h-[90vh] md:h-[80vh] lg:h-[75vh] flex flex-col shadow-2xl text-slate-900 rounded-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sleek Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng bài viết sự kiện"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all z-20 cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header: Article Metadata & Title */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 bg-white border-b border-slate-100 relative shrink-0 pr-16">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500 mb-2 font-mono">
            <span className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 border border-amber-200 text-[10px]">
              {news.category || 'Sự Kiện & Tin Tức'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              {news.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              {news.readTime || '5 phút đọc'}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
            {news.title}
          </h1>

          <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-500">
            <User className="w-3.5 h-3.5 text-amber-700" />
            <span>Tác giả: <strong className="text-slate-900 font-semibold">{news.author || 'Ban Chỉ Huy Lâm Sơn Động'}</strong></span>
          </div>
        </div>

        {/* Modal Body - Editorial Article Format */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-7 overflow-y-auto flex-1 text-slate-800 leading-relaxed font-sans">
          {/* Hero Article Image */}
          {news.imageUrl && (
            <div className="w-full h-56 sm:h-72 lg:h-84 rounded-2xl overflow-hidden bg-slate-100 relative shadow-xs shrink-0">
              <img
                src={news.imageUrl}
                alt={news.title}
                loading="lazy"
                decoding="async"
                width={900}
                height={450}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/training.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* Lead Summary Paragraph */}
          {news.summary && (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border-l-4 border-[#c5a059] text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {news.summary}
            </div>
          )}

          {/* Main Article Content Paragraphs */}
          {news.content && (
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-normal space-y-4">
              {news.content}
            </div>
          )}

          {/* Structured Sections if available */}
          {news.sections && news.sections.length > 0 && (
            <div className="space-y-6 pt-2">
              {news.sections.map((sec, idx) => (
                <section key={idx} className="space-y-3">
                  <h2 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                    {sec.heading}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                    {sec.body}
                  </p>
                </section>
              ))}
            </div>
          )}

          {/* Expert Takeaway Callout Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Giá Trị Thực Tiễn & Tinh Thần Lâm Sơn Động</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Mỗi sự kiện huấn luyện, chiến công nghiệp vụ hay hoạt động hợp tác đều là minh chứng sống động cho tôn chỉ hoạt động của Lâm Sơn Động: Kỷ luật thép - Tác phong chuẩn mực - Trách nhiệm pháp lý vững chắc. Chúng tôi không ngừng nâng cao chuẩn mực an ninh nhằm mang lại sự an tâm tuyệt đối và bảo toàn trọn vẹn tài sản cho quý đối tác, quý doanh nghiệp.
            </p>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 md:p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 transition-colors text-xs font-mono cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Chia sẻ bài viết</span>
            </button>
            <span className="hidden sm:inline">• Tin tức an ninh & sự kiện</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            {/* Hotline */}
            <a
              href="tel:0339269524"
              className="h-11 sm:h-12 px-4 sm:px-5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
            >
              <PhoneCall className="w-4 h-4 text-amber-700" />
              <span className="font-mono font-bold tracking-tight">0339.269.524</span>
            </a>

            {/* Consultation */}
            <button
              onClick={() => {
                onClose();
                if (onOpenConsultation) {
                  onOpenConsultation();
                }
              }}
              className="h-11 sm:h-12 px-5 sm:px-6 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all rounded-xl shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
            >
              <span>Đăng Ký Tư Vấn An Ninh</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
