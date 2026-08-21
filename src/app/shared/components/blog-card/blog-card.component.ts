import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Blog } from '../../../core/models/blog.model';
import { ImageUrlService } from '../../../core/services/image-url.service';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="blog-card card-glass">
      <div class="card-media">
        <img
          [src]="imageService.processImageUrl(blog.featuredImage)"
          [alt]="blog.title"
          (error)="imageService.handleImageError($event)"
          loading="lazy"
          class="card-img" />
        <span class="category-badge">{{ blog.category }}</span>
      </div>

      <div class="card-body">
        <div class="blog-meta">
          <span>By {{ blog.author }}</span>
          <span>•</span>
          <span>{{ blog.publishDate | date: 'mediumDate' }}</span>
        </div>

        <h3 class="card-title">
          <a [routerLink]="['/blog', blog.slug]">{{ blog.title }}</a>
        </h3>

        <p class="card-excerpt">{{ blog.excerpt }}</p>

        <a [routerLink]="['/blog', blog.slug]" class="read-more">
          Read Guide &rarr;
        </a>
      </div>
    </article>
  `,
  styles: [`
    @use 'tokens' as *;

    .blog-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      border-radius: $radius-lg;
    }

    .card-media {
      position: relative;
      height: 200px;
      overflow: hidden;

      .card-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform $transition-slow;
      }

      &:hover .card-img {
        transform: scale(1.08);
      }
    }

    .category-badge {
      position: absolute;
      bottom: 12px;
      left: 12px;
      background-color: $color-gold;
      color: $color-primary-navy;
      font-size: $font-size-xs;
      font-weight: $font-weight-bold;
      padding: 3px 10px;
      border-radius: $radius-sm;
    }

    .card-body {
      padding: $spacing-6;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: $spacing-3;
    }

    .blog-meta {
      display: flex;
      gap: $spacing-2;
      font-size: $font-size-xs;
      color: $color-muted-text;
    }

    .card-title {
      font-size: $font-size-lg;
      line-height: 1.3;
      a {
        color: $color-primary-navy;
        &:hover { color: $color-royal-blue; }
      }
    }

    .card-excerpt {
      font-size: $font-size-sm;
      color: $color-muted-text;
      line-height: 1.5;
    }

    .read-more {
      margin-top: auto;
      font-size: $font-size-sm;
      font-weight: $font-weight-bold;
      color: $color-royal-blue;

      &:hover {
        color: $color-gold;
      }
    }
  `]
})
export class BlogCardComponent {
  @Input({ required: true }) blog!: Blog;
  imageService = inject(ImageUrlService);
}
