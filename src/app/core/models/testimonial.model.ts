export interface Testimonial {
  testimonialId: string;
  customerName: string;
  location: string;
  message: string;
  rating: number;
  image?: string;
  active: boolean;
  displayOrder: number;
}
