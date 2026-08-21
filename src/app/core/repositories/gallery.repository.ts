import { Observable } from 'rxjs';
import { GalleryItem } from '../models/gallery.model';

export interface GalleryRepository {
  getGalleryItems(): Observable<GalleryItem[]>;
}
