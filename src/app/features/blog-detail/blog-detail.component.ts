import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { marked } from 'marked';

import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton/loading-skeleton.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

import { BLOG_REPOSITORY } from '../../core/repositories/repository.tokens';
import { BlogRepository } from '../../core/repositories/blog.repository';
import { Blog } from '../../core/models/blog.model';
import { SeoService } from '../../core/services/seo.service';
import { ImageUrlService } from '../../core/services/image-url.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    CtaBannerComponent,
    LoadingSkeletonComponent,
    ErrorStateComponent
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private blogRepo: BlogRepository = inject(BLOG_REPOSITORY);
  private seoService = inject(SeoService);
  imageService = inject(ImageUrlService);

  blog = signal<Blog | null>(null);
  renderedHtml = signal<string>('');
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadBlog(slug);
      }
    });
  }

  loadBlog(slug: string) {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.blogRepo.getBlogBySlug(slug).subscribe({
      next: (data) => {
        this.isLoading.set(false);
        if (data) {
          this.blog.set(data);
          this.seoService.updateSeo({
            title: data.metaTitle || data.title,
            description: data.metaDescription || data.excerpt,
            ogImage: data.featuredImage,
            type: 'article'
          });
          this.renderContent(data.content);
        } else {
          this.hasError.set(true);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      }
    });
  }

  private async renderContent(content: string) {
    if (!content) {
      this.renderedHtml.set('');
      return;
    }
    try {
      const parsed = await marked.parse(content);
      this.renderedHtml.set(parsed);
    } catch {
      this.renderedHtml.set(content);
    }
  }
}
