export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  children?: {
    title: string;
    description: string;
    href: string;
    iconName?: string;
  }[];
}

export interface HeroSlide {
  id: string;
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  secondaryCtaText?: string;
  category: string;
}

export interface Certification {
  id: string;
  title: string;
  code: string;
  description: string;
  organization: string;
  iconType: 'shield-check' | 'award' | 'flame' | 'badge-check' | 'globe-lock';
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
  iconName: string;
}

export interface ProvinceLocation {
  id: string;
  name: string;
  region: 'Bắc' | 'Trung' | 'Nam';
  guardCount: string;
  targetCount: string;
  hotline: string;
  address: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  summary: string;
  description: string;
  targetAudience: string[];
  features: string[];
  workflow: string[];
  guarantee: string;
}

export interface SolutionCategory {
  id: string;
  name: string;
  solutions: {
    id: string;
    title: string;
    description: string;
    keySpecs: string[];
    tag: string;
  }[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  sector: string;
  imageUrl: string;
  challenge: string;
  solution: string;
  result: string;
  readTime: string;
  summary?: string;
  period?: string;
  guardCount?: string;
}

export interface ResearchArticle {
  id: string;
  category: 'Nghiên cứu & Báo cáo' | 'Cẩm nang PCCC' | 'Cảnh báo An ninh';
  title: string;
  date: string;
  summary: string;
  readTime: string;
  author: string;
  imageUrl: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface ClientPartner {
  name: string;
  type: 'Quốc tế' | 'Trong nước';
  logoPlaceholder: string;
  industry: string;
}

export interface RiskAssessmentAnswers {
  facilityType: string;
  areaSize: string;
  shiftRequirement: string;
  currentIssues: string[];
  staffCount: string;
}

export interface StatMetric {
  id: string | number;
  title: string;
  numeric_value: string | number;
  unit?: string;
  suffix?: string;
  description: string;
  display_order: number;
  is_active?: boolean;
  created_at?: string;
}

export interface QuoteRequest {
  id: string;
  client_name?: string;
  phone?: string;
  email?: string;
  service_needed?: string;
  message?: string;
  status: 'new' | 'contacted' | 'closed' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
  // Additional / alias fields for backwards compatibility with calculator modal
  source?: 'quote_calculator' | 'consultation_form' | 'direct';
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  companyName?: string;
  company_name?: string;
  jobTitle?: string;
  region?: string;
  serviceType?: string;
  targetType?: string;
  guards24h?: number;
  guards12h?: number;
  totalEstimate?: number;
  estimatedPriceFormatted?: string;
  options?: string[];
  notes?: string;
}

export type QuoteOptionCategory = 'service_type' | 'target_objective' | 'pricing_tier';

export interface QuoteOption {
  id: string | number;
  category: QuoteOptionCategory | string;
  label: string;
  value: string;
  price_estimate: number;
  description?: string;
  is_active?: boolean;
  display_order: number;
  created_at?: string;
}
