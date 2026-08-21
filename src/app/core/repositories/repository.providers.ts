import { Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import {
  PACKAGE_REPOSITORY,
  BLOG_REPOSITORY,
  GALLERY_REPOSITORY,
  FAQ_REPOSITORY,
  TESTIMONIAL_REPOSITORY,
  ENQUIRY_REPOSITORY
} from './repository.tokens';

import {
  MockPackageRepository,
  MockBlogRepository,
  MockGalleryRepository,
  MockFaqRepository,
  MockTestimonialRepository,
  MockEnquiryRepository
} from '../../mock/mock-repositories';

import { GoogleSheetPackageRepository } from '../../integration/google/google-sheet-package.repository';
import { GoogleSheetBlogRepository } from '../../integration/google/google-sheet-blog.repository';
import { GoogleSheetGalleryRepository } from '../../integration/google/google-sheet-gallery.repository';
import { GoogleSheetFaqRepository } from '../../integration/google/google-sheet-faq.repository';
import { GoogleSheetTestimonialRepository } from '../../integration/google/google-sheet-testimonial.repository';
import { GoogleSheetEnquiryRepository } from '../../integration/google/google-sheet-enquiry.repository';

export function packageRepoFactory(http: HttpClient) {
  if (environment.dataSource === 'google') {
    const repo = new GoogleSheetPackageRepository();
    repo.setApiUrl(environment.googleAppsScriptUrl);
    return repo;
  }
  return new MockPackageRepository();
}

export function blogRepoFactory(http: HttpClient) {
  if (environment.dataSource === 'google') {
    const repo = new GoogleSheetBlogRepository();
    repo.setApiUrl(environment.googleAppsScriptUrl);
    return repo;
  }
  return new MockBlogRepository();
}

export function galleryRepoFactory(http: HttpClient) {
  if (environment.dataSource === 'google') {
    const repo = new GoogleSheetGalleryRepository();
    repo.setApiUrl(environment.googleAppsScriptUrl);
    return repo;
  }
  return new MockGalleryRepository();
}

export function faqRepoFactory(http: HttpClient) {
  if (environment.dataSource === 'google') {
    const repo = new GoogleSheetFaqRepository();
    repo.setApiUrl(environment.googleAppsScriptUrl);
    return repo;
  }
  return new MockFaqRepository();
}

export function testimonialRepoFactory(http: HttpClient) {
  if (environment.dataSource === 'google') {
    const repo = new GoogleSheetTestimonialRepository();
    repo.setApiUrl(environment.googleAppsScriptUrl);
    return repo;
  }
  return new MockTestimonialRepository();
}

export function enquiryRepoFactory(http: HttpClient) {
  if (environment.dataSource === 'google') {
    const repo = new GoogleSheetEnquiryRepository();
    repo.setApiUrl(environment.googleAppsScriptUrl);
    return repo;
  }
  return new MockEnquiryRepository();
}

export const REPOSITORY_PROVIDERS: Provider[] = [
  { provide: PACKAGE_REPOSITORY, useFactory: packageRepoFactory, deps: [HttpClient] },
  { provide: BLOG_REPOSITORY, useFactory: blogRepoFactory, deps: [HttpClient] },
  { provide: GALLERY_REPOSITORY, useFactory: galleryRepoFactory, deps: [HttpClient] },
  { provide: FAQ_REPOSITORY, useFactory: faqRepoFactory, deps: [HttpClient] },
  { provide: TESTIMONIAL_REPOSITORY, useFactory: testimonialRepoFactory, deps: [HttpClient] },
  { provide: ENQUIRY_REPOSITORY, useFactory: enquiryRepoFactory, deps: [HttpClient] }
];
