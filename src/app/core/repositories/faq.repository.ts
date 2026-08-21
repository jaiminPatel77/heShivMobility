import { Observable } from 'rxjs';
import { Faq } from '../models/faq.model';

export interface FaqRepository {
  getFaqs(): Observable<Faq[]>;
}
