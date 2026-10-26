import type { Product } from '../types/customer.ts';
import { PENDING_IMAGE } from './media.ts';

/**
 * Illustrative catalog for layout development.
 * Prices, ratings and review counts are mock values and must be replaced before launch.
 */
export const products: Product[] = [
  {
    id: 'p-top',
    name: 'Crochet Lace Women Top',
    slug: 'crochet-lace-women-top',
    description:
      'A light handmade crochet top with an open stitch and a soft finish. Sample product for the storefront layout.',
    image: '/images/woman-outfits.jpg',
    imageAlt: 'Handmade crochet tops in red, yellow and blue',
    imagePosition: 'center 22%',
    price: 3750,
    originalPrice: 4200,
    categoryId: 'middies',
    rating: 4.8,
    reviewCount: 12,
    label: 'New',
    featured: true,
    available: true,
  },
  {
    id: 'p-table',
    name: 'Handmade Crochet Table Cover',
    slug: 'handmade-crochet-table-cover',
    description:
      'A scalloped crochet lace table cover with floral openwork, made to dress a dining table. Sample product for the storefront layout.',
    image: '/images/tablecloth.jpg',
    imageAlt: 'Beige crochet lace table cover with a scalloped edge in warm light',
    imagePosition: '62% 48%',
    price: 5450,
    categoryId: 'table-covers',
    rating: 4.9,
    reviewCount: 8,
    label: 'Bestseller',
    featured: true,
    available: true,
    variants: [
      { id: 'table-4', name: '4 ft' },
      { id: 'table-6', name: '6 ft' },
    ],
  },
  {
    id: 'p-kids',
    name: 'Crochet Kids Dress',
    slug: 'crochet-kids-dress',
    description:
      "A sample record for a handmade kids' crochet dress. A studio photograph of this garment has not been added yet.",
    image: PENDING_IMAGE,
    imageAlt: "Photograph coming soon for a handmade kids' crochet dress",
    imagePending: true,
    price: 3150,
    categoryId: 'kids-dresses',
    rating: 4.8,
    reviewCount: 15,
    label: 'New',
    featured: true,
    available: true,
  },
  {
    id: 'p-fridge',
    name: 'Fridge Cover with Crochet Lace',
    slug: 'fridge-cover-with-crochet-lace',
    description:
      'A sample record for a crochet lace fridge cover. A studio photograph of this cover has not been added yet.',
    image: PENDING_IMAGE,
    imageAlt: 'Photograph coming soon for a crochet lace fridge cover',
    imagePending: true,
    price: 2350,
    categoryId: 'fridge-covers',
    rating: 4.7,
    reviewCount: 10,
    featured: true,
    available: true,
  },
  {
    id: 'p-shrug',
    name: 'Openwork Crochet Shrug',
    slug: 'openwork-crochet-shrug',
    description:
      'A sample shrug listing. The current photograph shows a finished openwork crochet outfit and should be replaced with a Vinayaka shrug.',
    image: '/images/woman-pink.jpg',
    imageAlt: 'Woman wearing a pastel handmade openwork crochet outfit',
    imagePosition: 'center 16%',
    price: 4650,
    categoryId: 'shrugs-ponchos',
    rating: 4.8,
    reviewCount: 9,
    featured: false,
    available: true,
  },
  {
    id: 'p-bag',
    name: 'Handmade Crochet Handbag',
    slug: 'handmade-crochet-handbag',
    description:
      'A cream crochet shoulder bag with a brown stitched edge and a small floral motif. Sample product for the storefront layout.',
    image: '/images/bag.jpg',
    imageAlt: 'Cream handmade crochet bag with a brown strap on a picnic blanket',
    imagePosition: '70% 78%',
    price: 2850,
    categoryId: 'modern-more',
    rating: 4.6,
    reviewCount: 11,
    featured: false,
    available: true,
  },
  {
    id: 'p-placemat',
    name: 'Handmade Crochet Placemat Set',
    slug: 'handmade-crochet-placemat-set',
    description:
      'Round crochet placemats with a scalloped border, shown on a dressed dining table. Sample product for the storefront layout.',
    image: '/images/table-setting.jpg',
    imageAlt: 'Gold and plum crochet placemats on a wooden dining table',
    imagePosition: 'center',
    price: 1950,
    categoryId: 'table-covers',
    rating: 4.8,
    reviewCount: 11,
    featured: false,
    available: true,
  },
  {
    id: 'p-throw',
    name: 'Crochet Ripple Throw',
    slug: 'crochet-ripple-throw',
    description:
      'A ripple-stitch crochet throw styled on a sofa. Sample product for the storefront layout, not a fitted sofa cover.',
    image: '/images/blanket.jpg',
    imageAlt: 'Multicolor crochet ripple blanket on a sofa with a basket and book',
    imagePosition: 'center 60%',
    price: 3200,
    categoryId: 'sofa-covers',
    rating: 4.7,
    reviewCount: 6,
    featured: false,
    available: true,
  },
  {
    id: 'p-cushion',
    name: 'Crochet Cushion Cover',
    slug: 'crochet-cushion-cover',
    description:
      'A bold granny-square cushion cover for a corner seat. Sample product for the storefront layout.',
    image: '/images/cushions.jpg',
    imageAlt: 'Handmade crochet cushions in teal, red and cream',
    imagePosition: 'center 45%',
    price: 1650,
    categoryId: 'interior-decor',
    rating: 4.6,
    reviewCount: 14,
    featured: false,
    available: true,
  },
  {
    id: 'p-doily',
    name: 'Crochet Lace Centerpiece',
    slug: 'crochet-lace-centerpiece',
    description:
      'A fine cream crochet lace piece for a side table or tray. Sample product for the storefront layout.',
    image: '/images/doily.jpg',
    imageAlt: 'Close view of cream crochet lace under a silver dish',
    imagePosition: 'center',
    price: 980,
    categoryId: 'table-covers',
    rating: 4.8,
    reviewCount: 5,
    featured: false,
    available: true,
  },
  {
    id: 'p-dress',
    name: 'Cream Crochet Lace Dress',
    slug: 'cream-crochet-lace-dress',
    description:
      'A floor-length cream crochet lace dress with an open stitch. Sample product for the storefront layout.',
    image: '/images/woman-boho.jpg',
    imageAlt: 'Woman wearing a cream crochet lace dress and holding a woven bag',
    imagePosition: 'center 12%',
    price: 6250,
    categoryId: 'womens-garments',
    rating: 4.9,
    reviewCount: 7,
    label: 'Bestseller',
    featured: false,
    available: true,
  },
];

/** Homepage order for Featured Products. */
export const featuredProductIds = ['p-top', 'p-table', 'p-kids', 'p-fridge'] as const;

/**
 * Manually curated popular picks.
 * Replace with rankings from real sales, views and add-to-cart data later.
 * These records are intentionally different from the featured set.
 */
export const trendingProductIds = ['p-shrug', 'p-bag', 'p-placemat', 'p-throw'] as const;

function byIds(ids: readonly string[]): Product[] {
  return ids.flatMap((id) => {
    const product = products.find((item) => item.id === id);
    return product ? [product] : [];
  });
}

export function getFeaturedProducts(): Product[] {
  return byIds(featuredProductIds);
}

export function getTrendingProducts(): Product[] {
  return byIds(trendingProductIds);
}

export function getProductBySlug(slug: string | undefined): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.categoryId === categoryId);
}
