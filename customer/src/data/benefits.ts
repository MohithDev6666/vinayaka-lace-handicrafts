import type { TrustBenefit } from '../types/customer.ts';

/**
 * Illustrative service notes for the layout.
 * Confirm the shipping threshold and payment claims against real business policies before launch.
 */
export const trustBenefits: TrustBenefit[] = [
  {
    id: 'shipping',
    title: 'Free Shipping',
    description: 'On orders over ₹4,000',
    icon: 'truck',
  },
  {
    id: 'payments',
    title: 'Secure Payments',
    description: 'Protected checkout',
    icon: 'shield',
  },
  {
    id: 'handmade',
    title: 'Purely Handmade',
    description: 'Crafted with love',
    icon: 'heart',
  },
  {
    id: 'support',
    title: 'Customer Support',
    description: "We're here to help",
    icon: 'headset',
  },
];
