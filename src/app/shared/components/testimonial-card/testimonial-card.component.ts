import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Testimonial } from '../../../core/models/testimonial.model';
import { ImageUrlService } from '../../../core/services/image-url.service';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="testimonial-card card-glass">
      <div class="rating-stars">
        <span *ngFor="let star of stars" class="star">★</span>
      </div>

      <p class="quote-text">“{{ testimonial.message }}”</p>

      <div class="author-box">
        <img
          *ngIf="testimonial.image"
          [src]="imageService.processImageUrl(testimonial.image)"
          [alt]="testimonial.customerName"
          (error)="imageService.handleImageError($event)"
          class="author-avatar" />
        <div class="author-info">
          <h4 class="author-name">{{ testimonial.customerName }}</h4>
          <span class="author-location">{{ testimonial.location }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @use 'tokens' as *;

    .testimonial-card {
      padding: $spacing-6;
      display: flex;
      flex-direction: column;
      gap: $spacing-4;
      height: 100%;
      border-radius: $radius-lg;
    }

    .rating-stars {
      color: $color-gold;
      font-size: 1.2rem;
      display: flex;
      gap: 2px;
    }

    .quote-text {
      font-style: italic;
      color: $color-dark-text;
      font-size: $font-size-base;
      line-height: 1.6;
      flex-grow: 1;
    }

    .author-box {
      display: flex;
      align-items: center;
      gap: $spacing-3;
      padding-top: $spacing-3;
      border-top: 1px solid $color-border;
    }

    .author-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid $color-gold;
    }

    .author-name {
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
      color: $color-primary-navy;
    }

    .author-location {
      font-size: $font-size-xs;
      color: $color-muted-text;
    }
  `]
})
export class TestimonialCardComponent {
  @Input({ required: true }) testimonial!: Testimonial;
  imageService = inject(ImageUrlService);

  get stars(): number[] {
    return Array.from({ length: this.testimonial.rating || 5 });
  }
}
