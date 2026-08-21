import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Package } from '../../../core/models/package.model';
import { ImageUrlService } from '../../../core/services/image-url.service';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="package-card card-glass">
      <!-- Badge / Category -->
      <div class="card-media">
        <img
          [src]="imageService.processImageUrl(pkg.mainImage)"
          [alt]="pkg.title"
          (error)="imageService.handleImageError($event)"
          loading="lazy"
          decoding="async"
          class="card-img" />
        <span class="category-badge">{{ pkg.category }}</span>
        <span *ngIf="pkg.featured" class="featured-badge">Featured</span>
      </div>

      <!-- Content Body -->
      <div class="card-body">
        <div class="card-meta">
          <span class="meta-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {{ pkg.destination }}
          </span>
          <span class="meta-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {{ pkg.duration }}
          </span>
        </div>

        <h3 class="card-title">
          <a [routerLink]="['/packages', pkg.slug]">{{ pkg.title }}</a>
        </h3>

        <p class="card-desc">{{ pkg.shortDescription }}</p>

        <!-- Highlights Pills -->
        <div class="highlights-list" *ngIf="pkg.highlights && pkg.highlights.length">
          <span *ngFor="let item of pkg.highlights.slice(0, 2)" class="pill">
            ✓ {{ item }}
          </span>
        </div>

        <!-- Card Footer -->
        <div class="card-footer">
          <div class="price-box">
            <span class="price-label">Starting from</span>
            <span class="price-value">₹{{ pkg.price | number }}</span>
          </div>

          <div class="card-actions">
            <a [routerLink]="['/packages', pkg.slug]" class="btn btn-outline btn-sm">View Details</a>
            <a [routerLink]="['/enquiry']" [queryParams]="{package: pkg.title}" class="btn btn-primary btn-sm">Enquire</a>
          </div>
        </div>
      </div>
    </article>
  `,
  styles: [`
    @use 'tokens' as *;

    .package-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      border-radius: $radius-lg;
    }

    .card-media {
      position: relative;
      height: 220px;
      overflow: hidden;

      .card-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform $transition-slow;
      }

      &:hover .card-img {
        transform: scale(1.08);
      }
    }

    .category-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      background-color: $color-primary-navy;
      color: $color-gold;
      font-size: $font-size-xs;
      font-weight: $font-weight-bold;
      padding: 4px 12px;
      border-radius: $radius-full;
      box-shadow: $shadow-sm;
    }

    .featured-badge {
      position: absolute;
      top: 14px;
      right: 14px;
      background: linear-gradient(135deg, $color-gold, $color-warm-gold);
      color: $color-primary-navy;
      font-size: $font-size-xs;
      font-weight: $font-weight-bold;
      padding: 4px 12px;
      border-radius: $radius-full;
      box-shadow: $shadow-gold;
    }

    .card-body {
      padding: $spacing-6;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: $spacing-3;
    }

    .card-meta {
      display: flex;
      gap: $spacing-4;
      font-size: $font-size-xs;
      color: $color-muted-text;
      font-weight: $font-weight-medium;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .icon {
        width: 14px;
        height: 14px;
        color: $color-royal-blue;
      }
    }

    .card-title {
      font-size: $font-size-xl;
      line-height: 1.3;
      a {
        color: $color-primary-navy;
        &:hover { color: $color-royal-blue; }
      }
    }

    .card-desc {
      font-size: $font-size-sm;
      color: $color-muted-text;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .highlights-list {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-2;
      margin-top: auto;

      .pill {
        font-size: $font-size-xs;
        background-color: #f1f5f9;
        color: $color-primary-navy;
        padding: 3px 10px;
        border-radius: $radius-sm;
        font-weight: $font-weight-medium;
      }
    }

    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: $spacing-4;
      margin-top: $spacing-3;
      border-top: 1px solid $color-border;
    }

    .price-box {
      display: flex;
      flex-direction: column;

      .price-label {
        font-size: 0.75rem;
        color: $color-muted-text;
      }

      .price-value {
        font-family: $font-heading;
        font-size: $font-size-2xl;
        font-weight: $font-weight-bold;
        color: $color-primary-navy;
      }
    }

    .card-actions {
      display: flex;
      gap: $spacing-2;

      .btn-sm {
        padding: $spacing-2 $spacing-4;
        font-size: $font-size-xs;
      }
    }
  `]
})
export class PackageCardComponent {
  @Input({ required: true }) pkg!: Package;
  imageService = inject(ImageUrlService);
}
