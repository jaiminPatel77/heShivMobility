export interface Blog {
  blogId: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  contentFormat: 'markdown' | 'html';
  author: string;
  publishDate: string;
  category: string;
  featuredImage: string;
  featured: boolean;
  active: boolean;
  displayOrder: number;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}
