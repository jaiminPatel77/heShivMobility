import { BUSINESS_INFO } from './business-info';

describe('BUSINESS_INFO Single Source of Truth', () => {
  it('should define all required business fields correctly', () => {
    expect(BUSINESS_INFO.companyName).toBe('Heshiv Mobility');
    expect(BUSINESS_INFO.tagline).toBe('Moving People With Care');
    expect(BUSINESS_INFO.supportingText).toContain('Pilgrimage');
    expect(BUSINESS_INFO.phone).toBeDefined();
    expect(BUSINESS_INFO.whatsapp).toBeDefined();
    expect(BUSINESS_INFO.email).toBeDefined();
    expect(BUSINESS_INFO.address).toBeDefined();
    expect(BUSINESS_INFO.googleMapsUrl).toBeDefined();
    expect(BUSINESS_INFO.websiteUrl).toBeDefined();
  });

  it('should format WhatsApp URL using business info whatsapp number', () => {
    const rawNumber = BUSINESS_INFO.whatsapp;
    const formattedUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent('Hello Heshiv Mobility, I would like to enquire about a travel package.')}`;
    
    expect(formattedUrl).toContain('wa.me/');
    expect(formattedUrl).toContain(rawNumber);
  });

  it('should generate mailto link using business info email', () => {
    const mailtoUrl = `mailto:${BUSINESS_INFO.email}`;
    expect(mailtoUrl).toBe(`mailto:${BUSINESS_INFO.email}`);
  });
});
