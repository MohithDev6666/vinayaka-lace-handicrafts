import type { Category } from '../types/customer.ts';
import { PENDING_IMAGE } from './media.ts';

export const categories: Category[] = [
  {
    id: 'womens-garments',
    title: "Women's Garments",
    slug: 'womens-garments',
    order: 1,
    image: '/images/woman-boho.jpg',
    imageAlt: 'Woman wearing a cream handmade crochet lace dress',
    imagePosition: 'center 15%',
  },
  {
    id: 'interior-decor',
    title: 'Interior Decor',
    slug: 'interior-decor',
    order: 2,
    image: '/images/cushions.jpg',
    imageAlt: 'Colorful handmade crochet cushions beside a green window',
    imagePosition: 'center 40%',
  },
  {
    id: 'sofa-covers',
    title: 'Sofa Covers',
    slug: 'sofa-covers',
    order: 3,
    image: '/images/blanket.jpg',
    imageAlt: 'Crochet ripple blanket styled on a sofa',
    imagePosition: 'center 55%',
  },
  {
    id: 'table-covers',
    title: 'Table Covers',
    slug: 'table-covers',
    order: 4,
    image: '/images/doily.jpg',
    imageAlt: 'Cream crochet lace with a silver dish on a wooden table',
    imagePosition: 'center',
  },
  {
    id: 'fridge-covers',
    title: 'Fridge Covers',
    slug: 'fridge-covers',
    order: 5,
    image: PENDING_IMAGE,
    imageAlt: 'Photograph coming soon for crochet fridge covers',
    imagePending: true,
  },
  {
    id: 'kids-dresses',
    title: 'Kids Dresses',
    slug: 'kids-dresses',
    order: 6,
    image: PENDING_IMAGE,
    imageAlt: "Photograph coming soon for kids' crochet dresses",
    imagePending: true,
  },
  {
    id: 'middies',
    title: 'Middies',
    slug: 'middies',
    order: 7,
    image: '/images/woman-outfits.jpg',
    imageAlt: 'Woman holding handmade crochet tops and an open-knit shirt',
    imagePosition: 'center 20%',
  },
  {
    id: 'shrugs-ponchos',
    title: 'Shrugs & Ponchos',
    slug: 'shrugs-ponchos',
    order: 8,
    image: '/images/woman-pink.jpg',
    imageAlt: 'Woman wearing a handmade openwork crochet outfit',
    imagePosition: 'center 18%',
  },
  {
    id: 'modern-more',
    title: 'Modern & More',
    slug: 'modern-more',
    order: 9,
    image: '/images/table-setting.jpg',
    imageAlt: 'Dining table set with handmade crochet placemats',
    imagePosition: 'center',
  },
];

export function getCategoryBySlug(slug: string | undefined): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}
