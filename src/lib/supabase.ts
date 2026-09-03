import { createClient } from '@supabase/supabase-js';
import { HeroSlide } from '../types';
import { HERO_SLIDES as DEFAULT_HERO_SLIDES, NEWS_EVENTS } from '../data/mockData';

// Priority: Vite environment variables, with fallback to provided project credentials
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://reuogjwrzfavdlidwujk.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_2ns4TXWJVEvx14Iv5bj52Q_OeVi5CEM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface Post {
  id?: string | number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  category?: string;
  published?: boolean;
  author?: string;
  created_at?: string;
  updated_at?: string;
}

// Local cache keys for offline/fallback stability
const POSTS_STORAGE_KEY = 'lsd_cached_posts';
const HERO_STORAGE_KEY = 'lsd_cached_hero_slides';

// Helper to generate SEO friendly slugs
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Initial mock posts converted from NEWS_EVENTS if table is newly queried
export const INITIAL_POSTS: Post[] = NEWS_EVENTS.map((n, idx) => ({
  id: `mock-${idx + 1}`,
  title: n.title,
  slug: generateSlug(n.title),
  content: `${n.summary}\n\nChi tiết bài viết thông tin nghiệp vụ và hoạt động bảo vệ của Công ty Cổ phần Dịch vụ Bảo vệ Lâm Sơn Động. Toàn bộ cán bộ nhân viên tuân thủ nghiêm ngặt quy trình an ninh và tinh thần trách nhiệm cao nhất.`,
  excerpt: n.summary,
  cover_image: n.imageUrl,
  category: n.category,
  published: true,
  author: 'Ban Nghiệp Vụ Lâm Sơn Động',
  created_at: new Date(Date.now() - idx * 86400000 * 3).toISOString(),
}));

/**
 * Fetch all posts from Supabase `posts` table.
 * Falls back to local storage if table is not yet created or connection fails.
 */
export async function getPosts(): Promise<{ data: Post[]; error: string | null; fromFallback?: boolean }> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase getPosts notice:', error.message);
      // Load from local storage or defaults
      const saved = localStorage.getItem(POSTS_STORAGE_KEY);
      const localPosts = saved ? JSON.parse(saved) : INITIAL_POSTS;
      return { data: localPosts, error: error.message, fromFallback: true };
    }

    if (data && data.length > 0) {
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(data));
      return { data, error: null, fromFallback: false };
    }

    // If table is empty, seed with initial posts
    const saved = localStorage.getItem(POSTS_STORAGE_KEY);
    const localPosts = saved ? JSON.parse(saved) : INITIAL_POSTS;
    return { data: localPosts, error: null, fromFallback: true };
  } catch (err: any) {
    console.error('Failed to get posts:', err);
    const saved = localStorage.getItem(POSTS_STORAGE_KEY);
    const localPosts = saved ? JSON.parse(saved) : INITIAL_POSTS;
    return { data: localPosts, error: err.message || 'Lỗi kết nối', fromFallback: true };
  }
}

/**
 * Create a new post in Supabase `posts` table
 */
export async function createPost(post: Omit<Post, 'id' | 'created_at'>): Promise<{ data: Post | null; error: string | null }> {
  const newPostData = {
    ...post,
    slug: post.slug || generateSlug(post.title),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([newPostData])
      .select()
      .single();

    if (error) {
      console.warn('Supabase createPost fallback:', error.message);
      // Save locally so admin operation still succeeds
      const saved = localStorage.getItem(POSTS_STORAGE_KEY);
      const posts: Post[] = saved ? JSON.parse(saved) : [...INITIAL_POSTS];
      const localCreated: Post = {
        ...newPostData,
        id: `local-${Date.now()}`,
      };
      posts.unshift(localCreated);
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
      return { data: localCreated, error: error.message };
    }

    return { data, error: null };
  } catch (err: any) {
    const saved = localStorage.getItem(POSTS_STORAGE_KEY);
    const posts: Post[] = saved ? JSON.parse(saved) : [...INITIAL_POSTS];
    const localCreated: Post = {
      ...newPostData,
      id: `local-${Date.now()}`,
    };
    posts.unshift(localCreated);
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
    return { data: localCreated, error: err.message || 'Lỗi kết nối' };
  }
}

/**
 * Update an existing post in Supabase `posts` table
 */
export async function updatePost(id: string | number, post: Partial<Post>): Promise<{ data: Post | null; error: string | null }> {
  const updateData = {
    ...post,
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.warn('Supabase updatePost fallback:', error.message);
      const saved = localStorage.getItem(POSTS_STORAGE_KEY);
      const posts: Post[] = saved ? JSON.parse(saved) : [...INITIAL_POSTS];
      const index = posts.findIndex((p) => String(p.id) === String(id));
      if (index !== -1) {
        posts[index] = { ...posts[index], ...updateData };
        localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
        return { data: posts[index], error: error.message };
      }
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err: any) {
    const saved = localStorage.getItem(POSTS_STORAGE_KEY);
    const posts: Post[] = saved ? JSON.parse(saved) : [...INITIAL_POSTS];
    const index = posts.findIndex((p) => String(p.id) === String(id));
    if (index !== -1) {
      posts[index] = { ...posts[index], ...updateData };
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
      return { data: posts[index], error: err.message };
    }
    return { data: null, error: err.message };
  }
}

/**
 * Delete a post from Supabase `posts` table
 */
export async function deletePost(id: string | number): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.from('posts').delete().eq('id', id);

    // Also update local cache
    const saved = localStorage.getItem(POSTS_STORAGE_KEY);
    if (saved) {
      const posts: Post[] = JSON.parse(saved);
      const filtered = posts.filter((p) => String(p.id) !== String(id));
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(filtered));
    }

    if (error) {
      console.warn('Supabase deletePost fallback:', error.message);
      return { success: true, error: error.message };
    }

    return { success: true, error: null };
  } catch (err: any) {
    const saved = localStorage.getItem(POSTS_STORAGE_KEY);
    if (saved) {
      const posts: Post[] = JSON.parse(saved);
      const filtered = posts.filter((p) => String(p.id) !== String(id));
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(filtered));
    }
    return { success: true, error: err.message };
  }
}

/**
 * Get Hero slides - either from Supabase `hero_slides` table or local storage/defaults
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .order('id', { ascending: true });

    if (!error && data && data.length > 0) {
      localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(data));
      return data as HeroSlide[];
    }
  } catch (err) {
    console.warn('Hero slides table query notice:', err);
  }

  const saved = localStorage.getItem(HERO_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  return DEFAULT_HERO_SLIDES;
}

/**
 * Save Hero slides to Supabase `hero_slides` and sync local storage
 */
export async function saveHeroSlides(slides: HeroSlide[]): Promise<{ success: boolean; error?: string }> {
  localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(slides));
  try {
    const { error } = await supabase.from('hero_slides').upsert(slides);
    if (error) {
      return { success: true, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: true, error: err.message };
  }
}

/**
 * Recommended SQL snippet for user's Supabase dashboard
 */
export const SUPABASE_SETUP_SQL = `-- SQL Script tạo bảng bài viết và hero slides trên Supabase
-- Mở SQL Editor trong Supabase Dashboard và nhấn Run:

CREATE TABLE IF NOT EXISTS public.posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  category TEXT DEFAULT 'Tin tức',
  published BOOLEAN DEFAULT true,
  author TEXT DEFAULT 'Ban Quản Trị',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cho phép đọc công khai và cho phép tạo/sửa/xóa
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cho phép xem bài viết công khai" 
  ON public.posts FOR SELECT USING (true);

CREATE POLICY "Cho phép thêm bài viết" 
  ON public.posts FOR INSERT WITH CHECK (true);

CREATE POLICY "Cho phép sửa bài viết" 
  ON public.posts FOR UPDATE USING (true);

CREATE POLICY "Cho phép xóa bài viết" 
  ON public.posts FOR DELETE USING (true);

-- Bảng Hero Slides (nếu cần đồng bộ từ xa)
CREATE TABLE IF NOT EXISTS public.hero_slides (
  id TEXT PRIMARY KEY,
  tag TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  ctaText TEXT,
  secondaryCtaText TEXT,
  category TEXT
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cho phép xem hero slides" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "Cho phép cập nhật hero slides" ON public.hero_slides FOR ALL USING (true);
`;
