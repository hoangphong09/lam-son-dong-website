import React, { useState, useEffect } from 'react';
import { X, Save, Eye, Hash, Type, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { StatMetric } from '../../types';

interface StatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (stat: Partial<StatMetric>) => Promise<{ success: boolean; error?: string }>;
  stat?: StatMetric | null;
}

export const StatModal: React.FC<StatModalProps> = ({
  isOpen,
  onClose,
  onSave,
  stat,
}) => {
  const [title, setTitle] = useState('');
  const [numericValue, setNumericValue] = useState('');
  const [unit, setUnit] = useState('+');
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (stat) {
      setTitle(stat.title || '');
      setNumericValue(String(stat.numeric_value || ''));
      setUnit(stat.unit || stat.suffix || '+');
      setDescription(stat.description || '');
      setDisplayOrder(Number(stat.display_order) || 1);
      setIsActive(stat.is_active !== false);
    } else {
      setTitle('');
      setNumericValue('');
      setUnit('+');
      setDescription('');
      setDisplayOrder(1);
      setIsActive(true);
    }
    setErrorMessage(null);
  }, [stat, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !numericValue.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ Tiêu đề và Giá trị số!');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload: Partial<StatMetric> = {
      ...(stat?.id ? { id: stat.id } : {}),
      title: title.trim(),
      numeric_value: numericValue.trim(),
      unit: unit.trim() || '+',
      suffix: unit.trim() || '+',
      description: description.trim(),
      display_order: Number(displayOrder) || 1,
      is_active: isActive,
    };

    const res = await onSave(payload);
    setIsSubmitting(false);

    if (res.success) {
      onClose();
    } else {
      setErrorMessage(res.error || 'Có lỗi xảy ra khi lưu chỉ số. Vui lòng thử lại.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white border border-slate-200 rounded-xl shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 bg-slate-50/90 flex items-center justify-between border-b border-slate-200 shrink-0">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans']">
              {stat ? 'Chỉnh Sửa Chỉ Số Thống Kê' : 'Thêm Mới Chỉ Số Thống Kê'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              Cập nhật số liệu minh chứng năng lực và kinh nghiệm triển khai
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="w-9 h-9 sm:w-10 sm:h-10 border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-950 flex items-center justify-center transition-all rounded-lg shadow-2xs cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2.5 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block font-mono font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
              <Type className="w-4 h-4 text-amber-700" />
              Tiêu Đề Chỉ Số <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Nhân sự bảo vệ & Vệ sĩ, Mục tiêu trọng điểm..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 text-sm sm:text-base focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 font-medium transition-all"
              required
            />
          </div>

          {/* Numeric Value & Unit Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block font-mono font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <Hash className="w-4 h-4 text-amber-700" />
                Giá Trị Số (Numeric Value) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={numericValue}
                onChange={(e) => setNumericValue(e.target.value)}
                placeholder="VD: 300, 100, 20, 99.8"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-base sm:text-lg focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all"
                required
              />
            </div>

            <div>
              <label className="block font-mono font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wider mb-2">
                Đơn Vị / Hậu Tố (Unit/Suffix)
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="VD: +, %, Tỉnh, Tỷ..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-base sm:text-lg focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all"
                />
                <div className="flex flex-wrap gap-1.5">
                  {['+', '%', 'Tỉnh', 'Năm', 'Mục tiêu'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setUnit(preset)}
                      className={`px-2.5 py-1 text-xs font-mono border rounded-md transition-all cursor-pointer ${
                        unit === preset 
                          ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold shadow-2xs' 
                          : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-mono font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-700" />
              Mô Tả Năng Lực Thực Tế
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="VD: Huấn luyện võ thuật, nghiệp vụ, pháp luật định kỳ..."
              className="w-full p-4 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm leading-relaxed focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all resize-none"
            />
          </div>

          {/* Display Order & Visibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <label className="block font-mono font-bold text-slate-700 text-xs sm:text-sm uppercase tracking-wider mb-1.5">
                Thứ Tự Hiển Thị (Display Order)
              </label>
              <input
                type="number"
                min="1"
                max="99"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg font-mono font-bold bg-white text-slate-900 text-sm focus:outline-hidden focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block font-mono font-bold text-slate-700 text-xs sm:text-sm uppercase tracking-wider mb-1.5">
                Trạng Thái Hiển Thị
              </label>
              <label className="flex items-center gap-2.5 mt-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-5 h-5 accent-[#c5a059] rounded cursor-pointer"
                />
                <span className={`font-mono text-xs sm:text-sm font-bold ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {isActive ? 'Đang kích hoạt (Hiển thị)' : 'Tạm ẩn khỏi website'}
                </span>
              </label>
            </div>
          </div>

          {/* Live Preview Card */}
          <div>
            <label className="block font-mono font-bold text-slate-600 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-700" />
              Xem Trước Thẻ (Live Preview)
            </label>
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 text-white flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                    {numericValue || '0'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono">
                    {unit || '+'}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-100 uppercase tracking-wide mt-1.5 font-['Plus_Jakarta_Sans']">
                  {title || 'Tiêu đề chỉ số'}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-3 border-t border-slate-800/80 pt-2.5 font-normal leading-relaxed">
                {description || 'Mô tả ngắn gọn về chỉ số năng lực thực tế...'}
              </div>
              {!isActive && (
                <div className="mt-3 text-xs font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2.5 py-1 rounded-md w-fit">
                  (Thẻ này đang được cài đặt ẩn)
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-bold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            HỦY BỎ
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-bold text-slate-950 bg-[#c5a059] hover:bg-[#b8860b] rounded-lg shadow-sm hover:shadow-md flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'ĐANG LƯU...' : 'LƯU CHỈ SỐ'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
