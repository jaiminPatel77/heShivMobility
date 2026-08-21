import { Testimonial } from '../core/models/testimonial.model';

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    testimonialId: 't-001',
    customerName: 'Rajesh & Sunita Sharma',
    location: 'Delhi',
    message: 'We took our elderly parents for the Somnath-Dwarka pilgrimage with Heshiv Mobility. The driver was extremely respectful and patient, ensuring my parents never felt rushed. Exceptional service!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    active: true,
    displayOrder: 1
  },
  {
    testimonialId: 't-002',
    customerName: 'Anand Kulkarni',
    location: 'Pune, Maharashtra',
    message: 'Booked a 3-day family trip to Statue of Unity. The vehicle was squeaky clean, pickup from Vadodara station was right on time, and hotel arrangements were top notch.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    active: true,
    displayOrder: 2
  },
  {
    testimonialId: 't-003',
    customerName: 'Mehta Family Group',
    location: 'Mumbai',
    message: 'Our 16-member extended family toured Rann of Kutch and Bhuj via Heshiv Mobility Tempo Traveller. Outstanding trip management, transparent pricing, and 24/7 support.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    active: true,
    displayOrder: 3
  }
];
