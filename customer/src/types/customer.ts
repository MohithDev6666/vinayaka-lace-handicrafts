export type ProductLabel = 'New' | 'Bestseller';

export interface ProductVariant {
  id: string;
  name: string;
}

/** Static catalog record. Shaped so a future API response can replace it. */
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the photograph. */
  imagePosition?: string;
  /** True when a real product photograph is not in the project yet. */
  imagePending?: boolean;
  price: number;
  originalPrice?: number;
  categoryId: string;
  rating: number;
  reviewCount: number;
  label?: ProductLabel;
  featured: boolean;
  available: boolean;
  variants?: ProductVariant[];
}

export interface Category {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  imagePending?: boolean;
  slug: string;
  order: number;
}

export interface CarouselSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  highlight: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
}

export interface CollectionCard {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  slug: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  imagePending?: boolean;
  /** Category ids whose products belong to this collection. */
  categoryIds: string[];
  order: number;
}

/** Development-only sample. Not a verified customer review. */
export interface SampleReview {
  id: string;
  name: string;
  initials: string;
  rating: number;
  text: string;
  productName: string;
  sample: true;
}

export type BenefitIcon = 'truck' | 'shield' | 'heart' | 'headset';

export interface TrustBenefit {
  id: string;
  title: string;
  description: string;
  icon: BenefitIcon;
}

export interface NavItem {
  label: string;
  to: string;
  end?: boolean;
}
