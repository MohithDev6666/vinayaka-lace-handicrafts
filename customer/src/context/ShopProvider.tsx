import { useMemo, useState, type ReactNode } from 'react';
import { ShopStateContext, type CartLine } from './shop-state.ts';

/**
 * Preview cart and wishlist. Stored only in React state for this session.
 * The opening cart line is sample data so the header badge is visible.
 */
const sampleCart: CartLine[] = [{ productId: 'p-table', quantity: 1 }];

export function ShopProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [cart, setCart] = useState<CartLine[]>(sampleCart);

  const cartCount = useMemo(
    () => cart.reduce((total, line) => total + line.quantity, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      wishlistIds,
      cart,
      cartCount,
      isWishlisted: (productId: string) => wishlistIds.includes(productId),
      toggleWishlist: (productId: string) => {
        setWishlistIds((current) =>
          current.includes(productId)
            ? current.filter((id) => id !== productId)
            : [...current, productId],
        );
      },
      addToCart: (productId: string) => {
        setCart((current) => {
          const existing = current.find((line) => line.productId === productId);
          if (!existing) return [...current, { productId, quantity: 1 }];
          return current.map((line) =>
            line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line,
          );
        });
      },
      setQuantity: (productId: string, quantity: number) => {
        setCart((current) => {
          if (quantity <= 0) return current.filter((line) => line.productId !== productId);
          return current.map((line) =>
            line.productId === productId ? { ...line, quantity } : line,
          );
        });
      },
      removeFromCart: (productId: string) => {
        setCart((current) => current.filter((line) => line.productId !== productId));
      },
    }),
    [wishlistIds, cart, cartCount],
  );

  return <ShopStateContext.Provider value={value}>{children}</ShopStateContext.Provider>;
}
