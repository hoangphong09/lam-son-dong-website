import React, { useState, useEffect } from 'react';
import { HeroSlide } from '../../types';
import { X, Save, Sparkles } from 'lucide-react';
import { PostImageUploader } from './PostImageUploader';

interface HeroSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSlide: HeroSlide) => Promise<void>;
  slide: HeroSlide | null;
}

const SAMPLE_HERO_BG = [
  { label: 'Vệ sĩ VIP Chuyên nghiệp', url: '/images/hero-1.jpg' },
  { label: 'Ký kết & Hợp tác', url: '/images/hero-2.jpg' },
  { label: 'Trung tâm SOC & Tuyển dụng', url: '/images/hero-3.jpg' },
];

export const HeroSlideModal: React.FC<HeroSlideModalProps> = ({
  isOpen,
  onClose,
  onSave,
  slide,
}) => {
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [secondaryCtaText, setSecondaryCtaText] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (slide) {
      setTag(slide.tag || '');
      setTitle(slide.title || '');
      setDescription(slide.description || '');
      setImageUrl(slide.imageUrl || '');
      setCtaText(slide.ctaText || 'Xem phương án an ninh');
      setSecondaryCtaText(slide.secondaryCtaText || 'Yêu cầu khảo sát');
      setCategory(slide.category || 'Mục tiêu cố định');
    }
  }, [slide, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slide) return;

    setIsSubmitting(true);
    try {
      await onSave({
        ...slide,
        tag: tag.trim(),
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        ctaText: ctaText.trim(),
        secondaryCtaText: secondaryCtaText.trim(),
        category: category.trim(),
      });
      onClose();
    } catch (err) {
      console.error('Error saving hero slide:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !slide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white border border-slate-200 w-full max-w-2xl shadow-2xl text-slate-900 relative my-auto max-h-[92vh] flex flex-col rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
              Chỉnh sửa Banner Slide: {slide.id}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="w-9 h-9 sm:w-10 sm:h-10 border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all rounded-lg shadow-2xs cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Tag & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
                Nhãn huy hiệu (Badge Tag)
              </label>
              <input
                type="text"
                required
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="VD: SỰ KIỆN MỚI NHẤT, AN NINH CHIẾN LƯỢC..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-mono font-bold focus:outline-hidden transition-all rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
                Phân loại dịch vụ (Category)
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="VD: Mục tiêu cố định, Vệ sĩ cá nhân..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-mono focus:outline-hidden transition-all rounded-lg"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
              Tiêu đề chính trên Banner (Hero Title) <span className="text-amber-700">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề hiển thị cỡ lớn trên banner chính..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-sm sm:text-base font-bold uppercase focus:outline-hidden transition-all rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
              Mô tả ngắn banner (Description)
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả tóm tắt giải pháp an ninh, số lượng quân số hoặc công nghệ áp dụng..."
              className="w-full p-4 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-normal leading-relaxed focus:outline-hidden transition-all placeholder:text-slate-400 resize-none rounded-lg"
            />
          </div>

          {/* Image Uploader & Media Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
              Hình nền Banner (Background Image) <span className="text-red-500">*</span>
            </label>
            <PostImageUploader
              currentImageUrl={imageUrl}
              onImageChange={(url) => setImageUrl(url)}
              onUploadStateChange={(uploading) => setIsSubmitting(uploading)}
            />
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
                Nút kêu gọi chính (Primary CTA)
              </label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="VD: Xem phương án an ninh"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-mono focus:outline-hidden rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
                Nút phụ (Secondary CTA)
              </label>
              <input
                type="text"
                value={secondaryCtaText}
                onChange={(e) => setSecondaryCtaText(e.target.value)}
                placeholder="VD: Yêu cầu khảo sát"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-mono focus:outline-hidden rounded-lg"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 sm:py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all rounded-lg cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 sm:px-7 py-2.5 sm:py-3 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-2 rounded-lg shadow-sm hover:shadow-md cursor-pointer"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4 text-slate-950" />
              )}
              <span>Lưu thông tin Slide</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
