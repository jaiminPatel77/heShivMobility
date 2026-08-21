export interface Package {
  packageId: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  destination: string;
  duration: string;
  price: number;
  currency: string;
  mainImage: string;
  galleryImages: string[];
  category: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  featured: boolean;
  active: boolean;
  displayOrder: number;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}
