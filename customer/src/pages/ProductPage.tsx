import { Link, useParams } from 'react-router-dom';
import { getCategoryById } from '../data/categories.ts';
import { getProductBySlug } from '../data/products.ts';
import { CoverImage } from '../components/media/CoverImage.tsx';
import { PriceDisplay } from '../components/product/PriceDisplay.tsx';
import { RatingStars } from '../components/product/RatingStars.tsx';
import { useShopState } from '../context/shop-state.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import styles from './pages.module.css';

export function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { isWishlisted, toggleWishlist, addToCart } = useShopState();
  const category = product ? getCategoryById(product.categoryId) : undefined;

  usePageTitle(product ? `${product.name} | Vinayaka` : 'Product | Vinayaka');

  if (!product) {
    return (
      <section className={`page-section ${styles.page}`}>
        <div className="page-container">
          <h1>Product not found</h1>
          <p className={styles.lead}>
            That piece is not in the sample catalog. <Link to="/shop">Return to the shop</Link>
          </p>
        </div>
      </section>
    );
  }

  const wished = isWishlisted(product.id);

  return (
    <section className={`page-section ${styles.page}`}>
      <div className="page-container">
        <p className={styles.crumb}>
          <Link to="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/shop">Shop</Link>
          <span aria-hidden="true"> / </span>
          <span>{product.name}</span>
        </p>
        <div className={styles.product}>
          <div className={styles.photo}>
            <CoverImage
              src={product.image}
              alt={product.imageAlt}
              position={product.imagePosition}
              pending={product.imagePending}
              showCaption={product.imagePending}
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className={styles.info}>
            {category ? (
              <Link to={`/shop/${category.slug}`}>{category.title}</Link>
            ) : null}
            <h1>{product.name}</h1>
            <PriceDisplay price={product.price} originalPrice={product.originalPrice} />
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
            <p>{product.description}</p>
            {product.imagePending ? (
              <p className={styles.note}>A studio photograph for this product has not been added yet.</p>
            ) : null}
            {product.variants && product.variants.length > 0 ? (
              <p className={styles.note}>
                Sample sizes for layout only: {product.variants.map((variant) => variant.name).join(', ')}.
                Choosing a size is not connected yet.
              </p>
            ) : null}
            <div className={styles.actions}>
              <button type="button" className={styles.primary} onClick={() => addToCart(product.id)}>
                Add to cart
              </button>
              <button
                type="button"
                className={styles.secondary}
                aria-pressed={wished}
                onClick={() => toggleWishlist(product.id)}
              >
                {wished ? 'Remove from wishlist' : 'Add to wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
