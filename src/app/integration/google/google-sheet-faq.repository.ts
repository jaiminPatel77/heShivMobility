import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Faq } from '../../core/models/faq.model';
import { FaqRepository } from '../../core/repositories/faq.repository';
import { transformFaqRow } from './data-transformers';

@Injectable({ providedIn: 'root' })
export class GoogleSheetFaqRepository implements FaqRepository {
  private http = inject(HttpClient);
  private apiUrl = '';

  setApiUrl(url: string) {
    this.apiUrl = url;
  }

  getFaqs(): Observable<Faq[]> {
    if (!this.apiUrl) {
      return of([]);
    }

    return this.http.get<{ success: boolean; data: any[] }>(`${this.apiUrl}?action=faqs`).pipe(
      map(res => {
        if (res && res.success && Array.isArray(res.data)) {
          return res.data.map(transformFaqRow).filter(f => f.active);
        }
        return [];
      }),
      catchError(() => of([]))
    );
  }

  getFaqsByCategory(category: string): Observable<Faq[]> {
    return this.getFaqs().pipe(
      map(faqs => category === 'All' ? faqs : faqs.filter(f => f.category.toLowerCase() === category.toLowerCase()))
    );
  }
}
