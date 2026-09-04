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
import { PartnersAndClients } from './components/PartnersAndClients';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { SearchModal } from './components/SearchModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { FEATURED_SERVICES } from './data/mockData';
import { ServiceItem, CaseStudy, ResearchArticle, NewsItem, Certification, HeroSlide, StatMetric, BreakingNewsItem } from './types';
import { supabase, getPosts, getHeroSlides, getCaseStudies, getStats, getBreakingNews, Post } from './lib/supabase';
import { X, Calendar, User } from 'lucide-react';

export default function App() {
  // Admin route & session states
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.pathname.startsWith('/admin') || window.location.hash.startsWith('#admin');
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
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  
  // Generic Info Dialog Modal (for Case Study, News, Research, Cert)
  const [infoModalData, setInfoModalData] = useState<{
    title: string;
    category?: string;
    date?: string;
    author?: string;
    content: string;
    imageUrl?: string;
    bullets?: string[];
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

    // Listen to hash and popstate for /admin and #admin
    const handleLocationCheck = () => {
      const isAdm = window.location.pathname.startsWith('/admin') || window.location.hash.startsWith('#admin');
      setIsAdminView(isAdm);
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

  const openAdminView = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
  };

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
    setInfoModalData({
      title: art.title,
      category: `Thư Viện Nghiệp Vụ / ${art.category}`,
      date: art.date,
      author: art.author,
      content: `${art.summary}\n\nTÀI LIỆU HƯỚNG DẪN CHI TIẾT:\n1. Phân loại các nhóm nguy cơ an ninh mục tiêu doanh nghiệp.\n2. Thiết lập quy trình kiểm soát người & phương tiện chuẩn ISO 9001:2015.\n3. Tiêu chuẩn trang thiết bị PCCC và diễn tập sơ tán khẩn cấp định kỳ.\n4. Trách nhiệm bồi thường và chính sách bảo hiểm tài sản 20 Tỷ VNĐ.`,
      imageUrl: art.imageUrl
    });
  };

  const handleSelectNews = (news: NewsItem) => {
    setInfoModalData({
      title: news.title,
      category: `Sự Kiện & Tin Tức / ${news.category}`,
      date: news.date,
      content: `${news.summary}\n\nNỘI DUNG CHI TIẾT SỰ KIỆN:\nBan Lãnh Đạo Lâm Sơn Động Security cùng toàn thể cán bộ nghiệp vụ và lực lượng vệ sĩ đã tổ chức thành công chương trình huấn luyện định kỳ, nâng cao thể lực, võ thuật ứng dụng và nghiệp vụ PCCC chuyên sâu. Chúng tôi cam kết không ngừng nâng cao chất lượng dịch vụ vì sự an toàn tuyệt đối của quý đối tác.`,
      imageUrl: news.imageUrl
    });
  };

  const handleSelectCert = (cert: Certification) => {
    setInfoModalData({
      title: `${cert.title} (${cert.code})`,
      category: `Pháp Lý & Chứng Nhận Tiêu Chuẩn`,
      date: `Cấp bởi ${cert.organization}`,
      content: `${cert.description}\n\nÝ NGHĨA PHÁP LÝ & CAM KẾT:\n- Chứng chỉ chứng nhận năng lực đáp ứng toàn bộ các tiêu chuẩn an ninh trật tự nghiêm ngặt nhất của cơ quan chức năng.\n- Bảo đảm quyền lợi hợp pháp và bảo hiểm bồi thường toàn diện cho khách hàng khi sử dụng dịch vụ của Lâm Sơn Động.`,
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
      content: `${text}\n\nKhuyến cáo từ Bộ Phận Nghiệp Vụ Lâm Sơn Động: Quý doanh nghiệp cần tăng cường kiểm tra hệ thống camera giám sát, kiểm soát chặt chẽ sổ giao ca và phối hợp diễn tập phương án PCCC khẩn cấp. Hotline hỗ trợ 24/7: (024) 38777012.`
    });
  };

  const handleOpenConsultationWithData = (riskData: any) => {
    setAuditDataForForm(riskData);
    scrollToSection('consultation-section');
  };

  const handleOpenSolutionDetail = (sol: any) => {
    setInfoModalData({
      title: sol.title,
      category: `Giải Pháp Ngành / ${sol.tag}`,
      content: `${sol.description}\n\nQUY CHUẨN TRIỂN KHAI:\n- Lực lượng bảo vệ được đào tạo chuyên sâu theo đặc thù ngành.\n- Trang bị đầy đủ công cụ hỗ trợ và hệ thống tuần tra giám sát GPS.\n- Phối hợp chặt chẽ với lực lượng công an địa phương và PCCC khu vực.`,
      bullets: sol.keySpecs
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
      {/* 1. Main Navigation Bar */}
      <Navbar 
        onOpenQuote={() => setIsQuoteModalOpen(true)}
        onSelectService={handleSelectServiceById}
        onScrollToSection={scrollToSection}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* 3. Hero Carousel */}
      <HeroCarousel 
        onOpenQuote={() => setIsQuoteModalOpen(true)}
        onSelectService={handleSelectServiceById}
        onScrollToRisk={() => scrollToSection('risk-assessment-section')}
        slides={heroSlides}
      />

      {/* 4. Breaking News Ticker */}
      <BreakingNewsTicker 
        newsItems={breakingNews}
        onOpenNewsModal={handleOpenNewsModalFromTicker} 
      />

      {/* 5. Certifications & Achievements Carousel */}
      <CertificationsCarousel onSelectCert={handleSelectCert} />

      {/* 6. Key Stats & National Footprint */}
      <KeyStatsFootprint stats={stats} />

      {/* 7. Interactive Security Risk Assessment Tool (AI Scanner) */}
      <SecurityRiskAssessment onOpenConsultationWithData={handleOpenConsultationWithData} />

      {/* 8. Featured Security Services Carousel */}
      <FeaturedServices onSelectService={handleSelectServiceById} />

      {/* 9. Specialized Solution Matrix by Industry */}
      <SolutionMatrixTabs onOpenSolutionDetail={handleOpenSolutionDetail} />

      {/* 10. Case Studies & Success Stories */}
      <CaseStudiesSection 
        caseStudies={caseStudies.length > 0 ? caseStudies : undefined}
        onSelectCaseStudy={handleSelectCaseStudy}
        onOpenAllCaseStudies={() => scrollToSection('featured-services-section')}
      />

      {/* 11. Security Library & PCCC Handbooks */}
      <SecurityLibrarySection onSelectArticle={handleSelectArticle} />

      {/* 12. Events & News */}
      <EventsAndNews onSelectNews={handleSelectNews} posts={posts} />

      {/* 13. Strategic Partners & Clients */}
      <PartnersAndClients />

      {/* 14. Consultation & Site Audit Request Form */}
      <ConsultationForm initialData={auditDataForForm} />

      {/* 15. Footer */}
      <Footer 
        onScrollToSection={scrollToSection}
        onOpenQuote={() => setIsQuoteModalOpen(true)}
        onOpenAdmin={openAdminView}
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

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectService={handleSelectServiceById}
      />

      {/* Generic Info Detail Dialog */}
      {infoModalData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setInfoModalData(null)}
        >
          <div 
            className="bg-white border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl text-slate-900 rounded-xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInfoModalData(null)}
              aria-label="Đóng cửa sổ"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 bg-slate-950/70 hover:bg-slate-950/90 text-white border border-white/20 flex items-center justify-center transition-all z-20 rounded-lg shadow-md backdrop-blur-xs"
            >
              <X className="w-5 h-5" />
            </button>

            {infoModalData.imageUrl && (
              <div className="h-56 sm:h-72 overflow-hidden bg-slate-900 border-b border-slate-200 shrink-0">
                <img
                  src={infoModalData.imageUrl}
                  alt={infoModalData.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-5 overflow-y-auto flex-1">
              {infoModalData.category && (
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-md inline-block">
                  {infoModalData.category}
                </span>
              )}

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug uppercase tracking-tight font-['Plus_Jakarta_Sans']">
                {infoModalData.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono text-slate-500 pb-3 border-b border-slate-200">
                {infoModalData.date && (
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                    {infoModalData.date}
                  </span>
                )}
                {infoModalData.author && (
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-700 shrink-0" />
                    {infoModalData.author}
                  </span>
                )}
              </div>

              <div className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed whitespace-pre-line">
                {infoModalData.content}
              </div>

              {infoModalData.bullets && infoModalData.bullets.length > 0 && (
                <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 text-xs sm:text-sm font-normal">
                  {infoModalData.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-700 leading-relaxed">
                      <span className="text-amber-700 font-mono font-bold text-sm shrink-0">—</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/90 flex justify-end shrink-0">
              <button
                onClick={() => setInfoModalData(null)}
                className="px-7 py-3 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-widest transition-all rounded-lg shadow-sm cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
