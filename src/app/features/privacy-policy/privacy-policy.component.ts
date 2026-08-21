import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { BUSINESS_INFO } from '../../core/config/business-info';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  template: `
    <div class="page-header">
      <div class="container">
        <!-- <app-breadcrumb [items]="[{ label: 'Privacy Policy' }]"></app-breadcrumb> -->
        <h1 class="page-title">Privacy Policy</h1>
        <p class="page-subtitle">How {{ businessInfo.companyName }} protects your personal information</p>
      </div>
    </div>

    <section class="section">
      <div class="container card-glass policy-content">
        <h2>1. Information We Collect</h2>
        <p>When you submit a tour enquiry or contact us at <strong>{{ businessInfo.companyName }}</strong>, we collect your full name, phone number, email address, and travel dates strictly to process your booking requests and deliver customer support.</p>

        <h2>2. Use of Information</h2>
        <p>Your details are used solely to arrange your travel vehicle, hotel bookings, temple assistance, and communicate trip updates. We do not sell or rent your personal information to third parties.</p>

        <h2>3. Data Protection</h2>
        <p>We maintain strict administrative and electronic safeguards to secure your personal data against unauthorized access.</p>

        <h2>4. Contact Us</h2>
        <p>If you have any questions regarding this Privacy Policy, please email us at <a [href]="'mailto:' + businessInfo.email">{{ businessInfo.email }}</a> or call {{ businessInfo.phone }}.</p>
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

    .policy-content {
      max-width: 900px;
      margin: 0 auto;
      padding: $spacing-10;
      color: $color-dark-text;

      h2 { color: $color-primary-navy; font-size: 1.5rem; margin-top: $spacing-6; margin-bottom: $spacing-2; }
      p { line-height: 1.7; color: $color-muted-text; }
      a { color: $color-royal-blue; font-weight: bold; }
    }
  `]
})
export class PrivacyPolicyComponent implements OnInit {
  businessInfo = BUSINESS_INFO;
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateSeo({
      title: 'Privacy Policy',
      description: 'Privacy Policy of Heshiv Mobility.'
    });
  }
}
