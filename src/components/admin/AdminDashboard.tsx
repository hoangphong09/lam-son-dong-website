import React, { useState, useEffect } from 'react';
import {
  Post,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getHeroSlides,
  saveHeroSlides,
  getCaseStudies,
  saveCaseStudy,
  deleteCaseStudy,
  getQuoteRequests,
  updateQuoteRequest,
  deleteQuoteRequest,
  getStats,
  saveStat,
  deleteStat,
  toggleStatVisibility,
  reorderStats,
  SUPABASE_SETUP_SQL,
} from '../../lib/supabase';
import { HeroSlide, CaseStudy, QuoteRequest, StatMetric } from '../../types';
import { PostModal } from './PostModal';
import { HeroSlideModal } from './HeroSlideModal';
import { CaseStudyModal } from './CaseStudyModal';
import { StatModal } from './StatModal';
import {
  Shield,
  FileText,
  LayoutTemplate,
  Briefcase,
  Inbox,
  Database,
  Plus,
  Search,
  RefreshCw,
  Edit2,
  Trash2,
  ExternalLink,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Eye,
  EyeOff,
  Phone,
  Mail,
  Building,
  Clock,
  Filter,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Calendar,
  User,
  PhoneCall,
  Hash,
  AlertCircle
} from 'lucide-react';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
  onBackToHome: () => void;
  onHeroSlidesUpdated?: (slides: HeroSlide[]) => void;
  onStatsUpdated?: (stats: StatMetric[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  onLogout,
  onBackToHome,
  onHeroSlidesUpdated,
  onStatsUpdated,
}) => {
  // Navigation tabs support routing: /admin/stats, /admin/quote-requests, etc.
  const getInitialTab = (): 'stats' | 'quotes' | 'posts' | 'hero' | 'casestudies' | 'database' => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/admin/stats' || hash === '#admin/stats' || hash.includes('tab=stats')) return 'stats';
    if (path === '/admin/quote-requests' || path === '/admin/quotes' || hash === '#admin/quote-requests' || hash.includes('tab=quotes')) return 'quotes';
    if (path === '/admin/hero' || hash.includes('tab=hero')) return 'hero';
    if (path === '/admin/casestudies' || hash.includes('tab=casestudies')) return 'casestudies';
    if (path === '/admin/database' || hash.includes('tab=database')) return 'database';
    return 'stats';
  };

  const [activeTab, setActiveTab] = useState<'stats' | 'quotes' | 'posts' | 'hero' | 'casestudies' | 'database'>(getInitialTab);

  const switchTab = (tab: 'stats' | 'quotes' | 'posts' | 'hero' | 'casestudies' | 'database') => {
    setActiveTab(tab);
    if (tab === 'stats') {
      window.history.replaceState(null, '', '#admin/stats');
    } else if (tab === 'quotes') {
      window.history.replaceState(null, '', '#admin/quote-requests');
    } else {
      window.history.replaceState(null, '', `#admin/${tab}`);
    }
  };

  // Stats state (HIỆU QUẢ THỰC TẾ)
  const [stats, setStats] = useState<StatMetric[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statSearchTerm, setStatSearchTerm] = useState('');
  const [editingStat, setEditingStat] = useState<StatMetric | null>(null);
  const [isStatModalOpen, setIsStatModalOpen] = useState(false);
  const [deletingStatId, setDeletingStatId] = useState<string | number | null>(null);
  const [statNotice, setStatNotice] = useState<string | null>(null);

  // Quote Requests state (YÊU CẦU BÁO GIÁ)
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(true);
  const [quoteSearchTerm, setQuoteSearchTerm] = useState('');
  const [quoteStatusFilter, setQuoteStatusFilter] = useState<string>('all');
  const [quoteDateFilter, setQuoteDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [viewingQuote, setViewingQuote] = useState<QuoteRequest | null>(null);
  const [deletingQuoteId, setDeletingQuoteId] = useState<string | null>(null);

  // Posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [postSearchTerm, setPostSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [postNotice, setPostNotice] = useState<string | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | number | null>(null);
  const [previewPost, setPreviewPost] = useState<Post | null>(null);

  // Hero section state
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [isLoadingHero, setIsLoadingHero] = useState(true);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);

  // Case Studies state
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoadingCases, setIsLoadingCases] = useState(true);
  const [caseSearchTerm, setCaseSearchTerm] = useState('');
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [deletingCaseId, setDeletingCaseId] = useState<string | null>(null);

  // Database Tab state
  const [copiedSql, setCopiedSql] = useState(false);

  // Listen to hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin/stats') setActiveTab('stats');
      else if (hash === '#admin/quote-requests' || hash === '#admin/quotes') setActiveTab('quotes');
      else if (hash === '#admin/posts') setActiveTab('posts');
      else if (hash === '#admin/hero') setActiveTab('hero');
      else if (hash === '#admin/casestudies') setActiveTab('casestudies');
      else if (hash === '#admin/database') setActiveTab('database');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch Stats (HIỆU QUẢ THỰC TẾ)
  const loadStats = async () => {
    setIsLoadingStats(true);
    setStatNotice(null);
    try {
      const data = await getStats();
      setStats(data || []);
      if (onStatsUpdated) onStatsUpdated(data || []);
    } catch (err: any) {
      console.error(err);
      setStatNotice('Lỗi khi tải dữ liệu chỉ số từ Supabase.');
    } finally {
      setIsLoadingStats(false);
    }
  };

  // Fetch Quote Requests
  const loadQuoteRequests = async () => {
    setIsLoadingQuotes(true);
    try {
      const quotes = await getQuoteRequests();
      setQuoteRequests(quotes);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingQuotes(false);
    }
  };

  // Fetch Posts
  const loadPosts = async () => {
    setIsLoadingPosts(true);
    setPostNotice(null);
    try {
      const { data, error, fromFallback } = await getPosts();
      setPosts(data || []);
      if (error && fromFallback) {
        setPostNotice(
          `Lưu ý: Bảng 'posts' chưa được tạo trên Supabase hoặc chưa cấp quyền. Dữ liệu đang được đồng bộ tự động qua bộ nhớ đệm an toàn.`
        );
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  // Fetch Hero Slides
  const loadHeroSlides = async () => {
    setIsLoadingHero(true);
    try {
      const slides = await getHeroSlides();
      setHeroSlides(slides);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingHero(false);
    }
  };

  // Fetch Case Studies
  const loadCaseStudies = async () => {
    setIsLoadingCases(true);
    try {
      const cs = await getCaseStudies();
      setCaseStudies(cs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingCases(false);
    }
  };

  useEffect(() => {
    loadStats();
    loadQuoteRequests();
    loadPosts();
    loadHeroSlides();
    loadCaseStudies();
  }, []);

  // STATS HANDLERS
  const handleSaveStat = async (statData: Partial<StatMetric>) => {
    const res = await saveStat(statData);
    if (res.success) {
      await loadStats();
      setIsStatModalOpen(false);
      setEditingStat(null);
    }
    return res;
  };

  const handleConfirmDeleteStat = async () => {
    if (!deletingStatId) return;
    await deleteStat(deletingStatId);
    setDeletingStatId(null);
    await loadStats();
  };

  const handleToggleStat = async (id: string | number, currentActive: boolean) => {
    await toggleStatVisibility(id, !currentActive);
    await loadStats();
  };

  const handleMoveStatOrder = async (stat: StatMetric, direction: 'up' | 'down') => {
    const sorted = [...stats].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    const currentIndex = sorted.findIndex((s) => String(s.id) === String(stat.id));
    if (currentIndex === -1) return;
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= sorted.length) return;

    // Swap positions
    const temp = sorted[currentIndex];
    sorted[currentIndex] = sorted[targetIndex];
    sorted[targetIndex] = temp;

    // Re-assign display_order sequentially 1..n
    sorted.forEach((item, idx) => {
      item.display_order = idx + 1;
    });

    setStats([...sorted]);
    await reorderStats(sorted);
    if (onStatsUpdated) onStatsUpdated(sorted);
  };

  // QUOTE REQUEST HANDLERS
  const handleUpdateQuoteStatus = async (id: string, status: QuoteRequest['status'], notes?: string) => {
    await updateQuoteRequest(id, { status, ...(notes !== undefined ? { notes } : {}) });
    await loadQuoteRequests();
    if (viewingQuote && viewingQuote.id === id) {
      setViewingQuote((prev) => (prev ? { ...prev, status, ...(notes !== undefined ? { notes } : {}) } : null));
    }
  };

  const handleConfirmDeleteQuote = async () => {
    if (!deletingQuoteId) return;
    await deleteQuoteRequest(deletingQuoteId);
    setDeletingQuoteId(null);
    if (viewingQuote && viewingQuote.id === deletingQuoteId) {
      setViewingQuote(null);
    }
    await loadQuoteRequests();
  };

  // POST HANDLERS
  const handleSavePost = async (postData: Partial<Post>) => {
    if (editingPost && editingPost.id) {
      await updatePost(editingPost.id, postData);
    } else {
      await createPost(postData as any);
    }
    await loadPosts();
    setEditingPost(null);
  };

  const handleConfirmDeletePost = async () => {
    if (!deletingPostId) return;
    await deletePost(deletingPostId);
    setDeletingPostId(null);
    await loadPosts();
  };

  // HERO SLIDE HANDLERS
  const handleSaveHeroSlide = async (updatedSlide: HeroSlide) => {
    const nextSlides = heroSlides.map((s) => (s.id === updatedSlide.id ? updatedSlide : s));
    setHeroSlides(nextSlides);
    await saveHeroSlides(nextSlides);
    if (onHeroSlidesUpdated) {
      onHeroSlidesUpdated(nextSlides);
    }
    setEditingSlide(null);
  };

  // CASE STUDY HANDLERS
  const handleSaveCase = async (cs: CaseStudy) => {
    await saveCaseStudy(cs);
    await loadCaseStudies();
    setEditingCaseStudy(null);
  };

  const handleConfirmDeleteCase = async () => {
    if (!deletingCaseId) return;
    await deleteCaseStudy(deletingCaseId);
    setDeletingCaseId(null);
    await loadCaseStudies();
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  // Filter Stats
  const filteredStats = stats.filter((st) => {
    const s = statSearchTerm.toLowerCase();
    return (
      (st.title && st.title.toLowerCase().includes(s)) ||
      (st.numeric_value && String(st.numeric_value).toLowerCase().includes(s)) ||
      (st.description && st.description.toLowerCase().includes(s)) ||
      (st.unit && st.unit.toLowerCase().includes(s))
    );
  }).sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));

  // Filter Quotes
  const filteredQuotes = quoteRequests.filter((q) => {
    const s = quoteSearchTerm.toLowerCase();
    const matchesSearch =
      (q.client_name && q.client_name.toLowerCase().includes(s)) ||
      (q.contactName && q.contactName.toLowerCase().includes(s)) ||
      (q.phone && q.phone.toLowerCase().includes(s)) ||
      (q.contactPhone && q.contactPhone.toLowerCase().includes(s)) ||
      (q.email && q.email.toLowerCase().includes(s)) ||
      (q.contactEmail && q.contactEmail.toLowerCase().includes(s)) ||
      (q.company_name && q.company_name.toLowerCase().includes(s)) ||
      (q.companyName && q.companyName.toLowerCase().includes(s)) ||
      (q.service_needed && q.service_needed.toLowerCase().includes(s)) ||
      (q.serviceType && q.serviceType.toLowerCase().includes(s)) ||
      (q.message && q.message.toLowerCase().includes(s));

    let matchesStatus = true;
    if (quoteStatusFilter !== 'all') {
      if (quoteStatusFilter === 'contacted') {
        matchesStatus = q.status === 'contacted' || q.status === 'processing';
      } else if (quoteStatusFilter === 'closed') {
        matchesStatus = q.status === 'closed' || q.status === 'completed';
      } else {
        matchesStatus = q.status === quoteStatusFilter;
      }
    }

    let matchesDate = true;
    if (quoteDateFilter !== 'all' && q.created_at) {
      const qDate = new Date(q.created_at).getTime();
      const now = Date.now();
      const diffMs = now - qDate;
      if (quoteDateFilter === 'today') {
        matchesDate = diffMs <= 24 * 60 * 60 * 1000;
      } else if (quoteDateFilter === 'week') {
        matchesDate = diffMs <= 7 * 24 * 60 * 60 * 1000;
      } else if (quoteDateFilter === 'month') {
        matchesDate = diffMs <= 30 * 24 * 60 * 60 * 1000;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Filter Posts
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(postSearchTerm.toLowerCase()) ||
      (p.slug && p.slug.toLowerCase().includes(postSearchTerm.toLowerCase())) ||
      (p.excerpt && p.excerpt.toLowerCase().includes(postSearchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));

  // Filter Case Studies
  const filteredCaseStudies = caseStudies.filter((cs) => {
    const s = caseSearchTerm.toLowerCase();
    return (
      cs.title.toLowerCase().includes(s) ||
      cs.client.toLowerCase().includes(s) ||
      cs.sector.toLowerCase().includes(s) ||
      cs.solution.toLowerCase().includes(s)
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 selection:bg-[#c5a059] selection:text-black font-['Be_Vietnam_Pro'] antialiased">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-50 border border-amber-300 text-amber-700 flex items-center justify-center rounded">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold uppercase tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                  HỆ THỐNG QUẢN TRỊ NỘI DUNG
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold border border-amber-300">
                  SUPABASE CLOUD
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono hidden sm:block">
                Bảo Vệ Chuyên Nghiệp Lâm Sơn Động • {user?.email || 'admin@lamsondong.vn'}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onBackToHome}
              className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-black border border-slate-300 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 rounded"
              title="Quay lại giao diện người dùng"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Về Trang Chủ</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 rounded"
              title="Đăng xuất khỏi bảng quản trị"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 border-t border-slate-200 text-xs font-mono uppercase tracking-wider overflow-x-auto">
          {/* TAB 1: HIỆU QUẢ THỰC TẾ (STATS) */}
          <button
            onClick={() => switchTab('stats')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'stats'
                ? 'border-[#c5a059] text-amber-900 font-bold bg-amber-50/60'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-amber-700" />
            <span>Hiệu Quả Thực Tế ({stats.length})</span>
          </button>

          {/* TAB 2: YÊU CẦU BÁO GIÁ (LEADS) */}
          <button
            onClick={() => switchTab('quotes')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'quotes'
                ? 'border-[#c5a059] text-amber-900 font-bold bg-amber-50/60'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Inbox className="w-4 h-4 text-amber-700" />
            <span>Yêu Cầu Báo Giá ({quoteRequests.length})</span>
            {quoteRequests.filter(q => q.status === 'new').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>

          {/* TAB 3: BÀI VIẾT */}
          <button
            onClick={() => switchTab('posts')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'posts'
                ? 'border-[#c5a059] text-amber-900 font-bold bg-amber-50/60'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Bài Viết ({posts.length})</span>
          </button>

          {/* TAB 4: BANNER HERO */}
          <button
            onClick={() => switchTab('hero')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'hero'
                ? 'border-[#c5a059] text-amber-900 font-bold bg-amber-50/60'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>Banner Hero ({heroSlides.length})</span>
          </button>

          {/* TAB 5: DỰ ÁN TIÊU BIỂU */}
          <button
            onClick={() => switchTab('casestudies')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'casestudies'
                ? 'border-[#c5a059] text-amber-900 font-bold bg-amber-50/60'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Dự Án Tiêu Biểu ({caseStudies.length})</span>
          </button>

          {/* TAB 6: CƠ SỞ DỮ LIỆU SQL */}
          <button
            onClick={() => switchTab('database')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'database'
                ? 'border-[#c5a059] text-amber-900 font-bold bg-amber-50/60'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Cơ Sở Dữ Liệu SQL</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ========================================================= */}
        {/* TAB 1: HIỆU QUẢ THỰC TẾ (KEY STATS MANAGEMENT)            */}
        {/* ========================================================= */}
        {activeTab === 'stats' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 border border-slate-200 rounded shadow-xs">
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={statSearchTerm}
                    onChange={(e) => setStatSearchTerm(e.target.value)}
                    placeholder="Tìm theo tiêu đề, giá trị, mô tả chỉ số..."
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs rounded focus:outline-hidden"
                  />
                </div>

                <button
                  onClick={loadStats}
                  className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-900 rounded transition-colors"
                  title="Tải lại danh sách chỉ số"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingStats ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs font-mono text-slate-600">
                  Tổng số: <span className="font-bold text-slate-900">{stats.length}</span> chỉ số
                  {' • '}<span className="text-emerald-700 font-bold">{stats.filter(s => s.is_active !== false).length} đang hiển thị</span>
                </div>

                <button
                  onClick={() => {
                    setEditingStat(null);
                    setIsStatModalOpen(true);
                  }}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-mono font-bold uppercase tracking-wider rounded shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Chỉ Số Mới</span>
                </button>
              </div>
            </div>

            {statNotice && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
                <span>{statNotice}</span>
              </div>
            )}

            {/* Stats Table / List */}
            <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 text-center w-24">Thứ Tự</th>
                      <th className="py-3.5 px-4 w-40">Giá Trị & Đơn Vị</th>
                      <th className="py-3.5 px-4">Tiêu Đề Chỉ Số</th>
                      <th className="py-3.5 px-4">Mô Tả Năng Lực</th>
                      <th className="py-3.5 px-4 text-center w-32">Hiển Thị</th>
                      <th className="py-3.5 px-4 text-right w-28">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoadingStats ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-600" />
                          Đang tải chỉ số hiệu quả thực tế từ Supabase...
                        </td>
                      </tr>
                    ) : filteredStats.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                          Chưa có chỉ số nào được tạo. Nhấn "Thêm Chỉ Số Mới" để tạo chỉ số đầu tiên!
                        </td>
                      </tr>
                    ) : (
                      filteredStats.map((st, index) => (
                        <tr key={st.id || index} className="hover:bg-slate-50 transition-colors">
                          {/* Order & Reorder Controls */}
                          <td className="py-3 px-4 text-center">
                            <div className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono font-bold text-slate-800 text-xs">
                              <span>#{st.display_order}</span>
                              <div className="flex flex-col ml-1">
                                <button
                                  type="button"
                                  disabled={index === 0}
                                  onClick={() => handleMoveStatOrder(st, 'up')}
                                  className="text-slate-400 hover:text-amber-800 disabled:opacity-20 transition-colors"
                                  title="Di chuyển lên trên"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  disabled={index === filteredStats.length - 1}
                                  onClick={() => handleMoveStatOrder(st, 'down')}
                                  className="text-slate-400 hover:text-amber-800 disabled:opacity-20 transition-colors"
                                  title="Di chuyển xuống dưới"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* Numeric Value & Unit */}
                          <td className="py-3 px-4">
                            <div className="flex items-baseline gap-1 font-mono font-black text-slate-900 text-base">
                              <span>{st.numeric_value}</span>
                              <span className="text-amber-700 text-sm font-bold">
                                {st.unit || st.suffix || ''}
                              </span>
                            </div>
                          </td>

                          {/* Title */}
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {st.title}
                          </td>

                          {/* Description */}
                          <td className="py-3 px-4 text-slate-600 max-w-md line-clamp-2">
                            {st.description || '—'}
                          </td>

                          {/* Visibility Toggle */}
                          <td className="py-3 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleStat(st.id, st.is_active !== false)}
                              className={`px-2.5 py-1 rounded font-mono font-bold text-[11px] border inline-flex items-center gap-1.5 transition-all ${
                                st.is_active !== false
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                                  : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'
                              }`}
                              title="Bấm để bật / tắt hiển thị trên website"
                            >
                              {st.is_active !== false ? (
                                <>
                                  <Eye className="w-3 h-3 text-emerald-600" />
                                  <span>Hiển thị</span>
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-3 h-3 text-slate-400" />
                                  <span>Tạm ẩn</span>
                                </>
                              )}
                            </button>
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setEditingStat(st);
                                  setIsStatModalOpen(true);
                                }}
                                className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded"
                                title="Chỉnh sửa chỉ số"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => setDeletingStatId(st.id)}
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded"
                                title="Xóa chỉ số"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: YÊU CẦU BÁO GIÁ (QUOTE REQUESTS & LEADS)             */}
        {/* ========================================================= */}
        {activeTab === 'quotes' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter & Search Bar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 border border-slate-200 rounded shadow-xs">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search box */}
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={quoteSearchTerm}
                    onChange={(e) => setQuoteSearchTerm(e.target.value)}
                    placeholder="Tìm theo khách hàng, điện thoại, email, dịch vụ, công ty..."
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs rounded focus:outline-hidden"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={quoteStatusFilter}
                    onChange={(e) => setQuoteStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded focus:outline-hidden font-medium"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="new">Mới nhận (Chờ xử lý)</option>
                    <option value="contacted">Đã liên hệ / Đang tư vấn</option>
                    <option value="closed">Đã chốt / Ký hợp đồng</option>
                    <option value="cancelled">Đã hủy / Spam</option>
                  </select>
                </div>

                {/* Date Filter */}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={quoteDateFilter}
                    onChange={(e) => setQuoteDateFilter(e.target.value as any)}
                    className="px-3 py-2 bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded focus:outline-hidden font-medium"
                  >
                    <option value="all">Tất cả thời gian</option>
                    <option value="today">Hôm nay (24h qua)</option>
                    <option value="week">7 ngày gần nhất</option>
                    <option value="month">30 ngày qua</option>
                  </select>
                </div>

                <button
                  onClick={loadQuoteRequests}
                  className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-900 rounded transition-colors"
                  title="Tải lại danh sách"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingQuotes ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Counter badges */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded font-bold">
                  {quoteRequests.filter(q => q.status === 'new').length} Mới
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-900 border border-blue-300 rounded font-bold">
                  {quoteRequests.filter(q => q.status === 'contacted' || q.status === 'processing').length} Đã liên hệ
                </span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded font-bold">
                  {quoteRequests.filter(q => q.status === 'closed' || q.status === 'completed').length} Đã chốt
                </span>
                <span className="text-slate-500 ml-1">
                  (Tổng {filteredQuotes.length} yêu cầu)
                </span>
              </div>
            </div>

            {/* Table of Quote Requests */}
            <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 w-32">Thời Gian</th>
                      <th className="py-3.5 px-4">Khách Hàng & Liên Hệ</th>
                      <th className="py-3.5 px-4">Dịch Vụ Yêu Cầu</th>
                      <th className="py-3.5 px-4 max-w-xs">Ghi Chú Khách</th>
                      <th className="py-3.5 px-4 w-40">Trạng Thái</th>
                      <th className="py-3.5 px-4 text-right w-44">Thao Tác Nhanh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoadingQuotes ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-600" />
                          Đang tải danh sách yêu cầu báo giá từ Supabase...
                        </td>
                      </tr>
                    ) : filteredQuotes.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                          Không tìm thấy yêu cầu báo giá nào phù hợp với bộ lọc hiện tại.
                        </td>
                      </tr>
                    ) : (
                      filteredQuotes.map((q) => {
                        const name = q.client_name || q.contactName || 'Khách hàng ẩn';
                        const phone = q.phone || q.contactPhone || '—';
                        const email = q.email || q.contactEmail;
                        const service = q.service_needed || q.serviceType || 'Dịch vụ An Ninh';
                        const company = q.company_name || q.companyName;

                        return (
                          <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                            {/* Timestamp */}
                            <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                              {new Date(q.created_at).toLocaleDateString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })}
                            </td>

                            {/* Client & Contact Info */}
                            <td className="py-3 px-4">
                              <div className="font-bold text-slate-900 text-xs sm:text-sm">{name}</div>
                              <div className="flex items-center gap-3 mt-0.5">
                                {phone !== '—' && (
                                  <a 
                                    href={`tel:${phone}`} 
                                    className="text-[11px] text-amber-800 font-mono font-bold flex items-center gap-1 hover:underline"
                                    title="Bấm để gọi trực tiếp"
                                  >
                                    <Phone className="w-3 h-3 text-amber-700" />
                                    {phone}
                                  </a>
                                )}
                                {email && (
                                  <a 
                                    href={`mailto:${email}`} 
                                    className="text-[11px] text-slate-500 flex items-center gap-1 hover:text-slate-800 hover:underline"
                                    title="Bấm để gửi email"
                                  >
                                    <Mail className="w-3 h-3" />
                                    {email}
                                  </a>
                                )}
                              </div>
                              {company && (
                                <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                  <Building className="w-3 h-3" /> {company}
                                </div>
                              )}
                            </td>

                            {/* Service Needed */}
                            <td className="py-3 px-4">
                              <span className="font-semibold text-slate-900 line-clamp-1">
                                {service}
                              </span>
                              {q.region && (
                                <span className="text-[10px] text-slate-500 font-mono block">
                                  Khu vực: {q.region}
                                </span>
                              )}
                            </td>

                            {/* Client Note Preview */}
                            <td className="py-3 px-4 max-w-xs">
                              <p className="text-slate-600 line-clamp-2 italic text-[11px]">
                                {q.message || '— Không có ghi chú thêm —'}
                              </p>
                              {q.notes && (
                                <span className="inline-block mt-1 text-[10px] font-mono bg-amber-50 text-amber-900 border border-amber-200 px-1.5 py-0.5 rounded">
                                  Ghi chú nội bộ: {q.notes}
                                </span>
                              )}
                            </td>

                            {/* Status Selector */}
                            <td className="py-3 px-4">
                              <select
                                value={q.status}
                                onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value as any)}
                                className={`text-[11px] font-mono font-bold px-2.5 py-1.5 rounded border transition-colors ${
                                  q.status === 'new'
                                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                                    : q.status === 'contacted' || q.status === 'processing'
                                    ? 'bg-blue-50 text-blue-900 border-blue-300'
                                    : q.status === 'closed' || q.status === 'completed'
                                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                    : 'bg-slate-100 text-slate-600 border-slate-300'
                                }`}
                              >
                                <option value="new">Mới nhận</option>
                                <option value="contacted">Đã liên hệ</option>
                                <option value="closed">Đã chốt / Ký HĐ</option>
                                <option value="cancelled">Hủy / Spam</option>
                              </select>
                            </td>

                            {/* Quick Actions */}
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* Fast 1-click status transition */}
                                {q.status === 'new' && (
                                  <button
                                    onClick={() => handleUpdateQuoteStatus(q.id, 'contacted')}
                                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded font-mono text-[10px] font-bold"
                                    title="Đánh dấu đã gọi điện liên hệ khách"
                                  >
                                    Đã liên hệ
                                  </button>
                                )}
                                {(q.status === 'contacted' || q.status === 'processing') && (
                                  <button
                                    onClick={() => handleUpdateQuoteStatus(q.id, 'closed')}
                                    className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded font-mono text-[10px] font-bold"
                                    title="Đánh dấu đã chốt hợp đồng thành công"
                                  >
                                    Đã chốt
                                  </button>
                                )}

                                <button
                                  onClick={() => setViewingQuote(q)}
                                  className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-black border border-slate-200 rounded"
                                  title="Xem toàn bộ hồ sơ báo giá"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => setDeletingQuoteId(q.id)}
                                  className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded"
                                  title="Xóa yêu cầu spam"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: BÀI VIẾT & TIN TỨC                                  */}
        {/* ========================================================= */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 border border-slate-200 rounded shadow-xs">
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={postSearchTerm}
                    onChange={(e) => setPostSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm bài viết theo tiêu đề, slug, tóm tắt..."
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs rounded focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded focus:outline-hidden"
                  >
                    <option value="all">Tất cả chuyên mục</option>
                    {uniqueCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={loadPosts}
                  className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-900 rounded transition-colors"
                  title="Tải lại danh sách"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingPosts ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs font-mono text-slate-600">
                  Tổng số: <span className="font-bold text-slate-900">{posts.length}</span> bài viết
                </div>

                <button
                  onClick={() => {
                    setEditingPost(null);
                    setIsPostModalOpen(true);
                  }}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-mono font-bold uppercase tracking-wider rounded shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Bài Viết Mới</span>
                </button>
              </div>
            </div>

            {postNotice && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
                <span>{postNotice}</span>
              </div>
            )}

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingPosts ? (
                <div className="col-span-full py-12 text-center text-slate-500 font-mono">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-600" />
                  Đang tải danh sách bài viết từ Supabase...
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-500 font-mono">
                  Không tìm thấy bài viết nào phù hợp.
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                  >
                    <div>
                      <div className="h-44 bg-slate-100 overflow-hidden relative">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-amber-900 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-200">
                          {post.category || 'Tin tức'}
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                          <span>{post.date || new Date().toLocaleDateString('vi-VN')}</span>
                          <span>•</span>
                          <span>{post.author || 'Ban Biên Tập'}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-amber-800 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 font-light">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setPreviewPost(post)}
                        className="text-xs font-mono font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem trước</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingPost(post);
                            setIsPostModalOpen(true);
                          }}
                          className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded text-xs"
                          title="Chỉnh sửa bài viết"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingPostId(post.id)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded text-xs"
                          title="Xóa bài viết"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: BANNER HERO                                         */}
        {/* ========================================================= */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 border border-slate-200 rounded shadow-xs">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                  Quản lý Slide Banner Hero Trang Chủ
                </h2>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  Tùy chỉnh tiêu đề, slogan, hình ảnh và khẩu hiệu hành động hiển thị ở đầu trang web.
                </p>
              </div>

              <button
                onClick={loadHeroSlides}
                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-900 rounded transition-colors"
                title="Tải lại slides"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingHero ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 bg-slate-100 overflow-hidden relative">
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-900/80 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        Slide 0{index + 1}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800">
                        {slide.subtitle}
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">
                        {slide.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-light line-clamp-2">
                        {slide.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">
                      Nút: <strong className="text-slate-800">{slide.ctaText}</strong>
                    </span>

                    <button
                      onClick={() => {
                        setEditingSlide(slide);
                        setIsHeroModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Sửa Slide</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: DỰ ÁN TIÊU BIỂU (CASE STUDIES)                      */}
        {/* ========================================================= */}
        {activeTab === 'casestudies' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 border border-slate-200 rounded shadow-xs">
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={caseSearchTerm}
                    onChange={(e) => setCaseSearchTerm(e.target.value)}
                    placeholder="Tìm theo tên dự án, đối tác, lĩnh vực..."
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs rounded focus:outline-hidden"
                  />
                </div>

                <button
                  onClick={loadCaseStudies}
                  className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-900 rounded transition-colors"
                  title="Tải lại danh sách"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingCases ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs font-mono text-slate-600">
                  Tổng số: <span className="font-bold text-slate-900">{caseStudies.length}</span> dự án
                </div>

                <button
                  onClick={() => {
                    setEditingCaseStudy(null);
                    setIsCaseModalOpen(true);
                  }}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-mono font-bold uppercase tracking-wider rounded shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Dự Án Mới</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCaseStudies.map((cs) => (
                <div
                  key={cs.id}
                  className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 bg-slate-100 overflow-hidden relative">
                      <img
                        src={cs.imageUrl}
                        alt={cs.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-900/80 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        {cs.sector}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="text-[11px] font-mono text-slate-500">
                        Khách hàng: <span className="font-bold text-slate-800">{cs.client}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        {cs.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {cs.solution}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">
                      ID: {cs.id}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingCaseStudy(cs);
                          setIsCaseModalOpen(true);
                        }}
                        className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded text-xs"
                        title="Sửa dự án"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingCaseId(cs.id)}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded text-xs"
                        title="Xóa dự án"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: DATABASE & SQL SETUP                                */}
        {/* ========================================================= */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold uppercase tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                    Cơ Sở Dữ Liệu Supabase Cloud
                  </h2>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    Dự án kết nối: <span className="font-mono text-amber-800 font-bold">reuogjwrzfavdlidwujk.supabase.co</span>
                  </p>
                </div>

                <button
                  onClick={handleCopySql}
                  className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copiedSql ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSql ? 'Đã sao chép SQL!' : 'Sao chép mã SQL cài đặt'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Để kích hoạt đầy đủ lưu trữ bảng <strong>stats</strong>, <strong>quote_requests</strong>, <strong>posts</strong>, <strong>hero_slides</strong> và <strong>case_studies</strong> trực tiếp trên Supabase Dashboard, vui lòng mở SQL Editor và chạy đoạn mã dưới đây:
              </p>

              <pre className="p-4 bg-slate-900 text-amber-400 font-mono text-xs rounded overflow-x-auto max-h-96">
                <code>{SUPABASE_SETUP_SQL}</code>
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* ALL MODALS                                                */}
      {/* ========================================================= */}

      {/* 1. Stat Modal (Create/Edit) */}
      <StatModal
        isOpen={isStatModalOpen}
        onClose={() => {
          setIsStatModalOpen(false);
          setEditingStat(null);
        }}
        onSave={handleSaveStat}
        stat={editingStat}
      />

      {/* 2. Post Modal */}
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => {
          setIsPostModalOpen(false);
          setEditingPost(null);
        }}
        onSave={handleSavePost}
        postToEdit={editingPost}
      />

      {/* 3. Hero Slide Modal */}
      <HeroSlideModal
        isOpen={isHeroModalOpen}
        onClose={() => {
          setIsHeroModalOpen(false);
          setEditingSlide(null);
        }}
        onSave={handleSaveHeroSlide}
        slide={editingSlide}
      />

      {/* 4. Case Study Modal */}
      <CaseStudyModal
        isOpen={isCaseModalOpen}
        onClose={() => {
          setIsCaseModalOpen(false);
          setEditingCaseStudy(null);
        }}
        onSave={handleSaveCase}
        caseStudy={editingCaseStudy}
      />

      {/* 5. Delete Stat Modal */}
      {deletingStatId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-red-200 p-6 max-w-md w-full space-y-4 shadow-xl text-slate-900 rounded">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold uppercase tracking-tight text-base font-['Plus_Jakarta_Sans']">
                Xác nhận xóa chỉ số thống kê
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hành động này sẽ xóa vĩnh viễn chỉ số này khỏi cơ sở dữ liệu và bảng "Hiệu Quả Thực Tế" trên trang chủ.
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingStatId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-mono uppercase"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDeleteStat}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs font-mono uppercase tracking-wider rounded"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Delete Post Modal */}
      {deletingPostId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-red-200 p-6 max-w-md w-full space-y-4 shadow-xl text-slate-900 rounded">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold uppercase tracking-tight text-base font-['Plus_Jakarta_Sans']">
                Xác nhận xóa bài viết
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hành động này sẽ xóa vĩnh viễn bài viết khỏi hệ thống. Bạn có chắc chắn muốn tiếp tục?
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingPostId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-mono uppercase"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDeletePost}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs font-mono uppercase tracking-wider rounded"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Delete Case Study Modal */}
      {deletingCaseId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-red-200 p-6 max-w-md w-full space-y-4 shadow-xl text-slate-900 rounded">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold uppercase tracking-tight text-base font-['Plus_Jakarta_Sans']">
                Xác nhận xóa dự án
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hành động này sẽ xóa vĩnh viễn dự án này khỏi cơ sở dữ liệu. Bạn có chắc chắn muốn tiếp tục?
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingCaseId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-mono uppercase"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDeleteCase}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs font-mono uppercase tracking-wider rounded"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Delete Quote Request Modal */}
      {deletingQuoteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-red-200 p-6 max-w-md w-full space-y-4 shadow-xl text-slate-900 rounded">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold uppercase tracking-tight text-base font-['Plus_Jakarta_Sans']">
                Xác nhận xóa yêu cầu báo giá
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hành động này sẽ xóa vĩnh viễn yêu cầu báo giá này khỏi danh sách quản lý.
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingQuoteId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-mono uppercase"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDeleteQuote}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs font-mono uppercase tracking-wider rounded"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Viewing Quote Detail Modal */}
      {viewingQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 p-6 max-w-xl w-full space-y-4 shadow-2xl text-slate-900 rounded-sm max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-mono text-amber-800 font-bold uppercase">
                  Chi tiết yêu cầu báo giá • {viewingQuote.id}
                </span>
                <h3 className="font-bold text-slate-900 text-lg">
                  {viewingQuote.client_name || viewingQuote.contactName || 'Khách hàng'}
                </h3>
              </div>
              <button
                onClick={() => setViewingQuote(null)}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs rounded"
              >
                Đóng
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 font-mono block text-[11px]">Số điện thoại:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-bold text-amber-800 text-sm font-mono">
                    {viewingQuote.phone || viewingQuote.contactPhone}
                  </span>
                  {(viewingQuote.phone || viewingQuote.contactPhone) && (
                    <a
                      href={`tel:${viewingQuote.phone || viewingQuote.contactPhone}`}
                      className="p-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded"
                      title="Bấm gọi ngay"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-mono block text-[11px]">Email:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-medium text-slate-800">
                    {viewingQuote.email || viewingQuote.contactEmail || 'Chưa cung cấp'}
                  </span>
                  {(viewingQuote.email || viewingQuote.contactEmail) && (
                    <a
                      href={`mailto:${viewingQuote.email || viewingQuote.contactEmail}`}
                      className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded"
                      title="Gửi email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-mono block text-[11px]">Doanh nghiệp:</span>
                <span className="font-medium text-slate-800">
                  {viewingQuote.company_name || viewingQuote.companyName || 'Cá nhân'}
                </span>
              </div>

              <div>
                <span className="text-slate-500 font-mono block text-[11px]">Khu vực / Tỉnh thành:</span>
                <span className="font-medium text-slate-800">
                  {viewingQuote.region || 'Toàn quốc'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-700">Dịch vụ yêu cầu:</span>{' '}
                <span className="text-slate-900 font-semibold">
                  {viewingQuote.service_needed || viewingQuote.serviceType}
                </span>
              </div>

              {viewingQuote.targetType && viewingQuote.targetType !== (viewingQuote.service_needed || viewingQuote.serviceType) && (
                <div>
                  <span className="font-bold text-slate-700">Loại mục tiêu:</span>{' '}
                  <span className="text-slate-900">{viewingQuote.targetType}</span>
                </div>
              )}

              {viewingQuote.message && (
                <div>
                  <span className="font-bold text-slate-700">Ghi chú từ khách:</span>
                  <p className="text-slate-800 italic mt-0.5 bg-white p-2.5 rounded border border-slate-200">
                    {viewingQuote.message}
                  </p>
                </div>
              )}
            </div>

            {/* Status Selector in Modal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Trạng thái xử lý:</label>
              <select
                value={viewingQuote.status}
                onChange={(e) => handleUpdateQuoteStatus(viewingQuote.id, e.target.value as any)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-slate-800"
              >
                <option value="new">Mới nhận</option>
                <option value="contacted">Đã liên hệ / Đang tư vấn</option>
                <option value="closed">Đã chốt / Ký hợp đồng</option>
                <option value="cancelled">Hủy / Spam</option>
              </select>
            </div>

            {/* Internal CRM notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ghi chú nội bộ chăm sóc khách hàng (Lưu tự động khi rời ô):
              </label>
              <textarea
                rows={3}
                defaultValue={viewingQuote.notes || ''}
                onBlur={(e) => handleUpdateQuoteStatus(viewingQuote.id, viewingQuote.status, e.target.value)}
                placeholder="Nhập tiến độ gọi điện thoại, lịch hẹn khảo sát thực địa, báo giá gửi khách..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* 10. Quick Preview Modal for Posts */}
      {previewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900 relative rounded-sm">
            <div className="h-56 bg-slate-100 overflow-hidden relative">
              <img
                src={previewPost.cover_image}
                alt={previewPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                {previewPost.category || 'Tin tức'}
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight font-['Plus_Jakarta_Sans'] text-slate-900">
                {previewPost.title}
              </h2>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pb-2 border-b border-slate-200">
                <span>Slug: /{previewPost.slug}</span>
                <span>•</span>
                <span>Tác giả: {previewPost.author || 'Ban Biên Tập'}</span>
              </div>
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                {previewPost.excerpt}
              </p>
              <div className="text-xs sm:text-sm text-slate-700 font-light leading-relaxed whitespace-pre-line">
                {previewPost.content}
              </div>
              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setPreviewPost(null)}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs uppercase font-bold transition-all rounded"
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
};
