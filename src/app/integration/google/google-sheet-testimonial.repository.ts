import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Testimonial } from '../../core/models/testimonial.model';
import { TestimonialRepository } from '../../core/repositories/testimonial.repository';
import { transformTestimonialRow } from './data-transformers';
import { MOCK_TESTIMONIALS } from '../../mock/testimonials.mock';

@Injectable({ providedIn: 'root' })
export class GoogleSheetTestimonialRepository implements TestimonialRepository {
  private http = inject(HttpClient);
  private apiUrl = '';

  setApiUrl(url: string) {
    this.apiUrl = url;
  }

  getTestimonials(): Observable<Testimonial[]> {
    if (!this.apiUrl) {
      return of(MOCK_TESTIMONIALS.filter(t => t.active));
    }

    return this.http.get<{ success: boolean; data: any[] }>(`${this.apiUrl}?action=testimonials`).pipe(
      map(res => {
        if (res && res.success && Array.isArray(res.data)) {
          return res.data.map(transformTestimonialRow).filter(t => t.active);
        }
        return MOCK_TESTIMONIALS.filter(t => t.active);
      }),
      catchError(() => of(MOCK_TESTIMONIALS.filter(t => t.active)))
    );
  }
}
