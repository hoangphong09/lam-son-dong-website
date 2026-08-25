import React, { useState } from 'react';
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
import { useTheme } from './components/ThemeProvider';

import { FEATURED_SERVICES } from './data/mockData';
import { ServiceItem, CaseStudy, ResearchArticle, NewsItem, Certification } from './types';
import { X, ShieldCheck, Calendar, BookOpen, User, CheckCircle2 } from 'lucide-react';

export default function App() {
  const { theme } = useTheme();

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

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceById = (serviceId: string) => {
    const srv = FEATURED_SERVICES.find((s) => s.id === serviceId) || FEATURED_SERVICES[0];
    setSelectedService(srv);
  };

  const handleSelectCaseStudy = (cs: CaseStudy) => {
    setInfoModalData({
      title: cs.title,
      category: `Dự Án / ${cs.client}`,
      date: cs.period || cs.readTime,
      content: `${cs.challenge}\n\nGIẢI PHÁP TRIỂN KHAI BỞI LÂM SƠN ĐỘNG:\n${cs.solution}\n\nKẾT QUẢ ĐẠT ĐƯỢC:\n${cs.result}`,
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
      content: `${text}\n\nKhuyến cáo từ Bộ Phận Nghiệp Vụ Lâm Sơn Động: Quý doanh nghiệp cần tăng cường kiểm tra hệ thống camera giám sát, kiểm soát chặt chẽ sổ giao ca và phối hợp diễn tập phương án PCCC khẩn cấp. Hotline hỗ trợ 24/7: 0908.113.888.`
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

  return (
    <div className={`min-h-screen font-['Be_Vietnam_Pro'] selection:bg-red-600 selection:text-white antialiased theme-page ${theme === 'light' ? 'theme-light' : 'theme-dark'}`}>
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
      />

      {/* 4. Breaking News Ticker */}
      <BreakingNewsTicker onOpenNewsModal={handleOpenNewsModalFromTicker} />

      {/* 5. Certifications & Achievements Carousel */}
      <CertificationsCarousel onSelectCert={handleSelectCert} />

      {/* 6. Key Stats & National Footprint */}
      <KeyStatsFootprint />

      {/* 7. Interactive Security Risk Assessment Tool (AI Scanner) */}
      <SecurityRiskAssessment onOpenConsultationWithData={handleOpenConsultationWithData} />

      {/* 8. Featured Security Services Carousel */}
      <FeaturedServices onSelectService={handleSelectServiceById} />

      {/* 9. Specialized Solution Matrix by Industry */}
      <SolutionMatrixTabs onOpenSolutionDetail={handleOpenSolutionDetail} />

      {/* 10. Case Studies & Success Stories */}
      <CaseStudiesSection 
        onSelectCaseStudy={handleSelectCaseStudy}
        onOpenAllCaseStudies={() => scrollToSection('featured-services-section')}
      />

      {/* 11. Security Library & PCCC Handbooks */}
      <SecurityLibrarySection onSelectArticle={handleSelectArticle} />

      {/* 12. Events & News */}
      <EventsAndNews onSelectNews={handleSelectNews} />

      {/* 13. Strategic Partners & Clients */}
      <PartnersAndClients />

      {/* 14. Consultation & Site Audit Request Form */}
      <ConsultationForm initialData={auditDataForForm} />

      {/* 15. Footer */}
      <Footer 
        onScrollToSection={scrollToSection}
        onOpenQuote={() => setIsQuoteModalOpen(true)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#111114] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-white relative">
            <button
              onClick={() => setInfoModalData(null)}
              className="absolute top-5 right-5 w-8 h-8 border border-white/10 bg-[#0d0d0f] hover:border-[#c5a059] text-gray-400 hover:text-[#c5a059] flex items-center justify-center transition-all z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {infoModalData.imageUrl && (
              <div className="h-56 overflow-hidden bg-[#0d0d0f] border-b border-white/10">
                <img
                  src={infoModalData.imageUrl}
                  alt={infoModalData.title}
                  className="w-full h-full object-cover brightness-75"
                />
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-4">
              {infoModalData.category && (
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 px-2.5 py-1">
                  {infoModalData.category}
                </span>
              )}

              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug uppercase tracking-tight font-['Plus_Jakarta_Sans']">
                {infoModalData.title}
              </h3>

              <div className="flex items-center gap-4 text-xs font-mono text-gray-400 pb-2 border-b border-white/10">
                {infoModalData.date && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                    {infoModalData.date}
                  </span>
                )}
                {infoModalData.author && (
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#c5a059]" />
                    {infoModalData.author}
                  </span>
                )}
              </div>

              <div className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed whitespace-pre-line">
                {infoModalData.content}
              </div>

              {infoModalData.bullets && (
                <div className="p-4 bg-[#0d0d0f] border border-white/10 space-y-2 text-xs font-light">
                  {infoModalData.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-[#c5a059] font-mono font-bold text-xs shrink-0">—</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setInfoModalData(null)}
                  className="px-6 py-2.5 bg-[#0d0d0f] hover:bg-[#c5a059] text-gray-300 hover:text-black border border-white/10 hover:border-[#c5a059] font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
