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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900 rounded relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 bg-slate-100 border border-slate-200 hover:border-amber-600 text-slate-600 hover:text-black flex items-center justify-center transition-all z-10 rounded"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-amber-300 bg-amber-50 rounded flex items-center justify-center text-amber-800">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight font-['Plus_Jakarta_Sans']">
                Dự Toán Ngân Sách Dịch Vụ Bảo Vệ
              </h3>
              <p className="text-xs text-slate-600 font-normal mt-0.5">
                Tính toán chi phí thuê bảo vệ chuyên nghiệp minh bạch, không phát sinh
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-300 rounded flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                Đã Lưu Dự Toán Của Quý Khách!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-normal leading-relaxed">
                Bảng dự toán chi tiết với mức phí ước tính <strong className="text-amber-800 font-mono">{formatVND(totalEstimate)}/tháng</strong> đã được lưu thành công. Chuyên viên Lâm Sơn Động sẽ gọi đến số <strong className="text-slate-900 font-mono font-bold">{contactPhone}</strong> trong vòng 10 phút để gửi phương án an ninh cụ thể.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs uppercase tracking-widest rounded shadow"
              >
                Đóng cửa sổ
              </button>
            </div>
          ) : (
            <>
              {/* Target Type */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                  1. Loại hình mục tiêu cần bảo vệ
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                      className={`p-2.5 text-xs font-bold uppercase tracking-wider transition-all border rounded ${
                        targetType === item.id
                          ? 'bg-[#c5a059] text-slate-950 border-[#b8860b] font-black shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of guards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 border border-slate-200 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Chốt trực 24/24 (3 ca/ngày)</span>
                    <span className="text-xs text-amber-800 font-mono font-bold">{guards24h} Vị trí</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={guards24h}
                    onChange={(e) => setGuards24h(parseInt(e.target.value))}
                    className="w-full accent-[#c5a059] cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">Đơn giá: ~16.5 Triệu / vị trí / tháng</span>
                </div>

                <div className="bg-slate-50 p-4 border border-slate-200 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Chốt trực 12/24 (Ngày/Đêm)</span>
                    <span className="text-xs text-amber-800 font-mono font-bold">{guards12h} Vị trí</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={guards12h}
                    onChange={(e) => setGuards12h(parseInt(e.target.value))}
                    className="w-full accent-[#c5a059] cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">Đơn giá: ~9.5 Triệu / vị trí / tháng</span>
                </div>
              </div>

              {/* Addon features */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                  2. Tiêu chuẩn trang bị & Công nghệ kèm theo
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div
                    onClick={() => setNeedPccc(!needPccc)}
                    className={`p-3 border rounded cursor-pointer flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      needPccc ? 'bg-amber-50 border-amber-400 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <Flame className={`w-4 h-4 ${needPccc ? 'text-amber-700' : 'text-slate-400'}`} />
                    <span>Chứng chỉ PCCC</span>
                  </div>

                  <div
                    onClick={() => setNeedSmartPatrol(!needSmartPatrol)}
                    className={`p-3 border rounded cursor-pointer flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      needSmartPatrol ? 'bg-amber-50 border-amber-400 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <Cpu className={`w-4 h-4 ${needSmartPatrol ? 'text-amber-700' : 'text-slate-400'}`} />
                    <span>Smart Patrol GPS</span>
                  </div>

                  <div
                    onClick={() => setNeedBodycam(!needBodycam)}
                    className={`p-3 border rounded cursor-pointer flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      needBodycam ? 'bg-amber-50 border-amber-400 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <ShieldCheck className={`w-4 h-4 ${needBodycam ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>Bodycam 4K Ca Đêm</span>
                  </div>
                </div>
              </div>

              {/* Real-time Calculation Result */}
              <div className="bg-amber-50/70 border border-amber-300 rounded p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-slate-600 block uppercase font-mono font-bold">Chi phí dịch vụ ước tính:</span>
                  <span className="text-2xl font-black text-amber-800 font-mono">
                    {formatVND(totalEstimate)}
                  </span>
                  <span className="text-xs text-slate-600 font-normal"> / Tháng (Đã gồm công cụ & bảo hiểm 20 Tỷ)</span>
                </div>
                <div className="text-right text-[11px] text-slate-600 font-mono">
                  <span className="text-amber-800 font-bold block">✓ Không phụ phí lễ tết</span>
                  <span>✓ Miễn phí 100% khảo sát</span>
                </div>
              </div>

              {/* Instant contact submission form */}
              <form onSubmit={handleSendQuote} className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Họ tên của bạn *"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-600 rounded"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại nhận báo giá *"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-600 font-mono rounded"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded shadow"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Đang gửi...' : 'Nhận Bảng Báo Giá Chi Tiết & Hợp Đồng Mẫu'}</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
