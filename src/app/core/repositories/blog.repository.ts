import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';

export interface BlogRepository {
  getBlogs(): Observable<Blog[]>;
  getBlogBySlug(slug: string): Observable<Blog | null>;
  getFeaturedBlogs(): Observable<Blog[]>;
}
