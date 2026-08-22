import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { BUSINESS_INFO } from '../../core/config/business-info';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, SectionTitleComponent, CtaBannerComponent],
  template: `
    <div class="page-header">
      <div class="container">
        <!-- <app-breadcrumb [items]="[{ label: 'About Us' }]"></app-breadcrumb> -->
        <h1 class="page-title">About {{ businessInfo.companyName }}</h1>
        <p class="page-subtitle">{{ businessInfo.tagline }} — {{ businessInfo.supportingText }}</p>
      </div>
    </div>

    <section class="section">
      <div class="container grid-2">
        <div class="about-text">
          <span class="badge">Who We Are</span>
          <h2>Your Trusted Travel Partner for Pilgrimages and Family Yatras Across India</h2>
          <p>
            <strong>{{ businessInfo.companyName }}</strong> is a premium travel mobility agency dedicated to providing care-driven, comfortable, and reliable tour services. We specialize in sacred pilgrimages, family tours, group yatras, and custom spiritual journeys across India and neighboring circuits.
          </p>
          <p>
            Whether visiting Somnath Jyotirlinga, Lord Krishna’s Jagat Mandir in Dwarka, the majestic Statue of Unity in Kevadia, or the endless White Rann of Kutch, our mission is to ensure every member of your family travels in peace, dignity, and absolute comfort.
          </p>
        </div>
        <div class="about-img">
          <img src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80" alt="Heshiv Mobility Pilgrimage Tour" class="card-glass-img" />
        </div>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container">
        <app-section-title badge="Our Guiding Pillars" title="Mission, Vision & Core Values" [centered]="true"></app-section-title>
        
        <div class="pillars-grid">
          <div class="pillar-card card-glass">
            <div class="p-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>To deliver dignified, safe, and care-oriented travel solutions for families, elders, and spiritual seekers with transparent pricing and uncompromised quality.</p>
          </div>

          <div class="pillar-card card-glass">
            <div class="p-icon">👁️</div>
            <h3>Our Vision</h3>
            <p>To be India’s most trusted and respected pilgrimage travel brand, celebrated for customer empathy, punctual AC mobility, and ethical hospitality.</p>
          </div>

          <div class="pillar-card card-glass">
            <div class="p-icon">❤️</div>
            <h3>Care-First Philosophy</h3>
            <p>We treat every traveler as our own family. Our drivers are trained to assist senior citizens with patience, wheelchair coordination, and temple entry guidance.</p>
          </div>
        </div>
      </div>
    </section>

    <app-cta-banner></app-cta-banner>
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

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr;
      gap: $spacing-10;
      align-items: center;

      @media (min-width: $breakpoint-lg) {
        grid-template-columns: 1fr 1fr;
      }
    }

    .about-text {
      display: flex;
      flex-direction: column;
      gap: $spacing-4;

      .badge {
        font-size: $font-size-xs;
        color: $color-royal-blue;
        font-weight: $font-weight-bold;
        text-transform: uppercase;
      }
      h2 {
        font-size: 2.25rem;
        line-height: 1.25;
      }
      p {
        color: $color-muted-text;
        line-height: 1.6;
      }
    }

    .card-glass-img {
      width: 100%;
      border-radius: $radius-xl;
      box-shadow: $shadow-lg;
    }

    .section {
      padding: $spacing-16 0;
      margin: $spacing-6 0;

      @media (max-width: $breakpoint-md) {
        padding: $spacing-10 0;
        margin: $spacing-4 0;
      }
    }

    .bg-white {
      background: $color-white;
      padding: $spacing-16 0;
      margin: $spacing-10 0;

      @media (max-width: $breakpoint-md) {
        padding: $spacing-10 0;
        margin: $spacing-6 0;
      }
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: $spacing-8;
    }

    .pillar-card {
      padding: $spacing-8;
      text-align: center;
      .p-icon { font-size: 3rem; margin-bottom: $spacing-3; }
      h3 { font-size: $font-size-xl; color: $color-primary-navy; margin-bottom: $spacing-2; }
      p { color: $color-muted-text; line-height: 1.6; font-size: $font-size-sm; }
    }
  `]
})
export class AboutPageComponent implements OnInit {
  businessInfo = BUSINESS_INFO;
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateSeo({
      title: 'About Us',
      description: 'Learn about Heshiv Mobility, our mission, vision, and care-driven travel philosophy for Gujarat pilgrimages.'
    });
  }
}
