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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 p-3 sm:p-6 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl text-slate-900 rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 sm:px-6 py-4 border-b border-slate-200 bg-slate-50/90 shrink-0">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 mr-3.5 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Tìm kiếm dịch vụ, phương án bảo vệ KCN, cẩm nang PCCC, tiêu chuẩn C06..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden font-medium"
          />
          <button
            onClick={onClose}
            aria-label="Đóng tìm kiếm"
            className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-200/80 hover:bg-[#c5a059] text-slate-600 hover:text-slate-950 rounded-lg flex items-center justify-center transition-all shrink-0 ml-2"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Quick Suggestions if empty */}
          {!query && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-[0.2em] block font-mono">
                TỪ KHÓA TÌM KIẾM PHỔ BIẾN
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
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
                    className="px-3.5 py-2 bg-slate-100 border border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-xs sm:text-sm text-slate-700 hover:text-amber-900 uppercase tracking-wider transition-all font-medium rounded-lg cursor-pointer"
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
              <span className="text-xs font-bold text-amber-900 uppercase tracking-[0.2em] block mb-2.5 font-mono">
                DỊCH VỤ BẢO VỆ ({filteredServices.length})
              </span>
              <div className="space-y-2">
                {filteredServices.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => {
                      onSelectService(srv.id);
                      onClose();
                    }}
                    className="p-3.5 sm:p-4 bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-400 cursor-pointer flex items-center justify-between group transition-all rounded-xl shadow-2xs"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 border border-amber-300 bg-amber-50 rounded-lg flex items-center justify-center text-amber-800 shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-900 uppercase tracking-wide transition-colors">
                          {srv.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal line-clamp-1 mt-0.5">{srv.summary}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-800 transition-colors shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles Matches */}
          {filteredArticles.length > 0 && (
            <div>
              <span className="text-xs font-bold text-amber-900 uppercase tracking-[0.2em] block mb-2.5 font-mono">
                THƯ VIỆN & CẨM NANG ({filteredArticles.length})
              </span>
              <div className="space-y-2">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    className="p-3.5 sm:p-4 bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-400 cursor-pointer flex items-center justify-between group transition-all rounded-xl shadow-2xs"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 border border-amber-300 bg-amber-50 rounded-lg flex items-center justify-center text-amber-800 shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-900 uppercase tracking-wide transition-colors">
                          {art.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal line-clamp-1 mt-0.5">{art.summary}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && filteredServices.length === 0 && filteredArticles.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              <p className="text-sm font-medium">Không tìm thấy kết quả phù hợp cho "{query}".</p>
              <p className="text-xs mt-1">Thử lại với các từ khóa ngắn hơn như "KCN", "vệ sĩ", "PCCC", "tuần tra".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
