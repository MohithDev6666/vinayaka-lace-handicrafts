import { Link } from 'react-router-dom';
import { getProductById } from '../data/products.ts';
import { CoverImage } from '../components/media/CoverImage.tsx';
import { PriceDisplay } from '../components/product/PriceDisplay.tsx';
import { useShopState } from '../context/shop-state.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import { formatInr } from '../utils/formatInr.ts';
import styles from './pages.module.css';

export function CartPage() {
  const { cart, setQuantity, removeFromCart } = useShopState();
  const lines = cart.flatMap((line) => {
    const product = getProductById(line.productId);
    return product ? [{ line, product }] : [];
  });
  const subtotal = lines.reduce((total, item) => total + item.product.price * item.line.quantity, 0);

  usePageTitle('Cart | Vinayaka');

  return (
    <section className={`page-section ${styles.page}`}>
      <div className="page-container">
        <h1>Cart</h1>
        <p className={styles.lead}>
          This is a preview cart stored in this browser session only. Checkout is not connected. The
          opening line is sample data so the header count is visible.
        </p>
        {lines.length === 0 ? (
          <p className={styles.empty}>
            Your cart is empty. <Link to="/shop">Browse the shop</Link>
          </p>
        ) : (
          <div className={styles.lines}>
            {lines.map(({ line, product }) => (
              <article key={product.id} className={styles.line}>
                <div className={styles.thumb}>
                  <CoverImage
                    src={product.image}
                    alt=""
                    position={product.imagePosition}
                    pending={product.imagePending}
                  />
                </div>
                <div>
                  <h2>
                    <Link to={`/product/${product.slug}`}>{product.name}</Link>
                  </h2>
                  <PriceDisplay price={product.price} originalPrice={product.originalPrice} />
                  <div className={styles.qty}>
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${product.name}`}
                      onClick={() => setQuantity(product.id, line.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{line.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${product.name}`}
                      onClick={() => setQuantity(product.id, line.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button type="button" className={styles.remove} onClick={() => removeFromCart(product.id)}>
                    Remove
                  </button>
                </div>
                <p>{formatInr(product.price * line.quantity)}</p>
              </article>
            ))}
            <p className={styles.subtotal}>Subtotal {formatInr(subtotal)}</p>
          </div>
        )}
      </div>
    </section>
  );
}
