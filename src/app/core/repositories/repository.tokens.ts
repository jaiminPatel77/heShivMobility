import { InjectionToken } from '@angular/core';
import { PackageRepository } from './package.repository';
import { BlogRepository } from './blog.repository';
import { GalleryRepository } from './gallery.repository';
import { FaqRepository } from './faq.repository';
import { TestimonialRepository } from './testimonial.repository';
import { EnquiryRepository } from './enquiry.repository';

export const PACKAGE_REPOSITORY = new InjectionToken<PackageRepository>('PACKAGE_REPOSITORY');
export const BLOG_REPOSITORY = new InjectionToken<BlogRepository>('BLOG_REPOSITORY');
export const GALLERY_REPOSITORY = new InjectionToken<GalleryRepository>('GALLERY_REPOSITORY');
export const FAQ_REPOSITORY = new InjectionToken<FaqRepository>('FAQ_REPOSITORY');
export const TESTIMONIAL_REPOSITORY = new InjectionToken<TestimonialRepository>('TESTIMONIAL_REPOSITORY');
export const ENQUIRY_REPOSITORY = new InjectionToken<EnquiryRepository>('ENQUIRY_REPOSITORY');
