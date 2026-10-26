import type { SampleReview } from '../types/customer.ts';

/**
 * Placeholder testimonials for layout only.
 * Replace with genuine customer feedback before launch.
 * Do not present these as verified purchases.
 */
export const sampleReviews: SampleReview[] = [
  {
    id: 'sample-review-1',
    name: 'Sample Customer A',
    initials: 'SA',
    rating: 5,
    text: 'Sample review: the openwork on the table cover looks even, and the scalloped edge is the kind of finish I would hope for from handmade lace.',
    productName: 'Handmade Crochet Table Cover',
    sample: true,
  },
  {
    id: 'sample-review-2',
    name: 'Sample Customer B',
    initials: 'SB',
    rating: 5,
    text: 'Sample review: the crochet garment feels light, and the stitch along the sleeves looks carefully finished rather than rushed.',
    productName: 'Openwork Crochet Shrug',
    sample: true,
  },
  {
    id: 'sample-review-3',
    name: 'Sample Customer C',
    initials: 'SC',
    rating: 4,
    text: 'Sample review: packed as a gift, with the lace protected and the handmade detail still the first thing you notice when it is opened.',
    productName: 'Crochet Lace Centerpiece',
    sample: true,
  },
];
