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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 shadow-2xl rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <BellRing className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-white">
                {newsItem ? 'Chỉnh Sửa Tin Nhanh' : 'Thêm Bản Tin Nhanh Mới'}
              </h3>
              <p className="text-[11px] text-slate-300 font-sans">
                Thanh thông báo chạy chữ (Breaking News Ticker) dưới banner trang chủ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMessage && (
            <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Real-time Ticker Preview */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Eye className="w-3 h-3 text-amber-600" />
                Xem trước giao diện Ticker trên trang chủ
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
              }`}>
                {isActive ? 'Đang kích hoạt' : 'Đang tạm dừng'}
              </span>
            </div>
            <div className="bg-white border border-slate-200 py-2 px-3 rounded flex items-center gap-3 overflow-hidden shadow-xs">
              <div className="flex items-center gap-1.5 bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                <span>TIN NHANH:</span>
              </div>
              <p className="text-xs text-slate-700 truncate font-sans">
                {title.trim() || 'Nội dung thông báo hoặc sự kiện khẩn cấp sẽ hiển thị tại đây...'}
              </p>
            </div>
          </div>

          {/* Title input */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Tiêu đề bản tin nhanh <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Lâm Sơn Động Security vinh dự đón nhận Cúp Vàng Doanh Nghiệp An Ninh Tiêu Biểu..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 font-sans leading-relaxed"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Khuyến nghị từ 40 - 140 ký tự để hiển thị trọn vẹn và trang trọng trên mọi kích thước màn hình.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Link input */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Link2 className="w-3.5 h-3.5 text-amber-600" />
                Đường dẫn liên kết (Tùy chọn)
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="VD: #featured-services-section hoặc https://..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Để trống để mở cửa sổ chi tiết thông báo khẩn cấp mặc định.
              </p>
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-600" />
                Thứ tự hiển thị (Ưu tiên)
              </label>
              <input
                type="number"
                min={1}
                max={999}
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Số nhỏ hơn sẽ hiển thị trước trong vòng lặp chạy chữ.
              </p>
            </div>
          </div>

          {/* Active status toggle */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 accent-amber-600"
              />
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 block">
                  Kích hoạt hiển thị trên Ticker trang chủ
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Nếu tắt, tin này sẽ được lưu trữ trong danh sách quản trị nhưng không xuất hiện trên thanh tin nhanh.
                </span>
              </div>
            </label>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-[#c5a059] hover:bg-[#b8860b] disabled:opacity-50 rounded transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Đang lưu...' : 'Lưu Tin Nhanh'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
