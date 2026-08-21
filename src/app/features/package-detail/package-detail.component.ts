import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { EnquiryFormComponent } from '../../shared/components/enquiry-form/enquiry-form.component';
import { PackageCardComponent } from '../../shared/components/package-card/package-card.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton/loading-skeleton.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

import { PACKAGE_REPOSITORY } from '../../core/repositories/repository.tokens';
import { PackageRepository } from '../../core/repositories/package.repository';
import { Package } from '../../core/models/package.model';
import { SeoService } from '../../core/services/seo.service';
import { ImageUrlService } from '../../core/services/image-url.service';
import { BUSINESS_INFO } from '../../core/config/business-info';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    EnquiryFormComponent,
    PackageCardComponent,
    LoadingSkeletonComponent,
    ErrorStateComponent
  ],
  templateUrl: './package-detail.component.html',
  styleUrl: './package-detail.component.scss'
})
export class PackageDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private packageRepo: PackageRepository = inject(PACKAGE_REPOSITORY);
  private seoService = inject(SeoService);
  imageService = inject(ImageUrlService);
  businessInfo = BUSINESS_INFO;

  pkg = signal<Package | null>(null);
  relatedPackages = signal<Package[]>([]);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadPackage(slug);
      }
    });
  }

  loadPackage(slug: string) {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.packageRepo.getPackageBySlug(slug).subscribe({
      next: (data) => {
        this.isLoading.set(false);
        if (data) {
          this.pkg.set(data);
          this.seoService.updateSeo({
            title: data.metaTitle || data.title,
            description: data.metaDescription || data.shortDescription,
            ogImage: data.mainImage
          });
          this.loadRelatedPackages(data.category, data.slug);
        } else {
          this.hasError.set(true);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      }
    });
  }

  loadRelatedPackages(category: string, currentSlug: string) {
    this.packageRepo.getPackages().subscribe({
      next: (list) => {
        const related = list.filter(p => p.slug !== currentSlug).slice(0, 2);
        this.relatedPackages.set(related);
      }
    });
  }

  scrollToEnquiry() {
    if (typeof document !== 'undefined') {
      const element = document.getElementById('enquiry-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
