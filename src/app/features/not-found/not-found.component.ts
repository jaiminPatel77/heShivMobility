import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BUSINESS_INFO } from '../../core/config/business-info';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="not-found-wrap container">
      <div class="err-code">404</div>
      <h1 class="err-title">Page Not Found</h1>
      <p class="err-desc">The page or tour itinerary you are looking for might have been moved or doesn't exist.</p>
      <div class="err-actions">
        <a routerLink="/" class="btn btn-primary">Return To Home</a>
        <a routerLink="/packages" class="btn btn-outline">Explore Packages</a>
      </div>
    </div>
  `,
  styles: [`
    @use 'tokens' as *;

    .not-found-wrap {
      padding: $spacing-20 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: $spacing-4;

      .err-code {
        font-family: $font-heading;
        font-size: 6rem;
        font-weight: 800;
        color: $color-gold;
        line-height: 1;
      }

      .err-title {
        font-size: 2.25rem;
        color: $color-primary-navy;
      }

      .err-desc {
        color: $color-muted-text;
        font-size: $font-size-lg;
        max-width: 500px;
      }

      .err-actions {
        display: flex;
        gap: $spacing-4;
        margin-top: $spacing-4;
      }
    }
  `]
})
export class NotFoundPageComponent implements OnInit {
  businessInfo = BUSINESS_INFO;
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateSeo({
      title: '404 - Page Not Found',
      noIndex: true
    });
  }
}
