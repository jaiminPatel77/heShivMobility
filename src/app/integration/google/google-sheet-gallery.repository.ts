import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GalleryItem } from '../../core/models/gallery.model';
import { GalleryRepository } from '../../core/repositories/gallery.repository';
import { transformGalleryRow } from './data-transformers';
import { MOCK_GALLERY } from '../../mock/gallery.mock';

@Injectable({ providedIn: 'root' })
export class GoogleSheetGalleryRepository implements GalleryRepository {
  private http = inject(HttpClient);
  private apiUrl = '';

  setApiUrl(url: string) {
    this.apiUrl = url;
  }

  getGalleryItems(): Observable<GalleryItem[]> {
    if (!this.apiUrl) {
      return of(MOCK_GALLERY.filter(g => g.active));
    }

    return this.http.get<{ success: boolean; data: any[] }>(`${this.apiUrl}?action=gallery`).pipe(
      map(res => {
        if (res && res.success && Array.isArray(res.data)) {
          return res.data.map(transformGalleryRow).filter(g => g.active);
        }
        return MOCK_GALLERY.filter(g => g.active);
      }),
      catchError(() => of(MOCK_GALLERY.filter(g => g.active)))
    );
  }

  getGalleryItemsByCategory(category: string): Observable<GalleryItem[]> {
    return this.getGalleryItems().pipe(
      map(items => category === 'All' ? items : items.filter(g => g.category.toLowerCase() === category.toLowerCase()))
    );
  }
}
