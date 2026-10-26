import { createContext, useContext } from 'react';

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface ShopStateValue {
  wishlistIds: string[];
  cart: CartLine[];
  cartCount: number;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  addToCart: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

export const ShopStateContext = createContext<ShopStateValue | null>(null);

export function useShopState(): ShopStateValue {
  const value = useContext(ShopStateContext);
  if (!value) {
    throw new Error('useShopState must be used within ShopProvider');
  }
  return value;
}
