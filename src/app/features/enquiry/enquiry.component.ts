import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { EnquiryFormComponent } from '../../shared/components/enquiry-form/enquiry-form.component';
import { BUSINESS_INFO } from '../../core/config/business-info';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, EnquiryFormComponent],
  template: `
    <div class="page-header">
      <div class="container">
        <!-- <app-breadcrumb [items]="[{ label: 'Plan Your Trip' }]"></app-breadcrumb> -->
        <h1 class="page-title">Custom Trip & Pilgrimage Enquiry</h1>
        <p class="page-subtitle">Let us design your family journey with customized AC transport, hotel stays, and temple assistance</p>
      </div>
    </div>

    <section class="section">
      <div class="container max-w-900">
        <app-enquiry-form></app-enquiry-form>
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

    .max-w-900 {
      max-width: 900px;
      margin: 0 auto;
    }
  `]
})
export class EnquiryPageComponent implements OnInit {
  businessInfo = BUSINESS_INFO;
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateSeo({
      title: 'Plan Your Trip — Enquiry',
      description: 'Enquire for custom Gujarat pilgrimage tours, family trips, AC cabs, and group yatras with Heshiv Mobility.'
    });
  }
}
