import { Observable } from 'rxjs';
import { Enquiry, EnquiryResponse } from '../models/enquiry.model';

export interface EnquiryRepository {
  submitEnquiry(enquiry: Enquiry): Observable<EnquiryResponse>;
}
