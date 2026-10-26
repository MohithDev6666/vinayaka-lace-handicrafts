import { Link } from 'react-router-dom';
import { getProductById } from '../data/products.ts';
import { ProductCard } from '../components/product/ProductCard.tsx';
import grid from '../components/product/productGrid.module.css';
import { useShopState } from '../context/shop-state.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import styles from './pages.module.css';

export function WishlistPage() {
  const { wishlistIds } = useShopState();
  const items = wishlistIds.flatMap((id) => {
    const product = getProductById(id);
    return product ? [product] : [];
  });

  usePageTitle('Wishlist | Vinayaka');

  return (
    <section className={`page-section ${styles.page}`}>
      <div className="page-container">
        <h1>Wishlist</h1>
        <p className={styles.lead}>Saved in this browser session only. It clears when you refresh the page.</p>
        {items.length === 0 ? (
          <p className={styles.empty}>
            Your wishlist is empty. <Link to="/shop">Browse the shop</Link>
          </p>
        ) : (
          <div className={grid.grid}>
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
