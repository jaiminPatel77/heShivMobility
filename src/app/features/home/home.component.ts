import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { HeroComponent } from '../../shared/components/hero/hero.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { PackageCardComponent } from '../../shared/components/package-card/package-card.component';
import { TestimonialCardComponent } from '../../shared/components/testimonial-card/testimonial-card.component';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card.component';
import { GalleryGridComponent } from '../../shared/components/gallery-grid/gallery-grid.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton/loading-skeleton.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

import { PACKAGE_REPOSITORY, BLOG_REPOSITORY, GALLERY_REPOSITORY, TESTIMONIAL_REPOSITORY } from '../../core/repositories/repository.tokens';
import { PackageRepository } from '../../core/repositories/package.repository';
import { BlogRepository } from '../../core/repositories/blog.repository';
import { GalleryRepository } from '../../core/repositories/gallery.repository';
import { TestimonialRepository } from '../../core/repositories/testimonial.repository';

import { Package } from '../../core/models/package.model';
import { Blog } from '../../core/models/blog.model';
import { GalleryItem } from '../../core/models/gallery.model';
import { Testimonial } from '../../core/models/testimonial.model';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeroComponent,
    SectionTitleComponent,
    PackageCardComponent,
    TestimonialCardComponent,
    BlogCardComponent,
    GalleryGridComponent,
    CtaBannerComponent,
    LoadingSkeletonComponent,
    ErrorStateComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private seoService = inject(SeoService);

  private packageRepo: PackageRepository = inject(PACKAGE_REPOSITORY);
  private blogRepo: BlogRepository = inject(BLOG_REPOSITORY);
  private galleryRepo: GalleryRepository = inject(GALLERY_REPOSITORY);
  private testimonialRepo: TestimonialRepository = inject(TESTIMONIAL_REPOSITORY);

  featuredPackages = signal<Package[]>([]);
  featuredBlogs = signal<Blog[]>([]);
  galleryPreview = signal<GalleryItem[]>([]);
  testimonials = signal<Testimonial[]>([]);

  isLoadingPackages = signal<boolean>(true);
  hasPackageError = signal<boolean>(false);

  ngOnInit() {
    this.seoService.updateSeo();
    this.loadHomeData();
  }

  loadHomeData() {
    this.isLoadingPackages.set(true);
    this.hasPackageError.set(false);

    this.packageRepo.getFeaturedPackages().subscribe({
      next: (data) => {
        this.featuredPackages.set(data);
        this.isLoadingPackages.set(false);
      },
      error: () => {
        this.isLoadingPackages.set(false);
        this.hasPackageError.set(true);
      }
    });

    this.blogRepo.getFeaturedBlogs().subscribe({
      next: (data) => this.featuredBlogs.set(data)
    });

    this.galleryRepo.getGalleryItems().subscribe({
      next: (data) => this.galleryPreview.set(data.slice(0, 6))
    });

    this.testimonialRepo.getTestimonials().subscribe({
      next: (data) => this.testimonials.set(data)
    });
  }
}
