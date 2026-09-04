import React, { useState, useEffect } from 'react';
import { X, Save, Eye, BellRing, Link2, ArrowUpDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { BreakingNewsItem } from '../../types';

interface BreakingNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (news: Partial<BreakingNewsItem>) => Promise<{ success: boolean; error?: string }>;
  newsItem?: BreakingNewsItem | null;
  defaultOrder?: number;
}

export const BreakingNewsModal: React.FC<BreakingNewsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  newsItem,
  defaultOrder = 1,
}) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(defaultOrder);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (newsItem) {
      setTitle(newsItem.title || '');
      setLink(newsItem.link || '');
      setDisplayOrder(Number(newsItem.display_order) || 1);
      setIsActive(newsItem.is_active !== false);
    } else {
      setTitle('');
      setLink('');
      setDisplayOrder(defaultOrder);
      setIsActive(true);
    }
    setErrorMessage(null);
  }, [newsItem, isOpen, defaultOrder]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setErrorMessage('Vui lòng nhập tiêu đề bản tin nhanh');
      return;
    }

    if (trimmedTitle.length < 5) {
      setErrorMessage('Tiêu đề bản tin nên có độ dài tối thiểu 5 ký tự');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: Partial<BreakingNewsItem> = {
        title: trimmedTitle,
        link: link.trim(),
        display_order: Number(displayOrder) || 1,
        is_active: isActive,
      };

      if (newsItem?.id) {
        payload.id = newsItem.id;
      }

      const res = await onSave(payload);
      if (!res.success) {
        setErrorMessage(res.error || 'Có lỗi xảy ra khi lưu tin nhanh');
      } else {
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi xử lý dữ liệu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-200 bg-gradient-to-r from-slate-950 to-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 pr-6">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
              <BellRing className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider font-mono text-white">
                {newsItem ? 'Chỉnh Sửa Tin Nhanh' : 'Thêm Bản Tin Nhanh Mới'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
                Thanh thông báo chạy chữ (Breaking News Ticker) dưới banner trang chủ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="w-9 h-9 sm:w-10 sm:h-10 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {errorMessage && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Real-time Ticker Preview */}
          <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-600" />
                Xem trước giao diện Ticker trên trang chủ
              </span>
              <span className={`text-[11px] font-mono px-2.5 py-1 rounded-md font-bold uppercase ${
                isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
              }`}>
                {isActive ? 'Đang kích hoạt' : 'Đang tạm dừng'}
              </span>
            </div>
            <div className="bg-white border border-slate-200 py-3 px-4 rounded-lg flex items-center gap-3 overflow-hidden shadow-2xs">
              <div className="flex items-center gap-1.5 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                <span>TIN NHANH:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 truncate font-sans font-medium">
                {title.trim() || 'Nội dung thông báo hoặc sự kiện khẩn cấp sẽ hiển thị tại đây...'}
              </p>
            </div>
          </div>

          {/* Title input */}
          <div>
            <label className="block text-xs sm:text-sm font-mono font-bold text-slate-800 uppercase tracking-wider mb-2">
              Tiêu đề bản tin nhanh <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Lâm Sơn Động Security vinh dự đón nhận Cúp Vàng Doanh Nghiệp An Ninh Tiêu Biểu..."
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm sm:text-base text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 font-sans leading-relaxed transition-all"
            />
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Khuyến nghị từ 40 - 140 ký tự để hiển thị trọn vẹn và trang trọng trên mọi kích thước màn hình.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Link input */}
            <div>
              <label className="block text-xs sm:text-sm font-mono font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-amber-600" />
                Đường dẫn liên kết (Tùy chọn)
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="VD: #featured-services-section hoặc https://..."
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 font-mono transition-all"
              />
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Để trống để mở cửa sổ chi tiết thông báo mặc định.
              </p>
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-xs sm:text-sm font-mono font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ArrowUpDown className="w-4 h-4 text-amber-600" />
                Thứ tự hiển thị (Ưu tiên)
              </label>
              <input
                type="number"
                min={1}
                max={999}
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 font-mono transition-all"
              />
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Số nhỏ hơn sẽ hiển thị trước trong vòng lặp chạy chữ.
              </p>
            </div>
          </div>

          {/* Active status toggle */}
          <div className="pt-3 border-t border-slate-200">
            <label className="flex items-start gap-3.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-5 h-5 mt-0.5 text-amber-600 rounded border-slate-300 focus:ring-amber-500 accent-amber-600"
              />
              <div>
                <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-900 block">
                  Kích hoạt hiển thị trên Ticker trang chủ
                </span>
                <span className="text-xs text-slate-500 block mt-0.5 leading-relaxed">
                  Nếu tắt, tin này sẽ được lưu trữ trong danh sách quản trị nhưng không xuất hiện trên thanh tin nhanh.
                </span>
              </div>
            </label>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3.5 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-950 bg-[#c5a059] hover:bg-[#b8860b] disabled:opacity-50 rounded-lg transition-colors shadow-sm hover:shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Đang lưu...' : 'Lưu Tin Nhanh'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
