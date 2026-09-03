import React, { useState, useEffect } from 'react';
import { HeroSlide } from '../../types';
import { X, Save, Image as ImageIcon, Sparkles } from 'lucide-react';

interface HeroSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSlide: HeroSlide) => Promise<void>;
  slide: HeroSlide | null;
}

const SAMPLE_HERO_BG = [
  { label: 'Ký kết & Hợp tác', url: 'https://i.postimg.cc/RZmRSwWz/115bf4e4-5198-467e-bd43-500b7d169a5b.jpg' },
  { label: 'Vệ sĩ VIP Chuyên nghiệp', url: 'https://i.postimg.cc/DZ4sdzS5/0373a718-53f7-48e1-b2c9-9256c37285bc.jpg' },
  { label: 'Trung tâm SOC & Diễn tập', url: 'https://i.postimg.cc/J0csPHMZ/ba79cc9a-1504-4736-b837-5a813d13a59d.jpg' },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#111114] border border-white/15 w-full max-w-2xl shadow-2xl text-white relative my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059] font-bold">
              QUẢN LÝ HERO SECTION
            </span>
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white font-['Plus_Jakarta_Sans']">
              Chỉnh sửa Banner Slide: {slide.id}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border border-white/10 bg-[#0d0d0f] hover:border-[#c5a059] text-gray-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Tag & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                Nhãn huy hiệu (Badge Tag)
              </label>
              <input
                type="text"
                required
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="VD: SỰ KIỆN MỚI NHẤT, AN NINH CHIẾN LƯỢC..."
                className="w-full px-3.5 py-2.5 bg-[#0d0d0f] border border-white/15 focus:border-[#c5a059] text-[#c5a059] text-xs font-mono font-bold focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                Phân loại dịch vụ (Category)
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="VD: Mục tiêu cố định, Vệ sĩ cá nhân..."
                className="w-full px-3.5 py-2.5 bg-[#0d0d0f] border border-white/15 focus:border-[#c5a059] text-white text-xs font-mono focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
              Tiêu đề chính trên Banner (Hero Title) <span className="text-[#c5a059]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề hiển thị cỡ lớn trên banner chính..."
              className="w-full px-4 py-2.5 bg-[#0d0d0f] border border-white/15 focus:border-[#c5a059] text-white text-sm font-bold uppercase focus:outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
              Mô tả ngắn banner (Description)
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả tóm tắt giải pháp an ninh, số lượng quân số hoặc công nghệ áp dụng..."
              className="w-full p-3 bg-[#0d0d0f] border border-white/15 focus:border-[#c5a059] text-white text-xs font-light leading-relaxed focus:outline-none transition-all placeholder:text-gray-600 resize-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
              URL Hình nền Banner (Background Image)
            </label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 bg-[#0d0d0f] border border-white/15 focus:border-[#c5a059] text-white text-xs font-mono focus:outline-none transition-all"
            />

            {/* Quick Presets */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#c5a059]" /> Ảnh sẵn:
              </span>
              {SAMPLE_HERO_BG.map((bg, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImageUrl(bg.url)}
                  className={`text-[10px] font-mono px-2 py-0.5 border transition-all ${
                    imageUrl === bg.url
                      ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:border-[#c5a059]/50'
                  }`}
                >
                  {bg.label}
                </button>
              ))}
            </div>

            {/* Preview Banner */}
            {imageUrl && (
              <div className="mt-3 relative h-36 w-full bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Xem trước banner"
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[9px] font-mono text-[#c5a059] font-bold uppercase">{tag || 'TAG'}</span>
                  <p className="text-xs font-bold text-white uppercase truncate">{title || 'Tiêu đề'}</p>
                </div>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                Nút kêu gọi chính (Primary CTA)
              </label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="VD: Xem phương án an ninh"
                className="w-full px-3.5 py-2 bg-[#0d0d0f] border border-white/15 focus:border-[#c5a059] text-white text-xs font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                Nút phụ (Secondary CTA)
              </label>
              <input
                type="text"
                value={secondaryCtaText}
                onChange={(e) => setSecondaryCtaText(e.target.value)}
                placeholder="VD: Yêu cầu khảo sát"
                className="w-full px-3.5 py-2 bg-[#0d0d0f] border border-white/15 focus:border-[#c5a059] text-white text-xs font-mono focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 text-xs font-mono uppercase tracking-wider transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#d6b26b] text-black font-black text-xs uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5 text-black" />
              )}
              <span>Lưu thông tin Slide</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
