import React from 'react';
import { 
  X, 
  ShieldCheck, 
  PhoneCall, 
  Cpu, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ 
  service, 
  onClose,
  onOpenQuote
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl text-slate-900 rounded-xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng chi tiết dịch vụ"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 bg-slate-950/70 hover:bg-slate-950/90 text-white border border-white/20 flex items-center justify-center transition-all z-30 rounded-lg shadow-md backdrop-blur-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Header */}
        <div className="relative h-60 sm:h-72 md:h-80 overflow-hidden bg-slate-900 shrink-0">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
          
          <div className="absolute bottom-5 sm:bottom-7 left-5 sm:left-8 right-5 sm:right-8">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] font-bold text-slate-950 bg-[#c5a059] px-3 py-1 inline-block mb-2.5 rounded-md shadow-xs">
              {service.category}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight font-['Plus_Jakarta_Sans'] leading-tight">
              {service.title}
            </h3>
            <p className="text-xs sm:text-base text-amber-200 font-medium mt-1.5 line-clamp-2">
              {service.subtitle}
            </p>
          </div>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-6 sm:p-8 space-y-7 overflow-y-auto flex-1">
          {/* Summary & Overview */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              Mô Tả Tổng Quan Dịch Vụ
            </h4>
            <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
              {service.summary}
            </p>
          </div>

          {/* Key Features & Standards */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              Quy Chuẩn Nghiệp Vụ & Nhiệm Vụ Trọng Tâm
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 sm:p-4 bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 rounded-xl leading-relaxed">
                  <span className="text-amber-700 font-mono font-bold text-sm shrink-0">—</span>
                  <span className="font-normal">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Standards & Equipment Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm uppercase tracking-wide">
                <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 shrink-0" />
                <span>Tiêu Chuẩn Vệ Sĩ & Nhân Sự</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 font-normal space-y-2 list-disc list-inside leading-relaxed pl-1">
                <li>100% Căn cước trong sạch, xác minh lý lịch Bộ Công An</li>
                <li>Chiều cao ≥ 1m70 (Nam), 1m62 (Nữ), thể lực loại 1</li>
                <li>Chứng chỉ nghiệp vụ bảo vệ, võ thuật tự vệ & PCCC</li>
                <li>Kỹ năng giao tiếp, xử lý xung đột hòa nhã, chuyên nghiệp</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm uppercase tracking-wide">
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 shrink-0" />
                <span>Trang Thiết Bị & Công Nghệ</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 font-normal space-y-2 list-disc list-inside leading-relaxed pl-1">
                <li>Bộ đàm tầm xa mã hóa Motorola / Kenwood</li>
                <li>Máy tuần tra bảo vệ điện tử RFID / Smart GPS</li>
                <li>Dụng cụ hỗ trợ: Gậy cao su, lá chắn chống bạo động, còng số 8</li>
                <li>Trang phục bảo vệ chuyên nghiệp chuẩn Nghị định 96</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action CTAs (Sticky Bottom Footer) */}
        <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50/95 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Bảo hiểm trách nhiệm pháp lý 20 Tỷ VNĐ cho mọi sự cố</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="tel:0908113888"
              className="px-4 sm:px-5 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 rounded-lg shadow-2xs transition-colors shrink-0"
            >
              <PhoneCall className="w-4 h-4 text-amber-700" />
              <span className="font-mono">0908.113.888</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="flex-1 sm:flex-initial px-6 sm:px-7 py-3 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-lg shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Yêu Cầu Báo Giá</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
