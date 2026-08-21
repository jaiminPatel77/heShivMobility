import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { FaqAccordionComponent } from '../../shared/components/faq-accordion/faq-accordion.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton/loading-skeleton.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

import { FAQ_REPOSITORY } from '../../core/repositories/repository.tokens';
import { FaqRepository } from '../../core/repositories/faq.repository';
import { Faq } from '../../core/models/faq.model';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    FaqAccordionComponent,
    LoadingSkeletonComponent,
    ErrorStateComponent
  ],
  template: `
    <div class="page-header">
      <div class="container">
        <!-- <app-breadcrumb [items]="[{ label: 'FAQs' }]"></app-breadcrumb> -->
        <h1 class="page-title">Frequently Asked Questions</h1>
        <p class="page-subtitle">Everything you need to know about booking, senior assistance, and vehicle comfort</p>
      </div>
    </div>

    <section class="section">
      <div class="container max-w-800">
        <app-loading-skeleton *ngIf="isLoading()" [count]="4" [columns]="1"></app-loading-skeleton>

        <app-error-state
          *ngIf="!isLoading() && hasError()"
          (retry)="loadFaqs()">
        </app-error-state>

        <app-faq-accordion
          *ngIf="!isLoading() && !hasError()"
          [faqs]="faqs()">
        </app-faq-accordion>
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

    .max-w-800 {
      max-width: 800px;
      margin: 0 auto;
    }
  `]
})
export class FaqPageComponent implements OnInit {
  private faqRepo: FaqRepository = inject(FAQ_REPOSITORY);
  private seoService = inject(SeoService);

  faqs = signal<Faq[]>([]);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  ngOnInit() {
    this.seoService.updateSeo({
      title: 'Frequently Asked Questions (FAQ)',
      description: 'Find answers to common questions about booking Gujarat pilgrimage packages, senior care, and AC cab options.'
    });
    this.loadFaqs();
  }

  loadFaqs() {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.faqRepo.getFaqs().subscribe({
      next: (data) => {
        this.faqs.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      }
    });
  }
}
