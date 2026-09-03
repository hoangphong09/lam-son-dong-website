import React, { useState } from 'react';
import { Search, X, ArrowRight, BookOpen, Building2 } from 'lucide-react';
import { FEATURED_SERVICES, RESEARCH_ARTICLES } from '../data/mockData';

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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 w-full max-w-2xl overflow-hidden shadow-2xl text-slate-900 rounded">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Tìm kiếm dịch vụ, phương án bảo vệ KCN, cẩm nang PCCC, tiêu chuẩn C06..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 bg-slate-200 hover:bg-[#c5a059] text-slate-600 hover:text-slate-950 rounded flex items-center justify-center transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-5 max-h-96 overflow-y-auto space-y-4">
          {/* Quick Suggestions if empty */}
          {!query && (
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.25em] block">
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
                    className="px-3 py-1.5 bg-slate-100 border border-slate-200 hover:border-amber-500 text-xs text-slate-700 hover:text-amber-800 uppercase tracking-wider transition-all font-medium rounded"
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
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.25em] block mb-2 font-mono">
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
                    className="p-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 cursor-pointer flex items-center justify-between group transition-all rounded"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border border-amber-300 bg-amber-50 rounded flex items-center justify-center text-amber-800">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-900 uppercase tracking-wide transition-colors">
                          {srv.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-normal line-clamp-1">{srv.summary}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-800 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles Matches */}
          {filteredArticles.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.25em] block mb-2 font-mono">
                THƯ VIỆN & CẨM NANG ({filteredArticles.length})
              </span>
              <div className="space-y-1.5">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    className="p-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 cursor-pointer flex items-center justify-between group transition-all rounded"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border border-amber-300 bg-amber-50 rounded flex items-center justify-center text-amber-800">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-900 uppercase tracking-wide transition-colors">
                          {art.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-normal line-clamp-1">{art.summary}</p>
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
