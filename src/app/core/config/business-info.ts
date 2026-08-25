export const BUSINESS_INFO = {
  companyName: 'Heshiv Mobility',
  tagline: 'Moving People With Care',
  tagBaseLine: 'YourRide OurCare',
  supportingText: 'Pilgrimage • Family Tours • Group Tours • Spiritual Journeys',

  phone: '+91 97263 33195',
  whatsapp: '919726333195',
  email: 'info@heshivmobility.com',

  address: 'FF-28 Kanha Heights, Somatalav - Statue of unity road, Vadodara 390025, Gujarat, India',
  businessHours: 'Mon - Sun: 10:30 AM - 7:30 PM',

  googleMapsUrl: 'https://www.google.com/maps/place/22%C2%B016\'39.7%22N+73%C2%B014\'06.3%22E/@22.2776896,73.2350752,17z',

  instagram: 'https://www.instagram.com/heshivmobility/',
  facebook: 'https://www.facebook.com/profile.php?id=61593078996813',
  youtube: 'https://www.youtube.com/@heshivmobility',

  logoPath: 'images/logo.png',
  faviconPath: 'public/favicon.ico',

  websiteUrl: 'https://heshivmobility.com'
} as const;

export type BusinessInfo = typeof BUSINESS_INFO;
