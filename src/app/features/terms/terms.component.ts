import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { BUSINESS_INFO } from '../../core/config/business-info';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  template: `
    <div class="page-header">
      <div class="container">
        <!-- <app-breadcrumb [items]="[{ label: 'Terms & Conditions' }]"></app-breadcrumb> -->
        <h1 class="page-title">Terms & Conditions</h1>
        <p class="page-subtitle">Guidelines governing tour reservations with {{ businessInfo.companyName }}</p>
      </div>
    </div>

    <section class="section">
      <div class="container card-glass terms-content">
        <h2>1. Booking & Payments</h2>
        <p>Bookings are confirmed upon receipt of advance deposit. Final balance is payable on travel date.</p>

        <h2>2. Vehicle Usage & Mobility</h2>
        <p>All vehicles provided by <strong>{{ businessInfo.companyName }}</strong> are AC equipped. Speed limits and traffic safety regulations strictly apply.</p>

        <h2>3. Cancellations</h2>
        <p>Free cancellation up to 7 days prior to travel date. Refunds are processed within 5 business days.</p>
      </div>
    </section>
  `,
  styles: [`
    @use 'tokens' as *;

    .page-header {
      background: linear-gradient(135deg, $color-primary-navy, $color-royal-blue);
      color: $color-white;
      padding: $spacing-12 0 $spacing-16 0;

      .page-title { font-size: 2.75rem; color: $color-white; margin-top: $spacing-2; }
      .page-subtitle { color: $color-warm-gold; font-size: $font-size-lg; }
    }

    .section { padding: $spacing-12 0 $spacing-20 0; }

    .terms-content {
      max-width: 900px;
      margin: 0 auto;
      padding: $spacing-10;
      color: $color-dark-text;

      h2 { color: $color-primary-navy; font-size: 1.5rem; margin-top: $spacing-6; margin-bottom: $spacing-2; }
      p { line-height: 1.7; color: $color-muted-text; }
    }
  `]
})
export class TermsComponent implements OnInit {
  businessInfo = BUSINESS_INFO;
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateSeo({
      title: 'Terms & Conditions',
      description: 'Terms and conditions for Heshiv Mobility tour package bookings.'
    });
  }
}
