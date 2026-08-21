import { Component, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryItem } from '../../../core/models/gallery.model';
import { ImageUrlService } from '../../../core/services/image-url.service';

@Component({
  selector: 'app-gallery-lightbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lightbox-backdrop" (click)="closeLightbox()">
      <div class="lightbox-dialog" (click)="$event.stopPropagation()" role="dialog" aria-modal="true">
        <button class="close-btn" (click)="closeLightbox()" aria-label="Close Lightbox">&times;</button>
        
        <button class="nav-btn prev-btn" (click)="prevImage()" aria-label="Previous Image">&#10094;</button>

        <div class="lightbox-body">
          <img
            [src]="imageService.processImageUrl(activeItem.imageUrl)"
            [alt]="activeItem.altText || activeItem.title"
            (error)="imageService.handleImageError($event)"
            class="lightbox-img" />
          <div class="lightbox-caption">
            <h3>{{ activeItem.title }}</h3>
            <p>{{ activeItem.description }}</p>
            <span class="category-tag">{{ activeItem.category }}</span>
          </div>
        </div>

        <button class="nav-btn next-btn" (click)="nextImage()" aria-label="Next Image">&#10095;</button>
      </div>
    </div>
  `,
  styles: [`
    @use 'tokens' as *;

    .lightbox-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(11, 42, 91, 0.9);
      backdrop-filter: blur(8px);
      z-index: $z-modal;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: $spacing-4;
    }

    .lightbox-dialog {
      position: relative;
      max-width: 900px;
      width: 100%;
      background: $color-white;
      border-radius: $radius-lg;
      overflow: hidden;
      box-shadow: $shadow-lg;
    }

    .close-btn {
      position: absolute;
      top: 12px;
      right: 16px;
      font-size: 2rem;
      color: $color-white;
      background: rgba(0, 0, 0, 0.5);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
    }

    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.8rem;
      color: $color-white;
      background: rgba(0, 0, 0, 0.5);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;

      &.prev-btn { left: 16px; }
      &.next-btn { right: 16px; }
    }

    .lightbox-img {
      width: 100%;
      max-height: 500px;
      object-fit: cover;
    }

    .lightbox-caption {
      padding: $spacing-6;
      background: $color-white;

      h3 {
        font-size: $font-size-xl;
        color: $color-primary-navy;
        margin-bottom: $spacing-1;
      }

      p {
        color: $color-muted-text;
        font-size: $font-size-sm;
      }

      .category-tag {
        display: inline-block;
        margin-top: $spacing-2;
        padding: 2px 10px;
        background: rgba(217, 162, 27, 0.2);
        color: $color-primary-navy;
        font-size: $font-size-xs;
        font-weight: $font-weight-bold;
        border-radius: $radius-sm;
      }
    }
  `]
})
export class GalleryLightboxComponent {
  @Input({ required: true }) activeItem!: GalleryItem;
  @Output() close = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  imageService = inject(ImageUrlService);

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') this.close.emit();
    if (event.key === 'ArrowRight') this.next.emit();
    if (event.key === 'ArrowLeft') this.prev.emit();
  }

  closeLightbox() { this.close.emit(); }
  nextImage() { this.next.emit(); }
  prevImage() { this.prev.emit(); }
}
