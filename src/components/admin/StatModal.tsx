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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white border border-slate-300 rounded shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-bold">
              HIỆU QUẢ THỰC TẾ
            </span>
            <h3 className="text-base font-bold text-white uppercase tracking-wide mt-0.5">
              {stat ? 'Chỉnh Sửa Chỉ Số Thống Kê' : 'Thêm Mới Chỉ Số Thống Kê'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block font-mono font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-amber-700" />
              Tiêu Đề Chỉ Số <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Nhân sự bảo vệ & Vệ sĩ, Mục tiêu trọng điểm..."
              className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus:outline-hidden focus:border-amber-600 focus:ring-1 focus:ring-amber-600 font-medium"
              required
            />
          </div>

          {/* Numeric Value & Unit Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-amber-700" />
                Giá Trị Số (Numeric Value) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={numericValue}
                onChange={(e) => setNumericValue(e.target.value)}
                placeholder="VD: 300, 100, 20, 99.8"
                className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 font-mono font-bold text-base focus:outline-hidden focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                required
              />
            </div>

            <div>
              <label className="block font-mono font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Đơn Vị / Hậu Tố (Unit/Suffix)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="VD: +, %, Tỉnh, Tỷ..."
                  className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 font-mono font-bold text-base focus:outline-hidden focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                />
                <div className="flex gap-1 shrink-0">
                  {['+', '%', 'Tỉnh', 'Năm'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setUnit(preset)}
                      className={`px-2 py-1 text-[10px] font-mono border rounded ${
                        unit === preset 
                          ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold' 
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
            <label className="block font-mono font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-700" />
              Mô Tả Năng Lực Thực Tế
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="VD: Huấn luyện võ thuật, nghiệp vụ, pháp luật định kỳ..."
              className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus:outline-hidden focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>

          {/* Display Order & Visibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-50 border border-slate-200 rounded">
            <div>
              <label className="block font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                Thứ Tự Hiển Thị (Display Order)
              </label>
              <input
                type="number"
                min="1"
                max="99"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono font-bold bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                Trạng Thái Hiển Thị
              </label>
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                />
                <span className={`font-mono font-bold ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {isActive ? 'Đang kích hoạt (Hiển thị)' : 'Tạm ẩn khỏi website'}
                </span>
              </label>
            </div>
          </div>

          {/* Live Preview Card */}
          <div>
            <label className="block font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              Xem Trước Thẻ (Live Preview)
            </label>
            <div className="p-4 bg-slate-900 rounded border border-slate-800 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white font-mono tracking-tight">
                    {numericValue || '0'}
                  </span>
                  <span className="text-xl font-bold text-amber-500 font-mono">
                    {unit || '+'}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-200 uppercase tracking-wide mt-1">
                  {title || 'Tiêu đề chỉ số'}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-2 border-t border-slate-800/80 pt-2 font-light">
                {description || 'Mô tả ngắn gọn về chỉ số năng lực thực tế...'}
              </div>
              {!isActive && (
                <div className="mt-2 text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded w-fit">
                  (Thẻ này đang được cài đặt ẩn)
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-mono font-bold text-slate-700 hover:text-slate-900 border border-slate-300 rounded hover:bg-slate-200 transition-colors"
          >
            HỦY BỎ
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-mono font-bold text-white bg-amber-700 hover:bg-amber-800 rounded shadow-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'ĐANG LƯU...' : 'LƯU CHỈ SỐ'}
          </button>
        </div>
      </div>
    </div>
  );
};
