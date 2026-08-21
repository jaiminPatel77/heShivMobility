import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BUSINESS_INFO } from '../../../core/config/business-info';

@Component({
  selector: 'app-cta-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="cta-banner">
      <div class="container banner-content">
        <div class="text-box">
          <span class="badge">{{ badge || 'Spiritual & Family Journeys' }}</span>
          <h2 class="title">{{ title || 'Ready to Embark on Your Sacred Journey?' }}</h2>
          <p class="subtitle">{{ subtitle || 'Talk to our travel specialists for custom itineraries, group discounts, and hassle-free AC transport.' }}</p>
        </div>
        <div class="action-box">
          <a routerLink="/enquiry" class="btn btn-primary btn-lg">Plan Your Trip Now</a>
          <a [href]="'tel:' + businessInfo.phone" class="btn btn-outline-gold btn-lg">
            Call {{ businessInfo.phone }}
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @use 'tokens' as *;

    .cta-banner {
      background: linear-gradient(135deg, $color-primary-navy, $color-royal-blue);
      color: $color-white;
      padding: $spacing-16 0;
      border-top: 2px solid $color-gold;
      border-bottom: 2px solid $color-gold;
    }

    .banner-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: $spacing-8;

      @media (min-width: $breakpoint-lg) {
        flex-direction: row;
        text-align: left;
        justify-content: space-between;
      }
    }

    .text-box {
      max-width: 650px;
      display: flex;
      flex-direction: column;
      gap: $spacing-3;
    }

    .badge {
      font-size: $font-size-xs;
      color: $color-warm-gold;
      font-weight: $font-weight-bold;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .title {
      font-family: $font-heading;
      font-size: 2.25rem;
      color: $color-white;
      font-weight: 800;
      line-height: 1.2;

      @media (max-width: $breakpoint-md) {
        font-size: 1.75rem;
      }
    }

    .subtitle {
      font-size: $font-size-base;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.6;
    }

    .action-box {
      display: flex;
      flex-direction: column;
      gap: $spacing-4;
      width: 100%;
      max-width: 320px;

      @media (min-width: $breakpoint-sm) {
        flex-direction: row;
        max-width: none;
        width: auto;
      }
    }
  `]
})
export class CtaBannerComponent {
  @Input() badge?: string;
  @Input() title?: string;
  @Input() subtitle?: string;

  businessInfo = BUSINESS_INFO;
}
