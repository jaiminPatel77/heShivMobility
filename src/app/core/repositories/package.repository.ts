import { Observable } from 'rxjs';
import { Package } from '../models/package.model';

export interface PackageRepository {
  getPackages(): Observable<Package[]>;
  getPackageBySlug(slug: string): Observable<Package | null>;
  getFeaturedPackages(): Observable<Package[]>;
}
