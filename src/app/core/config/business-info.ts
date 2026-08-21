export const BUSINESS_INFO = {
  companyName: 'Heshiv Mobility',
  tagline: 'Moving People With Care',
  supportingText: 'Pilgrimage • Family Tours • Group Tours • Spiritual Journeys',

  phone: '+91 97263 33195',
  whatsapp: '919726333195',
  email: 'heshiv05@gmail.com',

  address: 'FF-28 Kanha Heights, Somatalav - Statue of unity road, Vadodara 390025, Gujarat, India',
  businessHours: 'Mon - Sun: 10:30 AM - 7:30 PM',

  googleMapsUrl: 'https://maps.google.com/?q=Ahmedabad+Gujarat+Heshiv+Mobility',

  instagram: 'https://www.instagram.com/heshivmobility/',
  facebook: 'https://www.facebook.com/profile.php?id=61593078996813',
  youtube: 'https://www.youtube.com/@heshivmobility',

  logoPath: 'assets/images/logo.svg',
  faviconPath: 'public/favicon.ico',

  websiteUrl: 'https://heshivmobility.com'
} as const;

export type BusinessInfo = typeof BUSINESS_INFO;
