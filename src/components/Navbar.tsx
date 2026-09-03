import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  Building2, 
  UserCheck, 
  Truck, 
  Calendar, 
  Cpu, 
  PhoneCall, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
  onSelectService: (serviceId: string) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenQuote, 
  onSelectService, 
  onScrollToSection,
  onOpenSearch
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesMenu = [
    {
      id: 'srv-factory',
      title: 'Bảo Vệ KCN & Nhà Máy',
      desc: 'Kiểm soát xuất nhập, tuần tra hàng rào và PCCC 24/7',
      icon: Building2
    },
    {
      id: 'srv-building',
      title: 'Bảo Vệ Tòa Nhà & Cao Ốc',
      desc: 'Lễ tân an ninh sảnh, điều tiết bãi xe thông minh',
      icon: Building2
    },
    {
      id: 'srv-bodyguard',
      title: 'Vệ Sĩ VIP & Yếu Nhân',
      desc: 'Hộ tống doanh nhân, lãnh đạo, an toàn tuyệt đối',
      icon: UserCheck
    },
    {
      id: 'srv-event',
      title: 'Bảo Vệ Sự Kiện & Lễ Hội',
      desc: 'Kiểm soát đám đông quy mô 500 - 50.000 người',
      icon: Calendar
    },
    {
      id: 'srv-transit',
      title: 'Áp Tải Tiền & Hàng Giá Trị Cao',
      desc: 'Xe bọc thép chuyên dụng, giám sát GPS hành trình',
      icon: Truck
    },
    {
      id: 'srv-smart-patrol',
      title: 'Giám Sát An Ninh AI & Smart Patrol',
      desc: 'Trung tâm điều hành SOC, chấm công tuần tra GPS',
      icon: Cpu
    }
  ];

  const handleNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleServiceSelect = (serviceId: string) => {
    onSelectService(serviceId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header 
      id="main-navbar-header"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md text-slate-900 shadow-sm border-b border-slate-200' 
          : 'bg-white text-slate-900 border-b border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* LEFT: Brand Logo & Identification */}
          <div 
            id="brand-logo-container"
            onClick={() => handleNavClick('hero-section')}
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group select-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 text-[#b8860b] group-hover:scale-105 transition-all">
              <img src="https://i.postimg.cc/4dWvw0PJ/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>

            <div className="flex flex-col">
              <span className="text-base sm:text-lg lg:text-xl font-black tracking-tight leading-none uppercase font-['Plus_Jakarta_Sans'] text-slate-900">
                LÂM SƠN ĐỘNG
              </span>
              <span className="text-[8px] sm:text-[8.5px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-amber-800 font-mono font-bold mt-0.5 sm:mt-1">
                DỊCH VỤ BẢO VỆ CHUYÊN NGHIỆP
              </span>
            </div>
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[11px] uppercase tracking-[0.18em] xl:tracking-[0.2em] font-bold text-slate-700 font-mono">
            {/* Solutions */}
            <button
              id="nav-link-solutions"
              onClick={() => handleNavClick('solutions-matrix-section')}
              className="hover:text-amber-800 transition-colors py-1 border-b-2 border-transparent hover:border-amber-600"
            >
              Giải Pháp
            </button>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-dropdown-services-btn"
                onClick={() => handleNavClick('featured-services-section')}
                className="flex items-center gap-1.5 hover:text-amber-800 transition-colors py-1 border-b-2 border-transparent hover:border-amber-600"
              >
                <span>Dịch Vụ</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-amber-800' : ''}`} />
              </button>

              {/* Mega menu dropdown */}
              {activeDropdown === 'services' && (
                <div 
                  id="services-mega-menu"
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-white border border-slate-200 shadow-xl rounded p-5 grid grid-cols-2 gap-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {servicesMenu.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleServiceSelect(item.id)}
                        className="flex items-start gap-3.5 p-3 hover:bg-slate-50 cursor-pointer transition-all group border border-transparent hover:border-slate-200 rounded"
                      >
                        <div className="w-9 h-9 border border-amber-300 bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-[#c5a059] group-hover:text-black transition-all rounded">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition-colors uppercase tracking-wider">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-600 font-normal mt-1 line-clamp-2 leading-relaxed normal-case">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="col-span-2 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] uppercase tracking-wider">
                    <button
                      onClick={() => handleNavClick('featured-services-section')}
                      className="text-amber-800 font-bold hover:underline font-mono"
                    >
                      Xem tất cả dịch vụ →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Risk Assessment Quick Tool */}
            <button
              id="nav-link-risk-tool"
              onClick={() => handleNavClick('risk-assessment-section')}
              className="px-2.5 py-1 bg-amber-50 border border-amber-300 text-amber-900 font-bold hover:bg-[#c5a059] hover:text-black transition-all rounded"
            >
              <span>Đánh Giá Rủi Ro</span>
            </button>

            {/* Case Studies */}
            <button
              id="nav-link-casestudies"
              onClick={() => handleNavClick('casestudies-section')}
              className="hover:text-amber-800 transition-colors py-1 border-b-2 border-transparent hover:border-amber-600"
            >
              Dự Án
            </button>

            {/* Library / Handbook */}
            <button
              id="nav-link-library"
              onClick={() => handleNavClick('library-section')}
              className="hover:text-amber-800 transition-colors py-1 border-b-2 border-transparent hover:border-amber-600"
            >
              Thư Viện
            </button>

            {/* News & Events */}
            <button
              id="nav-link-news"
              onClick={() => handleNavClick('news-section')}
              className="hover:text-amber-800 transition-colors py-1 border-b-2 border-transparent hover:border-amber-600"
            >
              Tin Tức
            </button>

            {/* Contact / Consultation */}
            <button
              id="nav-link-contact"
              onClick={() => handleNavClick('consultation-section')}
              className="hover:text-amber-800 transition-colors py-1 border-b-2 border-transparent hover:border-amber-600"
            >
              Liên Hệ
            </button>
          </nav>

          {/* RIGHT: Action Tools & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              title="Tìm kiếm thông tin an ninh"
              className="w-8 h-8 sm:w-9 sm:h-9 border border-slate-300 bg-slate-50 text-slate-700 hover:text-black hover:border-amber-600 flex items-center justify-center transition-all rounded"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Primary Quote CTA Button */}
            <button
              id="nav-cta-quote-btn"
              onClick={onOpenQuote}
              className="hidden sm:inline-flex bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 px-3.5 sm:px-5 py-2 text-xs font-black uppercase font-mono tracking-wider sm:tracking-widest shadow transition-all rounded"
            >
              <span>Yêu Cầu Báo Giá</span>
            </button>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-slate-300 bg-slate-50 text-slate-800 hover:border-amber-600 focus:outline-none transition-all rounded"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Drawer Menu for Mobile & Tablet */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer-nav"
          className="lg:hidden bg-white border-b border-slate-200 px-4 sm:px-6 pt-4 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto"
        >
          {/* Top drawer utility row */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs font-mono">
            <span className="text-[11px] text-slate-600 uppercase tracking-wider font-bold">Hệ Thống Trực Ban 24/7</span>

            {/* Language Switch */}
            <div className="flex items-center border border-slate-300 bg-slate-100 p-0.5 text-[9px] rounded">
              <button
                onClick={() => setLang('vi')}
                className={`px-2 py-0.5 font-bold rounded ${lang === 'vi' ? 'bg-[#c5a059] text-black font-black' : 'text-slate-600'}`}
              >
                VN
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 font-bold rounded ${lang === 'en' ? 'bg-[#c5a059] text-black font-black' : 'text-slate-600'}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            {/* Solutions */}
            <button
              onClick={() => handleNavClick('solutions-matrix-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-slate-800 hover:text-amber-800 hover:bg-slate-50 uppercase font-mono font-bold tracking-wider border-b border-slate-100 rounded"
            >
              <span>Giải Pháp Theo Ngành</span>
              <span className="text-amber-700 text-sm">›</span>
            </button>

            {/* Services with Accordion Expand */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-slate-800 hover:text-amber-800 hover:bg-slate-50 uppercase font-mono font-bold tracking-wider border-b border-slate-100 rounded"
              >
                <span>Dịch Vụ Bảo Vệ</span>
                <ChevronDown className={`w-3.5 h-3.5 text-amber-700 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileServicesOpen && (
                <div className="bg-slate-50 border-l-2 border-[#c5a059] my-1 py-1 px-2 space-y-1 rounded-r">
                  {servicesMenu.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleServiceSelect(s.id)}
                      className="w-full text-left px-2.5 py-2 text-[11px] text-slate-700 hover:text-amber-800 flex items-center gap-2"
                    >
                      <span className="text-amber-700 font-mono">—</span>
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Risk Tool */}
            <button
              onClick={() => handleNavClick('risk-assessment-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-amber-900 font-bold bg-amber-50 hover:bg-amber-100 uppercase font-mono tracking-wider border border-amber-300 rounded"
            >
              <span>Đánh Giá Rủi Ro An Ninh</span>
              <span className="text-[9px] bg-[#c5a059] text-black px-1.5 py-0.5 font-bold uppercase rounded">Miễn phí</span>
            </button>

            {/* Case studies */}
            <button
              onClick={() => handleNavClick('casestudies-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-slate-800 hover:text-amber-800 hover:bg-slate-50 uppercase font-mono font-bold tracking-wider border-b border-slate-100 rounded"
            >
              <span>Dự Án Tiêu Biểu</span>
              <span className="text-amber-700 text-sm">›</span>
            </button>

            {/* Library */}
            <button
              onClick={() => handleNavClick('library-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-slate-800 hover:text-amber-800 hover:bg-slate-50 uppercase font-mono font-bold tracking-wider border-b border-slate-100 rounded"
            >
              <span>Thư Viện & Nghiệp Vụ</span>
              <span className="text-amber-700 text-sm">›</span>
            </button>

            {/* News */}
            <button
              onClick={() => handleNavClick('news-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-slate-800 hover:text-amber-800 hover:bg-slate-50 uppercase font-mono font-bold tracking-wider border-b border-slate-100 rounded"
            >
              <span>Bản Tin & Sự Kiện</span>
              <span className="text-amber-700 text-sm">›</span>
            </button>

            {/* Contact / Consultation */}
            <button
              id="mobile-nav-link-contact"
              onClick={() => handleNavClick('consultation-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-slate-800 hover:text-amber-800 hover:bg-slate-50 uppercase font-mono font-bold tracking-wider border-b border-slate-100 rounded"
            >
              <span>Liên Hệ</span>
              <span className="text-amber-700 text-sm">›</span>
            </button>
          </div>

          {/* Action CTAs in Mobile Drawer */}
          <div className="pt-2">
            <button
              onClick={() => {
                onOpenQuote();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black uppercase font-mono tracking-widest text-xs shadow flex items-center justify-center gap-2 rounded"
            >
              <span>Yêu Cầu Báo Giá Trực Tuyến</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Certification assurance badge */}
          <div className="pt-2 text-center text-[10px] text-slate-500 font-mono flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Tiêu chuẩn C06 Bộ Công An • ISO 9001:2015</span>
          </div>
        </div>
      )}
    </header>
  );
};
