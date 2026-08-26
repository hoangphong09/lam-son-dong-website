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
          ? 'bg-[#0d0d0f]/95 backdrop-blur-md text-[#f2f2f2] shadow-2xl border-b border-white/10' 
          : 'bg-[#0d0d0f] text-[#f2f2f2] border-b border-white/10'
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
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-black transition-all">
              <img src="https://i.postimg.cc/4dWvw0PJ/logo.png" alt="Logo" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg lg:text-xl font-black tracking-tight leading-none uppercase font-['Plus_Jakarta_Sans'] text-white">
                LÂM SƠN ĐỘNG
              </span>
              <span className="text-[7.5px] sm:text-[8px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#c5a059] font-mono font-bold mt-0.5 sm:mt-1">
                Công ty Cổ phần Dịch vụ Bảo vệ
              </span>
            </div>
          </div>

          {/* CENTER: Desktop Navigation Links (Visible on Large Screens) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[11px] uppercase tracking-[0.18em] xl:tracking-[0.2em] font-medium text-white/75 font-mono">
            {/* Solutions */}
            <button
              id="nav-link-solutions"
              onClick={() => handleNavClick('solutions-matrix-section')}
              className="hover:text-[#c5a059] transition-colors py-1 border-b-2 border-transparent hover:border-[#c5a059]"
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
                className="flex items-center gap-1.5 hover:text-[#c5a059] transition-colors py-1 border-b-2 border-transparent hover:border-[#c5a059]"
              >
                <span>Dịch Vụ</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-[#c5a059]' : ''}`} />
              </button>

              {/* Mega menu dropdown - Editorial Dark Box */}
              {activeDropdown === 'services' && (
                <div 
                  id="services-mega-menu"
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-[#111114] border border-white/10 shadow-2xl p-5 grid grid-cols-2 gap-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {servicesMenu.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleServiceSelect(item.id)}
                        className="flex items-start gap-3.5 p-3.5 hover:bg-white/5 cursor-pointer transition-all group border border-transparent hover:border-white/10"
                      >
                        <div className="w-9 h-9 border border-[#c5a059]/30 bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center shrink-0 group-hover:bg-[#c5a059] group-hover:text-black transition-all">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white group-hover:text-[#c5a059] transition-colors uppercase tracking-wider">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-gray-400 font-light mt-1 line-clamp-2 leading-relaxed normal-case">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="col-span-2 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-wider">
                    <button
                      onClick={() => handleNavClick('featured-services-section')}
                      className="text-[#c5a059] font-bold hover:underline font-mono"
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
              className="px-2.5 py-1 bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] font-bold hover:bg-[#c5a059] hover:text-black transition-all"
            >
              <span>Đánh Giá Rủi Ro</span>
            </button>

            {/* Case Studies */}
            <button
              id="nav-link-casestudies"
              onClick={() => handleNavClick('casestudies-section')}
              className="hover:text-[#c5a059] transition-colors py-1 border-b-2 border-transparent hover:border-[#c5a059]"
            >
              Dự Án
            </button>

            {/* Library / Handbook */}
            <button
              id="nav-link-library"
              onClick={() => handleNavClick('library-section')}
              className="hover:text-[#c5a059] transition-colors py-1 border-b-2 border-transparent hover:border-[#c5a059]"
            >
              Thư Viện
            </button>

            {/* News & Events */}
            <button
              id="nav-link-news"
              onClick={() => handleNavClick('news-section')}
              className="hover:text-[#c5a059] transition-colors py-1 border-b-2 border-transparent hover:border-[#c5a059]"
            >
              Tin Tức
            </button>
          </nav>

          {/* RIGHT: Action Tools & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              title="Tìm kiếm thông tin an ninh"
              className="w-8 h-8 sm:w-9 sm:h-9 border border-white/10 bg-[#111114] text-white/70 hover:text-white hover:border-[#c5a059] flex items-center justify-center transition-all"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Primary Quote CTA Button */}
            <button
              id="nav-cta-quote-btn"
              onClick={onOpenQuote}
              className="hidden sm:inline-flex bg-[#c5a059] text-black px-3.5 sm:px-5 py-2 text-xs font-bold uppercase font-mono tracking-wider sm:tracking-widest hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>Yêu Cầu Báo Giá</span>
            </button>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-white/10 bg-[#111114] text-white hover:border-[#c5a059] focus:outline-none transition-all"
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
          className="lg:hidden bg-[#111114] border-b border-white/15 px-4 sm:px-6 pt-4 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto"
        >
          {/* Top drawer utility row */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
            <span className="text-[11px] text-gray-400 uppercase tracking-wider">Hệ Thống Trực Ban 24/7</span>

            {/* Language Switch */}
            <div className="flex items-center border border-white/10 bg-[#0d0d0f] p-0.5 text-[9px]">
              <button
                onClick={() => setLang('vi')}
                className={`px-2 py-0.5 font-bold ${lang === 'vi' ? 'bg-[#c5a059] text-black font-black' : 'text-gray-400'}`}
              >
                VN
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 font-bold ${lang === 'en' ? 'bg-[#c5a059] text-black font-black' : 'text-gray-400'}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1.5">
            {/* Solutions */}
            <button
              onClick={() => handleNavClick('solutions-matrix-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-gray-200 hover:text-white hover:bg-white/5 uppercase font-mono tracking-wider border-b border-white/5"
            >
              <span>Giải Pháp Theo Ngành</span>
              <span className="text-[#c5a059] text-sm">›</span>
            </button>

            {/* Services with Accordion Expand */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-gray-200 hover:text-white hover:bg-white/5 uppercase font-mono tracking-wider border-b border-white/5"
              >
                <span>Dịch Vụ Bảo Vệ</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#c5a059] transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileServicesOpen && (
                <div className="bg-[#0d0d0f] border-l-2 border-[#c5a059] my-1 py-1 px-2 space-y-1">
                  {servicesMenu.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleServiceSelect(s.id)}
                      className="w-full text-left px-2.5 py-2 text-[11px] text-gray-300 hover:text-[#c5a059] flex items-center gap-2"
                    >
                      <span className="text-[#c5a059] font-mono">—</span>
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Risk Tool */}
            <button
              onClick={() => handleNavClick('risk-assessment-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-[#c5a059] font-bold bg-[#c5a059]/10 hover:bg-[#c5a059]/20 uppercase font-mono tracking-wider border border-[#c5a059]/30"
            >
              <span>Đánh Giá Rủi Ro An Ninh</span>
              <span className="text-[9px] bg-[#c5a059] text-black px-1.5 py-0.5 font-bold uppercase">Miễn phí</span>
            </button>

            {/* Case studies */}
            <button
              onClick={() => handleNavClick('casestudies-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-gray-200 hover:text-white hover:bg-white/5 uppercase font-mono tracking-wider border-b border-white/5"
            >
              <span>Dự Án Tiêu Biểu</span>
              <span className="text-[#c5a059] text-sm">›</span>
            </button>

            {/* Library */}
            <button
              onClick={() => handleNavClick('library-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-gray-200 hover:text-white hover:bg-white/5 uppercase font-mono tracking-wider border-b border-white/5"
            >
              <span>Thư Viện & Nghiệp Vụ</span>
              <span className="text-[#c5a059] text-sm">›</span>
            </button>

            {/* News */}
            <button
              onClick={() => handleNavClick('news-section')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-gray-200 hover:text-white hover:bg-white/5 uppercase font-mono tracking-wider border-b border-white/5"
            >
              <span>Bản Tin & Sự Kiện</span>
              <span className="text-[#c5a059] text-sm">›</span>
            </button>
          </div>

          {/* Action CTAs in Mobile Drawer */}
          <div className="pt-2">
            <button
              onClick={() => {
                onOpenQuote();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#c5a059] text-black font-bold uppercase font-mono tracking-widest text-xs hover:brightness-110 flex items-center justify-center gap-2"
            >
              <span>Yêu Cầu Báo Giá Trực Tuyến</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Certification assurance badge */}
          <div className="pt-2 text-center text-[10px] text-gray-400 font-mono flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Tiêu chuẩn C06 Bộ Công An • ISO 9001:2015</span>
          </div>
        </div>
      )}
    </header>
  );
};
