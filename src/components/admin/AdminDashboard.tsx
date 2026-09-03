import React, { useState, useEffect } from 'react';
import {
  Post,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getHeroSlides,
  saveHeroSlides,
  supabase,
  SUPABASE_SETUP_SQL,
} from '../../lib/supabase';
import { HeroSlide } from '../../types';
import { PostModal } from './PostModal';
import { HeroSlideModal } from './HeroSlideModal';
import {
  Shield,
  FileText,
  LayoutTemplate,
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
  ArrowUpRight,
  Layers,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
  onBackToHome: () => void;
  onHeroSlidesUpdated?: (slides: HeroSlide[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  onLogout,
  onBackToHome,
  onHeroSlidesUpdated,
}) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'posts' | 'hero' | 'database'>('posts');

  // Posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [postNotice, setPostNotice] = useState<string | null>(null);
  const [isFromFallback, setIsFromFallback] = useState(false);

  // Modal states
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | number | null>(null);
  const [previewPost, setPreviewPost] = useState<Post | null>(null);

  // Hero section state
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [isLoadingHero, setIsLoadingHero] = useState(true);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);

  // Database Tab state
  const [copiedSql, setCopiedSql] = useState(false);

  // Fetch posts
  const loadPosts = async () => {
    setIsLoadingPosts(true);
    setPostNotice(null);
    try {
      const { data, error, fromFallback } = await getPosts();
      setPosts(data || []);
      setIsFromFallback(!!fromFallback);
      if (error && fromFallback) {
        setPostNotice(`Lưu ý: Bảng 'posts' chưa được tạo trên Supabase hoặc chưa cấp quyền. Dữ liệu đang được đồng bộ tự động qua bộ nhớ đệm an toàn.`);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  // Fetch hero slides
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

  useEffect(() => {
    loadPosts();
    loadHeroSlides();
  }, []);

  // Post CRUD Handlers
  const handleSavePost = async (postData: Partial<Post>) => {
    if (editingPost && editingPost.id) {
      const { data, error } = await updatePost(editingPost.id, postData);
      if (!error) {
        await loadPosts();
      } else {
        await loadPosts();
      }
    } else {
      const { data, error } = await createPost(postData as any);
      if (!error) {
        await loadPosts();
      } else {
        await loadPosts();
      }
    }
    setEditingPost(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingPostId) return;
    await deletePost(deletingPostId);
    setDeletingPostId(null);
    await loadPosts();
  };

  // Hero Slide Handlers
  const handleSaveHeroSlide = async (updatedSlide: HeroSlide) => {
    const nextSlides = heroSlides.map((s) => (s.id === updatedSlide.id ? updatedSlide : s));
    setHeroSlides(nextSlides);
    await saveHeroSlides(nextSlides);
    if (onHeroSlidesUpdated) {
      onHeroSlidesUpdated(nextSlides);
    }
    setEditingSlide(null);
  };

  const handleResetHeroSlides = async () => {
    if (window.confirm('Bạn có chắc chắn muốn đặt lại các Slide Hero về nội dung mặc định?')) {
      localStorage.removeItem('lsd_cached_hero_slides');
      await loadHeroSlides();
      if (onHeroSlidesUpdated) {
        const slides = await getHeroSlides();
        onHeroSlidesUpdated(slides);
      }
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.slug && p.slug.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.excerpt && p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean))
  );

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-gray-100 selection:bg-[#c5a059] selection:text-black font-['Be_Vietnam_Pro'] antialiased">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#111114]/95 border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#c5a059] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold uppercase tracking-tight text-white font-['Plus_Jakarta_Sans']">
                  HỆ THỐNG QUẢN TRỊ NỘI DUNG
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059] px-2 py-0.5">
                  SUPABASE CLOUD
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-mono hidden sm:block">
                Bảo Vệ Chuyên Nghiệp Lâm Sơn Động • {user?.email || 'admin@lamsondong.vn'}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onBackToHome}
              className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5"
              title="Quay lại giao diện người dùng"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="hidden sm:inline">Về Trang Chủ</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5"
              title="Đăng xuất khỏi bảng quản trị"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 border-t border-white/5 text-xs font-mono uppercase tracking-wider overflow-x-auto">
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'posts'
                ? 'border-[#c5a059] text-[#c5a059] font-bold bg-[#c5a059]/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Quản Lý Bài Viết ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'hero'
                ? 'border-[#c5a059] text-[#c5a059] font-bold bg-[#c5a059]/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>Quản Lý Hero Section ({heroSlides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'database'
                ? 'border-[#c5a059] text-[#c5a059] font-bold bg-[#c5a059]/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Kết Nối Supabase & SQL</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: POSTS CRUD */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            {/* Notice if sync fallback active */}
            {postNotice && (
              <div className="p-4 bg-[#1a1712] border border-[#c5a059]/40 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#c5a059] uppercase font-mono tracking-wide">
                      Trạng thái lưu trữ
                    </p>
                    <p className="text-gray-300 font-light mt-0.5">{postNotice}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('database')}
                  className="shrink-0 px-3 py-1 bg-[#c5a059] text-black font-bold text-[10px] font-mono uppercase tracking-wider hover:bg-[#d6b26b] transition-all"
                >
                  Xem mã SQL
                </button>
              </div>
            )}

            {/* Actions Bar */}
            <div className="bg-[#111114] border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm theo tiêu đề, slug, tóm tắt..."
                    className="w-full pl-9 pr-3.5 py-2 bg-[#0d0d0f] border border-white/15 focus:border-[#c5a059] text-white text-xs font-mono focus:outline-none transition-all placeholder:text-gray-600"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-[#0d0d0f] border border-white/15 focus:border-[#c5a059] text-gray-300 text-xs font-mono focus:outline-none transition-all hidden md:block"
                >
                  <option value="all">Tất cả chuyên mục</option>
                  {uniqueCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <button
                  onClick={loadPosts}
                  title="Tải lại danh sách"
                  className="p-2 bg-[#0d0d0f] border border-white/15 hover:border-[#c5a059] text-gray-400 hover:text-[#c5a059] transition-all"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingPosts ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Create Post Button */}
              <button
                onClick={() => {
                  setEditingPost(null);
                  setIsPostModalOpen(true);
                }}
                className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#d6b26b] text-black font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>Thêm Bài Viết Mới</span>
              </button>
            </div>

            {/* Posts Table */}
            <div className="bg-[#111114] border border-white/10 overflow-hidden shadow-xl">
              {isLoadingPosts ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    Đang tải dữ liệu từ Supabase...
                  </p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <FileText className="w-10 h-10 text-gray-600 mx-auto" />
                  <p className="text-sm font-bold text-gray-300 uppercase">
                    Không tìm thấy bài viết nào
                  </p>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto font-light">
                    {searchTerm
                      ? 'Thử thay đổi từ khóa tìm kiếm hoặc bỏ lọc chuyên mục.'
                      : 'Chưa có bài viết nào trong bảng. Hãy nhấn nút "Thêm Bài Viết Mới" để tạo bài viết đầu tiên.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-300">
                    <thead className="bg-[#0d0d0f] border-b border-white/10 text-[10px] font-mono uppercase tracking-widest text-gray-400">
                      <tr>
                        <th className="p-4 w-20">Ảnh</th>
                        <th className="p-4">Tiêu đề & Slug</th>
                        <th className="p-4 w-44">Chuyên mục</th>
                        <th className="p-4 w-32">Ngày tạo</th>
                        <th className="p-4 w-28">Trạng thái</th>
                        <th className="p-4 w-32 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredPosts.map((post) => (
                        <tr
                          key={String(post.id)}
                          className="hover:bg-white/[0.02] transition-colors group"
                        >
                          {/* Image thumbnail */}
                          <td className="p-4">
                            <div className="w-14 h-10 bg-[#0d0d0f] border border-white/10 overflow-hidden relative">
                              <img
                                src={post.cover_image || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=300&q=80'}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=300&q=80';
                                }}
                              />
                            </div>
                          </td>

                          {/* Title & Slug */}
                          <td className="p-4">
                            <div className="space-y-1">
                              <p className="font-bold text-white text-sm line-clamp-1 group-hover:text-[#c5a059] transition-colors">
                                {post.title}
                              </p>
                              <p className="text-[11px] font-mono text-gray-500 line-clamp-1">
                                /{post.slug}
                              </p>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="p-4">
                            <span className="inline-block px-2.5 py-1 bg-white/5 border border-white/10 text-[#c5a059] text-[10px] font-mono uppercase tracking-wider">
                              {post.category || 'Tin tức'}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="p-4 font-mono text-[11px] text-gray-400">
                            {post.created_at
                              ? new Date(post.created_at).toLocaleDateString('vi-VN')
                              : 'Vừa xong'}
                          </td>

                          {/* Status */}
                          <td className="p-4">
                            {post.published !== false ? (
                              <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#22c55e]" />
                                Đã xuất bản
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-amber-400 text-[11px] font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                Bản nháp
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setPreviewPost(post)}
                                title="Xem trước bài viết"
                                className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-all"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => {
                                  setEditingPost(post);
                                  setIsPostModalOpen(true);
                                }}
                                title="Chỉnh sửa bài viết"
                                className="p-1.5 bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#c5a059] hover:text-black border border-[#c5a059]/30 transition-all"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => setDeletingPostId(post.id || null)}
                                title="Xóa bài viết"
                                className="p-1.5 bg-red-950/40 hover:bg-red-900/80 text-red-400 hover:text-white border border-red-800/40 transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: HERO SECTION CRUD */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="bg-[#111114] border border-white/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.25em] font-bold">
                  TRÌNH QUẢN LÝ BANNER HERO
                </span>
                <h2 className="text-lg font-bold text-white uppercase tracking-tight font-['Plus_Jakarta_Sans'] mt-0.5">
                  Tùy Chỉnh 3 Slide Trình Chiếu Trang Chủ
                </h2>
                <p className="text-xs text-gray-400 font-light mt-1">
                  Chỉnh sửa tiêu đề lớn, huy hiệu thông tin, mô tả nghiệp vụ và ảnh nền đại diện trực tiếp.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetHeroSlides}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-mono uppercase tracking-wider transition-all"
                >
                  Khôi phục mặc định
                </button>
              </div>
            </div>

            {/* Slides Cards List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {heroSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="bg-[#111114] border border-white/10 overflow-hidden flex flex-col group hover:border-[#c5a059]/50 transition-all shadow-xl"
                >
                  {/* Visual Header Image Preview */}
                  <div className="relative h-44 bg-[#0d0d0f] overflow-hidden">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/80 border border-[#c5a059]/40 text-[#c5a059] text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1">
                      SLIDE 0{idx + 1} • {slide.id}
                    </div>
                    <div className="absolute top-3 right-3 bg-black/80 border border-white/20 text-gray-300 text-[9px] font-mono px-2 py-1">
                      {slide.category || 'Mục tiêu'}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block text-[10px] font-mono font-bold text-[#c5a059] uppercase tracking-wider">
                        [{slide.tag}]
                      </span>
                      <h3 className="text-sm font-bold text-white uppercase line-clamp-2 leading-snug font-['Plus_Jakarta_Sans']">
                        {slide.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-light line-clamp-3 leading-relaxed">
                        {slide.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="text-[10px] font-mono text-gray-500">
                        CTA: <span className="text-gray-300 font-bold">{slide.ctaText}</span>
                      </div>
                      <button
                        onClick={() => {
                          setEditingSlide(slide);
                          setIsHeroModalOpen(true);
                        }}
                        className="px-3.5 py-1.5 bg-[#c5a059] hover:bg-[#d6b26b] text-black font-black text-xs uppercase font-mono tracking-wider transition-all flex items-center gap-1.5"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Chỉnh sửa</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DATABASE CONFIG & SQL */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="bg-[#111114] border border-white/10 p-6 space-y-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.25em] font-bold">
                    THIẾT LẬP SUPABASE DATABASE
                  </span>
                  <h2 className="text-lg font-bold text-white uppercase tracking-tight font-['Plus_Jakarta_Sans'] mt-0.5">
                    Khởi Tạo Bảng & Cấu Hình Quyền Truy Cập
                  </h2>
                  <p className="text-xs text-gray-400 font-light mt-1 max-w-2xl leading-relaxed">
                    Dự án của bạn đã được kết nối trực tiếp với dự án Supabase. Nếu đây là lần đầu thiết lập hoặc bảng <code className="text-[#c5a059]">posts</code> chưa tồn tại trong Supabase Database, bạn chỉ cần sao chép mã SQL bên dưới và chạy trong SQL Editor của Supabase.
                  </p>
                </div>

                <a
                  href="https://supabase.com/dashboard/project/reuogjwrzfavdlidwujk/sql"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 shrink-0"
                >
                  <span>Mở Supabase SQL Editor</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Connection Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#0d0d0f] border border-white/10 p-4 space-y-1.5">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                    Project Supabase URL
                  </span>
                  <p className="font-mono text-xs text-[#c5a059] font-bold break-all">
                    https://reuogjwrzfavdlidwujk.supabase.co
                  </p>
                </div>

                <div className="bg-[#0d0d0f] border border-white/10 p-4 space-y-1.5">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                    Publishable Key / Anon Key
                  </span>
                  <p className="font-mono text-xs text-gray-300 truncate">
                    sb_publishable_2ns4TXWJVEvx14Iv5bj52Q_OeVi5CEM
                  </p>
                </div>
              </div>

              {/* SQL Snippet with Copy Button */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-300 font-bold flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-[#c5a059]" />
                    Mã SQL Tạo Bảng & Phân Quyền (Copy & Run in Supabase SQL Editor):
                  </span>
                  <button
                    onClick={handleCopySql}
                    className="px-3 py-1.5 bg-[#c5a059] hover:bg-[#d6b26b] text-black font-black text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã sao chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép toàn bộ SQL</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 bg-[#09090b] border border-white/15 text-[#c5a059] font-mono text-xs overflow-x-auto max-h-96 leading-relaxed selection:bg-white selection:text-black">
                  {SUPABASE_SETUP_SQL}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Post Modal (Create / Edit) */}
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => {
          setIsPostModalOpen(false);
          setEditingPost(null);
        }}
        onSave={handleSavePost}
        postToEdit={editingPost}
      />

      {/* Hero Slide Modal */}
      <HeroSlideModal
        isOpen={isHeroModalOpen}
        onClose={() => {
          setIsHeroModalOpen(false);
          setEditingSlide(null);
        }}
        onSave={handleSaveHeroSlide}
        slide={editingSlide}
      />

      {/* Delete Confirmation Modal */}
      {deletingPostId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111114] border border-red-800/60 p-6 max-w-md w-full space-y-4 shadow-2xl text-white">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold uppercase tracking-tight text-base font-['Plus_Jakarta_Sans']">
                Xác nhận xóa bài viết
              </h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Hành động này sẽ xóa vĩnh viễn bài viết khỏi cơ sở dữ liệu Supabase và không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?
            </p>
            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingPostId(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-xs font-mono uppercase"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs font-mono uppercase tracking-wider"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Preview Modal */}
      {previewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#111114] border border-white/15 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-white relative">
            <div className="h-56 bg-black overflow-hidden relative">
              <img
                src={previewPost.cover_image}
                alt={previewPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#c5a059] text-black text-[10px] font-mono font-black uppercase tracking-widest px-2.5 py-1">
                {previewPost.category || 'Tin tức'}
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight font-['Plus_Jakarta_Sans'] text-white">
                {previewPost.title}
              </h2>
              <div className="flex items-center gap-4 text-xs font-mono text-gray-400 pb-2 border-b border-white/10">
                <span>Slug: /{previewPost.slug}</span>
                <span>•</span>
                <span>Tác giả: {previewPost.author || 'Ban Biên Tập'}</span>
              </div>
              <p className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                {previewPost.excerpt}
              </p>
              <div className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed whitespace-pre-line">
                {previewPost.content}
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setPreviewPost(null)}
                  className="px-5 py-2 bg-white/10 hover:bg-[#c5a059] hover:text-black text-white font-mono text-xs uppercase font-bold transition-all"
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
