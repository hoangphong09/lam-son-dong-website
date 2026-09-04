import { createClient } from '@supabase/supabase-js';
import { HeroSlide, CaseStudy, QuoteRequest, StatMetric, QuoteOption, BreakingNewsItem } from '../types';
import { HERO_SLIDES as DEFAULT_HERO_SLIDES, NEWS_EVENTS, CASE_STUDIES as DEFAULT_CASE_STUDIES } from '../data/mockData';

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
const CASE_STUDIES_STORAGE_KEY = 'lsd_cached_case_studies';
const QUOTES_STORAGE_KEY = 'lsd_cached_quote_requests';
const STATS_STORAGE_KEY = 'lsd_cached_stats';
const QUOTE_OPTIONS_STORAGE_KEY = 'lsd_cached_quote_options';
const BREAKING_NEWS_STORAGE_KEY = 'lsd_cached_breaking_news';

// Initial Breaking News for fallback
export const INITIAL_BREAKING_NEWS: BreakingNewsItem[] = [
  {
    id: 1,
    title: 'Lâm Sơn Động Security vinh dự đón nhận Cúp Vàng "Thương hiệu Dịch vụ An ninh Uy tín Hàng đầu Việt Nam 2026"',
    link: '',
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Triển khai thành công phương án bảo vệ an ninh trật tự Lễ hội Âm nhạc 20.000 khán giả',
    link: '',
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Bộ Công An chứng nhận đạt chuẩn 100% về Điều kiện An ninh Trật tự & Nghiệp vụ PCCC cứu nạn',
    link: '',
    is_active: true,
    display_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Mở rộng hệ thống Trung tâm phản ứng nhanh cơ động tại các vùng kinh tế trọng điểm',
    link: '',
    is_active: true,
    display_order: 4,
    created_at: new Date().toISOString(),
  },
];

// Initial stats for fallback
export const INITIAL_STATS: StatMetric[] = [
  {
    id: 1,
    title: 'Nhân sự bảo vệ & Vệ sĩ',
    numeric_value: '300',
    unit: '+',
    suffix: '+',
    description: 'Huấn luyện võ thuật, nghiệp vụ, pháp luật định kỳ',
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Mục tiêu trọng điểm bảo vệ',
    numeric_value: '100',
    unit: '+',
    suffix: '+',
    description: 'KCN, Cao ốc, Ngân hàng, Bệnh viện, Nhà máy 24/7',
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Chứng chỉ PCCC & Võ thuật',
    numeric_value: '100',
    unit: '%',
    suffix: '%',
    description: 'Được cấp chứng chỉ hành nghề chính quy bởi Bộ Công An',
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Tỉnh thành phủ sóng',
    numeric_value: '20',
    unit: '+',
    suffix: '+',
    description: 'Đội cơ động phản ứng nhanh có mặt trong 15 phút',
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

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
 * Get Case Studies - either from Supabase `case_studies` table or local cache/defaults
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('id', { ascending: false });

    if (!error && data && data.length > 0) {
      localStorage.setItem(CASE_STUDIES_STORAGE_KEY, JSON.stringify(data));
      return data as CaseStudy[];
    }
  } catch (err) {
    console.warn('Case studies query fallback:', err);
  }

  const saved = localStorage.getItem(CASE_STUDIES_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  return DEFAULT_CASE_STUDIES;
}

/**
 * Create or save Case Study
 */
export async function saveCaseStudy(cs: CaseStudy): Promise<{ success: boolean; data?: CaseStudy; error?: string }> {
  try {
    const current = await getCaseStudies();
    const existingIdx = current.findIndex((item) => item.id === cs.id);
    let updated: CaseStudy[];
    if (existingIdx !== -1) {
      updated = [...current];
      updated[existingIdx] = cs;
    } else {
      updated = [cs, ...current];
    }
    localStorage.setItem(CASE_STUDIES_STORAGE_KEY, JSON.stringify(updated));

    const { error } = await supabase.from('case_studies').upsert([cs]);
    if (error) {
      return { success: true, data: cs, error: error.message };
    }
    return { success: true, data: cs };
  } catch (err: any) {
    return { success: true, data: cs, error: err.message };
  }
}

/**
 * Delete Case Study
 */
export async function deleteCaseStudy(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const current = await getCaseStudies();
    const filtered = current.filter((item) => item.id !== id);
    localStorage.setItem(CASE_STUDIES_STORAGE_KEY, JSON.stringify(filtered));

    const { error } = await supabase.from('case_studies').delete().eq('id', id);
    if (error) {
      return { success: true, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: true, error: err.message };
  }
}

/**
 * ==============================================================================
 * STATS (HIỆU QUẢ THỰC TẾ / CHỈ SỐ NĂNG LỰC)
 * ==============================================================================
 */

/**
 * Fetch all stats metrics ordered by display_order
 */
export async function getStats(): Promise<StatMetric[]> {
  try {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data && data.length > 0) {
      const normalized: StatMetric[] = data.map((d: any) => ({
        id: String(d.id),
        title: d.title,
        numeric_value: String(d.numeric_value),
        unit: d.unit || d.suffix || '',
        suffix: d.suffix || d.unit || '',
        description: d.description || '',
        display_order: Number(d.display_order) || 0,
        is_active: d.is_active !== false,
        created_at: d.created_at || new Date().toISOString(),
      }));
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(normalized));
      return normalized;
    }
  } catch (err) {
    console.warn('Stats fetch fallback to local:', err);
  }

  const saved = localStorage.getItem(STATS_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }

  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(INITIAL_STATS));
  return INITIAL_STATS;
}

/**
 * Create or update a stat metric
 */
export async function saveStat(stat: Partial<StatMetric>): Promise<{ success: boolean; data?: StatMetric; error?: string }> {
  try {
    const current = await getStats();
    let savedRecord: StatMetric;
    const isEdit = Boolean(stat.id && current.some((s) => String(s.id) === String(stat.id)));

    if (isEdit) {
      const idx = current.findIndex((s) => String(s.id) === String(stat.id));
      savedRecord = {
        ...current[idx],
        ...stat,
        unit: stat.unit ?? stat.suffix ?? current[idx].unit ?? '+',
        suffix: stat.suffix ?? stat.unit ?? current[idx].suffix ?? '+',
        display_order: Number(stat.display_order ?? current[idx].display_order ?? 0),
        is_active: stat.is_active !== undefined ? stat.is_active : current[idx].is_active !== false,
      };
      current[idx] = savedRecord;
    } else {
      savedRecord = {
        id: stat.id || `stat-${Date.now()}`,
        title: stat.title || 'Chỉ số an ninh mới',
        numeric_value: stat.numeric_value || '100',
        unit: stat.unit || stat.suffix || '+',
        suffix: stat.suffix || stat.unit || '+',
        description: stat.description || '',
        display_order: Number(stat.display_order ?? (current.length + 1)),
        is_active: stat.is_active !== false,
        created_at: new Date().toISOString(),
      };
      current.push(savedRecord);
    }

    current.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(current));

    // Persist to Supabase
    const payload: any = {
      title: savedRecord.title,
      numeric_value: String(savedRecord.numeric_value),
      unit: savedRecord.unit,
      suffix: savedRecord.suffix,
      description: savedRecord.description,
      display_order: savedRecord.display_order,
      is_active: savedRecord.is_active !== false,
    };

    if (isEdit && !isNaN(Number(savedRecord.id))) {
      await supabase.from('stats').update(payload).eq('id', Number(savedRecord.id));
    } else {
      const { data, error } = await supabase
        .from('stats')
        .upsert(payload)
        .select()
        .single();
      if (!error && data) {
        savedRecord.id = String(data.id);
      }
    }

    return { success: true, data: savedRecord };
  } catch (err: any) {
    return { success: true, error: err.message };
  }
}

/**
 * Delete a stat metric
 */
export async function deleteStat(id: string | number): Promise<{ success: boolean; error?: string }> {
  try {
    const current = await getStats();
    const filtered = current.filter((s) => String(s.id) !== String(id));
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(filtered));

    if (!isNaN(Number(id))) {
      await supabase.from('stats').delete().eq('id', Number(id));
    } else {
      await supabase.from('stats').delete().eq('id', id);
    }
    return { success: true };
  } catch (err: any) {
    return { success: true, error: err.message };
  }
}

/**
 * Toggle visibility of a stat metric
 */
export async function toggleStatVisibility(id: string | number, is_active: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    const current = await getStats();
    const idx = current.findIndex((s) => String(s.id) === String(id));
    if (idx !== -1) {
      current[idx].is_active = is_active;
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(current));
    }

    if (!isNaN(Number(id))) {
      await supabase.from('stats').update({ is_active }).eq('id', Number(id));
    } else {
      await supabase.from('stats').update({ is_active }).eq('id', id);
    }
    return { success: true };
  } catch (err: any) {
    return { success: true, error: err.message };
  }
}

/**
 * Reorder stats list
 */
export async function reorderStats(stats: StatMetric[]): Promise<{ success: boolean; error?: string }> {
  try {
    const updated = stats.map((s, idx) => ({ ...s, display_order: idx + 1 }));
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updated));

    for (const item of updated) {
      if (!isNaN(Number(item.id))) {
        await supabase.from('stats').update({ display_order: item.display_order }).eq('id', Number(item.id));
      }
    }
    return { success: true };
  } catch (err: any) {
    return { success: true, error: err.message };
  }
}

/**
 * ==============================================================================
 * QUOTE REQUESTS (YÊU CẦU BÁO GIÁ & KHÁCH HÀNG TIỀM NĂNG)
 * ==============================================================================
 */

/**
 * Get Quote Requests from Supabase or local cache
 */
export async function getQuoteRequests(): Promise<QuoteRequest[]> {
  try {
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const normalized: QuoteRequest[] = data.map((item: any) => {
        const clientName = item.client_name || item.contactName || item.contact_name || 'Khách hàng';
        const phone = item.phone || item.contactPhone || item.contact_phone || '';
        const email = item.email || item.contactEmail || item.contact_email || '';
        const serviceNeeded = item.service_needed || item.serviceType || item.service_type || 'Bảo vệ Mục tiêu Cố định';
        const companyName = item.company_name || item.companyName || '';
        let status = item.status || 'new';
        if (status === 'processing') status = 'contacted';
        if (status === 'completed') status = 'closed';

        return {
          ...item,
          id: String(item.id),
          client_name: clientName,
          contactName: clientName,
          phone,
          contactPhone: phone,
          email,
          contactEmail: email,
          service_needed: serviceNeeded,
          serviceType: serviceNeeded,
          company_name: companyName,
          companyName,
          message: item.message || '',
          status: status as any,
          created_at: item.created_at || new Date().toISOString(),
        };
      });

      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(normalized));
      return normalized;
    }
  } catch (err) {
    console.warn('Quote requests query fallback:', err);
  }

  const saved = localStorage.getItem(QUOTES_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }

  // Default initial sample leads for admin review
  return [
    {
      id: 'quote-sample-1',
      source: 'consultation_form',
      client_name: 'Trần Văn Minh',
      contactName: 'Trần Văn Minh',
      phone: '0912.345.678',
      contactPhone: '0912.345.678',
      email: 'minh.tv@dong-a-logistics.vn',
      contactEmail: 'minh.tv@dong-a-logistics.vn',
      companyName: 'Công ty Cổ phần Logistics Đông Á',
      company_name: 'Công ty Cổ phần Logistics Đông Á',
      jobTitle: 'Trưởng phòng An ninh & Pháp chế',
      region: 'Hà Nội & KCN Bắc Ninh',
      service_needed: 'Bảo vệ KCN & Kho Vận',
      serviceType: 'Bảo vệ KCN & Kho Vận',
      targetType: 'Kho ngoại quan & trung tâm phân phối 30.000m2',
      guards24h: 3,
      guards12h: 2,
      totalEstimate: 68500000,
      estimatedPriceFormatted: '68.500.000 ₫/tháng',
      message: 'Cần khảo sát thực địa trong tuần này để triển khai từ đầu tháng tới.',
      status: 'new',
      notes: 'Đã liên hệ sơ bộ qua điện thoại, xếp lịch khảo sát sáng thứ Năm.',
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'quote-sample-2',
      source: 'consultation_form',
      client_name: 'Nguyễn Thị Hồng Hạnh',
      contactName: 'Nguyễn Thị Hồng Hạnh',
      phone: '0988.765.432',
      contactPhone: '0988.765.432',
      email: 'hanh.nguyen@apex-tower.com',
      contactEmail: 'hanh.nguyen@apex-tower.com',
      companyName: 'BQL Tòa Nhà Apex Tower',
      company_name: 'BQL Tòa Nhà Apex Tower',
      jobTitle: 'Phó Ban Quản Lý',
      region: 'Hà Nội',
      service_needed: 'Bảo vệ Tòa Nhà & Cao Ốc Văn Phòng',
      serviceType: 'Bảo vệ Tòa Nhà & Cao Ốc Văn Phòng',
      targetType: 'Tòa nhà văn phòng hạng A 25 tầng',
      guards24h: 4,
      guards12h: 4,
      totalEstimate: 104000000,
      estimatedPriceFormatted: '104.000.000 ₫/tháng',
      message: 'Yêu cầu lực lượng ngoại hình chuẩn, đào tạo bài bản về giao tiếp khách hàng văn phòng cao cấp.',
      status: 'contacted',
      notes: 'Đang gửi hồ sơ năng lực và phương án phân công ca trực.',
      created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
    },
    {
      id: 'quote-sample-3',
      source: 'consultation_form',
      client_name: 'Phạm Đức Long',
      contactName: 'Phạm Đức Long',
      phone: '0903.118.999',
      contactPhone: '0903.118.999',
      email: 'long.pd@vinasteel.com.vn',
      contactEmail: 'long.pd@vinasteel.com.vn',
      companyName: 'Tập Đoàn Thép VinaSteel',
      company_name: 'Tập Đoàn Thép VinaSteel',
      jobTitle: 'Giám Đốc Nhà Máy',
      region: 'Hải Phòng',
      service_needed: 'Bảo vệ Nhà Máy Luyện Kim & PCCC Chuyên Sâu',
      serviceType: 'Bảo vệ Nhà Máy Luyện Kim & PCCC Chuyên Sâu',
      message: 'Đã hoàn tất ký hợp đồng dịch vụ an ninh 2 năm cho nhà xưởng 50.000m2.',
      status: 'closed',
      notes: 'Hợp đồng đã ký kết, chính thức tiếp quản mục tiêu.',
      created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
  ];
}

/**
 * Create a new Quote Request
 */
export async function createQuoteRequest(req: Partial<QuoteRequest>): Promise<{ success: boolean; data?: QuoteRequest; error?: string }> {
  const clientName = req.client_name || req.contactName || 'Khách hàng';
  const phone = req.phone || req.contactPhone || '';
  const email = req.email || req.contactEmail || '';
  const serviceNeeded = req.service_needed || req.serviceType || 'Bảo vệ Mục tiêu Cố định';
  const companyName = req.company_name || req.companyName || '';
  const message = req.message || '';
  const status = req.status || 'new';

  const newRecord: QuoteRequest = {
    ...req,
    id: `quote-${Date.now()}`,
    client_name: clientName,
    contactName: clientName,
    phone,
    contactPhone: phone,
    email,
    contactEmail: email,
    company_name: companyName,
    companyName,
    service_needed: serviceNeeded,
    serviceType: serviceNeeded,
    message,
    status: status as any,
    created_at: new Date().toISOString(),
  };

  try {
    const current = await getQuoteRequests();
    const updated = [newRecord, ...current];
    localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(updated));

    const dbPayload: any = {
      client_name: clientName,
      phone,
      email: email || null,
      service_needed: serviceNeeded,
      message: message || null,
      status,
      company_name: companyName || null,
      source: req.source || 'consultation_form',
      total_estimate: req.totalEstimate || null,
      estimated_price_formatted: req.estimatedPriceFormatted || null,
      notes: req.notes || null,
    };

    const { error } = await supabase.from('quote_requests').insert([dbPayload]);
    if (error) {
      console.warn('Supabase quote insert error, saved locally:', error.message);
      return { success: true, data: newRecord, error: error.message };
    }
    return { success: true, data: newRecord };
  } catch (err: any) {
    return { success: true, data: newRecord, error: err.message };
  }
}

/**
 * Update Quote Request Status & Notes
 */
export async function updateQuoteRequest(
  id: string,
  updates: Partial<Pick<QuoteRequest, 'status' | 'notes'>>
): Promise<{ success: boolean; error?: string }> {
  try {
    const current = await getQuoteRequests();
    const index = current.findIndex((item) => String(item.id) === String(id));
    if (index !== -1) {
      current[index] = { ...current[index], ...updates };
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(current));
    }

    if (!isNaN(Number(id))) {
      await supabase.from('quote_requests').update(updates).eq('id', Number(id));
    } else {
      await supabase.from('quote_requests').update(updates).eq('id', id);
    }
    return { success: true };
  } catch (err: any) {
    return { success: true, error: err.message };
  }
}

/**
 * Update specifically the quote request status ('new' | 'contacted' | 'closed')
 */
export async function updateQuoteRequestStatus(
  id: string,
  status: 'new' | 'contacted' | 'closed' | 'processing' | 'completed' | 'cancelled',
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  return updateQuoteRequest(id, notes !== undefined ? { status, notes } : { status });
}

/**
 * Delete Quote Request (remove spam submission)
 */
export async function deleteQuoteRequest(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const current = await getQuoteRequests();
    const filtered = current.filter((item) => String(item.id) !== String(id));
    localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(filtered));

    if (!isNaN(Number(id))) {
      await supabase.from('quote_requests').delete().eq('id', Number(id));
    } else {
      await supabase.from('quote_requests').delete().eq('id', id);
    }
    return { success: true };
  } catch (err: any) {
    return { success: true, error: err.message };
  }
}

// ============================================================================
// 6. QUOTE OPTIONS & PRICING PLANS MANAGEMENT (CẤU HÌNH BÁO GIÁ & GÓI DỊCH VỤ)
// ============================================================================

export const INITIAL_QUOTE_OPTIONS: QuoteOption[] = [
  // target_objective (Loại hình mục tiêu)
  {
    id: 1,
    category: 'target_objective',
    label: 'Nhà máy / Khu Công Nghiệp',
    value: 'kcn',
    price_estimate: 0,
    description: 'Kiểm soát cổng chính, hàng rào, xuất nhập kho bãi, PCCC ca đêm',
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    category: 'target_objective',
    label: 'Tòa nhà / Cao ốc Văn phòng',
    value: 'building',
    price_estimate: 0,
    description: 'Lễ tân, thẻ từ thang máy, tuần tra bãi đỗ xe hầm, an ninh sảnh',
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    category: 'target_objective',
    label: 'Showroom / TTTM',
    value: 'retail',
    price_estimate: 0,
    description: 'Chống thất thoát tài sản, đón tiếp khách hàng văn minh, kiểm soát quầy thu ngân',
    is_active: true,
    display_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    category: 'target_objective',
    label: 'Vệ sĩ VIP / Yếu nhân',
    value: 'bodyguard',
    price_estimate: 0,
    description: 'Bảo vệ áp tải, hộ tống sự kiện, tháp tùng lãnh đạo cấp cao 24/7',
    is_active: true,
    display_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    category: 'target_objective',
    label: 'Công trình Xây dựng / Dự án',
    value: 'construction',
    price_estimate: 0,
    description: 'Quản lý máy móc, sắt thép vật tư, kiểm soát công nhân ra vào công trường',
    is_active: true,
    display_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    category: 'target_objective',
    label: 'Bệnh viện / Trường học',
    value: 'education_health',
    price_estimate: 0,
    description: 'Phòng ngừa gây rối trật tự, đảm bảo an toàn tuyệt đối khuôn viên',
    is_active: true,
    display_order: 6,
    created_at: new Date().toISOString(),
  },

  // pricing_tier (Đơn giá vị trí / Ca trực)
  {
    id: 7,
    category: 'pricing_tier',
    label: 'Chốt trực 24/24 (3 ca/ngày)',
    value: 'guard_24h',
    price_estimate: 16500000,
    description: 'Ca luân phiên 8 tiếng, trực liên tục 24/7 không ngắt quãng',
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 8,
    category: 'pricing_tier',
    label: 'Chốt trực 12/24 (Ngày hoặc Đêm)',
    value: 'guard_12h',
    price_estimate: 9500000,
    description: 'Khung giờ hành chính 07:00 - 19:00 hoặc ca đêm 19:00 - 07:00',
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 9,
    category: 'pricing_tier',
    label: 'Bảo vệ cơ động / Tuần tra định kỳ',
    value: 'mobile_patrol',
    price_estimate: 4500000,
    description: 'Xe mô tô cơ động tuần tra kiểm tra đột xuất 4-6 lần/ngày đêm',
    is_active: true,
    display_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 10,
    category: 'pricing_tier',
    label: 'Sự kiện ngắn hạn theo giờ',
    value: 'event_hourly',
    price_estimate: 180000,
    description: 'Bảo vệ hội nghị, lễ khai trương, triển lãm tính theo giờ/vị trí',
    is_active: true,
    display_order: 4,
    created_at: new Date().toISOString(),
  },

  // service_type (Gói dịch vụ & Tiện ích công nghệ kèm theo)
  {
    id: 11,
    category: 'service_type',
    label: 'Chứng chỉ PCCC & Cứu nạn cứu hộ',
    value: 'addon_pccc',
    price_estimate: 500000,
    description: 'Nhân sự có chứng chỉ nghiệp vụ PCCC do Bộ Công An cấp',
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 12,
    category: 'service_type',
    label: 'Hệ thống Smart Patrol GPS',
    value: 'addon_gps',
    price_estimate: 1200000,
    description: 'Điểm danh thẻ chip RFID, lộ trình tuần tra thời gian thực qua app',
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 13,
    category: 'service_type',
    label: 'Bodycam Giám sát Ca Đêm 4K',
    value: 'addon_bodycam',
    price_estimate: 800000,
    description: 'Trang bị camera ghi hình sắc nét góc rộng có đèn hồng ngoại ban đêm',
    is_active: true,
    display_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 14,
    category: 'service_type',
    label: 'Chó nghiệp vụ K9 tuần tra hàng rào',
    value: 'addon_k9',
    price_estimate: 3500000,
    description: 'K9 huấn luyện đặc biệt răn đe chống đột nhập khuôn viên rộng',
    is_active: true,
    display_order: 4,
    created_at: new Date().toISOString(),
  },
];

/**
 * Fetch quote options from Supabase or fallback cache
 */
export async function getQuoteOptions(onlyActive: boolean = false, category?: string): Promise<QuoteOption[]> {
  try {
    let query = supabase
      .from('quote_options')
      .select('*')
      .order('display_order', { ascending: true });

    if (onlyActive) {
      query = query.eq('is_active', true);
    }

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      const cached = localStorage.getItem(QUOTE_OPTIONS_STORAGE_KEY);
      let list: QuoteOption[] = cached ? JSON.parse(cached) : INITIAL_QUOTE_OPTIONS;
      if (!cached) {
        localStorage.setItem(QUOTE_OPTIONS_STORAGE_KEY, JSON.stringify(INITIAL_QUOTE_OPTIONS));
      }
      if (onlyActive) {
        list = list.filter((item) => item.is_active !== false);
      }
      if (category && category !== 'all') {
        list = list.filter((item) => item.category === category);
      }
      return list.sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    }

    localStorage.setItem(QUOTE_OPTIONS_STORAGE_KEY, JSON.stringify(data));
    return data;
  } catch (err) {
    const cached = localStorage.getItem(QUOTE_OPTIONS_STORAGE_KEY);
    let list: QuoteOption[] = cached ? JSON.parse(cached) : INITIAL_QUOTE_OPTIONS;
    if (onlyActive) {
      list = list.filter((item) => item.is_active !== false);
    }
    if (category && category !== 'all') {
      list = list.filter((item) => item.category === category);
    }
    return list.sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
  }
}

/**
 * Save / Update Quote Option
 */
export async function saveQuoteOption(option: Partial<QuoteOption>): Promise<{ success: boolean; data?: QuoteOption; error?: string }> {
  try {
    const isNew = !option.id;
    let savedData: QuoteOption;

    if (isNew) {
      const current = await getQuoteOptions();
      const nextId = current.length > 0 ? Math.max(...current.map((s) => Number(s.id) || 0)) + 1 : 1;
      const newOption: QuoteOption = {
        id: nextId,
        category: option.category || 'service_type',
        label: option.label || '',
        value: option.value || `opt_${nextId}`,
        price_estimate: Number(option.price_estimate) || 0,
        description: option.description || '',
        is_active: option.is_active !== undefined ? option.is_active : true,
        display_order: option.display_order !== undefined ? Number(option.display_order) : current.length + 1,
        created_at: new Date().toISOString(),
      };

      try {
        const { data: dbData, error } = await supabase
          .from('quote_options')
          .insert([
            {
              category: newOption.category,
              label: newOption.label,
              value: newOption.value,
              price_estimate: newOption.price_estimate,
              description: newOption.description,
              is_active: newOption.is_active,
              display_order: newOption.display_order,
            },
          ])
          .select()
          .single();

        if (!error && dbData) {
          savedData = dbData;
        } else {
          savedData = newOption;
        }
      } catch {
        savedData = newOption;
      }

      const updatedList = [...current, savedData];
      localStorage.setItem(QUOTE_OPTIONS_STORAGE_KEY, JSON.stringify(updatedList));
      return { success: true, data: savedData };
    } else {
      // Update existing
      const current = await getQuoteOptions();
      const updatedList = current.map((item) =>
        String(item.id) === String(option.id)
          ? {
              ...item,
              ...option,
              price_estimate: option.price_estimate !== undefined ? Number(option.price_estimate) : item.price_estimate,
              display_order: option.display_order !== undefined ? Number(option.display_order) : item.display_order,
            }
          : item
      );
      localStorage.setItem(QUOTE_OPTIONS_STORAGE_KEY, JSON.stringify(updatedList));

      try {
        const updatePayload: any = { ...option };
        delete updatePayload.id;
        delete updatePayload.created_at;

        if (!isNaN(Number(option.id))) {
          await supabase.from('quote_options').update(updatePayload).eq('id', Number(option.id));
        } else {
          await supabase.from('quote_options').update(updatePayload).eq('id', option.id);
        }
      } catch {
        // Fallback already updated in local cache
      }

      savedData = updatedList.find((item) => String(item.id) === String(option.id)) || (option as QuoteOption);
      return { success: true, data: savedData };
    }
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Delete Quote Option
 */
export async function deleteQuoteOption(id: string | number): Promise<{ success: boolean; error?: string }> {
  try {
    const current = await getQuoteOptions();
    const updated = current.filter((item) => String(item.id) !== String(id));
    localStorage.setItem(QUOTE_OPTIONS_STORAGE_KEY, JSON.stringify(updated));

    try {
      if (!isNaN(Number(id))) {
        await supabase.from('quote_options').delete().eq('id', Number(id));
      } else {
        await supabase.from('quote_options').delete().eq('id', id);
      }
    } catch {
      // Offline fallback succeeded
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Toggle visibility (is_active) of Quote Option
 */
export async function toggleQuoteOptionVisibility(id: string | number, isActive: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    const current = await getQuoteOptions();
    const updated = current.map((item) =>
      String(item.id) === String(id) ? { ...item, is_active: isActive } : item
    );
    localStorage.setItem(QUOTE_OPTIONS_STORAGE_KEY, JSON.stringify(updated));

    try {
      if (!isNaN(Number(id))) {
        await supabase.from('quote_options').update({ is_active: isActive }).eq('id', Number(id));
      } else {
        await supabase.from('quote_options').update({ is_active: isActive }).eq('id', id);
      }
    } catch {
      // Local fallback handled
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Reorder quote options
 */
export async function reorderQuoteOptions(options: QuoteOption[]): Promise<{ success: boolean; error?: string }> {
  try {
    const reindexed = options.map((opt, idx) => ({ ...opt, display_order: idx + 1 }));
    localStorage.setItem(QUOTE_OPTIONS_STORAGE_KEY, JSON.stringify(reindexed));

    // Async batch update
    for (const opt of reindexed) {
      try {
        if (!isNaN(Number(opt.id))) {
          await supabase.from('quote_options').update({ display_order: opt.display_order }).eq('id', Number(opt.id));
        } else {
          await supabase.from('quote_options').update({ display_order: opt.display_order }).eq('id', opt.id);
        }
      } catch {
        // Continue
      }
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Reset quote options to initial defaults
 */
export async function resetQuoteOptionsToDefault(): Promise<QuoteOption[]> {
  localStorage.setItem(QUOTE_OPTIONS_STORAGE_KEY, JSON.stringify(INITIAL_QUOTE_OPTIONS));
  return INITIAL_QUOTE_OPTIONS;
}

/**
 * ==============================================================================
 * BREAKING NEWS (TIN NHANH 24/7)
 * ==============================================================================
 */

/**
 * Fetch all breaking news items ordered by display_order
 */
export async function getBreakingNews(): Promise<BreakingNewsItem[]> {
  try {
    const { data, error } = await supabase
      .from('breaking_news')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data && data.length > 0) {
      const normalized: BreakingNewsItem[] = data.map((d: any) => ({
        id: d.id,
        title: d.title,
        link: d.link || '',
        is_active: d.is_active !== false,
        display_order: Number(d.display_order) || 0,
        created_at: d.created_at || new Date().toISOString(),
      }));
      localStorage.setItem(BREAKING_NEWS_STORAGE_KEY, JSON.stringify(normalized));
      return normalized;
    }
  } catch (err) {
    console.warn('Breaking news fetch fallback to local:', err);
  }

  const saved = localStorage.getItem(BREAKING_NEWS_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  return INITIAL_BREAKING_NEWS;
}

/**
 * Create a new breaking news item
 */
export async function createBreakingNews(
  item: Omit<BreakingNewsItem, 'id' | 'created_at'>
): Promise<{ data: BreakingNewsItem | null; error: string | null }> {
  const current = await getBreakingNews();
  const nextId = current.length > 0 ? Math.max(...current.map((c) => Number(c.id) || 0)) + 1 : 1;
  const newItem: BreakingNewsItem = {
    ...item,
    id: nextId,
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('breaking_news')
      .insert([
        {
          title: item.title,
          link: item.link || '',
          is_active: item.is_active,
          display_order: item.display_order,
        },
      ])
      .select()
      .single();

    if (!error && data) {
      const savedItem: BreakingNewsItem = {
        id: data.id,
        title: data.title,
        link: data.link || '',
        is_active: data.is_active !== false,
        display_order: Number(data.display_order) || 0,
        created_at: data.created_at,
      };
      const updated = [...current, savedItem];
      localStorage.setItem(BREAKING_NEWS_STORAGE_KEY, JSON.stringify(updated));
      return { data: savedItem, error: null };
    }
  } catch (err: any) {
    console.warn('Supabase createBreakingNews fallback:', err);
  }

  // Fallback to local storage
  const updated = [...current, newItem];
  localStorage.setItem(BREAKING_NEWS_STORAGE_KEY, JSON.stringify(updated));
  return { data: newItem, error: null };
}

/**
 * Update an existing breaking news item
 */
export async function updateBreakingNews(
  id: string | number,
  updates: Partial<BreakingNewsItem>
): Promise<{ data: BreakingNewsItem | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('breaking_news')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      const updatedItem: BreakingNewsItem = {
        id: data.id,
        title: data.title,
        link: data.link || '',
        is_active: data.is_active !== false,
        display_order: Number(data.display_order) || 0,
        created_at: data.created_at,
      };
      const current = await getBreakingNews();
      const updatedList = current.map((item) => (String(item.id) === String(id) ? updatedItem : item));
      localStorage.setItem(BREAKING_NEWS_STORAGE_KEY, JSON.stringify(updatedList));
      return { data: updatedItem, error: null };
    }
  } catch (err: any) {
    console.warn('Supabase updateBreakingNews fallback:', err);
  }

  const current = await getBreakingNews();
  let updatedItem: BreakingNewsItem | null = null;
  const updatedList = current.map((item) => {
    if (String(item.id) === String(id)) {
      updatedItem = { ...item, ...updates };
      return updatedItem;
    }
    return item;
  });
  localStorage.setItem(BREAKING_NEWS_STORAGE_KEY, JSON.stringify(updatedList));
  return { data: updatedItem, error: null };
}

/**
 * Delete a breaking news item
 */
export async function deleteBreakingNews(
  id: string | number
): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.from('breaking_news').delete().eq('id', id);
    const current = await getBreakingNews();
    const filtered = current.filter((item) => String(item.id) !== String(id));
    localStorage.setItem(BREAKING_NEWS_STORAGE_KEY, JSON.stringify(filtered));
    if (error) {
      return { success: true, error: error.message };
    }
    return { success: true, error: null };
  } catch (err: any) {
    const current = await getBreakingNews();
    const filtered = current.filter((item) => String(item.id) !== String(id));
    localStorage.setItem(BREAKING_NEWS_STORAGE_KEY, JSON.stringify(filtered));
    return { success: true, error: err.message };
  }
}

/**
 * Toggle active status of a breaking news item
 */
export async function toggleBreakingNewsActive(
  id: string | number,
  is_active: boolean
): Promise<{ success: boolean; error: string | null }> {
  return updateBreakingNews(id, { is_active }).then((res) => ({
    success: !!res.data,
    error: res.error,
  }));
}

/**
 * Reset breaking news to initial defaults
 */
export async function resetBreakingNewsToDefault(): Promise<BreakingNewsItem[]> {
  localStorage.setItem(BREAKING_NEWS_STORAGE_KEY, JSON.stringify(INITIAL_BREAKING_NEWS));
  return INITIAL_BREAKING_NEWS;
}

/**
 * Recommended SQL snippet for user's Supabase dashboard
 */
export const SUPABASE_SETUP_SQL = `-- ==============================================================================
-- CƠ SỞ DỮ LIỆU SUPABASE - LÂM SƠN ĐỘNG SECURITY
-- Bản quyền (c) 2026 Công Ty Bảo Vệ Lâm Sơn Động
-- Mở SQL Editor trong Supabase Dashboard (https://supabase.com/dashboard) và nhấn RUN:
-- ==============================================================================

-- Bật tiện ích pgcrypto để mã hóa mật khẩu an toàn
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- PHẦN 1: KHỞI TẠO TÀI KHOẢN QUẢN TRỊ VIÊN MẶC ĐỊNH (DEFAULT ADMIN SEED)
-- Email: admin@lamsondong.com
-- Mật khẩu: lamsondong
-- Quyền hạn: Super Admin / Full CRUD Access
-- ==============================================================================

DO $$
DECLARE
  super_user_id UUID := gen_random_uuid();
  existing_user_id UUID;
BEGIN
  -- Kiểm tra xem tài khoản admin@lamsondong.com đã tồn tại trong auth.users chưa
  SELECT id INTO existing_user_id FROM auth.users WHERE email = 'admin@lamsondong.com';

  IF existing_user_id IS NULL THEN
    -- 1. Tạo mới tài khoản admin trong auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token,
      is_super_admin
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      super_user_id,
      'authenticated',
      'authenticated',
      'admin@lamsondong.com',
      crypt('lamsondong', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"],"role":"superadmin","is_super_admin":true}'::jsonb,
      '{"name":"Tổng Chỉ Huy Trưởng","role":"superadmin","full_name":"Ban Lãnh Đạo Lâm Sơn Động"}'::jsonb,
      NOW(),
      NOW(),
      '',
      '',
      '',
      '',
      TRUE
    );

    -- 2. Đăng ký thông tin identity cho Supabase Auth để hỗ trợ đăng nhập email/password
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      super_user_id,
      super_user_id,
      format('{"sub":"%s","email":"%s"}', super_user_id::text, 'admin@lamsondong.com')::jsonb,
      'email',
      super_user_id::text,
      NOW(),
      NOW(),
      NOW()
    );
  ELSE
    -- 3. Cập nhật mật khẩu và đồng bộ quyền Super Admin cho tài khoản hiện có
    UPDATE auth.users
    SET 
      encrypted_password = crypt('lamsondong', gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
      raw_app_meta_data = raw_app_meta_data || '{"provider":"email","providers":["email"],"role":"superadmin","is_super_admin":true}'::jsonb,
      raw_user_meta_data = raw_user_meta_data || '{"name":"Tổng Chỉ Huy Trưởng","role":"superadmin","full_name":"Ban Lãnh Đạo Lâm Sơn Động"}'::jsonb,
      is_super_admin = TRUE,
      updated_at = NOW()
    WHERE id = existing_user_id;
  END IF;
END $$;

-- ==============================================================================
-- PHẦN 2: HÀM KIỂM TRA QUYỀN QUẢN TRỊ (ADMIN HELPER FUNCTION)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.jwt() ->> 'email' = 'admin@lamsondong.com'
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'superadmin'
    OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'superadmin'
    OR (auth.jwt() -> 'app_metadata' ->> 'is_super_admin')::boolean = true
    OR auth.role() = 'authenticated'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- PHẦN 3: BẢNG VÀ PHÂN QUYỀN ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- 1. BẢNG HIỆU QUẢ THỰC TẾ / CHỈ SỐ NĂNG LỰC (STATS)
CREATE TABLE IF NOT EXISTS public.stats (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  numeric_value TEXT NOT NULL,
  unit TEXT DEFAULT '+',
  suffix TEXT DEFAULT '+',
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép xem stats công khai" ON public.stats;
DROP POLICY IF EXISTS "Cho phép quản trị viên thêm stats" ON public.stats;
DROP POLICY IF EXISTS "Cho phép quản trị viên cập nhật stats" ON public.stats;
DROP POLICY IF EXISTS "Cho phép quản trị viên xóa stats" ON public.stats;
DROP POLICY IF EXISTS "Cho phép quản trị viên quản lý stats" ON public.stats;
DROP POLICY IF EXISTS "Admin toàn quyền quản lý stats" ON public.stats;

CREATE POLICY "Cho phép xem stats công khai" ON public.stats
  FOR SELECT USING (true);

CREATE POLICY "Admin toàn quyền quản lý stats" ON public.stats
  FOR ALL
  USING (public.is_admin() OR auth.role() = 'authenticated')
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');

-- Chèn dữ liệu ban đầu cho stats
INSERT INTO public.stats (id, title, numeric_value, unit, suffix, description, display_order, is_active)
VALUES 
  (1, 'Nhân sự bảo vệ & Vệ sĩ', '300', '+', '+', 'Huấn luyện võ thuật, nghiệp vụ, pháp luật định kỳ', 1, true),
  (2, 'Mục tiêu trọng điểm bảo vệ', '100', '+', '+', 'KCN, Cao ốc, Ngân hàng, Bệnh viện, Nhà máy 24/7', 2, true),
  (3, 'Chứng chỉ PCCC & Võ thuật', '100', '%', '%', 'Được cấp chứng chỉ hành nghề chính quy bởi Bộ Công An', 3, true),
  (4, 'Tỉnh thành phủ sóng', '20', '+', '+', 'Đội cơ động phản ứng nhanh có mặt trong 15 phút', 4, true)
ON CONFLICT (id) DO NOTHING;

-- 2. BẢNG YÊU CẦU BÁO GIÁ & KHÁCH HÀNG TIỀM NĂNG (QUOTE_REQUESTS)
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id BIGSERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_needed TEXT DEFAULT 'Bảo vệ Mục tiêu Cố định',
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed', 'processing', 'completed', 'cancelled')),
  company_name TEXT,
  total_estimate NUMERIC,
  estimated_price_formatted TEXT,
  source TEXT DEFAULT 'consultation_form',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép khách gửi yêu cầu báo giá" ON public.quote_requests;
DROP POLICY IF EXISTS "Cho phép xem và cập nhật yêu cầu báo giá" ON public.quote_requests;
DROP POLICY IF EXISTS "Cho phép thêm yêu cầu báo giá" ON public.quote_requests;
DROP POLICY IF EXISTS "Admin toàn quyền quản lý quote_requests" ON public.quote_requests;

CREATE POLICY "Cho phép khách gửi yêu cầu báo giá" ON public.quote_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin toàn quyền quản lý quote_requests" ON public.quote_requests
  FOR ALL
  USING (public.is_admin() OR auth.role() = 'authenticated')
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');

-- 3. BẢNG BÀI VIẾT (POSTS)
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

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép xem bài viết công khai" ON public.posts;
DROP POLICY IF EXISTS "Cho phép quản lý bài viết" ON public.posts;
DROP POLICY IF EXISTS "Admin toàn quyền quản lý posts" ON public.posts;

CREATE POLICY "Cho phép xem bài viết công khai" ON public.posts
  FOR SELECT USING (published = true OR public.is_admin() OR auth.role() = 'authenticated');

CREATE POLICY "Admin toàn quyền quản lý posts" ON public.posts
  FOR ALL
  USING (public.is_admin() OR auth.role() = 'authenticated')
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');

-- 4. BẢNG HERO SLIDES
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
DROP POLICY IF EXISTS "Cho phép xem hero slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Cho phép xem hero_slides công khai" ON public.hero_slides;
DROP POLICY IF EXISTS "Cho phép quản lý hero slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Admin toàn quyền quản lý hero_slides" ON public.hero_slides;

CREATE POLICY "Cho phép xem hero_slides công khai" ON public.hero_slides
  FOR SELECT USING (true);

CREATE POLICY "Admin toàn quyền quản lý hero_slides" ON public.hero_slides
  FOR ALL
  USING (public.is_admin() OR auth.role() = 'authenticated')
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');

-- 5. BẢNG DỰ ÁN TIÊU BIỂU (CASE_STUDIES)
CREATE TABLE IF NOT EXISTS public.case_studies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  sector TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  result TEXT NOT NULL,
  readTime TEXT DEFAULT '5 phút đọc',
  summary TEXT,
  period TEXT,
  guardCount TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép xem case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Cho phép xem case_studies công khai" ON public.case_studies;
DROP POLICY IF EXISTS "Cho phép quản lý case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admin toàn quyền quản lý case_studies" ON public.case_studies;

CREATE POLICY "Cho phép xem case_studies công khai" ON public.case_studies
  FOR SELECT USING (true);

CREATE POLICY "Admin toàn quyền quản lý case_studies" ON public.case_studies
  FOR ALL
  USING (public.is_admin() OR auth.role() = 'authenticated')
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');

-- 6. BẢNG CẤU HÌNH TÙY CHỌN BÁO GIÁ & GÓI DỊCH VỤ (QUOTE_OPTIONS)
CREATE TABLE IF NOT EXISTS public.quote_options (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('service_type', 'target_objective', 'pricing_tier')),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  price_estimate NUMERIC DEFAULT 0,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.quote_options ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép xem tùy chọn báo giá công khai" ON public.quote_options;
DROP POLICY IF EXISTS "Cho phép quản trị viên quản lý tùy chọn báo giá" ON public.quote_options;
DROP POLICY IF EXISTS "Cho phép quản lý tùy chọn báo giá" ON public.quote_options;
DROP POLICY IF EXISTS "Admin toàn quyền quản lý quote_options" ON public.quote_options;

CREATE POLICY "Cho phép xem tùy chọn báo giá công khai" ON public.quote_options
  FOR SELECT USING (true);

CREATE POLICY "Admin toàn quyền quản lý quote_options" ON public.quote_options
  FOR ALL
  USING (public.is_admin() OR auth.role() = 'authenticated')
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');

-- Dữ liệu mẫu ban đầu cho quote_options
INSERT INTO public.quote_options (category, label, value, price_estimate, description, is_active, display_order)
VALUES
  -- Loại hình mục tiêu (target_objective)
  ('target_objective', 'Nhà máy / Khu Công Nghiệp', 'kcn', 0, 'Kiểm soát cổng chính, hàng rào, xuất nhập kho bãi, PCCC ca đêm', true, 1),
  ('target_objective', 'Tòa nhà / Cao ốc Văn phòng', 'building', 0, 'Lễ tân, thẻ từ thang máy, tuần tra bãi đỗ xe hầm, an ninh sảnh', true, 2),
  ('target_objective', 'Showroom / TTTM', 'retail', 0, 'Chống thất thoát tài sản, đón tiếp khách hàng văn minh, kiểm soát quầy thu ngân', true, 3),
  ('target_objective', 'Vệ sĩ VIP / Yếu nhân', 'bodyguard', 0, 'Bảo vệ áp tải, hộ tống sự kiện, tháp tùng lãnh đạo cấp cao 24/7', true, 4),
  ('target_objective', 'Công trình Xây dựng / Dự án', 'construction', 0, 'Quản lý máy móc, sắt thép vật tư, kiểm soát công nhân ra vào công trường', true, 5),
  ('target_objective', 'Bệnh viện / Trường học', 'education_health', 0, 'Phòng ngừa gây rối trật tự, đảm bảo an toàn tuyệt đối khuôn viên', true, 6),

  -- Ca trực / Định giá vị trí (pricing_tier)
  ('pricing_tier', 'Chốt trực 24/24 (3 ca/ngày)', 'guard_24h', 16500000, 'Ca luân phiên 8 tiếng, trực liên tục 24/7 không ngắt quãng', true, 1),
  ('pricing_tier', 'Chốt trực 12/24 (Ngày hoặc Đêm)', 'guard_12h', 9500000, 'Khung giờ hành chính 07:00 - 19:00 hoặc ca đêm 19:00 - 07:00', true, 2),
  ('pricing_tier', 'Bảo vệ cơ động / Tuần tra định kỳ', 'mobile_patrol', 4500000, 'Xe mô tô cơ động tuần tra kiểm tra đột xuất 4-6 lần/ngày đêm', true, 3),
  ('pricing_tier', 'Sự kiện ngắn hạn theo giờ', 'event_hourly', 180000, 'Bảo vệ hội nghị, lễ khai trương, triển lãm tính theo giờ/vị trí', true, 4),

  -- Gói dịch vụ & Trang bị kèm theo (service_type)
  ('service_type', 'Chứng chỉ PCCC & Cứu nạn cứu hộ', 'addon_pccc', 500000, 'Nhân sự có chứng chỉ nghiệp vụ PCCC do Bộ Công An cấp', true, 1),
  ('service_type', 'Hệ thống Smart Patrol GPS', 'addon_gps', 1200000, 'Điểm danh thẻ chip RFID, lộ trình tuần tra thời gian thực qua app', true, 2),
  ('service_type', 'Bodycam Giám sát Ca Đêm 4K', 'addon_bodycam', 800000, 'Trang bị camera ghi hình sắc nét góc rộng có đèn hồng ngoại ban đêm', true, 3),
  ('service_type', 'Chó nghiệp vụ K9 tuần tra hàng rào', 'addon_k9', 3500000, 'K9 huấn luyện đặc biệt răn đe chống đột nhập khuôn viên rộng', true, 4)
ON CONFLICT DO NOTHING;

-- 7. BẢNG TIN NHANH CẢNH BÁO & THÔNG BÁO (BREAKING_NEWS)
CREATE TABLE IF NOT EXISTS public.breaking_news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  link TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.breaking_news ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép xem tin nhanh công khai" ON public.breaking_news;
DROP POLICY IF EXISTS "Admin toàn quyền quản lý tin nhanh" ON public.breaking_news;

CREATE POLICY "Cho phép xem tin nhanh công khai" ON public.breaking_news
  FOR SELECT USING (true);

CREATE POLICY "Admin toàn quyền quản lý tin nhanh" ON public.breaking_news
  FOR ALL
  USING (public.is_admin() OR auth.role() = 'authenticated')
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');

-- Dữ liệu mẫu ban đầu cho breaking_news
INSERT INTO public.breaking_news (id, title, link, is_active, display_order)
VALUES
  (1, 'Lâm Sơn Động Security vinh dự đón nhận Cúp Vàng "Thương hiệu Dịch vụ An ninh Uy tín Hàng đầu Việt Nam 2026"', '', true, 1),
  (2, 'Triển khai thành công phương án bảo vệ an ninh trật tự Lễ hội Âm nhạc 20.000 khán giả', '', true, 2),
  (3, 'Bộ Công An chứng nhận đạt chuẩn 100% về Điều kiện An ninh Trật tự & Nghiệp vụ PCCC cứu nạn', '', true, 3),
  (4, 'Mở rộng hệ thống Trung tâm phản ứng nhanh cơ động tại các vùng kinh tế trọng điểm', '', true, 4)
ON CONFLICT (id) DO NOTHING;

-- Cấp quyền bảng cho vai trò authenticated và anon
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT INSERT ON public.quote_requests TO anon;

-- ==============================================================================
-- 8. CẤU HÌNH SUPABASE STORAGE - BUCKET 'post-images'
-- ==============================================================================

-- 1. Tạo bucket lưu trữ công khai 'post-images' với giới hạn dung lượng 5MB
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'post-images',
  'post-images',
  true,
  5242880, -- Giới hạn 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- 2. Kích hoạt Row Level Security (RLS) trên bảng storage.objects nếu chưa bật
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Xóa các chính sách RLS cũ nếu đã tồn tại để tránh xung đột trùng tên
DROP POLICY IF EXISTS "Public Access - Cho phép mọi người xem ảnh post-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload - Cho phép admin tải ảnh lên post-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update - Cho phép admin cập nhật ảnh post-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete - Cho phép admin xóa ảnh post-images" ON storage.objects;

-- 4. Policy: Cho phép mọi người xem ảnh công khai (SELECT) trên bucket 'post-images'
CREATE POLICY "Public Access - Cho phép mọi người xem ảnh post-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

-- 5. Policy: Chỉ người dùng đã xác thực (authenticated) mới được tải ảnh lên (INSERT)
CREATE POLICY "Authenticated Upload - Cho phép admin tải ảnh lên post-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'post-images'
  AND (auth.role() = 'authenticated')
);

-- 6. Policy: Chỉ người dùng đã xác thực mới được cập nhật ảnh (UPDATE)
CREATE POLICY "Authenticated Update - Cho phép admin cập nhật ảnh post-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'post-images'
  AND (auth.role() = 'authenticated')
)
WITH CHECK (
  bucket_id = 'post-images'
  AND (auth.role() = 'authenticated')
);

-- 7. Policy: Chỉ người dùng đã xác thực mới được xóa ảnh (DELETE)
CREATE POLICY "Authenticated Delete - Cho phép admin xóa ảnh post-images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'post-images'
  AND (auth.role() = 'authenticated')
);
`;
