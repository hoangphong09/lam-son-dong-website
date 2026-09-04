import React, { useState, useEffect } from 'react';
import { X, Save, Eye, DollarSign, Layers, Tag, FileText, CheckCircle2, AlertCircle, ArrowUpDown } from 'lucide-react';
import { QuoteOption, QuoteOptionCategory } from '../../types';

interface QuoteOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (option: Partial<QuoteOption>) => Promise<{ success: boolean; error?: string }>;
  option?: QuoteOption | null;
}

export const QuoteOptionModal: React.FC<QuoteOptionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  option,
}) => {
  const [category, setCategory] = useState<QuoteOptionCategory>('target_objective');
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [priceEstimate, setPriceEstimate] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (option) {
      setCategory((option.category as QuoteOptionCategory) || 'target_objective');
      setLabel(option.label || '');
      setValue(option.value || '');
      setPriceEstimate(Number(option.price_estimate) || 0);
      setDescription(option.description || '');
      setDisplayOrder(Number(option.display_order) || 1);
      setIsActive(option.is_active !== false);
    } else {
      setCategory('target_objective');
      setLabel('');
      setValue('');
      setPriceEstimate(0);
      setDescription('');
      setDisplayOrder(1);
      setIsActive(true);
    }
    setErrorMessage(null);
  }, [option, isOpen]);

  if (!isOpen) return null;

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleLabelChange = (newLabel: string) => {
    setLabel(newLabel);
    // If value is empty or was auto-generated, suggest a clean slug
    if (!option && (!value || value === label.toLowerCase().replace(/\s+/g, '_').slice(0, 15))) {
      const slug = newLabel
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '')
        .slice(0, 20);
      setValue(slug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) {
      setErrorMessage('Vui lòng nhập Tiêu đề / Nhãn hiển thị!');
      return;
    }

    const finalValue = value.trim() || label.toLowerCase().replace(/\s+/g, '_').slice(0, 20);

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload: Partial<QuoteOption> = {
      ...(option?.id ? { id: option.id } : {}),
      category,
      label: label.trim(),
      value: finalValue,
      price_estimate: Number(priceEstimate) || 0,
      description: description.trim(),
      display_order: Number(displayOrder) || 1,
      is_active: isActive,
    };

    const res = await onSave(payload);
    setIsSubmitting(false);

    if (res.success) {
      onClose();
    } else {
      setErrorMessage(res.error || 'Đã có lỗi xảy ra khi lưu tùy chọn');
    }
  };

  const categoryLabels: Record<QuoteOptionCategory, { title: string; hint: string }> = {
    target_objective: {
      title: 'Loại hình mục tiêu (Target Objective)',
      hint: 'Ví dụ: Nhà máy KCN, Tòa nhà cao ốc, Showroom TTTM, Vệ sĩ VIP',
    },
    pricing_tier: {
      title: 'Đơn giá vị trí / Ca trực (Pricing Tier)',
      hint: 'Ví dụ: Chốt 24/24 (3 ca/ngày), Chốt 12/24, Ca sự kiện theo giờ',
    },
    service_type: {
      title: 'Gói dịch vụ & Tiện ích kèm theo (Service Package / Add-on)',
      hint: 'Ví dụ: Chứng chỉ PCCC, Smart Patrol GPS, Bodycam ban đêm, Chó nghiệp vụ K9',
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-slate-200 w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl text-slate-900 rounded-xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 border border-amber-300 bg-amber-50 rounded-lg flex items-center justify-center text-amber-800 shadow-2xs shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans']">
                {option ? 'Chỉnh Sửa Tùy Chọn Báo Giá' : 'Thêm Tùy Chọn Báo Giá Mới'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
                Cấu hình mục tiêu, đơn giá ca trực và gói tiện ích trên bảng tính
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Đóng"
            className="w-9 h-9 sm:w-10 sm:h-10 border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-all rounded-lg shadow-2xs cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 flex-1">
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-300 text-rose-800 text-xs sm:text-sm rounded-lg flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          {/* 1. Category selector */}
          <div>
            <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-700" />
              Nhóm danh mục <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {(['target_objective', 'pricing_tier', 'service_type'] as QuoteOptionCategory[]).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`p-3.5 text-left border rounded-lg text-xs transition-all cursor-pointer ${
                    category === cat
                      ? 'border-[#c5a059] bg-amber-50/80 font-bold text-slate-950 shadow-xs ring-2 ring-[#c5a059]/40'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold uppercase tracking-wider text-xs sm:text-[13px] text-slate-900">
                    {cat === 'target_objective' && '1. Mục tiêu'}
                    {cat === 'pricing_tier' && '2. Đơn vị / Ca'}
                    {cat === 'service_type' && '3. Tiện ích kèm'}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-normal mt-1 line-clamp-1">
                    {cat === 'target_objective' && 'Loại hình bảo vệ'}
                    {cat === 'pricing_tier' && 'Mức phí theo vị trí'}
                    {cat === 'service_type' && 'Gói bổ trợ an ninh'}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 italic mt-2">
              {categoryLabels[category]?.hint}
            </p>
          </div>

          {/* 2. Label & Value */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-700" />
                Tiêu đề / Nhãn hiển thị <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={label}
                onChange={(e) => handleLabelChange(e.target.value)}
                placeholder="VD: Nhà máy / Khu Công Nghiệp"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-sm sm:text-base rounded-lg focus:outline-hidden transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                Mã hệ thống (Value / Key) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="VD: kcn, guard_24h, addon_pccc"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-mono rounded-lg focus:outline-hidden transition-all"
              />
            </div>
          </div>

          {/* 3. Price Estimate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-700" />
                Đơn giá dự toán (VNĐ)
              </label>
              <span className="text-xs sm:text-sm font-mono font-bold text-amber-800">
                {priceEstimate > 0 ? formatVND(priceEstimate) : '0 VNĐ (Không tính thêm phí)'}
              </span>
            </div>
            <input
              type="number"
              min="0"
              step="50000"
              value={priceEstimate}
              onChange={(e) => setPriceEstimate(Number(e.target.value) || 0)}
              placeholder="0"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-sm font-mono rounded-lg focus:outline-hidden transition-all"
            />
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              <span className="text-xs text-slate-500 font-mono mr-1 self-center">Chọn nhanh:</span>
              {[
                { label: '0 đ', val: 0 },
                { label: '500.000 đ', val: 500000 },
                { label: '800.000 đ', val: 800000 },
                { label: '1.200.000 đ', val: 1200000 },
                { label: '3.500.000 đ', val: 3500000 },
                { label: '9.500.000 đ', val: 9500000 },
                { label: '16.500.000 đ', val: 16500000 },
              ].map((preset) => (
                <button
                  type="button"
                  key={preset.val}
                  onClick={() => setPriceEstimate(preset.val)}
                  className={`text-xs font-mono px-2.5 py-1 border rounded-md transition-all cursor-pointer ${
                    priceEstimate === preset.val
                      ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold shadow-2xs'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Description */}
          <div>
            <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-700" />
              Mô tả chi tiết giải pháp & phạm vi nghiệp vụ
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả quyền lợi, giải pháp kỹ thuật hoặc tính chất nghiệp vụ của tùy chọn..."
              className="w-full p-4 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs sm:text-sm leading-relaxed rounded-lg focus:outline-hidden transition-all resize-none"
            />
          </div>

          {/* 5. Display Order & Active Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-800 font-bold mb-2 flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-amber-700" />
                Thứ tự hiển thị
              </label>
              <input
                type="number"
                min="1"
                max="99"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-mono rounded-lg focus:outline-hidden transition-all"
              />
            </div>

            <div className="flex items-center sm:pt-6">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-5 h-5 accent-[#c5a059] rounded cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">
                  Kích hoạt hiển thị trên form báo giá
                </span>
              </label>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
              <Eye className="w-4 h-4 text-amber-700" />
              Xem trước hiển thị trên giao diện người dùng
            </div>
            <div className="bg-white p-4 border border-slate-300 rounded-lg shadow-xs flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">{label || 'Tiêu đề tùy chọn'}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-md">
                    {value || 'code'}
                  </span>
                </div>
                {description && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{description}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs sm:text-sm font-mono font-bold text-amber-800">
                  {priceEstimate > 0 ? formatVND(priceEstimate) : 'Mặc định'}
                </span>
                <span className="block text-[11px] text-slate-400 font-mono">
                  Thứ tự: #{displayOrder}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 sm:py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 sm:px-7 py-2.5 sm:py-3 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Đang lưu...' : 'Lưu Tùy Chọn'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
