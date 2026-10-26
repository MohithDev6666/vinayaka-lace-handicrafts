import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../../data/products.ts';
import { ProductCard } from '../product/ProductCard.tsx';
import grid from '../product/productGrid.module.css';
import { SectionHeading } from './SectionHeading.tsx';
import styles from './FeaturedProducts.module.css';

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="page-section" aria-labelledby="featured-heading">
      <div className="page-container">
        <SectionHeading
          id="featured-heading"
          title="Featured Products"
          subtitle="Handpicked favorites, crafted with love"
          action={
            <Link className={styles.viewAll} to="/shop">
              View All →
            </Link>
          }
        />
        <div className={grid.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
