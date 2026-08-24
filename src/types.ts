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
