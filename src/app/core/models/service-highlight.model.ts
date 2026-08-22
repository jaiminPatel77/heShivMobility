/**
 * Service Highlight model for the Home page trust-highlights section.
 * Provides a typed, data-driven approach to rendering branded service cards.
 */
export interface ServiceHighlight {
  title: string;
  description: string;
  icon: string;
}

/**
 * Central icon mapping — maps icon keys to their asset paths.
 * All icons are served from the public/images/icons directory.
 */
export const SERVICE_ICON_MAP: Record<string, string> = {
  'transportation': 'images/icons/transportation.svg',
  'tour-travel': 'images/icons/tour-travel.svg',
  'mobility-solutions': 'images/icons/mobility-solutions.svg',
  'on-time': 'images/icons/on-time.svg',
  'comfort-with-care': 'images/icons/comfort-with-care.svg',
};

/**
 * The four service highlight cards displayed on the Home page.
 * Card-to-icon mapping follows the HeShiv Mobility brand reference:
 *
 *  - Comfortable Travel    → Transportation / Bus icon
 *  - Family Friendly       → Tour & Travel / Location icon
 *  - Reliable Service      → Mobility Solutions / Shield+Check icon
 *  - Customized Trips      → On Time / Clock icon
 */
export const SERVICE_HIGHLIGHTS: ServiceHighlight[] = [
  {
    title: 'Comfortable Travel',
    description:
      'Squeaky clean, fully sanitized AC vehicles with polite, experienced local drivers.',
    icon: 'transportation',
  },
  {
    title: 'Family Friendly',
    description:
      'Tailored schedules, patient travel pace, and elder assistance at all temple spots.',
    icon: 'tour-travel',
  },
  {
    title: 'Reliable Service',
    description:
      'Punctual pickups, transparent pricing, and 24/7 dedicated travel support helpline.',
    icon: 'mobility-solutions',
  },
  {
    title: 'Customized Trips',
    description:
      'Flexible itineraries tailored precisely to your family size, budget, and dates.',
    icon: 'on-time',
  },
];
