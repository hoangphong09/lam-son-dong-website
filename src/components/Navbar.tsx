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
  onOpenRecruitment?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenQuote, 
  onSelectService, 
  onScrollToSection,
  onOpenSearch,
  onOpenRecruitment
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 transition-all duration-300">
          
          {/* LEFT: Brand Logo & Identification */}
          <div 
            id="brand-logo-container"
            onClick={() => handleNavClick('hero-section')}
            className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 text-[#b8860b] group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img 
                src="/logo.png" 
                alt="Logo Công ty Cổ phần Dịch vụ Bảo vệ Lâm Sơn Động" 
                width="48"
                height="48"
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain filter drop-shadow-xs" 
              />
            </div>

            <div className="flex flex-col justify-center whitespace-nowrap">
              <span className="text-xl sm:text-[22px] font-extrabold tracking-[0.02em] leading-tight uppercase font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 group-hover:text-amber-800 transition-colors">
                LÂM SƠN ĐỘNG
              </span>
              <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.14em] text-amber-800 font-semibold mt-0.5 leading-tight">
                DỊCH VỤ BẢO VỆ CHUYÊN NGHIỆP
              </span>
            </div>
          </div>

          {/* CENTER: Desktop Navigation Links - Harmonized font, generous spacing and clean interactive hit targets */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 whitespace-nowrap">
            {/* Solutions */}
            <button
              id="nav-link-solutions"
              onClick={() => handleNavClick('solutions-matrix-section')}
              className="px-3.5 py-2 text-[14px] font-medium text-slate-700 hover:text-amber-800 hover:bg-slate-100/70 rounded-lg transition-all cursor-pointer whitespace-nowrap tracking-normal"
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
                className="group px-3.5 py-2 text-[14px] font-medium text-slate-700 hover:text-amber-800 hover:bg-slate-100/70 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap tracking-normal"
              >
                <span>Dịch Vụ</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-amber-800 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-amber-800' : ''}`} />
              </button>

              {/* Mega menu dropdown */}
              {activeDropdown === 'services' && (
                <div 
                  id="services-mega-menu"
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 grid grid-cols-2 gap-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {servicesMenu.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleServiceSelect(item.id)}
                        className="flex items-start gap-3 p-2.5 hover:bg-slate-50 cursor-pointer transition-all group border border-transparent hover:border-slate-200 rounded-xl"
                      >
                        <div className="w-8 h-8 border border-amber-300 bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-[#c5a059] group-hover:text-black transition-all rounded-lg">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-normal mt-0.5 line-clamp-2 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="col-span-2 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleNavClick('featured-services-section')}
                      className="text-amber-800 font-bold hover:underline cursor-pointer"
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
              className="px-3.5 py-2 text-[14px] font-medium text-slate-700 hover:text-amber-800 hover:bg-slate-100/70 rounded-lg transition-all cursor-pointer whitespace-nowrap tracking-normal"
            >
              Đánh Giá Rủi Ro
            </button>

            {/* Recruitment (Tuyển Dụng) */}
            <button
              id="nav-link-recruitment"
              onClick={() => handleNavClick('recruitment-section')}
              className="px-3.5 py-2 text-[14px] font-medium text-slate-700 hover:text-amber-800 hover:bg-slate-100/70 rounded-lg transition-all cursor-pointer inline-flex items-center whitespace-nowrap tracking-normal"
            >
              <span>Tuyển Dụng</span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200/80 rounded-full tracking-wider uppercase leading-none">
                Hot
              </span>
            </button>

            {/* Contact / Consultation */}
            <button
              id="nav-link-contact"
              onClick={() => handleNavClick('consultation-section')}
              className="px-3.5 py-2 text-[14px] font-medium text-slate-700 hover:text-amber-800 hover:bg-slate-100/70 rounded-lg transition-all cursor-pointer whitespace-nowrap tracking-normal"
            >
              Liên Hệ
            </button>
          </nav>

          {/* RIGHT: Action Tools & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Button */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              title="Tìm kiếm thông tin an ninh"
              className="h-10.5 w-10.5 rounded-xl border border-slate-200 bg-slate-50/90 hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:border-slate-300 active:scale-95 shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Primary Quote CTA Button */}
            <button
              id="nav-cta-quote-btn"
              onClick={onOpenQuote}
              className="hidden sm:inline-flex items-center justify-center h-10.5 px-5.5 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-bold text-xs sm:text-[12.5px] uppercase tracking-[0.06em] rounded-xl shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Yêu Cầu Báo Giá</span>
            </button>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-10.5 w-10.5 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition-all active:scale-95 cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-slate-800 hover:text-amber-800 hover:bg-slate-50 font-semibold border-b border-slate-100 rounded-lg cursor-pointer"
            >
              <span>Giải Pháp Theo Ngành</span>
              <span className="text-amber-700 text-sm">›</span>
            </button>

            {/* Services with Accordion Expand */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-slate-800 hover:text-amber-800 hover:bg-slate-50 font-semibold border-b border-slate-100 rounded-lg cursor-pointer"
              >
                <span>Dịch Vụ Bảo Vệ</span>
                <ChevronDown className={`w-3.5 h-3.5 text-amber-700 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileServicesOpen && (
                <div className="bg-slate-50 border-l-2 border-[#c5a059] my-1 py-1 px-2 space-y-1 rounded-r-lg">
                  {servicesMenu.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleServiceSelect(s.id)}
                      className="w-full text-left px-2.5 py-2 text-[11px] text-slate-700 hover:text-amber-800 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-amber-700 font-bold">—</span>
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Risk Tool */}
            <button
              onClick={() => handleNavClick('risk-assessment-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-amber-950 font-semibold bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 rounded-lg cursor-pointer"
            >
              <span>Đánh Giá Rủi Ro An Ninh</span>
              <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 font-bold rounded">Miễn phí</span>
            </button>

            {/* Tuyển Dụng */}
            <button
              id="mobile-nav-link-recruitment"
              onClick={() => handleNavClick('recruitment-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-slate-800 hover:text-amber-800 hover:bg-slate-50 font-semibold border-b border-slate-100 rounded-lg cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span>Tuyển Dụng Nhân Sự</span>
                <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded-full">Hot</span>
              </span>
              <span className="text-amber-700 text-sm">›</span>
            </button>

            {/* Contact / Consultation */}
            <button
              id="mobile-nav-link-contact"
              onClick={() => handleNavClick('consultation-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-slate-800 hover:text-amber-800 hover:bg-slate-50 font-semibold border-b border-slate-100 rounded-lg cursor-pointer"
            >
              <span>Liên Hệ Trực Tuyến</span>
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
