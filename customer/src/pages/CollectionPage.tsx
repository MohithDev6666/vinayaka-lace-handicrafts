import { Link, useParams } from 'react-router-dom';
import { getCollectionBySlug } from '../data/collections.ts';
import { products } from '../data/products.ts';
import { ProductCard } from '../components/product/ProductCard.tsx';
import grid from '../components/product/productGrid.module.css';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import styles from './pages.module.css';

export function CollectionPage() {
  const { slug } = useParams();
  const collection = getCollectionBySlug(slug);
  const items = collection
    ? products.filter((product) => collection.categoryIds.includes(product.categoryId))
    : [];

  usePageTitle(collection ? `${collection.title} | Vinayaka` : 'Collection | Vinayaka');

  if (!collection) {
    return (
      <section className={`page-section ${styles.page}`}>
        <div className="page-container">
          <h1>Collection not found</h1>
          <p className={styles.lead}>
            <Link to="/collections">Browse collections</Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`page-section ${styles.page}`}>
      <div className="page-container">
        <p className={styles.crumb}>
          <Link to="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/collections">Collections</Link>
          <span aria-hidden="true"> / </span>
          <span>{collection.title}</span>
        </p>
        <h1>{collection.title}</h1>
        <p className={styles.lead}>{collection.description}</p>
        {items.length === 0 ? (
          <p className={styles.empty}>No sample products are filed under this collection yet.</p>
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
