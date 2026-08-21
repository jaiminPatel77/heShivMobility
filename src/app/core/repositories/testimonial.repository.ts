import { Observable } from 'rxjs';
import { Testimonial } from '../models/testimonial.model';

export interface TestimonialRepository {
  getTestimonials(): Observable<Testimonial[]>;
}
