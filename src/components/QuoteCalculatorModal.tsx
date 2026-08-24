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

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      alert('Vui lòng điền họ tên và số điện thoại để nhận bảng dự toán chính thức!');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#111114] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-white relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 bg-[#0d0d0f] border border-white/10 hover:border-[#c5a059] text-gray-400 hover:text-[#c5a059] flex items-center justify-center transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 bg-[#0d0d0f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#c5a059]/40 bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight font-['Plus_Jakarta_Sans']">
                Dự Toán Ngân Sách Dịch Vụ Bảo Vệ
              </h3>
              <p className="text-xs text-gray-400 font-light mt-0.5">
                Tính toán chi phí thuê bảo vệ chuyên nghiệp minh bạch, không phát sinh
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/40 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white uppercase tracking-wide">
                Đã Lưu Dự Toán Của Quý Khách!
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto font-light leading-relaxed">
                Bảng dự toán chi tiết với mức phí ước tính <strong className="text-[#c5a059] font-mono">{formatVND(totalEstimate)}/tháng</strong> đã được gửi tới phòng kinh doanh. Chuyên viên Lâm Sơn Động sẽ gọi đến số <strong className="text-white font-mono">{contactPhone}</strong> trong vòng 10 phút để gửi phương án an ninh cụ thể.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#c5a059] text-black font-black text-xs uppercase tracking-widest hover:brightness-110"
              >
                Đóng cửa sổ
              </button>
            </div>
          ) : (
            <>
              {/* Target Type */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-2">
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
                      className={`p-2.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                        targetType === item.id
                          ? 'bg-[#c5a059] text-black border-[#c5a059] font-black'
                          : 'bg-[#0d0d0f] text-gray-400 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of guards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#0d0d0f] p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wide">Chốt trực 24/24 (3 ca/ngày)</span>
                    <span className="text-xs text-[#c5a059] font-mono font-bold">{guards24h} Vị trí</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={guards24h}
                    onChange={(e) => setGuards24h(parseInt(e.target.value))}
                    className="w-full accent-[#c5a059] cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-400 font-mono block mt-1">Đơn giá: ~16.5 Triệu / vị trí / tháng</span>
                </div>

                <div className="bg-[#0d0d0f] p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wide">Chốt trực 12/24 (Ngày/Đêm)</span>
                    <span className="text-xs text-[#c5a059] font-mono font-bold">{guards12h} Vị trí</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={guards12h}
                    onChange={(e) => setGuards12h(parseInt(e.target.value))}
                    className="w-full accent-[#c5a059] cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-400 font-mono block mt-1">Đơn giá: ~9.5 Triệu / vị trí / tháng</span>
                </div>
              </div>

              {/* Addon features */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-2">
                  2. Tiêu chuẩn trang bị & Công nghệ kèm theo
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div
                    onClick={() => setNeedPccc(!needPccc)}
                    className={`p-3 border cursor-pointer flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      needPccc ? 'bg-[#c5a059]/10 border-[#c5a059] text-white' : 'bg-[#0d0d0f] border-white/10 text-gray-400'
                    }`}
                  >
                    <Flame className={`w-4 h-4 ${needPccc ? 'text-[#c5a059]' : 'text-gray-600'}`} />
                    <span>Chứng chỉ PCCC</span>
                  </div>

                  <div
                    onClick={() => setNeedSmartPatrol(!needSmartPatrol)}
                    className={`p-3 border cursor-pointer flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      needSmartPatrol ? 'bg-[#c5a059]/10 border-[#c5a059] text-white' : 'bg-[#0d0d0f] border-white/10 text-gray-400'
                    }`}
                  >
                    <Cpu className={`w-4 h-4 ${needSmartPatrol ? 'text-[#c5a059]' : 'text-gray-600'}`} />
                    <span>Smart Patrol GPS</span>
                  </div>

                  <div
                    onClick={() => setNeedBodycam(!needBodycam)}
                    className={`p-3 border cursor-pointer flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      needBodycam ? 'bg-[#c5a059]/10 border-[#c5a059] text-white' : 'bg-[#0d0d0f] border-white/10 text-gray-400'
                    }`}
                  >
                    <ShieldCheck className={`w-4 h-4 ${needBodycam ? 'text-emerald-400' : 'text-gray-600'}`} />
                    <span>Bodycam 4K Ca Đêm</span>
                  </div>
                </div>
              </div>

              {/* Real-time Calculation Result */}
              <div className="bg-[#0d0d0f] border border-[#c5a059]/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-gray-400 block uppercase font-mono">Chi phí dịch vụ ước tính:</span>
                  <span className="text-2xl font-black text-[#c5a059] font-mono">
                    {formatVND(totalEstimate)}
                  </span>
                  <span className="text-xs text-gray-400 font-light"> / Tháng (Đã gồm công cụ & bảo hiểm 20 Tỷ)</span>
                </div>
                <div className="text-right text-[11px] text-gray-400 font-mono">
                  <span className="text-[#c5a059] font-bold block">✓ Không phụ phí lễ tết</span>
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
                    className="px-3.5 py-2.5 bg-black/60 border border-white/10 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại nhận báo giá *"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="px-3.5 py-2.5 bg-black/60 border border-white/10 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059] font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#c5a059] hover:brightness-110 text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Nhận Bảng Báo Giá Chi Tiết & Hợp Đồng Mẫu</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

