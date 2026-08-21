import { Component, Input, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryItem } from '../../../core/models/gallery.model';
import { GalleryLightboxComponent } from '../gallery-lightbox/gallery-lightbox.component';
import { ImageUrlService } from '../../../core/services/image-url.service';

@Component({
  selector: 'app-gallery-grid',
  standalone: true,
  imports: [CommonModule, GalleryLightboxComponent],
  template: `
    <!-- Category Filter Tabs -->
    <div class="category-filters" *ngIf="showFilters && categories().length > 1">
      <button
        *ngFor="let cat of categories()"
        class="filter-tab"
        [class.active]="selectedCategory() === cat"
        (click)="setCategory(cat)">
        {{ cat }}
      </button>
    </div>

    <!-- Gallery Grid -->
    <div class="gallery-grid">
      <div
        *ngFor="let item of filteredItems(); let i = index"
        class="gallery-card card-glass"
        (click)="openLightbox(i)"
        tabindex="0"
        (keydown.enter)="openLightbox(i)">
        <img
          [src]="imageService.processImageUrl(item.imageUrl)"
          [alt]="item.altText || item.title"
          (error)="imageService.handleImageError($event)"
          loading="lazy"
          class="gallery-img" />
        <div class="gallery-overlay">
          <span class="category-badge">{{ item.category }}</span>
          <h3 class="item-title">{{ item.title }}</h3>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <app-gallery-lightbox
      *ngIf="lightboxIndex() !== null && activeItem()"
      [activeItem]="activeItem()!"
      (close)="closeLightbox()"
      (next)="nextImage()"
      (prev)="prevImage()">
    </app-gallery-lightbox>
  `,
  styles: [`
    @use 'tokens' as *;

    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-3;
      justify-content: center;
      margin-bottom: $spacing-8;

      .filter-tab {
        padding: $spacing-2 $spacing-5;
        border-radius: $radius-full;
        background: $color-white;
        border: 1px solid $color-border;
        color: $color-primary-navy;
        font-weight: $font-weight-semibold;
        font-size: $font-size-sm;
        cursor: pointer;
        transition: all $transition-fast;

        &:hover, &.active {
          background-color: $color-primary-navy;
          color: $color-gold;
          border-color: $color-primary-navy;
        }
      }
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: $spacing-6;
    }

    .gallery-card {
      position: relative;
      height: 240px;
      overflow: hidden;
      border-radius: $radius-lg;
      cursor: pointer;

      .gallery-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform $transition-slow;
      }

      .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, rgba(11, 42, 91, 0.85) 0%, transparent 60%);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: $spacing-4;
        color: $color-white;
        opacity: 0.9;
        transition: opacity $transition-fast;
      }

      &:hover {
        .gallery-img { transform: scale(1.08); }
        .gallery-overlay { opacity: 1; }
      }

      .category-badge {
        font-size: $font-size-xs;
        color: $color-warm-gold;
        font-weight: $font-weight-bold;
        text-transform: uppercase;
      }

      .item-title {
        font-size: $font-size-lg;
        color: $color-white;
        margin-top: 2px;
      }
    }
  `]
})
export class GalleryGridComponent {
  @Input({ required: true }) items: GalleryItem[] = [];
  @Input() showFilters = false;

  imageService = inject(ImageUrlService);
  selectedCategory = signal<string>('All');
  lightboxIndex = signal<number | null>(null);

  categories = computed(() => {
    const set = new Set<string>();
    set.add('All');
    this.items.forEach(i => set.add(i.category));
    return Array.from(set);
  });

  filteredItems = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.items;
    return this.items.filter(i => i.category === cat);
  });

  activeItem = computed(() => {
    const idx = this.lightboxIndex();
    if (idx === null) return null;
    return this.filteredItems()[idx] || null;
  });

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  openLightbox(index: number) {
    this.lightboxIndex.set(index);
  }

  closeLightbox() {
    this.lightboxIndex.set(null);
  }

  nextImage() {
    const idx = this.lightboxIndex();
    if (idx !== null) {
      const nextIdx = (idx + 1) % this.filteredItems().length;
      this.lightboxIndex.set(nextIdx);
    }
  }

  prevImage() {
    const idx = this.lightboxIndex();
    if (idx !== null) {
      const prevIdx = (idx - 1 + this.filteredItems().length) % this.filteredItems().length;
      this.lightboxIndex.set(prevIdx);
    }
  }
}
