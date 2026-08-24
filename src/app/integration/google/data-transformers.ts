import { Package, PriceTier } from '../../core/models/package.model';
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

export function parseDateString(value: any, fallback = ''): string {
  if (value === null || value === undefined) return fallback;
  const str = String(value).trim();
  if (!str) return fallback;

  // If Google Sheets returns an ISO Date string (e.g. 2026-04-08T18:30:00.000Z)
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)) {
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
      const formatter = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const parts = formatter.formatToParts(d);
      const getPart = (type: string) => parts.find(p => p.type === type)?.value || '';

      const day = getPart('day');
      const month = getPart('month');
      const year = getPart('year');
      const hour = getPart('hour');
      const minute = getPart('minute');
      const dayPeriod = getPart('dayPeriod').toUpperCase();

      if (hour === '12' && minute === '00' && dayPeriod === 'AM') {
        return `${day}-${month}-${year}`;
      } else {
        return `${day}-${month}-${year} ${hour}:${minute} ${dayPeriod}`;
      }
    }
  }

  // Display raw plain text as-is (e.g. "29-08-2026 09:00 PM" or "2026-04-09")
  return str;
}

export interface ParsedPriceInfo {
  startingPrice: number;
  displayPrice?: string;
  priceTiers: PriceTier[];
}

export function splitPriceTiers(str: string): string[] {
  if (/[|\r\n]/.test(str)) {
    return str.split(/\s*[\r\n|]+\s*/).map(p => p.trim()).filter(Boolean);
  }
  if (/\s+\/\s+/.test(str)) {
    return str.split(/\s+\/\s+/).map(p => p.trim()).filter(Boolean);
  }
  return [str.trim()];
}

export function parseSingleTier(part: string): { label: string; price: number } | null {
  const trimmed = part.trim();
  if (!trimmed) return null;

  // 1. If part contains a colon (e.g. "3/3 Non AC Luxury: 395" or "Above Sofa: ₹6,999")
  const colonIdx = trimmed.indexOf(':');
  if (colonIdx !== -1) {
    const rawLabel = trimmed.substring(0, colonIdx).trim();
    const rawPrice = trimmed.substring(colonIdx + 1).trim();
    const priceNum = parseNumber(rawPrice, 0);
    if (priceNum > 0) {
      return {
        label: rawLabel || 'Option',
        price: priceNum
      };
    }
  }

  // 2. If no colon, extract trailing price number (e.g. "3/3 Non AC Luxury 395" or "3/3 AC Luxury ₹595")
  const match = trimmed.match(/^(.*?)(?:₹\s*|\b(?:rs\.?|inr)\s*)?([\d,]+(?:\.\d+)?)\s*$/i);
  if (match) {
    const rawLabel = match[1].trim();
    const priceNum = parseNumber(match[2], 0);
    if (priceNum > 0) {
      return {
        label: rawLabel || 'Option',
        price: priceNum
      };
    }
  }

  // 3. Fallback: parse entire string as number
  const priceNum = parseNumber(trimmed, 0);
  if (priceNum > 0) {
    const label = trimmed.replace(/[0-9₹,.-]/g, '').trim();
    return {
      label: label || 'Option',
      price: priceNum
    };
  }

  return null;
}

export function parsePriceInfo(rawPrice: any): ParsedPriceInfo {
  if (rawPrice === null || rawPrice === undefined || String(rawPrice).trim() === '') {
    return { startingPrice: 0, priceTiers: [] };
  }

  if (typeof rawPrice === 'number') {
    return { startingPrice: rawPrice, priceTiers: [] };
  }

  const str = String(rawPrice).trim();
  if (!str) {
    return { startingPrice: 0, priceTiers: [] };
  }

  const parts = splitPriceTiers(str);

  if (parts.length > 1 || /[:|]/i.test(str) || /[a-zA-Z]/.test(str.replace(/^(₹|rs\.?|inr)/i, ''))) {
    const tiers: PriceTier[] = [];
    let lowestPrice = Infinity;

    for (const part of parts) {
      const parsedTier = parseSingleTier(part);
      if (parsedTier && parsedTier.price > 0) {
        tiers.push({
          label: parsedTier.label,
          price: parsedTier.price,
          formattedPrice: `₹${parsedTier.price.toLocaleString('en-IN')}`
        });
        if (parsedTier.price < lowestPrice) {
          lowestPrice = parsedTier.price;
        }
      }
    }

    if (tiers.length > 0) {
      if (tiers.length === 1 && tiers[0].label === 'Option' && !/[:|/a-zA-Z]/.test(str)) {
        return {
          startingPrice: tiers[0].price,
          priceTiers: []
        };
      }

      return {
        startingPrice: lowestPrice === Infinity ? parseNumber(str, 0) : lowestPrice,
        displayPrice: str,
        priceTiers: tiers
      };
    }
  }

  const singlePrice = parseNumber(str, 0);
  return {
    startingPrice: singlePrice,
    priceTiers: []
  };
}

export function transformPackageRow(row: any): Package {
  const title = parseString(row.Title, 'Untitled Package');
  const slug = parseString(row.Slug) || slugify(title);
  const mainImage = parseString(row.MainImage);
  const shortDesc = parseString(row.ShortDescription);
  const priceInfo = parsePriceInfo(row.Price);

  return {
    packageId: parseString(row.PackageId, `pkg-${slug}`),
    slug: slug,
    title: title,
    shortDescription: shortDesc,
    description: parseString(row.Description, shortDesc),
    destination: parseString(row.Destination, 'Gujarat'),
    duration: parseString(row.Duration, 'Flexible'),
    price: priceInfo.startingPrice,
    displayPrice: priceInfo.displayPrice,
    priceTiers: priceInfo.priceTiers,
    currency: parseString(row.Currency, 'INR'),
    mainImage: mainImage,
    galleryImages: parseArray(row.GalleryImages),
    category: parseString(row.Category, 'Pilgrimage'),
    highlights: parseArray(row.Highlights),
    inclusions: parseArray(row.Inclusions),
    exclusions: parseArray(row.Exclusions),
    arrivalDate: parseDateString(row.ArrivalDate),
    departureDateTime: parseDateString(row.DepartureDateTime),
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
