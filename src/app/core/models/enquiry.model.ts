export interface Enquiry {
  enquiryId?: string;
  createdAt?: string;
  fullName: string;
  phone: string;
  email: string;
  message?: string; // Notes (Optional)
  status?: string;
  source?: string;
  honeypot?: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  enquiryId?: string;
}
