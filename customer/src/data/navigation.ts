import type { NavItem } from '../types/customer.ts';

export const primaryNav: NavItem[] = [
  { label: 'Home', to: '/', end: true },
  { label: 'Shop', to: '/shop' },
  { label: 'Collections', to: '/collections' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const customerCareNav: NavItem[] = [
  { label: 'Shipping Information', to: '/shipping' },
  { label: 'Returns & Refunds', to: '/returns' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact Support', to: '/support' },
];

export const legalNav: NavItem[] = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

export const infoPages: Record<string, { title: string; paragraphs: string[] }> = {
  about: {
    title: 'About Us',
    paragraphs: [
      'Vinayaka New Lace Handicrafts is a handmade crochet lace workshop with 30 years of experience.',
      'The pieces are purely handmade. This page is a short introduction for the storefront layout. A fuller studio story, with confirmed workshop details, will be written before launch.',
    ],
  },
  contact: {
    title: 'Contact',
    paragraphs: [
      'A phone number, email address and workshop address will be published here once they are confirmed.',
      'Social profiles are not connected yet. Use this page as the placeholder until those details are ready.',
    ],
  },
  shipping: {
    title: 'Shipping Information',
    paragraphs: [
      'Shipping notes on the homepage, including free shipping over ₹4,000, are illustrative.',
      'Replace this page with the confirmed delivery areas, timelines and charges before launch.',
    ],
  },
  returns: {
    title: 'Returns & Refunds',
    paragraphs: [
      'Returns and refund rules have not been published yet.',
      'This placeholder keeps the footer link from opening a broken page.',
    ],
  },
  faqs: {
    title: 'FAQs',
    paragraphs: [
      'Questions about sizing, care of crochet lace and made-to-order timing will be answered here.',
      'No FAQ entries have been confirmed for launch yet.',
    ],
  },
  support: {
    title: 'Contact Support',
    paragraphs: [
      'Customer support is not connected to a mailbox or phone line in this preview.',
      'The homepage line “We’re here to help” is a layout sample until support hours are confirmed.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    paragraphs: [
      'A privacy policy has not been published yet.',
      'The newsletter form on the homepage only checks the email address in the browser. It does not store addresses.',
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    paragraphs: [
      'Terms of sale have not been published yet.',
      'Prices, reviews and service claims in this preview are sample content for the layout.',
    ],
  },
  account: {
    title: 'Account',
    paragraphs: [
      'Customer sign-in is not connected in this preview.',
      'Wishlist and cart items stay in this browser session only and are cleared when the page is refreshed.',
    ],
  },
  'not-found': {
    title: 'Page not found',
    paragraphs: [
      'That page is not part of the storefront yet.',
      'Use the menu to return to the shop or the homepage.',
    ],
  },
};
