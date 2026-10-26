import type { CarouselSlide } from '../types/customer.ts';

/** Static hero slides. A future admin API can return this same shape. */
export const carouselSlides: CarouselSlide[] = [
  {
    id: 'slide-table',
    eyebrow: 'Handmade Crochet Lace',
    title: 'Timeless Elegance in Every Stitch',
    description:
      'Discover beautifully crafted crochet lace products for your home, wardrobe and special moments.',
    ctaLabel: 'Shop Now',
    ctaHref: '/shop/table-covers',
    highlight: '30 Years of Handmade Craftsmanship',
    image: '/images/tablecloth.jpg',
    imageAlt: 'Handmade crochet lace table cover in a warm interior',
    imagePosition: '64% 42%',
  },
  {
    id: 'slide-wear',
    eyebrow: 'Handmade Crochet Lace',
    title: 'Crochet Made to Be Worn',
    description:
      'Airy handmade garments with the softness and openwork of traditional lace, shaped for modern dressing.',
    ctaLabel: 'Shop Now',
    ctaHref: '/collections/womens-garments',
    highlight: '30 Years of Handmade Craftsmanship',
    image: '/images/woman-pink.jpg',
    imageAlt: 'Woman wearing a handmade openwork crochet outfit',
    imagePosition: 'center 15%',
  },
  {
    id: 'slide-home',
    eyebrow: 'Handmade Crochet Lace',
    title: 'Warmth for the Table',
    description:
      'Lace dressed for coffee, conversation and the quiet rituals of home.',
    ctaLabel: 'Shop Now',
    ctaHref: '/collections/home-interior',
    highlight: '30 Years of Handmade Craftsmanship',
    image: '/images/coffee-cloth.jpg',
    imageAlt: 'Coffee cup on a white crochet lace tablecloth',
    imagePosition: 'center 42%',
  },
  {
    id: 'slide-lace',
    eyebrow: 'Handmade Crochet Lace',
    title: 'Delicate Patterns, Made by Hand',
    description:
      'Fine openwork for gifts, side tables and the details that finish a room. A kids’ dress photograph will be added when it is available.',
    ctaLabel: 'Shop Now',
    ctaHref: '/shop',
    highlight: 'Purely Handmade Products',
    image: '/images/lace-detail.jpg',
    imageAlt: 'White crochet lace medallion against dark wood',
    imagePosition: 'center',
  },
];
