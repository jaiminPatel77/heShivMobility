import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { GalleryGridComponent } from '../../shared/components/gallery-grid/gallery-grid.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton/loading-skeleton.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

import { GALLERY_REPOSITORY } from '../../core/repositories/repository.tokens';
import { GalleryRepository } from '../../core/repositories/gallery.repository';
import { GalleryItem } from '../../core/models/gallery.model';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    GalleryGridComponent,
    LoadingSkeletonComponent,
    ErrorStateComponent
  ],
  template: `
    <div class="page-header">
      <div class="container">
        <!-- <app-breadcrumb [items]="[{ label: 'Gallery' }]"></app-breadcrumb> -->
        <h1 class="page-title">Pilgrimage & Tour Gallery</h1>
        <p class="page-subtitle">Memorable moments from Somnath, Dwarka, Kevadia, and Kutch</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <app-loading-skeleton *ngIf="isLoading()" [count]="6" [columns]="3"></app-loading-skeleton>

        <app-error-state
          *ngIf="!isLoading() && hasError()"
          (retry)="loadGallery()">
        </app-error-state>

        <app-gallery-grid
          *ngIf="!isLoading() && !hasError()"
          [items]="items()"
          [showFilters]="false">
        </app-gallery-grid>
      </div>
    </section>
  `,
  styles: [`
    @use 'tokens' as *;

    .page-header {
      background: linear-gradient(135deg, $color-primary-navy, $color-royal-blue);
      color: $color-white;
      padding: $spacing-12 0 $spacing-16 0;

      .page-title {
        font-size: 2.75rem;
        color: $color-white;
        margin-top: $spacing-2;
      }
      .page-subtitle {
        color: $color-warm-gold;
        font-size: $font-size-lg;
      }
    }

    .section {
      padding: $spacing-12 0 $spacing-20 0;
    }
  `]
})
export class GalleryPageComponent implements OnInit {
  private galleryRepo: GalleryRepository = inject(GALLERY_REPOSITORY);
  private seoService = inject(SeoService);

  items = signal<GalleryItem[]>([]);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  ngOnInit() {
    this.seoService.updateSeo({
      title: 'Gujarat Pilgrimage & Travel Photo Gallery',
      description: 'Explore high resolution photos of Somnath Temple, Dwarka, Statue of Unity, and Rann of Kutch.'
    });
    this.loadGallery();
  }

  loadGallery() {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.galleryRepo.getGalleryItems().subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      }
    });
  }
}
