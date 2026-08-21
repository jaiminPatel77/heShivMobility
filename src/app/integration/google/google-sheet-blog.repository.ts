import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Blog } from '../../core/models/blog.model';
import { BlogRepository } from '../../core/repositories/blog.repository';
import { transformBlogRow } from './data-transformers';
import { MOCK_BLOGS } from '../../mock/blogs.mock';

@Injectable({ providedIn: 'root' })
export class GoogleSheetBlogRepository implements BlogRepository {
  private http = inject(HttpClient);
  private apiUrl = '';

  setApiUrl(url: string) {
    this.apiUrl = url;
  }

  getBlogs(): Observable<Blog[]> {
    if (!this.apiUrl) {
      return of(MOCK_BLOGS.filter(b => b.active));
    }

    return this.http.get<{ success: boolean; data: any[] }>(`${this.apiUrl}?action=blogs`).pipe(
      map(res => {
        if (res && res.success && Array.isArray(res.data)) {
          return res.data.map(transformBlogRow).filter(b => b.active);
        }
        return MOCK_BLOGS.filter(b => b.active);
      }),
      catchError(() => of(MOCK_BLOGS.filter(b => b.active)))
    );
  }

  getBlogBySlug(slug: string): Observable<Blog | null> {
    if (!this.apiUrl) {
      return of(MOCK_BLOGS.find(b => b.slug === slug && b.active) || null);
    }

    return this.http.get<{ success: boolean; data: any }>(`${this.apiUrl}?action=blog&slug=${encodeURIComponent(slug)}`).pipe(
      map(res => {
        if (res && res.success && res.data) {
          return transformBlogRow(res.data);
        }
        return MOCK_BLOGS.find(b => b.slug === slug && b.active) || null;
      }),
      catchError(() => of(MOCK_BLOGS.find(b => b.slug === slug && b.active) || null))
    );
  }

  getFeaturedBlogs(): Observable<Blog[]> {
    return this.getBlogs().pipe(
      map(blogs => blogs.filter(b => b.featured))
    );
  }
}
