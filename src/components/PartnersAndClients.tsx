import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { CLIENT_PARTNERS } from '../data/mockData';

export const PartnersAndClients: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Tất cả' | 'Quốc tế' | 'Trong nước'>('Tất cả');

  const filteredPartners = activeTab === 'Tất cả'
    ? CLIENT_PARTNERS
    : CLIENT_PARTNERS.filter((p) => p.type === activeTab);

  return (
    <section id="partners-section" className="bg-white text-slate-900 py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-[10px] font-mono font-bold text-amber-900 uppercase tracking-[0.3em] bg-amber-100 border border-amber-300 px-3.5 py-1 rounded">
            KHÁCH HÀNG & ĐỐI TÁC CHIẾN LƯỢC
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 uppercase tracking-tight mt-4 font-['Plus_Jakarta_Sans']">
            LÂM SƠN ĐỘNG Tự Hào Đồng Hành Cùng Các Doanh Nghiệp Hàng Đầu
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal">
            Hơn 50+ tập đoàn đa quốc gia và thương hiệu lớn tin tưởng trao gửi sứ mệnh bảo vệ an ninh, tài sản và con người.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(['Tất cả', 'Quốc tế', 'Trong nước'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded shadow-xs ${
                activeTab === tab
                  ? 'bg-[#c5a059] text-slate-950 font-black'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Logo Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {filteredPartners.map((partner, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 hover:border-amber-500 rounded p-5 flex flex-col items-center justify-center text-center group transition-all duration-300 relative overflow-hidden shadow-xs hover:shadow-sm"
            >
              <div className="w-10 h-10 border border-amber-300 bg-amber-50 rounded flex items-center justify-center text-amber-800 mb-2.5 group-hover:bg-[#c5a059] group-hover:text-black transition-all">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition-colors uppercase tracking-wide">
                {partner.name}
              </span>
              <span className="text-[10px] text-slate-500 font-mono mt-1">
                {partner.industry}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
