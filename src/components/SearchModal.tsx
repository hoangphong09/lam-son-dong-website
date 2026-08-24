import React, { useState } from 'react';
import { Search, X, ArrowRight, BookOpen, Building2 } from 'lucide-react';
import { FEATURED_SERVICES, RESEARCH_ARTICLES, CASE_STUDIES } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose,
  onSelectService
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filteredServices = FEATURED_SERVICES.filter(
    (s) => s.title.toLowerCase().includes(query.toLowerCase()) || s.summary.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArticles = RESEARCH_ARTICLES.filter(
    (a) => a.title.toLowerCase().includes(query.toLowerCase()) || a.summary.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#111114] border border-white/10 w-full max-w-2xl overflow-hidden shadow-2xl text-white">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-white/10 bg-[#0d0d0f]">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Tìm kiếm dịch vụ, phương án bảo vệ KCN, cẩm nang PCCC, tiêu chuẩn C06..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 bg-[#111114] hover:bg-[#c5a059] text-gray-400 hover:text-black border border-white/10 flex items-center justify-center transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-5 max-h-96 overflow-y-auto space-y-4">
          {/* Quick Suggestions if empty */}
          {!query && (
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.25em] block">
                TỪ KHÓA TÌM KIẾM PHỔ BIẾN
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Bảo vệ Khu Công Nghiệp',
                  'Vệ Sĩ VIP',
                  'PCCC Nhà Xưởng',
                  'Áp tải tiền ngân hàng',
                  'Bảo hiểm 20 tỷ',
                  'Smart Patrol GPS'
                ].map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-[#0d0d0f] border border-white/10 hover:border-[#c5a059] text-xs text-gray-300 hover:text-[#c5a059] uppercase tracking-wider transition-all font-light"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Services Matches */}
          {filteredServices.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.25em] block mb-2 font-mono">
                DỊCH VỤ BẢO VỆ ({filteredServices.length})
              </span>
              <div className="space-y-1.5">
                {filteredServices.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => {
                      onSelectService(srv.id);
                      onClose();
                    }}
                    className="p-3 bg-[#0d0d0f] hover:bg-white/5 border border-white/5 hover:border-[#c5a059]/40 cursor-pointer flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border border-[#c5a059]/30 bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#c5a059] uppercase tracking-wide transition-colors">
                          {srv.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-light line-clamp-1">{srv.summary}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#c5a059] transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles Matches */}
          {filteredArticles.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.25em] block mb-2 font-mono">
                THƯ VIỆN & CẨM NANG ({filteredArticles.length})
              </span>
              <div className="space-y-1.5">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    className="p-3 bg-[#0d0d0f] hover:bg-white/5 border border-white/5 hover:border-[#c5a059]/40 cursor-pointer flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border border-[#c5a059]/30 bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#c5a059] uppercase tracking-wide transition-colors">
                          {art.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-light line-clamp-1">{art.summary}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

