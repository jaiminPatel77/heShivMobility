import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Package } from '../core/models/package.model';
import { Blog } from '../core/models/blog.model';
import { GalleryItem } from '../core/models/gallery.model';
import { Faq } from '../core/models/faq.model';
import { Testimonial } from '../core/models/testimonial.model';
import { Enquiry, EnquiryResponse } from '../core/models/enquiry.model';

import { PackageRepository } from '../core/repositories/package.repository';
import { BlogRepository } from '../core/repositories/blog.repository';
import { GalleryRepository } from '../core/repositories/gallery.repository';
import { FaqRepository } from '../core/repositories/faq.repository';
import { TestimonialRepository } from '../core/repositories/testimonial.repository';
import { EnquiryRepository } from '../core/repositories/enquiry.repository';

import { MOCK_PACKAGES } from './packages.mock';
import { MOCK_BLOGS } from './blogs.mock';
import { MOCK_GALLERY } from './gallery.mock';
import { MOCK_FAQS } from './faqs.mock';
import { MOCK_TESTIMONIALS } from './testimonials.mock';

@Injectable({ providedIn: 'root' })
export class MockPackageRepository implements PackageRepository {
  getPackages(): Observable<Package[]> {
    return of(MOCK_PACKAGES.filter(p => p.active)).pipe(delay(50));
  }

  getPackageBySlug(slug: string): Observable<Package | null> {
    const found = MOCK_PACKAGES.find(p => p.slug === slug && p.active) || null;
    return of(found).pipe(delay(50));
  }

  getFeaturedPackages(): Observable<Package[]> {
    return of(MOCK_PACKAGES.filter(p => p.featured && p.active)).pipe(delay(50));
  }
}

@Injectable({ providedIn: 'root' })
export class MockBlogRepository implements BlogRepository {
  getBlogs(): Observable<Blog[]> {
    return of(MOCK_BLOGS.filter(b => b.active)).pipe(delay(50));
  }

  getBlogBySlug(slug: string): Observable<Blog | null> {
    const found = MOCK_BLOGS.find(b => b.slug === slug && b.active) || null;
    return of(found).pipe(delay(50));
  }

  getFeaturedBlogs(): Observable<Blog[]> {
    return of(MOCK_BLOGS.filter(b => b.featured && b.active)).pipe(delay(50));
  }
}

@Injectable({ providedIn: 'root' })
export class MockGalleryRepository implements GalleryRepository {
  getGalleryItems(): Observable<GalleryItem[]> {
    return of(MOCK_GALLERY.filter(g => g.active)).pipe(delay(50));
  }
}

@Injectable({ providedIn: 'root' })
export class MockFaqRepository implements FaqRepository {
  getFaqs(): Observable<Faq[]> {
    return of(MOCK_FAQS.filter(f => f.active)).pipe(delay(50));
  }
}

@Injectable({ providedIn: 'root' })
export class MockTestimonialRepository implements TestimonialRepository {
  getTestimonials(): Observable<Testimonial[]> {
    return of(MOCK_TESTIMONIALS.filter(t => t.active)).pipe(delay(50));
  }
}

@Injectable({ providedIn: 'root' })
export class MockEnquiryRepository implements EnquiryRepository {
  submitEnquiry(enquiry: Enquiry): Observable<EnquiryResponse> {
    // Check honeypot
    if (enquiry.honeypot) {
      return of({
        success: false,
        message: 'Spam submission detected.'
      }).pipe(delay(50));
    }

    return of({
      success: true,
      message: 'Thank you! Your travel enquiry has been received. Our team will contact you shortly.',
      enquiryId: `ENQ-MOCK-${Math.floor(1000 + Math.random() * 9000)}`
    }).pipe(delay(100));
  }
}
