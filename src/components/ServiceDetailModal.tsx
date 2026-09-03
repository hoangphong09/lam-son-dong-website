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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900 rounded relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 bg-slate-100 border border-slate-300 hover:border-amber-600 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-all z-20 rounded shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Image Header */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] font-bold text-slate-950 bg-[#c5a059] px-2.5 py-0.5 inline-block mb-2 rounded shadow-xs">
              {service.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-['Plus_Jakarta_Sans']">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-amber-300 font-medium mt-1">
              {service.subtitle}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Summary & Overview */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Mô Tả Tổng Quan Dịch Vụ
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              {service.summary}
            </p>
          </div>

          {/* Key Features & Standards */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 font-mono">
              Quy Chuẩn Nghiệp Vụ & Nhiệm Vụ Trọng Tâm
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded">
                  <span className="text-amber-700 font-mono font-bold text-xs shrink-0">—</span>
                  <span className="font-normal">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Standards & Equipment Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase mb-2">
                <UserCheck className="w-4 h-4" />
                <span>Tiêu Chuẩn Vệ Sĩ & Nhân Sự</span>
              </div>
              <ul className="text-xs text-slate-600 font-normal space-y-1.5 list-disc list-inside">
                <li>100% Căn cước trong sạch, xác minh lý lịch Bộ Công An</li>
                <li>Chiều cao ≥ 1m70 (Nam), 1m62 (Nữ), thể lực loại 1</li>
                <li>Chứng chỉ nghiệp vụ bảo vệ, võ thuật tự vệ & PCCC</li>
                <li>Kỹ năng giao tiếp, xử lý xung đột hòa nhã, chuyên nghiệp</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase mb-2">
                <Cpu className="w-4 h-4" />
                <span>Trang Thiết Bị & Công Nghệ</span>
              </div>
              <ul className="text-xs text-slate-600 font-normal space-y-1.5 list-disc list-inside">
                <li>Bộ đàm tầm xa mã hóa Motorola / Kenwood</li>
                <li>Máy tuần tra bảo vệ điện tử RFID / Smart GPS</li>
                <li>Dụng cụ hỗ trợ: Gậy cao su, lá chắn chống bạo động, còng số 8</li>
                <li>Trang phục bảo vệ chuyên nghiệp chuẩn Nghị định 96</li>
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Bảo hiểm trách nhiệm 20 Tỷ VNĐ cho mọi sự cố</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="tel:0908113888"
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 rounded"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-mono">0908.113.888</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all rounded shadow"
              >
                <span>Yêu Cầu Báo Giá</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
