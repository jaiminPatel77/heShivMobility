import { Package } from '../../core/models/package.model';
import { Blog } from '../../core/models/blog.model';
import { GalleryItem } from '../../core/models/gallery.model';
import { Faq } from '../../core/models/faq.model';
import { Testimonial } from '../../core/models/testimonial.model';

export function slugify(text: string): string {
  if (!text) return 'item-' + Math.floor(Math.random() * 10000);
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function parseBoolean(value: any, fallback = false): boolean {
  if (value === true || value === false) return value;
  if (value === null || value === undefined || String(value).trim() === '') return fallback;
  const str = String(value).trim().toUpperCase();
  if (str === 'TRUE' || str === '1' || str === 'YES') return true;
  if (str === 'FALSE' || str === '0' || str === 'NO') return false;
  return fallback;
}

export function parseNumber(value: any, fallback = 0): number {
  if (typeof value === 'number' && !isNaN(value)) return value;
  if (value === null || value === undefined || String(value).trim() === '') return fallback;
  const cleaned = String(value).replace(/[^0-9.-]/g, '');
  if (cleaned.trim() === '') return fallback;
  const parsed = Number(cleaned);
  return isNaN(parsed) ? fallback : parsed;
}

export function parseArray(value: any, delimiter = '|'): string[] {
  if (Array.isArray(value)) return value.map(v => String(v).trim()).filter(Boolean);
  if (!value || typeof value !== 'string') return [];
  return value
    .split(delimiter)
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

export function parseString(value: any, fallback = ''): string {
  if (value === null || value === undefined) return fallback;
  return String(value).trim();
}

export function transformPackageRow(row: any): Package {
  const title = parseString(row.Title, 'Untitled Package');
  const slug = parseString(row.Slug) || slugify(title);
  const mainImage = parseString(row.MainImage);
  const shortDesc = parseString(row.ShortDescription);

  return {
    packageId: parseString(row.PackageId, `pkg-${slug}`),
    slug: slug,
    title: title,
    shortDescription: shortDesc,
    description: parseString(row.Description, shortDesc),
    destination: parseString(row.Destination, 'Gujarat'),
    duration: parseString(row.Duration, 'Flexible'),
    price: parseNumber(row.Price, 0),
    currency: parseString(row.Currency, 'INR'),
    mainImage: mainImage,
    galleryImages: parseArray(row.GalleryImages),
    category: parseString(row.Category, 'Pilgrimage'),
    highlights: parseArray(row.Highlights),
    inclusions: parseArray(row.Inclusions),
    exclusions: parseArray(row.Exclusions),
    featured: parseBoolean(row.Featured, true), // Default to true if not specified
    active: parseBoolean(row.Active, true),
    displayOrder: parseNumber(row.DisplayOrder, 0),
    metaTitle: parseString(row.MetaTitle) || `${title} | Heshiv Mobility`,
    metaDescription: parseString(row.MetaDescription) || shortDesc,
    ogImage: parseString(row.OgImage) || mainImage,
    canonicalUrl: parseString(row.CanonicalUrl),
    noIndex: parseBoolean(row.NoIndex, false)
  };
}

export function transformBlogRow(row: any): Blog {
  const title = parseString(row.Title, 'Untitled Blog');
  const slug = parseString(row.Slug) || slugify(title);
  const featuredImage = parseString(row.FeaturedImage);
  const excerpt = parseString(row.Excerpt);

  return {
    blogId: parseString(row.BlogId, `blog-${slug}`),
    slug: slug,
    title: title,
    excerpt: excerpt,
    content: parseString(row.Content, excerpt),
    contentFormat: (parseString(row.ContentFormat, 'markdown').toLowerCase() === 'html') ? 'html' : 'markdown',
    author: parseString(row.Author, 'Heshiv Mobility Editorial'),
    publishDate: parseString(row.PublishDate, new Date().toISOString().split('T')[0]),
    category: parseString(row.Category, 'Travel Guide'),
    featuredImage: featuredImage,
    featured: parseBoolean(row.Featured, true),
    active: parseBoolean(row.Active, true),
    displayOrder: parseNumber(row.DisplayOrder, 0),
    metaTitle: parseString(row.MetaTitle) || `${title} | Heshiv Mobility Blog`,
    metaDescription: parseString(row.MetaDescription) || excerpt,
    ogImage: parseString(row.OgImage) || featuredImage,
    canonicalUrl: parseString(row.CanonicalUrl),
    noIndex: parseBoolean(row.NoIndex, false)
  };
}

export function transformGalleryRow(row: any): GalleryItem {
  return {
    galleryId: parseString(row.GalleryId, `gal-${Math.random()}`),
    title: parseString(row.Title),
    description: parseString(row.Description),
    imageUrl: parseString(row.ImageUrl),
    altText: parseString(row.AltText),
    category: parseString(row.Category, 'General'),
    active: parseBoolean(row.Active, true),
    displayOrder: parseNumber(row.DisplayOrder, 0)
  };
}

export function transformFaqRow(row: any): Faq {
  return {
    faqId: parseString(row.FAQId, `faq-${Math.random()}`),
    question: parseString(row.Question),
    answer: parseString(row.Answer),
    category: parseString(row.Category, 'General'),
    active: parseBoolean(row.Active, true),
    displayOrder: parseNumber(row.DisplayOrder, 0)
  };
}

export function transformTestimonialRow(row: any): Testimonial {
  return {
    testimonialId: parseString(row.TestimonialId, `t-${Math.random()}`),
    customerName: parseString(row.CustomerName, 'Anonymous Traveler'),
    location: parseString(row.Location, 'India'),
    message: parseString(row.Message),
    rating: parseNumber(row.Rating, 5),
    image: parseString(row.Image),
    active: parseBoolean(row.Active, true),
    displayOrder: parseNumber(row.DisplayOrder, 0)
  };
}
