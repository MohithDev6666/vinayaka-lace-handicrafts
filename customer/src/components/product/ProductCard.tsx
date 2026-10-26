import { useEffect, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/customer.ts';
import { useShopState } from '../../context/shop-state.ts';
import { CoverImage } from '../media/CoverImage.tsx';
import { CartIcon, HeartIcon } from '../icons/Icons.tsx';
import { PriceDisplay } from './PriceDisplay.tsx';
import { RatingStars } from './RatingStars.tsx';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { isWishlisted, toggleWishlist, addToCart } = useShopState();
  const wished = isWishlisted(product.id);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!note) return;
    const timer = window.setTimeout(() => setNote(''), 1600);
    return () => window.clearTimeout(timer);
  }, [note]);

  function stop(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <article className={styles.card}>
      <Link className={styles.main} to={`/product/${product.slug}`}>
        <div className={styles.media}>
          <CoverImage
            src={product.image}
            alt={product.imageAlt}
            position={product.imagePosition}
            pending={product.imagePending}
            showCaption={product.imagePending}
          />
          {product.label ? <span className={styles.label}>{product.label}</span> : null}
        </div>
        <div className={styles.body}>
          <h3>{product.name}</h3>
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} />
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        </div>
      </Link>
      <button
        type="button"
        className={wished ? `${styles.wish} ${styles.wishOn}` : styles.wish}
        aria-pressed={wished}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        onClick={(event) => {
          stop(event);
          toggleWishlist(product.id);
        }}
      >
        <HeartIcon filled={wished} />
      </button>
      <button
        type="button"
        className={styles.cart}
        aria-label={`Add ${product.name} to cart`}
        onClick={(event) => {
          stop(event);
          addToCart(product.id);
          setNote(`${product.name} added to cart`);
        }}
      >
        <CartIcon />
      </button>
      <span className="sr-only" aria-live="polite">
        {note}
      </span>
    </article>
  );
}
