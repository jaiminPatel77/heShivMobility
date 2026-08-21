import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Enquiry, EnquiryResponse } from '../../core/models/enquiry.model';
import { EnquiryRepository } from '../../core/repositories/enquiry.repository';

@Injectable({ providedIn: 'root' })
export class GoogleSheetEnquiryRepository implements EnquiryRepository {
  private http = inject(HttpClient);
  private apiUrl = '';

  setApiUrl(url: string) {
    this.apiUrl = url;
  }

  submitEnquiry(enquiry: Enquiry): Observable<EnquiryResponse> {
    if (enquiry.honeypot && enquiry.honeypot.trim() !== '') {
      return of({
        success: false,
        message: 'Spam detected. Submission aborted.'
      });
    }

    if (!this.apiUrl) {
      return of({
        success: true,
        enquiryId: `ENQ-MOCK-${Date.now()}`,
        message: 'Mock submission successful. (Set Google Web App URL for live Google Sheet API)'
      });
    }

    return this.http.post<{ success: boolean; message: string; data?: { enquiryId?: string } }>(
      `${this.apiUrl}?action=enquiry`,
      JSON.stringify(enquiry)
    ).pipe(
      map(res => ({
        success: res.success,
        enquiryId: res.data?.enquiryId,
        message: res.message
      })),
      catchError(err => of({
        success: false,
        message: 'Failed to submit enquiry. Please try again or contact us via WhatsApp.'
      }))
    );
  }
}
