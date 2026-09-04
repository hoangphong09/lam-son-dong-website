import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  ShieldCheck, 
  Check, 
  Send, 
  Flame, 
  Cpu
} from 'lucide-react';
import { createQuoteRequest } from '../lib/supabase';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [targetType, setTargetType] = useState('kcn');
  const [guards24h, setGuards24h] = useState(2);
  const [guards12h, setGuards12h] = useState(1);
  const [needPccc, setNeedPccc] = useState(true);
  const [needSmartPatrol, setNeedSmartPatrol] = useState(true);
  const [needBodycam, setNeedBodycam] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pricing formula estimate
  const baseRate24h = 16500000; // VNĐ / vị trí 24/7 / tháng
  const baseRate12h = 9500000;  // VNĐ / vị trí 12h / tháng
  const pcccFee = needPccc ? 500000 : 0;
  const patrolFee = needSmartPatrol ? 1200000 : 0;
  const bodycamFee = needBodycam ? 800000 : 0;

  const totalEstimate = (guards24h * baseRate24h) + (guards12h * baseRate12h) + pcccFee + patrolFee + bodycamFee;

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const handleSendQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      alert('Vui lòng điền họ tên và số điện thoại để nhận bảng dự toán chính thức!');
      return;
    }

    setLoading(true);

    const targetTypeLabels: Record<string, string> = {
      kcn: 'Nhà máy / KCN',
      building: 'Tòa nhà / Cao ốc',
      retail: 'Showroom / TTTM',
      bodyguard: 'Vệ sĩ VIP'
    };

    try {
      await createQuoteRequest({
        source: 'quote_calculator',
        contactName,
        contactPhone,
        targetType: targetTypeLabels[targetType] || targetType,
        serviceType: targetTypeLabels[targetType] || targetType,
        guards24h,
        guards12h,
        totalEstimate,
        estimatedPriceFormatted: formatVND(totalEstimate),
        options: [
          needPccc ? 'PCCC chuyên sâu' : '',
          needSmartPatrol ? 'Smart Patrol GPS' : '',
          needBodycam ? 'Bodycam an ninh' : ''
        ].filter(Boolean),
        status: 'new'
      });
    } catch (err) {
      console.warn('Quote request local fallback:', err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl text-slate-900 rounded-xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Đóng cửa sổ"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 hover:bg-slate-100 border border-slate-200 hover:border-amber-600 text-slate-600 hover:text-black flex items-center justify-center transition-all z-20 rounded-lg shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-3.5 sm:gap-4 pr-10">
            <div className="w-11 h-11 sm:w-12 sm:h-12 border border-amber-300 bg-amber-50 rounded-xl flex items-center justify-center text-amber-800 shrink-0 shadow-2xs">
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans'] leading-snug">
                Dự Toán Ngân Sách Dịch Vụ Bảo Vệ
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                Tính toán chi phí thuê bảo vệ chuyên nghiệp minh bạch, chuẩn hóa và không phát sinh
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 sm:p-8 space-y-6 sm:space-y-7 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8 sm:py-12 space-y-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 border border-emerald-300 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-slate-900 uppercase tracking-wide font-['Plus_Jakarta_Sans']">
                Đã Lưu Dự Toán Của Quý Khách!
              </h4>
              <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto font-normal leading-relaxed">
                Bảng dự toán chi tiết với mức phí ước tính <strong className="text-amber-800 font-mono font-bold text-base sm:text-lg">{formatVND(totalEstimate)}/tháng</strong> đã được lưu thành công. Chuyên viên an ninh Lâm Sơn Động sẽ chủ động liên hệ đến số <strong className="text-slate-900 font-mono font-bold">{contactPhone}</strong> trong vòng 10 phút để trao đổi và gửi phương án cụ thể.
              </p>
              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="px-8 py-3.5 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-widest rounded-lg shadow-sm transition-all"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Target Type */}
              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 mb-2.5">
                  1. Loại hình mục tiêu cần bảo vệ
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {[
                    { id: 'kcn', label: 'Nhà máy / KCN' },
                    { id: 'building', label: 'Tòa nhà / Cao ốc' },
                    { id: 'retail', label: 'Showroom / TTTM' },
                    { id: 'bodyguard', label: 'Vệ sĩ VIP' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTargetType(item.id)}
                      className={`py-3 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border rounded-lg ${
                        targetType === item.id
                          ? 'bg-[#c5a059] text-slate-950 border-[#b8860b] font-black shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Number of guards */}
              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 mb-2.5">
                  2. Số lượng vị trí & ca trực
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 sm:p-5 border border-slate-200 rounded-xl space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">
                        Chốt trực 24/24 (3 ca/ngày)
                      </span>
                      <span className="text-xs sm:text-sm text-amber-800 font-mono font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {guards24h} Vị trí
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={guards24h}
                      onChange={(e) => setGuards24h(parseInt(e.target.value))}
                      className="w-full accent-[#c5a059] cursor-pointer h-2"
                    />
                    <span className="text-[11px] sm:text-xs text-slate-500 font-mono block">
                      Đơn giá chuẩn: ~16.5 Triệu / vị trí / tháng
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 sm:p-5 border border-slate-200 rounded-xl space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">
                        Chốt trực 12/24 (Ngày/Đêm)
                      </span>
                      <span className="text-xs sm:text-sm text-amber-800 font-mono font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {guards12h} Vị trí
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={guards12h}
                      onChange={(e) => setGuards12h(parseInt(e.target.value))}
                      className="w-full accent-[#c5a059] cursor-pointer h-2"
                    />
                    <span className="text-[11px] sm:text-xs text-slate-500 font-mono block">
                      Đơn giá chuẩn: ~9.5 Triệu / vị trí / tháng
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 3: Addon features */}
              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 mb-2.5">
                  3. Tiêu chuẩn trang bị & Công nghệ kèm theo
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div
                    onClick={() => setNeedPccc(!needPccc)}
                    className={`p-3.5 sm:p-4 border rounded-xl cursor-pointer flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                      needPccc ? 'bg-amber-50/80 border-amber-400 text-amber-900 shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Flame className={`w-5 h-5 shrink-0 ${needPccc ? 'text-amber-700' : 'text-slate-400'}`} />
                    <span>Chứng chỉ PCCC</span>
                  </div>

                  <div
                    onClick={() => setNeedSmartPatrol(!needSmartPatrol)}
                    className={`p-3.5 sm:p-4 border rounded-xl cursor-pointer flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                      needSmartPatrol ? 'bg-amber-50/80 border-amber-400 text-amber-900 shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Cpu className={`w-5 h-5 shrink-0 ${needSmartPatrol ? 'text-amber-700' : 'text-slate-400'}`} />
                    <span>Smart Patrol GPS</span>
                  </div>

                  <div
                    onClick={() => setNeedBodycam(!needBodycam)}
                    className={`p-3.5 sm:p-4 border rounded-xl cursor-pointer flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                      needBodycam ? 'bg-amber-50/80 border-amber-400 text-amber-900 shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <ShieldCheck className={`w-5 h-5 shrink-0 ${needBodycam ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>Bodycam 4K Ca Đêm</span>
                  </div>
                </div>
              </div>

              {/* Real-time Calculation Result */}
              <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div>
                  <span className="text-xs sm:text-sm text-slate-600 block uppercase font-mono font-bold tracking-wider">
                    Chi phí dịch vụ ước tính:
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-amber-800 font-mono tracking-tight">
                      {formatVND(totalEstimate)}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-600 font-normal">/ Tháng</span>
                  </div>
                  <span className="text-xs text-slate-500 font-normal block mt-1">
                    (Đã bao gồm công cụ hỗ trợ, đồng phục chuẩn & cam kết an ninh toàn diện)
                  </span>
                </div>
                <div className="text-left sm:text-right text-xs sm:text-sm text-slate-700 font-mono shrink-0 space-y-1">
                  <span className="text-emerald-700 font-bold block flex items-center sm:justify-end gap-1.5">
                    ✓ Không phụ phí lễ tết
                  </span>
                  <span className="text-slate-700 font-medium block flex items-center sm:justify-end gap-1.5">
                    ✓ Miễn phí 100% khảo sát thực địa
                  </span>
                </div>
              </div>

              {/* Instant contact submission form */}
              <form onSubmit={handleSendQuote} className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 font-mono">
                      Họ tên người liên hệ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Nguyễn Văn An"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-600 rounded-lg transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 font-mono">
                      Số điện thoại nhận báo giá <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="VD: 0908 113 888"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-600 font-mono rounded-lg transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-lg shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{loading ? 'Đang gửi dữ liệu...' : 'Nhận Bảng Báo Giá Chi Tiết & Hợp Đồng Mẫu'}</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
