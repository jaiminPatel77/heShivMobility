import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton/loading-skeleton.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

import { BLOG_REPOSITORY } from '../../core/repositories/repository.tokens';
import { BlogRepository } from '../../core/repositories/blog.repository';
import { Blog } from '../../core/models/blog.model';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    BlogCardComponent,
    LoadingSkeletonComponent,
    ErrorStateComponent
  ],
  template: `
    <div class="page-header">
      <div class="container">
        <!-- <app-breadcrumb [items]="[{ label: 'Blog & Guides' }]"></app-breadcrumb> -->
        <h1 class="page-title">Gujarat Travel & Pilgrimage Blog</h1>
        <p class="page-subtitle">Expert tips, temple guides, festival news, and itinerary insights</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <app-loading-skeleton *ngIf="isLoading()" [count]="3" [columns]="3"></app-loading-skeleton>

        <app-error-state
          *ngIf="!isLoading() && hasError()"
          (retry)="loadBlogs()">
        </app-error-state>

        <div *ngIf="!isLoading() && !hasError()" class="cards-grid">
          <app-blog-card
            *ngFor="let item of blogs()"
            [blog]="item">
          </app-blog-card>
        </div>
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

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: $spacing-8;
    }
  `]
})
export class BlogPageComponent implements OnInit {
  private blogRepo: BlogRepository = inject(BLOG_REPOSITORY);
  private seoService = inject(SeoService);

  blogs = signal<Blog[]>([]);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  ngOnInit() {
    this.seoService.updateSeo({
      title: 'Gujarat Pilgrimage & Travel Blog',
      description: 'Read pilgrimage travel guides, temple timings, and trip planning tips for Somnath, Dwarka, and Gujarat.'
    });
    this.loadBlogs();
  }

  loadBlogs() {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.blogRepo.getBlogs().subscribe({
      next: (data) => {
        this.blogs.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      }
    });
  }
}
