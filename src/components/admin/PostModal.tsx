import React, { useState, useEffect } from 'react';
import { Post, generateSlug } from '../../lib/supabase';
import { X, Save, RefreshCw, Image as ImageIcon, Sparkles } from 'lucide-react';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (postData: Partial<Post>) => Promise<void>;
  postToEdit?: Post | null;
}

const CATEGORY_PRESETS = [
  'Tin tức & Sự kiện',
  'Huấn luyện & Đào tạo',
  'Cộng Đồng & Thiện Nguyện',
  'Hợp tác đối tác',
  'Cảnh báo An ninh',
  'An ninh công nghệ 4.0',
];

const SAMPLE_IMAGES = [
  { label: 'Hợp tác chiến lược', url: 'https://i.postimg.cc/RZmRSwWz/115bf4e4-5198-467e-bd43-500b7d169a5b.jpg' },
  { label: 'Đội ngũ vệ sĩ VIP', url: 'https://i.postimg.cc/DZ4sdzS5/0373a718-53f7-48e1-b2c9-9256c37285bc.jpg' },
  { label: 'Diễn tập PCCC & SOC', url: 'https://i.postimg.cc/J0csPHMZ/ba79cc9a-1504-4736-b837-5a813d13a59d.jpg' },
  { label: 'Đào tạo nghiệp vụ', url: 'https://i.postimg.cc/k5dkdVmG/7c332534-4aaa-48bc-9d3b-46c81b752efc.jpg' },
  { label: 'Hoạt động thiện nguyện', url: 'https://i.postimg.cc/ht7BnW74/de994ef0-6599-43b2-bee3-7dfd31b99313.jpg' },
];

export const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  onSave,
  postToEdit,
}) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(CATEGORY_PRESETS[0]);
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [author, setAuthor] = useState('Ban Biên Tập Lâm Sơn Động');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title || '');
      setSlug(postToEdit.slug || '');
      setCategory(postToEdit.category || CATEGORY_PRESETS[0]);
      setExcerpt(postToEdit.excerpt || '');
      setCoverImage(postToEdit.cover_image || '');
      setContent(postToEdit.content || '');
      setPublished(postToEdit.published !== false);
      setAuthor(postToEdit.author || 'Ban Biên Tập Lâm Sơn Động');
      setAutoSlug(false);
    } else {
      setTitle('');
      setSlug('');
      setCategory(CATEGORY_PRESETS[0]);
      setExcerpt('');
      setCoverImage(SAMPLE_IMAGES[0].url);
      setContent('');
      setPublished(true);
      setAuthor('Ban Biên Tập Lâm Sơn Động');
      setAutoSlug(true);
    }
  }, [postToEdit, isOpen]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (autoSlug) {
      setSlug(generateSlug(val));
    }
  };

  const handleGenerateSlug = () => {
    setSlug(generateSlug(title));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onSave({
        title: title.trim(),
        slug: slug.trim() || generateSlug(title),
        category,
        excerpt: excerpt.trim(),
        cover_image: coverImage.trim() || SAMPLE_IMAGES[0].url,
        content: content.trim(),
        published,
        author: author.trim() || 'Ban Biên Tập Lâm Sơn Động',
      });
      onClose();
    } catch (err) {
      console.error('Error submitting post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white border border-slate-200 w-full max-w-3xl shadow-2xl text-slate-900 relative my-auto max-h-[92vh] flex flex-col rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-700 font-bold block mb-1">
              {postToEdit ? 'CẬP NHẬT BÀI ĐĂNG' : 'TẠO MỚI BÀI ĐĂNG'}
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
              {postToEdit ? 'Chỉnh sửa thông tin bài viết' : 'Soạn thảo bài viết mới lên Supabase'}
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Title */}
          <div>
            <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
              Tiêu đề bài viết <span className="text-amber-700">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="Nhập tiêu đề sự kiện, diễn tập, hợp tác an ninh..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-sm sm:text-base focus:outline-hidden transition-all placeholder:text-slate-400 font-medium rounded-lg"
            />
          </div>

          {/* Slug & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold">
                  Đường dẫn (Slug)
                </label>
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="text-xs font-mono text-amber-700 hover:underline flex items-center gap-1.5 font-bold cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Tạo từ tiêu đề
                </button>
              </div>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setAutoSlug(false);
                }}
                placeholder="duong-dan-bai-viet-seo"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-800 text-xs sm:text-sm font-mono focus:outline-hidden transition-all rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
                Chuyên mục
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-mono focus:outline-hidden transition-all rounded-lg cursor-pointer"
              >
                {CATEGORY_PRESETS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cover Image URL & Quick Select */}
          <div>
            <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
              Ảnh bìa (Cover Image URL)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/... hoặc https://i.postimg.cc/..."
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-800 text-xs sm:text-sm font-mono focus:outline-hidden transition-all rounded-lg"
              />
            </div>

            {/* Quick Presets */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-600 font-mono font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Ảnh mẫu:
              </span>
              {SAMPLE_IMAGES.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCoverImage(img.url)}
                  className={`text-xs font-mono px-2.5 py-1 border rounded-md transition-all cursor-pointer ${
                    coverImage === img.url
                      ? 'bg-[#c5a059] text-slate-950 border-[#c5a059] font-bold shadow-2xs'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-400'
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>

            {/* Image Preview Thumbnail */}
            {coverImage && (
              <div className="mt-4 relative h-36 sm:h-44 w-full bg-slate-900 border border-slate-200 overflow-hidden flex items-center justify-center rounded-xl shadow-xs">
                <img
                  src={coverImage}
                  alt="Xem trước ảnh bìa"
                  className="w-full h-full object-cover brightness-95"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/85 px-3 py-1.5 text-xs font-mono text-white border border-slate-700 flex items-center gap-1.5 rounded-md shadow-xs backdrop-blur-xs">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" /> Xem trước ảnh bìa
                </div>
              </div>
            )}
          </div>

          {/* Excerpt / Tóm tắt */}
          <div>
            <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
              Tóm tắt ngắn (Excerpt)
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Tóm tắt ngắn 1-2 câu hiển thị ngoài trang chủ và thẻ tin tức..."
              className="w-full p-4 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-normal leading-relaxed focus:outline-hidden transition-all placeholder:text-slate-400 resize-none rounded-lg"
            />
          </div>

          {/* Full Content */}
          <div>
            <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
              Nội dung bài viết chi tiết <span className="text-amber-700">*</span>
            </label>
            <textarea
              rows={7}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung chi tiết bài viết, các bước thực hiện, diễn biến sự kiện, tuyên bố của lãnh đạo..."
              className="w-full p-4 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-normal leading-relaxed focus:outline-hidden transition-all placeholder:text-slate-400 rounded-lg"
            />
          </div>

          {/* Author & Publish Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-3 border-t border-slate-200">
            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2">
                Tác giả / Ban đăng tin
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-mono focus:outline-hidden rounded-lg"
              />
            </div>

            <div className="flex items-center gap-3.5 pt-2 sm:pt-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-slate-200 border border-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c5a059]"></div>
              </label>
              <span className="text-xs sm:text-sm font-mono font-bold text-slate-800">
                {published ? (
                  <span className="text-emerald-700">Xuất bản công khai</span>
                ) : (
                  <span className="text-amber-800">Lưu bản nháp</span>
                )}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 sm:py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all rounded-lg cursor-pointer"
            >
              Hủy bỏ
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
              <span>{postToEdit ? 'Lưu thay đổi' : 'Đăng bài lên Supabase'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
