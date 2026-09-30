import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

/**
 * ============================================================================
 * NAVIGATION CONFIGURATION / SECTION MAPPING
 * ============================================================================
 * 1. Dịch Vụ -> #featured-services-section (Full-width mega-menu, no icons)
 * 2. Đánh Giá Rủi Ro -> #risk-assessment-section
 * 3. Sự Kiện -> #news-section
 * 4. Tuyển Dụng -> #recruitment-section (Hot badge)
 * ============================================================================
 */
export interface NavItemConfig {
  id: string;
  label: string;
  targetId: string;
  badge?: {
    text: string;
    variant?: 'hot' | 'free' | 'default';
  };
  hasDropdown?: boolean;
}

export const DEFAULT_NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'services',
    label: 'Dịch Vụ',
    targetId: 'featured-services-section',
    hasDropdown: true,
  },
  {
    id: 'risk',
    label: 'Đánh Giá Rủi Ro',
    targetId: 'risk-assessment-section',
  },
  {
    id: 'news',
    label: 'Sự Kiện',
    targetId: 'news-section',
  },
  {
    id: 'recruitment',
    label: 'Tuyển Dụng',
    targetId: 'recruitment-section',
    badge: {
      text: 'Hot',
      variant: 'hot',
    },
  },
];

interface NavbarProps {
  onOpenQuote: () => void;
  onSelectService: (serviceId: string) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenRecruitment?: () => void;
  customNavItems?: NavItemConfig[];
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenQuote, 
  onSelectService, 
  onScrollToSection,
  onOpenSearch,
  customNavItems
}) => {
  const navItems = customNavItems && customNavItems.length > 0 ? customNavItems : DEFAULT_NAV_ITEMS;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeNavId, setActiveNavId] = useState<string>('');
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  // Avoid scrollspy jumping during user click-initiated smooth scrolling
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Services list without icons (clean corporate typography)
  const servicesMenu = [
    {
      id: 'srv-factory',
      title: 'Bảo Vệ KCN & Nhà Máy',
      desc: 'Kiểm soát xuất nhập hàng hóa, tuần tra hàng rào và phòng ngừa rủi ro PCCC 24/7'
    },
    {
      id: 'srv-building',
      title: 'Bảo Vệ Tòa Nhà & Cao Ốc',
      desc: 'Lễ tân an ninh sảnh cao cấp, kiểm soát khách ra vào và điều tiết bãi đỗ xe thông minh'
    },
    {
      id: 'srv-bodyguard',
      title: 'Vệ Sĩ VIP & Yếu Nhân',
      desc: 'Hộ tống doanh nhân, lãnh đạo, nghệ sĩ với nghiệp vụ an toàn và tác phong chuẩn mực'
    },
    {
      id: 'srv-event',
      title: 'Bảo Vệ Sự Kiện & Lễ Hội',
      desc: 'Thiết lập vành đai an ninh đa tầng, kiểm soát đám đông quy mô 500 - 50.000 người'
    },
    {
      id: 'srv-transit',
      title: 'Áp Tải Tiền & Hàng Giá Trị Cao',
      desc: 'Đội xe bọc thép chuyên dụng, giám sát hành trình GPS trực tuyến và hộ tống đặc nhiệm'
    },
    {
      id: 'srv-smart-patrol',
      title: 'Giám Sát An Ninh AI & Smart Patrol',
      desc: 'Trung tâm chỉ huy tác chiến SOC 24/7, ứng dụng AI nhận diện và tuần tra số hóa realtime'
    }
  ];

  // Hover management for smooth, flicker-free mega menu transitions
  const handleMouseEnterServices = () => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
      dropdownCloseTimeoutRef.current = null;
    }
    setActiveDropdown('services');
  };

  const handleMouseLeaveServices = () => {
    dropdownCloseTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleMouseEnterDropdown = () => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
      dropdownCloseTimeoutRef.current = null;
    }
  };

  const handleMouseLeaveDropdown = () => {
    dropdownCloseTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  /**
   * Smooth scroll to target section with sticky header offset compensation (80px)
   */
  const scrollToTarget = useCallback((targetId: string) => {
    const cleanId = targetId.replace(/^#/, '');
    const element = document.getElementById(cleanId);
    if (!element) return;

    // Header offset height is 80px (h-20)
    const headerHeight = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth',
    });
  }, []);

  /**
   * Click handler for nav items
   */
  const handleNavClick = (item: NavItemConfig) => {
    setActiveNavId(item.id);
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 900);

    scrollToTarget(item.targetId);
    onScrollToSection(item.targetId.replace(/^#/, ''));
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  /**
   * Brand Logo click: Scroll to top
   */
  const handleBrandClick = () => {
    setActiveNavId('');
    scrollToTarget('hero-section');
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  /**
   * Dropdown service select
   */
  const handleServiceSelect = (serviceId: string) => {
    onSelectService(serviceId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  /**
   * Scrollspy: Accurate on-page tracking with header offset compensation
   */
  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (isClickScrollingRef.current) return;

      // 1. If at top of page, no nav link active
      if (scrollY < 200) {
        setActiveNavId('');
        return;
      }

      // 2. Focal point scan: 140px below current scroll top (accounts for 80px header + buffer)
      const focalPoint = scrollY + 140;
      let matchedId = '';

      for (let i = 0; i < navItems.length; i++) {
        const item = navItems[i];
        const el = document.getElementById(item.targetId.replace(/^#/, ''));
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (focalPoint >= top && focalPoint < top + height) {
            matchedId = item.id;
            break;
          } else if (focalPoint >= top) {
            matchedId = item.id;
          }
        }
      }

      setActiveNavId(matchedId);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      if (dropdownCloseTimeoutRef.current) clearTimeout(dropdownCloseTimeoutRef.current);
    };
  }, [navItems]);

  return (
    <header 
      id="main-navbar-header"
      className={`sticky top-0 z-40 transition-all duration-300 relative ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md text-slate-900 shadow-sm border-b border-slate-200' 
          : 'bg-white text-slate-900 border-b border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 transition-all duration-300">
          
          {/* ================================================================= */}
          {/* LEFT: Brand Logo & Identification                                */}
          {/* ================================================================= */}
          <div 
            id="brand-logo-container"
            onClick={handleBrandClick}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 text-[#b8860b] group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img 
                src="/logo.png" 
                alt="Logo Công ty Cổ phần Dịch vụ Bảo vệ Lâm Sơn Động" 
                width="44"
                height="44"
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain filter drop-shadow-xs" 
              />
            </div>

            <div className="flex flex-col justify-center whitespace-nowrap">
              <span className="text-lg sm:text-[20px] font-extrabold tracking-[0.02em] leading-tight uppercase font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 group-hover:text-amber-800 transition-colors">
                LÂM SƠN ĐỘNG
              </span>
              <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-amber-800 font-semibold mt-0.5 leading-tight">
                DỊCH VỤ BẢO VỆ CHUYÊN NGHIỆP
              </span>
            </div>
          </div>

          {/* ================================================================= */}
          {/* CENTER: Clean Desktop Nav Items with Active Underline             */}
          {/* ================================================================= */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3 h-full whitespace-nowrap px-2">
            {navItems.map((item) => {
              const isActive = activeNavId === item.id;

              // Render Dropdown item for Services
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.id}
                    className="relative h-full flex items-center"
                    onMouseEnter={handleMouseEnterServices}
                    onMouseLeave={handleMouseLeaveServices}
                  >
                    <button
                      id={`nav-link-${item.id}`}
                      onClick={() => handleNavClick(item)}
                      className={`group relative h-full px-3.5 xl:px-4 flex items-center gap-1.5 text-[14px] font-medium transition-colors cursor-pointer whitespace-nowrap tracking-normal ${
                        isActive || activeDropdown === item.id
                          ? 'text-amber-900 font-bold' 
                          : 'text-slate-700 hover:text-amber-800'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === item.id 
                            ? 'rotate-180 text-amber-800' 
                            : isActive ? 'text-amber-800' : 'text-slate-400 group-hover:text-amber-800'
                        }`} 
                      />
                    </button>
                  </div>
                );
              }

              // Standard Navigation Button
              return (
                <div key={item.id} className="relative h-full flex items-center">
                  <button
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item)}
                    className={`group relative h-full px-3.5 xl:px-4 flex items-center text-[14px] font-medium transition-colors cursor-pointer whitespace-nowrap tracking-normal ${
                      isActive 
                        ? 'text-amber-900 font-bold' 
                        : 'text-slate-700 hover:text-amber-800'
                    }`}
                  >
                    <span>{item.label}</span>

                    {/* Optional Badge */}
                    {item.badge && (
                      <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold text-rose-600 bg-rose-50 border border-rose-200/80 rounded-full tracking-wider uppercase leading-none">
                        {item.badge.text}
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </nav>

          {/* ================================================================= */}
          {/* RIGHT: Action Tools & Controls                                    */}
          {/* ================================================================= */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Search Button */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              title="Tìm kiếm thông tin an ninh"
              className="h-10 w-10 sm:h-10.5 sm:w-10.5 rounded-xl border border-slate-200 bg-slate-50/90 hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:border-slate-300 active:scale-95 shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Primary Quote CTA Button */}
            <button
              id="nav-cta-quote-btn"
              onClick={onOpenQuote}
              className="hidden sm:inline-flex items-center justify-center h-10 sm:h-10.5 px-4 sm:px-5 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-bold text-xs sm:text-[12.5px] uppercase tracking-[0.06em] rounded-xl shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Yêu Cầu Báo Giá</span>
            </button>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-10 w-10 sm:h-10.5 sm:w-10.5 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition-all active:scale-95 cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* DESKTOP FULL-WIDTH MEGA MENU (Spans entire screen width)          */}
      {/* Sleek, professional layout with zero icons & generous whitespace  */}
      {/* ================================================================= */}
      {activeDropdown === 'services' && (
        <div 
          id="services-fullwidth-mega-menu"
          onMouseEnter={handleMouseEnterDropdown}
          onMouseLeave={handleMouseLeaveDropdown}
          className="hidden lg:block absolute top-full left-0 right-0 w-full bg-white border-b border-t border-slate-200/90 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-200"
        >
          {/* Top subtle brand gold accent line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-9">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Left Column: Brand Overview & Action Links */}
              <div className="lg:col-span-4 pr-0 lg:pr-8 border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0">
                <span className="inline-block text-[10.5px] font-mono uppercase tracking-widest text-amber-900 font-bold bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded">
                  LÂM SƠN ĐỘNG SECURITY
                </span>
                
                <h3 className="text-xl sm:text-[22px] font-extrabold text-slate-950 uppercase tracking-tight mt-3 font-['Plus_Jakarta_Sans',sans-serif] leading-tight">
                  Hệ Thống Dịch Vụ An Ninh Toàn Diện
                </h3>
                
                <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed mt-2.5">
                  Quy trình an ninh chuẩn hóa theo chuẩn C06 Bộ Công An & ISO 9001:2015, sẵn sàng triển khai bảo vệ mục tiêu cố định, cơ động và giải pháp an ninh công nghệ cao.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <button
                    onClick={() => {
                      const srvItem = navItems.find(i => i.id === 'services');
                      if (srvItem) handleNavClick(srvItem);
                      setActiveDropdown(null);
                    }}
                    className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-400 text-xs font-bold text-slate-800 hover:text-amber-900 transition-all cursor-pointer group"
                  >
                    <span>Xem toàn bộ chi tiết dịch vụ</span>
                    <span className="text-amber-700 group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenQuote();
                      setActiveDropdown(null);
                    }}
                    className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                  >
                    <span>Yêu cầu khảo sát thực địa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Area: 6 Services Grid (2 Columns x 3 Rows - No Icons) */}
              <div className="lg:col-span-8 flex flex-col justify-between h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                  {servicesMenu.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => handleServiceSelect(item.id)}
                      className="group/item flex flex-col p-3 -mx-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 cursor-pointer transition-all duration-150"
                    >
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[12px] font-mono font-bold text-slate-400 group-hover/item:text-amber-700 transition-colors">
                            0{idx + 1}.
                          </span>
                          <h4 className="text-[14.5px] font-bold text-slate-900 group-hover/item:text-amber-800 transition-colors">
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-xs text-slate-300 group-hover/item:text-amber-700 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all font-bold">
                          →
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1 pl-6 line-clamp-2 group-hover/item:text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom Reassurance & 24/7 Hotline Bar */}
                <div className="mt-7 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0" />
                    <span>Cam kết khảo sát thực địa & lập phương án miễn phí trong <strong>24 Giờ</strong></span>
                  </div>
                  <div className="font-mono text-slate-700">
                    Trực ban chỉ huy tác chiến 24/7: <strong className="text-amber-800 font-bold">0339.269.524</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* Responsive Drawer Menu for Mobile & Tablet                        */}
      {/* ================================================================= */}
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

          {/* All Auto-Aligned Mobile Navigation Links */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeNavId === item.id;

              if (item.hasDropdown) {
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold border-b border-slate-100 rounded-lg cursor-pointer transition-colors ${
                        isActive 
                          ? 'bg-amber-50 text-amber-900 border-l-2 border-l-[#c5a059]' 
                          : 'text-slate-800 hover:text-amber-800 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded-full">
                            {item.badge.text}
                          </span>
                        )}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 text-amber-700 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {mobileServicesOpen && (
                      <div className="bg-slate-50 border-l-2 border-[#c5a059] my-1 py-1 px-2 space-y-1 rounded-r-lg">
                        <button
                          onClick={() => handleNavClick(item)}
                          className="w-full text-left px-2.5 py-2 text-[11px] font-bold text-amber-900 border-b border-slate-200/60"
                        >
                          → Đến mục Dịch Vụ Tiêu Biểu
                        </button>
                        {servicesMenu.map((s, idx) => (
                          <button
                            key={s.id}
                            onClick={() => handleServiceSelect(s.id)}
                            className="w-full text-left px-2.5 py-2 text-[11px] text-slate-700 hover:text-amber-800 flex items-center justify-between cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-amber-700 font-mono text-[10px]">0{idx + 1}.</span>
                              <span className="truncate">{s.title}</span>
                            </span>
                            <span className="text-slate-400 text-xs">›</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold border-b border-slate-100 rounded-lg cursor-pointer transition-colors ${
                    isActive 
                      ? 'bg-amber-50 text-amber-900 border-l-2 border-l-[#c5a059]' 
                      : 'text-slate-800 hover:text-amber-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge.text}
                      </span>
                    )}
                  </span>
                  <span className="text-amber-700 text-sm">›</span>
                </button>
              );
            })}
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
