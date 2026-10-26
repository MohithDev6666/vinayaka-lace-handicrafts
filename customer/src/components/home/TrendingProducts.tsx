import { getTrendingProducts } from '../../data/products.ts';
import { ProductCard } from '../product/ProductCard.tsx';
import grid from '../product/productGrid.module.css';
import { SectionHeading } from './SectionHeading.tsx';
import styles from './TrendingProducts.module.css';

export function TrendingProducts() {
  const products = getTrendingProducts();

  return (
    <section className="page-section" aria-labelledby="trending-heading">
      <div className="page-container">
        <SectionHeading
          id="trending-heading"
          title="Trending Now"
          subtitle="Discover the designs everyone is looking for."
        />
        <p className={styles.note}>
          Popular picks chosen for this preview. Rankings will later use real sales, views and
          add-to-cart data.
        </p>
        <div className={grid.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
