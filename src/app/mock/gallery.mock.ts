import { GalleryItem } from '../core/models/gallery.model';

export const MOCK_GALLERY: GalleryItem[] = [
  {
    galleryId: 'gal-001',
    title: 'Somnath Temple At Twilight',
    description: 'Breathtaking evening illuminated view of Somnath Jyotirlinga on the ocean shoreline.',
    imageUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80',
    altText: 'Somnath Temple illuminated at night by the sea',
    category: 'Pilgrimage',
    active: true,
    displayOrder: 1
  },
  {
    galleryId: 'gal-002',
    title: 'Dwarkadhish Temple Flag',
    description: 'Sacred 52-yard flag fluttering over Dwarkadhish Jagat Mandir.',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
    altText: 'Dwarkadhish Temple tower with sacred flag',
    category: 'Pilgrimage',
    active: true,
    displayOrder: 2
  },
  {
    galleryId: 'gal-003',
    title: 'Statue of Unity Panoramic View',
    description: 'World’s tallest statue set against the Narmada River backdrop.',
    imageUrl: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1000&q=80',
    altText: 'Statue of Unity Kevadia Gujarat',
    category: 'Sightseeing',
    active: true,
    displayOrder: 3
  },
  {
    galleryId: 'gal-004',
    title: 'White Desert of Kutch at Sunset',
    description: 'Endless white salt desert glowing under golden sunset skies.',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    altText: 'Sunset over White Rann of Kutch',
    category: 'Landscape',
    active: true,
    displayOrder: 4
  },
  {
    galleryId: 'gal-005',
    title: 'Asiatic Lion at Gir Forest',
    description: 'Majestic Asiatic Lion resting in Gir National Park habitat.',
    imageUrl: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80',
    altText: 'Asiatic Lion in Gir National Park',
    category: 'Wildlife',
    active: true,
    displayOrder: 5
  },
  {
    galleryId: 'gal-006',
    title: 'Comfortable Luxury Tour Coach',
    description: 'Clean, well-maintained AC vehicle provided by Heshiv Mobility.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    altText: 'Heshiv Mobility travel vehicle interior',
    category: 'Mobility',
    active: true,
    displayOrder: 6
  }
];
