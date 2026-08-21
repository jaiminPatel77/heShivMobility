import { Faq } from '../core/models/faq.model';

export const MOCK_FAQS: Faq[] = [
  {
    faqId: 'faq-001',
    question: 'How do I book a customized tour package with Heshiv Mobility?',
    answer: 'You can submit an online enquiry form on our website, call our team directly at +91 97263 33195, or send us a WhatsApp message. Our travel experts will craft a personalized itinerary based on your preferred dates, group size, and budget.',
    category: 'Booking & Customization',
    active: true,
    displayOrder: 1
  },
  {
    faqId: 'faq-002',
    question: 'Are your tours suitable for senior citizens and elderly pilgrims?',
    answer: 'Yes, absolutely! Caring for senior citizens is at the core of our brand motto "Moving People With Care". We provide comfortable AC vehicles, experienced courteous drivers, wheelchair assistance arrangements at major temples, and slow-paced customized itineraries.',
    category: 'Senior & Family Care',
    active: true,
    displayOrder: 2
  },
  {
    faqId: 'faq-003',
    question: 'What types of vehicles do you provide for group & family travel?',
    answer: 'We maintain a premium fleet including AC Sedans (Dzire/Etios), AC SUVs (Innova Crysta), and 13 to 26-seater AC Tempo Travellers for larger family groups.',
    category: 'Vehicles & Travel',
    active: true,
    displayOrder: 3
  },
  {
    faqId: 'faq-004',
    question: 'What is included in the package cost?',
    answer: 'Our standard packages include private AC vehicle transfers with all toll, parking, and driver allowances, accommodation in handpicked clean hotels/resorts with breakfast, and 24/7 travel helpline support.',
    category: 'Pricing & Inclusions',
    active: true,
    displayOrder: 4
  },
  {
    faqId: 'faq-005',
    question: 'What are the payment and cancellation terms?',
    answer: 'We require a 25% advance deposit to confirm bookings, with the remaining balance payable upon arrival. Free cancellation is available up to 7 days prior to travel date.',
    category: 'Policies',
    active: true,
    displayOrder: 5
  }
];
