import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { BreakingNewsTicker } from './components/BreakingNewsTicker';
import { CertificationsCarousel } from './components/CertificationsCarousel';
import { KeyStatsFootprint } from './components/KeyStatsFootprint';
import { SecurityRiskAssessment } from './components/SecurityRiskAssessment';
import { FeaturedServices } from './components/FeaturedServices';
import { SolutionMatrixTabs } from './components/SolutionMatrixTabs';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { SecurityLibrarySection } from './components/SecurityLibrarySection';
import { EventsAndNews } from './components/EventsAndNews';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { SolutionDetailModal } from './components/SolutionDetailModal';
import { SearchModal } from './components/SearchModal';
import { RecruitmentModal } from './components/RecruitmentModal';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { NewsDetailModal } from './components/NewsDetailModal';
import { FAQSection } from './components/FAQSection';
import { AboutUsPage } from './components/AboutUsPage';
import { RecruitmentPage } from './components/RecruitmentPage';
import { ScrollReveal } from './components/ScrollReveal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { FEATURED_SERVICES } from './data/mockData';
import { ServiceItem, CaseStudy, ResearchArticle, NewsItem, Certification, HeroSlide, StatMetric, BreakingNewsItem } from './types';
import { supabase, getPosts, getHeroSlides, getCaseStudies, getStats, getBreakingNews, Post } from './lib/supabase';
import { X, Calendar, User, Clock, PhoneCall, ArrowRight } from 'lucide-react';

export default function App() {
  // Admin route & session states
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.pathname.startsWith('/admin') || window.location.hash.startsWith('#admin');
  });
  const [currentRoute, setCurrentRoute] = useState<'home' | 'about' | 'recruitment'>(() => {
    if (window.location.pathname === '/ve-chung-toi' || window.location.hash === '#ve-chung-toi') return 'about';
    if (window.location.pathname === '/tuyen-dung' || window.location.hash === '#tuyen-dung') return 'recruitment';
    return 'home';
  });
  const [adminUser, setAdminUser] = useState<any>(() => {
    const saved = localStorage.getItem('lsd_admin_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Dynamic hero slides & posts & case studies & stats & breaking news
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [stats, setStats] = useState<StatMetric[]>([]);
  const [breakingNews, setBreakingNews] = useState<BreakingNewsItem[]>([]);

  // Modal states
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isRecruitmentModalOpen, setIsRecruitmentModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<{
    solution: any;
    categoryName: string;
  } | null>(null);
  
  // Article Detail Modal (for Research Library)
  const [selectedArticle, setSelectedArticle] = useState<ResearchArticle | null>(null);
  
  // News Detail Modal (for Events & News)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Generic Info Dialog Modal (for Case Study, News, Research, Cert)
  const [infoModalData, setInfoModalData] = useState<{
    title: string;
    category?: string;
    date?: string;
    author?: string;
    readTime?: string;
    content: string;
    imageUrl?: string;
    bullets?: string[];
    sections?: {
      heading: string;
      body: string;
    }[];
  } | null>(null);

  // Form prefills
  const [auditDataForForm, setAuditDataForForm] = useState<any>(null);

  useEffect(() => {
    // Check initial auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAdminUser(session.user);
      } else {
        const saved = localStorage.getItem('lsd_admin_session');
        if (saved) {
          try {
            setAdminUser(JSON.parse(saved));
          } catch {
            localStorage.removeItem('lsd_admin_session');
          }
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAdminUser(session.user);
      }
    });

    // Listen to hash and popstate for /admin, #admin, /ve-chung-toi and /tuyen-dung
    const handleLocationCheck = () => {
      const isAdm = window.location.pathname.startsWith('/admin') || window.location.hash.startsWith('#admin');
      setIsAdminView(isAdm);
      if (window.location.pathname === '/ve-chung-toi' || window.location.hash === '#ve-chung-toi') {
        setCurrentRoute('about');
      } else if (window.location.pathname === '/tuyen-dung' || window.location.hash === '#tuyen-dung') {
        setCurrentRoute('recruitment');
      } else if (!isAdm) {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handleLocationCheck);
    window.addEventListener('hashchange', handleLocationCheck);

    // Initial load of hero slides, posts, case studies, stats, and breaking news
    getHeroSlides().then((slides) => {
      if (slides && slides.length > 0) setHeroSlides(slides);
    });
    getPosts().then(({ data }) => {
      if (data && data.length > 0) setPosts(data);
    });
    getCaseStudies().then((cs) => {
      if (cs && cs.length > 0) setCaseStudies(cs);
    });
    getStats().then((st) => {
      if (st && st.length > 0) setStats(st);
    });
    getBreakingNews().then((bn) => {
      if (bn && bn.length > 0) setBreakingNews(bn);
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('popstate', handleLocationCheck);
      window.removeEventListener('hashchange', handleLocationCheck);
    };
  }, []);

  const closeAdminView = () => {
    window.location.hash = '';
    window.history.pushState(null, '', '/');
    setIsAdminView(false);
    // Refresh content after admin changes
    getHeroSlides().then((slides) => {
      if (slides && slides.length > 0) setHeroSlides(slides);
    });
    getPosts().then(({ data }) => {
      if (data && data.length > 0) setPosts(data);
    });
    getCaseStudies().then((cs) => {
      if (cs && cs.length > 0) setCaseStudies(cs);
    });
    getStats().then((st) => {
      if (st && st.length > 0) setStats(st);
    });
  };

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('lsd_admin_session');
    setAdminUser(null);
    closeAdminView();
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToAbout = () => {
    window.history.pushState(null, '', '/ve-chung-toi');
    setCurrentRoute('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToRecruitment = () => {
    window.history.pushState(null, '', '/tuyen-dung');
    setCurrentRoute('recruitment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = (targetSectionId?: string) => {
    window.history.pushState(null, '', '/');
    setCurrentRoute('home');
    if (targetSectionId) {
      setTimeout(() => {
        scrollToSection(targetSectionId.replace(/^#/, ''));
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectServiceById = (serviceId: string) => {
    const srv = FEATURED_SERVICES.find((s) => s.id === serviceId);
    if (srv) {
      setSelectedService(srv);
    }
  };

  const handleSelectCaseStudy = (cs: CaseStudy) => {
    setInfoModalData({
      title: cs.title,
      category: `Thực Tế Dự Án / ${cs.client}`,
      date: cs.sector,
      content: `${cs.challenge}\n\nGIẢI PHÁP LÂM SƠN ĐỘNG:\n${cs.solution}\n\nKẾT QUẢ ĐẠT ĐƯỢC:\n${cs.result}`,
      imageUrl: cs.imageUrl,
      bullets: [
        `Khách hàng: ${cs.client}`,
        `Lực lượng triển khai: ${cs.guardCount || 'Đội đặc nhiệm Lâm Sơn Động'}`,
        `Ngành nghề: ${cs.sector}`,
        `Mức độ hài lòng của khách hàng: 100% Cam kết an toàn`
      ]
    });
  };

  const handleSelectArticle = (art: ResearchArticle) => {
    setSelectedArticle(art);
  };

  const handleSelectNews = (news: NewsItem) => {
    setSelectedNews(news);
  };

  const handleSelectCert = (cert: Certification) => {
    setInfoModalData({
      title: `${cert.title} (${cert.code})`,
      category: `Pháp Lý & Chứng Nhận Tiêu Chuẩn`,
      date: `Cấp bởi ${cert.organization}`,
      content: `${cert.description}\n\nÝ NGHĨA PHÁP LÝ & CAM KẾT:\n- Chứng chỉ chứng nhận năng lực đáp ứng toàn bộ các tiêu chuẩn an ninh trật tự nghiêm ngặt nhất của cơ quan chức năng.\n- Bảo đảm quyền lợi hợp pháp và cam kết bồi thường toàn diện cho khách hàng khi sử dụng dịch vụ của Lâm Sơn Động.`,
      bullets: [
        `Tổ chức cấp: ${cert.organization}`,
        `Mã số chứng nhận: ${cert.code}`,
        `Tình trạng: Hiệu lực toàn quốc 2026 - 2030`,
        `Được kiểm toán an ninh định kỳ 6 tháng/lần`
      ]
    });
  };

  const handleOpenNewsModalFromTicker = (text: string) => {
    setInfoModalData({
      title: 'Bản Tin Cảnh Báo An Ninh Khẩn Cấp',
      category: 'Tin Nóng 24/7',
      date: new Date().toLocaleDateString('vi-VN'),
      content: `${text}\n\nKhuyến cáo từ Bộ Phận Nghiệp Vụ Lâm Sơn Động: Quý doanh nghiệp cần tăng cường kiểm tra hệ thống camera giám sát, kiểm soát chặt chẽ sổ giao ca và phối hợp diễn tập phương án PCCC khẩn cấp. Hotline hỗ trợ 24/7: 0339.269.524.`
    });
  };

  const handleOpenConsultationWithData = (riskData: any) => {
    setAuditDataForForm(riskData);
    scrollToSection('consultation-section');
  };

  const handleOpenSolutionDetail = (sol: any, categoryName?: string) => {
    setSelectedSolution({
      solution: sol,
      categoryName: categoryName || 'Giải Pháp An Ninh Theo Ngành Nghề'
    });
  };

  if (isAdminView) {
    if (!adminUser) {
      return (
        <AdminLogin
          onLoginSuccess={(user) => setAdminUser(user)}
          onBackToHome={closeAdminView}
        />
      );
    }
    return (
      <AdminDashboard
        user={adminUser}
        onLogout={handleAdminLogout}
        onBackToHome={closeAdminView}
        onHeroSlidesUpdated={(newSlides) => setHeroSlides(newSlides)}
        onStatsUpdated={(newStats) => setStats(newStats)}
        onBreakingNewsUpdated={(newBreakingNews) => setBreakingNews(newBreakingNews)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-['Be_Vietnam_Pro'] text-slate-900 selection:bg-amber-500 selection:text-white antialiased">
      {/* Accessibility / SEO Skip to Content Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-slate-950 focus:font-bold focus:shadow-lg focus:rounded-md"
      >
        Chuyển đến nội dung chính
      </a>

      {/* 1. Main Header & Navigation Bar */}
      <Navbar 
        onOpenQuote={() => setIsQuoteModalOpen(true)}
        onSelectService={(serviceId) => {
          if (currentRoute !== 'home') {
            navigateToHome('featured-services-section');
          }
          handleSelectServiceById(serviceId);
        }}
        onScrollToSection={(sectionId) => {
          if (currentRoute !== 'home') {
            navigateToHome(sectionId);
          } else {
            scrollToSection(sectionId);
          }
        }}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenRecruitment={() => setIsRecruitmentModalOpen(true)}
        currentRoute={currentRoute}
        onNavigateToAbout={navigateToAbout}
        onNavigateToRecruitment={navigateToRecruitment}
        onNavigateToHome={navigateToHome}
      />

      {/* Conditionally Render About Us Page, Recruitment Page, or Main Home Page */}
      {currentRoute === 'about' ? (
        <AboutUsPage 
          onNavigateToHome={navigateToHome}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
          onOpenRecruitment={() => setIsRecruitmentModalOpen(true)}
        />
      ) : currentRoute === 'recruitment' ? (
        <RecruitmentPage 
          onNavigateToHome={navigateToHome}
          onOpenRecruitmentModal={() => setIsRecruitmentModalOpen(true)}
        />
      ) : (
        /* Primary Semantic Main Landmark for Search Engine Crawlers & Screen Readers */
        <main id="main-content" role="main" tabIndex={-1} className="outline-none">
          {/* 3. Hero Carousel (Contains page Primary <h1>) */}
          <HeroCarousel 
            onOpenQuote={() => setIsQuoteModalOpen(true)}
            onSelectService={handleSelectServiceById}
            onScrollToRisk={() => scrollToSection('risk-assessment-section')}
            onScrollToServices={() => scrollToSection('featured-services-section')}
            slides={heroSlides}
          />

          {/* 4. Breaking News Ticker */}
          <BreakingNewsTicker 
            newsItems={breakingNews}
            onOpenNewsModal={handleOpenNewsModalFromTicker} 
          />

          {/* 5. Certifications & Achievements Carousel */}
          <ScrollReveal direction="up" duration={700}>
            <CertificationsCarousel onSelectCert={handleSelectCert} />
          </ScrollReveal>

          {/* 6. Key Stats & National Footprint */}
          <ScrollReveal direction="up" duration={750}>
            <KeyStatsFootprint stats={stats} />
          </ScrollReveal>

          {/* 7. Interactive Security Risk Assessment Tool (AI Scanner) */}
          <ScrollReveal direction="up" duration={750}>
            <SecurityRiskAssessment onOpenConsultationWithData={handleOpenConsultationWithData} />
          </ScrollReveal>

          {/* 8. Featured Security Services Carousel */}
          <ScrollReveal direction="up" duration={750}>
            <FeaturedServices onSelectService={handleSelectServiceById} />
          </ScrollReveal>

          {/* 9. Specialized Solution Matrix by Industry */}
          <ScrollReveal direction="up" duration={750}>
            <SolutionMatrixTabs onOpenSolutionDetail={handleOpenSolutionDetail} />
          </ScrollReveal>

          {/* 11. Security Library & PCCC Handbooks */}
          <ScrollReveal direction="up" duration={750}>
            <SecurityLibrarySection onSelectArticle={handleSelectArticle} />
          </ScrollReveal>

          {/* 11.5. Common Security FAQ Section */}
          <ScrollReveal direction="up" duration={750}>
            <FAQSection 
              onOpenQuote={() => setIsQuoteModalOpen(true)}
              onScrollToConsultation={() => scrollToSection('consultation-section')}
            />
          </ScrollReveal>

          {/* 12. Events & News */}
          <ScrollReveal direction="up" duration={750}>
            <EventsAndNews onSelectNews={handleSelectNews} posts={posts} />
          </ScrollReveal>

          {/* 13. Consultation & Site Audit Request Form */}
          <ScrollReveal direction="up" duration={750}>
            <ConsultationForm initialData={auditDataForForm} />
          </ScrollReveal>
        </main>
      )}

      {/* 15. Semantic Footer */}
      <Footer 
        onScrollToSection={(sectionId) => {
          if (currentRoute !== 'home') {
            navigateToHome(sectionId);
          } else {
            scrollToSection(sectionId);
          }
        }}
        onOpenQuote={() => setIsQuoteModalOpen(true)}
        onOpenRecruitment={() => setIsRecruitmentModalOpen(true)}
        onNavigateToAbout={navigateToAbout}
        onNavigateToRecruitment={navigateToRecruitment}
      />

      {/* Floating Call & Quote Triggers */}
      <FloatingActions onOpenQuote={() => setIsQuoteModalOpen(true)} />

      {/* Interactive Price Estimator Modal */}
      <QuoteCalculatorModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />

      {/* Service Detail Deep Dive Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenQuote={() => setIsQuoteModalOpen(true)}
      />

      {/* Specialized Solution Detail Deep Dive Modal */}
      <SolutionDetailModal
        solution={selectedSolution?.solution || null}
        categoryName={selectedSolution?.categoryName}
        onClose={() => setSelectedSolution(null)}
        onOpenQuote={() => {
          setSelectedSolution(null);
          setIsQuoteModalOpen(true);
        }}
        onOpenConsultation={() => {
          const sol = selectedSolution?.solution;
          const cat = selectedSolution?.categoryName;
          setSelectedSolution(null);
          if (sol) {
            setAuditDataForForm({
              facilityType: cat || 'Cơ sở doanh nghiệp',
              serviceType: sol.title,
              targetNotes: `Khảo sát thực địa cho giải pháp: ${sol.title} (Phân loại: ${sol.tag})`,
              riskLevel: 'RỦI RO TIÊU CHUẨN'
            });
          }
          scrollToSection('consultation-section');
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectService={handleSelectServiceById}
      />

      {/* Recruitment Modal */}
      <RecruitmentModal
        isOpen={isRecruitmentModalOpen}
        onClose={() => setIsRecruitmentModalOpen(false)}
      />

      {/* Article Detail Modal (Research Library) */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenConsultation={() => {
          setSelectedArticle(null);
          setIsQuoteModalOpen(true);
        }}
      />

      {/* News Detail Modal (Events & News Section) */}
      <NewsDetailModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
        onOpenConsultation={() => {
          setSelectedNews(null);
          setIsQuoteModalOpen(true);
        }}
      />

      {/* Generic Info Detail Dialog */}
      {infoModalData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setInfoModalData(null)}
        >
          <div 
            className="bg-white border border-slate-200 w-[95vw] md:w-[85vw] lg:w-[75vw] max-w-5xl h-[90vh] md:h-[80vh] lg:h-[75vh] flex flex-col shadow-2xl text-slate-900 rounded-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInfoModalData(null)}
              aria-label="Đóng cửa sổ"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-950/50 hover:bg-slate-950/80 backdrop-blur-md text-white/90 hover:text-white border border-white/20 flex items-center justify-center transition-all z-20 cursor-pointer hover:scale-105 active:scale-95 shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {infoModalData.imageUrl && (
              <div className="h-56 sm:h-72 lg:h-80 overflow-hidden bg-slate-900 border-b border-slate-200 shrink-0">
                <img
                  src={infoModalData.imageUrl}
                  alt={infoModalData.title}
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 sm:p-8 lg:p-10 space-y-6 overflow-y-auto flex-1 text-slate-800">
              {infoModalData.category && (
                <div className="mb-2">
                  <span className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 border border-amber-200 text-[10px] font-mono">
                    {infoModalData.category}
                  </span>
                </div>
              )}

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 leading-[1.3] uppercase tracking-wide sm:tracking-wider font-['Plus_Jakarta_Sans',sans-serif]">
                {infoModalData.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono text-slate-500 pb-3 border-b border-slate-200">
                {infoModalData.date && (
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                    {infoModalData.date}
                  </span>
                )}
                {infoModalData.readTime && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                    {infoModalData.readTime}
                  </span>
                )}
                {infoModalData.author && (
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-700 shrink-0" />
                    {infoModalData.author}
                  </span>
                )}
              </div>

              <div className="text-xs sm:text-sm md:text-base text-slate-700 font-normal leading-relaxed whitespace-pre-line space-y-4">
                {infoModalData.content}
              </div>

              {/* Render Structured Sections if available */}
              {infoModalData.sections && infoModalData.sections.length > 0 && (
                <div className="space-y-6 pt-3 border-t border-slate-100">
                  {infoModalData.sections.map((sec, idx) => (
                    <section key={idx} className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                        {sec.heading}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                        {sec.body}
                      </p>
                    </section>
                  ))}
                </div>
              )}

              {infoModalData.bullets && infoModalData.bullets.length > 0 && (
                <div className="p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5 text-xs sm:text-sm font-normal">
                  {infoModalData.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-700 leading-relaxed">
                      <span className="text-[#c5a059] font-bold shrink-0">—</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="hidden sm:inline">Tư vấn trực tiếp 24/7:</span>
                <a
                  href="tel:0339269524"
                  className="font-bold text-amber-900 hover:underline flex items-center gap-1.5 font-mono"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
                  0339.269.524
                </a>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setInfoModalData(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setInfoModalData(null);
                    setIsQuoteModalOpen(true);
                  }}
                  className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Liên Hệ Tư Vấn</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
