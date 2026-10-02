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
        className="bg-white border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl text-slate-900 rounded-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sleek Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng chi tiết dịch vụ"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/50 hover:bg-slate-950/80 backdrop-blur-md text-white/90 hover:text-white border border-white/20 flex items-center justify-center transition-all z-30 shadow-md cursor-pointer hover:scale-105 active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Header */}
        <div className="relative h-60 sm:h-72 md:h-80 overflow-hidden bg-slate-900 shrink-0">
          <img
            src={service.imageUrl}
            alt={service.title}
            loading="lazy"
            decoding="async"
            width={900}
            height={450}
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
          
          <div className="absolute bottom-5 sm:bottom-7 left-5 sm:left-8 right-5 sm:right-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide sm:tracking-wider font-['Plus_Jakarta_Sans',sans-serif] leading-[1.3]">
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

        {/* Refined Action CTAs (Sticky Bottom Footer) */}
        <div className="p-4 sm:p-5 md:p-6 border-t border-slate-200 bg-slate-50/95 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
            <span>Cam kết chịu trách nhiệm & bồi thường 100% rủi ro</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            {/* Elegant Phone Button */}
            <a
              href="tel:0339269524"
              className="h-11 sm:h-12 px-4 sm:px-5 bg-white hover:bg-amber-50/60 border border-slate-200 hover:border-amber-400 text-slate-800 hover:text-amber-900 font-semibold text-xs sm:text-sm rounded-xl shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2 whitespace-nowrap group shrink-0"
            >
              <div className="w-6 h-6 rounded-full bg-amber-50 group-hover:bg-amber-100/80 flex items-center justify-center transition-colors">
                <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
              </div>
              <span className="font-mono font-bold tracking-tight">0339.269.524</span>
            </a>

            {/* Premium Gold Quote CTA Button */}
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="h-11 sm:h-12 px-5 sm:px-6 bg-gradient-to-r from-[#c5a059] to-[#b8860b] hover:from-[#d4af37] hover:to-[#c5a059] text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap group shrink-0"
            >
              <span>Yêu Cầu Báo Giá</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
