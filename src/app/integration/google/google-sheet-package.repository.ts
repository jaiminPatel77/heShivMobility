import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Package } from '../../core/models/package.model';
import { PackageRepository } from '../../core/repositories/package.repository';
import { transformPackageRow } from './data-transformers';
import { MOCK_PACKAGES } from '../../mock/packages.mock';

@Injectable({ providedIn: 'root' })
export class GoogleSheetPackageRepository implements PackageRepository {
  private http = inject(HttpClient);
  private apiUrl = ''; // Set via environment or constructor injection

  setApiUrl(url: string) {
    this.apiUrl = url;
  }

  getPackages(): Observable<Package[]> {
    if (!this.apiUrl) {
      return of(MOCK_PACKAGES.filter(p => p.active));
    }

    return this.http.get<{ success: boolean; data: any[] }>(`${this.apiUrl}?action=packages`).pipe(
      map(res => {
        if (res && res.success && Array.isArray(res.data)) {
          return res.data.map(transformPackageRow).filter(p => p.active);
        }
        return MOCK_PACKAGES.filter(p => p.active);
      }),
      catchError(() => of(MOCK_PACKAGES.filter(p => p.active)))
    );
  }

  getPackageBySlug(slug: string): Observable<Package | null> {
    if (!this.apiUrl) {
      const found = MOCK_PACKAGES.find(p => p.slug === slug && p.active) || null;
      return of(found);
    }

    return this.http.get<{ success: boolean; data: any }>(`${this.apiUrl}?action=package&slug=${encodeURIComponent(slug)}`).pipe(
      map(res => {
        if (res && res.success && res.data) {
          return transformPackageRow(res.data);
        }
        return MOCK_PACKAGES.find(p => p.slug === slug && p.active) || null;
      }),
      catchError(() => of(MOCK_PACKAGES.find(p => p.slug === slug && p.active) || null))
    );
  }

  getFeaturedPackages(): Observable<Package[]> {
    return this.getPackages().pipe(
      map(packages => packages.filter(p => p.featured))
    );
  }
}
