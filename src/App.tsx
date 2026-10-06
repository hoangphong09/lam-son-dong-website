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
import { supabase, getPosts, getHeroSlides, getCaseStudies, getStats, getBreakingNews, subscribeToRealtimeCMS, Post } from './lib/supabase';
import { X, Calendar, User, Clock, PhoneCall, ArrowRight, ShieldCheck, Share2 } from 'lucide-react';

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
    summary?: string;
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

    // Database-first data fetching & revalidation
    const refreshAllData = () => {
      getHeroSlides().then((slides) => {
        setHeroSlides(slides || []);
      });
      getPosts().then(({ data }) => {
        setPosts(data || []);
      });
      getCaseStudies().then((cs) => {
        setCaseStudies(cs || []);
      });
      getStats().then((st) => {
        setStats(st || []);
      });
      getBreakingNews().then((bn) => {
        setBreakingNews(bn || []);
      });
    };

    // Initial load
    refreshAllData();

    // Supabase Realtime Synchronization
    // Connected clients instantly update state across sessions & devices when mutations occur
    const unsubscribeRealtime = subscribeToRealtimeCMS({
      onPostsChange: () => {
        getPosts().then(({ data }) => setPosts(data || []));
      },
      onHeroSlidesChange: () => {
        getHeroSlides().then((slides) => setHeroSlides(slides || []));
      },
      onCaseStudiesChange: () => {
        getCaseStudies().then((cs) => setCaseStudies(cs || []));
      },
      onStatsChange: () => {
        getStats().then((st) => setStats(st || []));
      },
      onBreakingNewsChange: () => {
        getBreakingNews().then((bn) => setBreakingNews(bn || []));
      },
    });

    // Multi-device & Tab focus / Reconnection Consistency:
    // Revalidate against the Supabase source of truth upon window focus or reconnection
    const handleRevalidate = () => {
      refreshAllData();
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        refreshAllData();
      }
    };

    window.addEventListener('focus', handleRevalidate);
    window.addEventListener('online', handleRevalidate);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      subscription.unsubscribe();
      unsubscribeRealtime();
      window.removeEventListener('popstate', handleLocationCheck);
      window.removeEventListener('hashchange', handleLocationCheck);
      window.removeEventListener('focus', handleRevalidate);
      window.removeEventListener('online', handleRevalidate);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const closeAdminView = () => {
    window.location.hash = '';
    window.history.pushState(null, '', '/');
    setIsAdminView(false);
    // Refresh content after admin changes
    getHeroSlides().then((slides) => {
      setHeroSlides(slides || []);
    });
    getPosts().then(({ data }) => {
      setPosts(data || []);
    });
    getCaseStudies().then((cs) => {
      setCaseStudies(cs || []);
    });
    getStats().then((st) => {
      setStats(st || []);
    });
    getBreakingNews().then((bn) => {
      setBreakingNews(bn || []);
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

  const getBreakingNewsModalData = (text: string) => {
    const rawTitle = text.trim();
    const normalized = rawTitle.toLowerCase();

    // 1. Tin: Bằng khen Doanh nghiệp đạt chuẩn Quốc Gia
    if (normalized.includes('bằng khen') || normalized.includes('quốc gia') || normalized.includes('cúp vàng')) {
      return {
        title: 'Lâm Sơn Động vinh dự đón nhận bằng khen Doanh nghiệp đạt chuẩn Quốc Gia',
        imageUrl: '/images/cert-iso.jpg',
        date: '06/10/2026',
        readTime: '4 phút đọc',
        author: 'Ban Tổng Giám Đốc & Hội Đồng Cố Vấn Lâm Sơn Động',
        summary:
          'Ngày 06/10/2026, Công ty Cổ phần Dịch vụ Bảo vệ Lâm Sơn Động vinh dự đón nhận Bằng khen "Doanh nghiệp cung ứng dịch vụ an ninh đạt chuẩn Quốc gia". Đây là dấu mốc quan trọng khẳng định vị thế, năng lực tác chiến và quy chuẩn quản trị chất lượng dịch vụ bảo vệ chuyên nghiệp hàng đầu tại Việt Nam.',
        content:
          'Trong khuôn khổ Hội nghị Xúc tiến Đầu tư & Tôn vinh Doanh nghiệp Tiêu biểu năm 2026, Công ty Cổ phần Dịch vụ Bảo vệ Lâm Sơn Động đã chính thức được trao tặng Bằng khen "Doanh nghiệp Cung ứng Dịch vụ An ninh Đạt Chuẩn Quốc Gia".\n\nGiải thưởng là sự ghi nhận xứng đáng cho quá trình hơn một thập kỷ kiên định với định hướng "Kỷ luật thép - Tác phong chuẩn mực - Trách nhiệm pháp lý vững chắc". Lâm Sơn Động hiện đang là đối tác an ninh chiến lược bảo vệ an toàn cho hàng trăm khu công nghiệp trọng điểm, tổ hợp cao ốc hạng A, nhà máy FDI đa quốc gia và các sự kiện ngoại giao cấp cao.',
        sections: [
          {
            heading: '1. Đáp ứng 100% tiêu chuẩn kiểm định an ninh trật tự của C06 - Bộ Công An',
            body: 'Lâm Sơn Động được Cục Cảnh sát Quản lý hành chính về Trật tự xã hội (C06 - Bộ Công An) cấp Giấy xác nhận đủ điều kiện về An ninh Trật tự theo Nghị định 96/2016/NĐ-CP. Toàn bộ cán bộ quản lý và nhân viên bảo vệ đều có hồ sơ lý lịch tư pháp trong sạch, qua sát hạch võ thuật thực chiến, nghiệp vụ cứu nạn cứu hộ và sử dụng công cụ hỗ trợ đúng pháp luật.',
          },
          {
            heading: '2. Chuẩn mực quản trị chất lượng quốc tế ISO 9001:2015 & Công nghệ Smart Patrol 4.0',
            body: 'Doanh nghiệp áp dụng quy trình kiểm soát an ninh đa tầng với phần mềm tuần tra số hóa Smart Patrol, tích hợp gắn chip RFID tại các góc khuất mục tiêu và giám sát GPS vị trí cán bộ tuần tra 24/7. Mọi nhật ký ca trực, biên bản bàn giao niêm phong kho quỹ đều được số hóa, đảm bảo tính minh bạch và tức thời gửi báo cáo an ninh đến ban giám đốc khách hàng.',
          },
          {
            heading: '3. Bảo chứng tài chính với bảo hiểm trách nhiệm pháp lý & nghề nghiệp 20 tỷ đồng',
            body: 'Nhằm triệt tiêu mọi rủi ro tài sản cho chủ đầu tư, Lâm Sơn Động duy trì gói bảo hiểm trách nhiệm nghề nghiệp và dân sự với hạn mức bồi thường thực tế lên đến 20.000.000.000 VNĐ tại Tổng Công ty Cổ phần Bảo hiểm Quân đội (MIC) và Bảo Việt. Chúng tôi cam kết đền bù 100% thiệt hại phát sinh do lỗi nhân viên bảo vệ theo đúng điều khoản hợp đồng kinh tế.',
          },
          {
            heading: '4. Định hướng phát triển hệ sinh thái an ninh tư nhân thế hệ mới',
            body: 'Bước sang giai đoạn 2026 - 2030, Lâm Sơn Động tiếp tục đẩy mạnh mở rộng các trạm cơ động phản ứng nhanh tại các hành lang công nghiệp Bắc Bộ, trang bị đồng bộ bodycam 4K ca đêm và huấn luyện nâng cao cho lực lượng đặc nhiệm bảo vệ yếu nhân VIP.',
          },
        ],
        bullets: [
          'Top thương hiệu dịch vụ an ninh tư nhân uy tín hàng đầu theo đánh giá của hiệp hội doanh nghiệp.',
          'Đội ngũ hơn 300 cán bộ chiến sĩ bảo vệ được đào tạo võ phái cổ truyền Lâm Sơn Động và nghiệp vụ an ninh chính quy.',
          'Bảo hiểm rủi ro nghề nghiệp 20 tỷ đồng bảo vệ toàn diện tài sản và quyền lợi đối tác.',
          'Hệ thống hỗ trợ và trung tâm tác chiến khẩn cấp thường trực 24/7/365.',
        ],
      };
    }

    // 2. Tin: Hội nghị doanh nghiệp quận Long Biên
    if (normalized.includes('long biên') || normalized.includes('hội nghị')) {
      return {
        title: 'Triển khai thành công phương án bảo vệ an ninh trật tự Hội nghị doanh nghiệp quận Long Biên',
        imageUrl: '/images/escort.jpg',
        date: '06/10/2026',
        readTime: '4 phút đọc',
        author: 'Ban Chỉ Huy Tác Chiến & Đội Phản Ứng Nhanh Lâm Sơn Động',
        summary:
          'Lực lượng tác chiến Lâm Sơn Động vừa hoàn thành xuất sắc nhiệm vụ bảo vệ an ninh trật tự, điều phối giao thông và đón tiếp yếu nhân tại Hội nghị Thường niên Doanh nghiệp quận Long Biên năm 2026 với hơn 500 đại biểu, doanh nhân và lãnh đạo ban ngành tham dự.',
        content:
          'Hội nghị Doanh nghiệp quận Long Biên năm 2026 là sự kiện kinh tế - xúc tiến thương mại có quy mô lớn với sự tham dự của hơn 500 khách mời danh dự, các đoàn doanh nghiệp FDI và đại diện chính quyền địa phương.\n\nNhận lời ủy thác từ Ban Tổ Chức, Ban Chỉ Huy Lâm Sơn Động đã khảo sát thực địa hiện trường trước 48 giờ, lập phương án tác chiến chi tiết, phân chia 3 vành đai bảo vệ nghiêm ngặt và huy động 30 nhân sự đặc nhiệm tinh nhuệ nhằm bảo đảm tuyệt đối an ninh, trật tự và mỹ quan sự kiện.',
        sections: [
          {
            heading: '1. Thiết lập 3 lớp vành đai an ninh từ xa đến cận cảnh',
            body: '• Vành đai 1 (Ngoại vi): Phân luồng giao thông lối vào, hướng dẫn xe đại biểu vào bãi đỗ xe VIP, ngăn ngừa ùn tắc và bảo vệ phương tiện tránh trầy xước, mất mát.\n• Vành đai 2 (Sảnh đón tiếp & Cổng an ninh): Kiểm soát thư mời, quét thẻ đại biểu bằng thiết bị chuyên dụng, kiểm tra tư trang lịch thiệp và hướng dẫn lễ tân.\n• Vành đai 3 (Hội trường chính & Khu vực VIP): Bố trí vệ sĩ áp sát bảo vệ bục danh dự, lối đi đại biểu và các phòng họp kín của ban lãnh đạo.',
          },
          {
            heading: '2. Biệt đội phản ứng nhanh cơ động thường trực 3 phút xuất kích',
            body: 'Tại khu vực trung tâm sự kiện, Tổ Cơ Động Phản Ứng Nhanh Lâm Sơn Động được trang bị bộ đàm tần số kín mã hóa, áo giáp chống đâm, gậy điều khiển và thiết bị sơ cấp cứu y tế. Tổ cơ động liên tục tuần tra cơ động quanh khu vực sự kiện, sẵn sàng ứng phó trong vòng 180 giây nếu phát sinh hiện tượng gây rối trật tự hoặc sự cố kỹ thuật.',
          },
          {
            heading: '3. Tác phong ngoại giao chuẩn mực 5 sao tạo ấn tượng đẹp',
            body: '100% nhân sự bảo vệ Lâm Sơn Động xuất hiện với quân phục tác chiến vest đen chỉnh tề, thể hình chuẩn trên 1m72, thái độ nhã nhặn, thực hiện chuẩn chỉ văn hóa cúi chào 15 độ và sẵn sàng hỗ trợ khách mời quốc tế bằng tiếng Anh cơ bản.',
          },
          {
            heading: '4. Đánh giá cao từ Ban Tổ Chức và Hiệp Hội Doanh Nghiệp',
            body: 'Kết thúc hội nghị, Ban Tổ Chức đã gửi lời biểu dương sâu sắc đến tập thể cán bộ Lâm Sơn Động vì sự chu đáo, kỷ luật và tính an toàn tuyệt đối, không để xảy ra bất kỳ sự cố phát sinh hay mất mát tài sản nào trong suốt thời gian diễn ra sự kiện.',
          },
        ],
        bullets: [
          '100% mục tiêu sự kiện được bảo vệ an toàn tuyệt đối suốt 8 giờ hội nghị liên tục.',
          'Hệ thống liên lạc thông suốt, xử lý luồng hơn 150 xe ô tô đại biểu không xảy ra ùn tắc cục bộ.',
          'Nhân sự được tuyển chọn kỹ lưỡng, có kỹ năng giao tiếp lịch thiệp và ngoại hình chuyên nghiệp.',
        ],
      };
    }

    // 3. Tin: Diễn tập PCCC, bồi dưỡng nghiệp vụ Quý 4/2026
    if (normalized.includes('pccc') || normalized.includes('diễn tập')) {
      return {
        title: 'Lâm Sơn Động tổ chức diễn tập PCCC, bồi dưỡng nghiệp vụ Quý 4/2026',
        imageUrl: '/images/training.jpg',
        date: '06/10/2026',
        readTime: '5 phút đọc',
        author: 'Trung Tâm Huấn Luyện Võ Thuật & Nghiệp Vụ Lâm Sơn Động',
        summary:
          'Nhằm củng cố khả năng sẵn sàng chiến đấu và nâng cao kỹ năng xử lý hỏa hoạn, tai nạn bất ngờ, Lâm Sơn Động đã phối hợp cùng cán bộ chuyên trách PCCC tổ chức buổi diễn tập thực binh chữa cháy, cứu nạn cứu hộ và bồi dưỡng nghiệp vụ an ninh thực chiến Quý 4/2026.',
        content:
          'Công tác phòng cháy, chữa cháy và cứu nạn cứu hộ (PCCC & CNCH) luôn là một trong những nhiệm vụ cốt lõi hàng đầu được Lâm Sơn Động đặt ra cho mọi nhân sự tại tất cả các mục tiêu bảo vệ.\n\nNgày 06/10/2026, tại Trung tâm Huấn luyện Đào tạo Nghiệp vụ Lâm Sơn Động, hơn 300 cán bộ chỉ huy đội, tổ trưởng mục tiêu và nhân viên bảo vệ đã hoàn thành đợt sát hạch huấn luyện PCCC & Nghiệp vụ thực chiến định kỳ Quý 4/2026 với kết quả 100% đạt loại Giỏi và Xuất sắc.',
        sections: [
          {
            heading: '1. Thao tác thực hành khí tài chữa cháy áp lực cao trong 30 giây',
            body: 'Học viên được trực tiếp vận hành các phương tiện chữa cháy hiện trường: bình bột MFZ4, bình khí CO2 MT3, mở tủ cứu hỏa vách tường, rải vòi rồng và điều khiển lăng phun nước áp lực cao dập tắt khay xăng cháy lớn. Đội ngũ chỉ huy rèn luyện phản xạ phát hiện khói, bấm chuông báo động, ngắt cầu dao điện tổng và tiếp cận gốc lửa trong vòng dưới 30 giây.',
          },
          {
            heading: '2. Diễn tập phương án cứu nạn, thoát hiểm trong không gian hẹp ngạt khói',
            body: 'Tình huống giả định đặt ra là sự cố cháy nổ tại kho nguyên liệu tầng hầm mục tiêu công nghiệp. Lực lượng bảo vệ tại chỗ đã diễn tập sử dụng mặt nạ phòng độc cách ly, mở cửa thoát hiểm khẩn cấp, sử dụng loa pin điều hướng công nhân sơ tán trật tự, đồng thời thực hành khiêng cáng cứu người bị nạn ra khỏi vùng nguy hiểm an toàn.',
          },
          {
            heading: '3. Tập huấn sơ cấp cứu y tế & kỹ năng cấp cứu tuần hoàn hô hấp CPR',
            body: 'Dưới sự hướng dẫn của bác sĩ chuyên khoa cấp cứu, các nhân viên an ninh được trang bị lại thao tác ép tim ngoài lồng ngực, thổi ngạt, garo cầm máu vết thương và nẹp cố định gãy xương, giúp bảo toàn tính mạng cho nạn nhân trong "thời gian vàng" trước khi xe cứu thương tiếp cận.',
          },
          {
            heading: '4. Rèn luyện thế võ đặc dị phái Lâm Sơn Động khống chế đối tượng mang hung khí',
            body: 'Bên cạnh nghiệp vụ PCCC, buổi huấn luyện bồi dưỡng các bài võ tự vệ cận chiến tay không tước đoạt vũ khí nguy hiểm, khóa tay khống chế nhanh đối tượng đột nhập gây rối mà không gây tổn thương quá mức cần thiết, tuân thủ nghiêm ngặt quy định pháp luật.',
          },
        ],
        bullets: [
          '100% nhân viên bảo vệ tham gia được cấp chứng chỉ bồi dưỡng PCCC theo quy chuẩn Bộ Công An.',
          'Kỹ năng phản xạ chữa cháy ban đầu dập tắt nguồn lửa phát sinh trong 30 giây vàng.',
          'Đào tạo liên tục hàng quý nhằm duy trì tính cảnh giác và kỷ luật thép ở mức cao nhất.',
        ],
      };
    }

    // 4. Tin: Mở rộng hệ thống Trung tâm phản ứng nhanh cơ động
    if (normalized.includes('cơ động') || normalized.includes('phản ứng nhanh') || normalized.includes('cứ điểm')) {
      return {
        title: 'Mở rộng hệ thống Trung tâm phản ứng nhanh cơ động tại các cứ điểm quan trọng',
        imageUrl: '/images/hero-2.jpg',
        date: '06/10/2026',
        readTime: '4 phút đọc',
        author: 'Ban Chỉ Huy Tác Chiến & Mạng Lưới Cơ Động Lâm Sơn Động',
        summary:
          'Nhằm rút ngắn thời gian chi viện khẩn cấp xuống còn 10 – 15 phút, Lâm Sơn Động chính thức đưa vào vận hành 03 Trạm phản ứng nhanh cơ động mới tại các khu công nghiệp trọng điểm: Thăng Long (Hà Nội), Yên Phong (Bắc Ninh) và Phố Nối (Hưng Yên).',
        content:
          'Trong bối cảnh quy mô hoạt động của các tập đoàn sản xuất FDI và chuỗi nhà xưởng kho vận logistics ngày càng mở rộng, nhu cầu xử lý các tình huống an ninh khẩn cấp ban đêm đòi hỏi lực lượng bảo vệ phải có tốc độ phản ứng thần tốc.\n\nĐể đáp ứng yêu cầu đó, Ban Chỉ Huy Lâm Sơn Động đã đầu tư mở rộng và khánh thành hệ thống 03 Trạm Phản Ứng Nhanh Cơ Động tại các cứ điểm nút giao công nghiệp chiến lược thuộc vùng kinh tế trọng điểm phía Bắc.',
        sections: [
          {
            heading: '1. Thời gian chi viện khẩn cấp chỉ từ 10 - 15 phút tại hiện trường',
            body: 'Mỗi trạm phản ứng nhanh được bố trí đội tuần tra mô tô phân khối lớn, xe bán tải chuyên dụng tác chiến an ninh và tổ đặc nhiệm từ 6 – 10 chiến sĩ luôn trong tư thế sẵn sàng xuất kích. Khi mục tiêu bấm nút báo động SOS hoặc trung tâm chỉ huy nhận cuộc gọi khẩn cấp, lực lượng chi viện sẽ có mặt tại hiện trường phong tỏa khu vực trong vòng tối đa 15 phút.',
          },
          {
            heading: '2. Kết nối trực tuyến với Trung tâm Chỉ huy Giám sát 24/7',
            body: 'Các trạm cơ động được trang bị hệ thống màn hình định vị GPS thời gian thực, máy thu phát sóng bộ đàm tầm xa và camera hành trình truyền dữ liệu trực tiếp về Sở Chỉ Huy Trung Tâm. Cán bộ trực ban luôn theo dõi chặt chẽ lộ trình tuần tra, kiểm tra tình trạng an ninh của từng trạm và điều phối lực lượng hỗ trợ kịp thời.',
          },
          {
            heading: '3. Trang bị công cụ hỗ trợ hiện đại theo chuẩn kiểm định Bộ Công An',
            body: 'Lực lượng cơ động phản ứng nhanh được trang bị đầy đủ công cụ hỗ trợ theo quy định cấp phép của C06: gậy cao su chuyên dụng, dùi cui điện tầm xa, đèn pin cường độ sáng cao chống chói, lá chắn chống bạo động và thiết bị đo nồng độ cồn, bảo đảm tính răn đe tuyệt đối trước các hành vi xâm nhập trái phép.',
          },
          {
            heading: '4. Bảo vệ vững chắc chuỗi sản xuất và tài sản doanh nghiệp',
            body: 'Sự hiện diện của mạng lưới trạm phản ứng nhanh Lâm Sơn Động tại các KCN trọng điểm đã giúp hàng loạt doanh nghiệp đối tác giải quyết triệt để vấn đề mất trộm tài sản ban đêm, ngăn chặn nguy cơ đình công tự phát và mang lại sự an tâm tuyệt đối cho các nhà đầu tư nước ngoài.',
          },
        ],
        bullets: [
          'Bán kính chi viện khẩn cấp chỉ từ 10 - 15 phút tại các vùng kinh tế trọng điểm phía Bắc.',
          'Trang bị đầy đủ công cụ hỗ trợ chuẩn C06 Bộ Công An: dùi cui điện, súng bắn đạn cao su, bộ đàm cự ly xa.',
          'Hotline điều hành tác chiến thường trực 24/7: 0339.269.524 sẵn sàng chi viện khẩn cấp.',
        ],
      };
    }

    // Mặc định cho các tin tức khác
    return {
      title: rawTitle,
      imageUrl: '/images/training.jpg',
      date: new Date().toLocaleDateString('vi-VN'),
      readTime: '3 phút đọc',
      author: 'Ban Chỉ Huy Lâm Sơn Động',
      summary: `Thông báo an ninh chính thức từ Ban Chỉ Huy Tác Chiến Lâm Sơn Động: ${rawTitle}. Toàn bộ lực lượng bảo vệ tăng cường tuần tra, duy trì kỷ luật thép và sẵn sàng xử lý mọi tình huống khẩn cấp.`,
      content: `${rawTitle}\n\nThông báo chính thức từ Ban Chỉ Huy Tác Chiến Lâm Sơn Động: Nhằm duy trì an ninh trật tự tuyệt đối tại tất cả các mục tiêu tiếp quản, lực lượng bảo vệ thường trực tăng cường tuần tra kiểm soát ca đêm, thắt chặt quy trình kiểm soát luồng người và phương tiện, đồng thời phối hợp chặt chẽ với cơ quan chức năng sở tại.`,
      sections: [
        {
          heading: 'Quy chuẩn an ninh và khuyến cáo vận hành',
          body: 'Quý doanh nghiệp và đối tác cần phối hợp kiểm tra định kỳ hệ thống camera an ninh, niêm phong kho quỹ trước giờ tan ca và rà soát phương án phòng ngừa rủi ro. Mọi yêu cầu hỗ trợ hoặc chi viện an ninh vui lòng kết nối ngay với Hotline trực ban 24/7.',
        },
      ],
      bullets: [
        'Đội tuần tra cơ động phản ứng nhanh thường trực 24/7.',
        'Bảo đảm an toàn tuyệt đối về người và tài sản cho doanh nghiệp đối tác.',
        'Hotline tư vấn và chi viện an ninh khẩn cấp: 0339.269.524.',
      ],
    };
  };

  const handleOpenNewsModalFromTicker = (text: string) => {
    const modalData = getBreakingNewsModalData(text);
    setInfoModalData(modalData);
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
            {/* Sleek Close Button */}
            <button
              onClick={() => setInfoModalData(null)}
              aria-label="Đóng cửa sổ thông tin"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all z-20 cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header: Article Metadata & Title */}
            <div className="px-6 py-5 sm:px-8 sm:py-6 bg-white border-b border-slate-100 relative shrink-0 pr-16">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500 mb-2 font-mono">
                {infoModalData.category && !infoModalData.category.toLowerCase().includes('tin nóng') && (
                  <>
                    <span className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 border border-amber-200 text-[10px]">
                      {infoModalData.category}
                    </span>
                    <span>•</span>
                  </>
                )}
                {infoModalData.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-700" />
                    {infoModalData.date}
                  </span>
                )}
                {infoModalData.readTime && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      {infoModalData.readTime}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
                {infoModalData.title}
              </h1>

              {infoModalData.author && (
                <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-500">
                  <User className="w-3.5 h-3.5 text-amber-700" />
                  <span>Tác giả: <strong className="text-slate-900 font-semibold">{infoModalData.author}</strong></span>
                </div>
              )}
            </div>

            {/* Modal Body - Editorial Article Format */}
            <div className="p-6 sm:p-8 lg:p-10 space-y-7 overflow-y-auto flex-1 text-slate-800 leading-relaxed font-sans">
              {/* Hero Article Image */}
              {infoModalData.imageUrl && (
                <div className="w-full h-56 sm:h-72 lg:h-84 rounded-2xl overflow-hidden bg-slate-100 relative shadow-xs shrink-0">
                  <img
                    src={infoModalData.imageUrl}
                    alt={infoModalData.title}
                    loading="lazy"
                    decoding="async"
                    width={900}
                    height={450}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/training.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              {/* Lead Summary Paragraph */}
              {infoModalData.summary && (
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border-l-4 border-[#c5a059] text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {infoModalData.summary}
                </div>
              )}

              {/* Main Article Content Paragraphs */}
              {infoModalData.content && (
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-normal space-y-4">
                  {infoModalData.content}
                </div>
              )}

              {/* Structured Sections if available */}
              {infoModalData.sections && infoModalData.sections.length > 0 && (
                <div className="space-y-6 pt-2">
                  {infoModalData.sections.map((sec, idx) => (
                    <section key={idx} className="space-y-3">
                      <h2 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                        {sec.heading}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                        {sec.body}
                      </p>
                    </section>
                  ))}
                </div>
              )}

              {/* Bullet points / Key takeaways if available */}
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

              {/* Expert Takeaway Callout Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Tiêu Chuẩn Tác Chiến & Tinh Thần Lâm Sơn Động</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Mỗi sự kiện huấn luyện, chiến công nghiệp vụ hay bằng khen vinh danh đều là minh chứng sống động cho tôn chỉ hoạt động của Lâm Sơn Động: Kỷ luật thép - Tác phong chuẩn mực - Trách nhiệm pháp lý vững chắc. Chúng tôi không ngừng nâng cao chuẩn mực an ninh nhằm mang lại sự an tâm tuyệt đối và bảo toàn trọn vẹn tài sản cho quý đối tác, quý doanh nghiệp.
                </p>
              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="p-4 sm:p-5 md:p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && navigator.share) {
                      navigator.share({
                        title: infoModalData.title,
                        text: infoModalData.summary || infoModalData.content?.slice(0, 150),
                        url: window.location.href,
                      }).catch(() => {});
                    } else if (typeof window !== 'undefined') {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Đã sao chép liên kết bài viết vào bộ nhớ tạm!');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 transition-colors text-xs font-mono cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Chia sẻ bài viết</span>
                </button>
                <span className="hidden sm:inline">• Trực ban tác chiến 24/7</span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                {/* Hotline */}
                <a
                  href="tel:0339269524"
                  className="h-11 sm:h-12 px-4 sm:px-5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                >
                  <PhoneCall className="w-4 h-4 text-amber-700" />
                  <span className="font-mono font-bold tracking-tight">0339.269.524</span>
                </a>

                {/* Consultation */}
                <button
                  onClick={() => {
                    setInfoModalData(null);
                    setIsQuoteModalOpen(true);
                  }}
                  className="h-11 sm:h-12 px-5 sm:px-6 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all rounded-xl shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
                >
                  <span>Đăng Ký Tư Vấn An Ninh</span>
                  <ArrowRight className="w-4 h-4" />
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
