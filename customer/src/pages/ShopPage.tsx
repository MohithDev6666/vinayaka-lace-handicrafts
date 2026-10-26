import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCategoryById, getCategoryBySlug } from '../data/categories.ts';
import { products } from '../data/products.ts';
import { ProductCard } from '../components/product/ProductCard.tsx';
import grid from '../components/product/productGrid.module.css';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import styles from './pages.module.css';

export function ShopPage() {
  const { categorySlug } = useParams();
  const [params] = useSearchParams();
  const query = (params.get('q') ?? '').trim();
  const category = getCategoryBySlug(categorySlug);
  const unknownCategory = Boolean(categorySlug) && !category;

  const filtered = useMemo(() => {
    const needle = query.toLowerCase();
    return products.filter((product) => {
      if (category && product.categoryId !== category.id) return false;
      if (!needle) return true;
      const categoryName = getCategoryById(product.categoryId)?.title ?? '';
      return `${product.name} ${product.description} ${categoryName}`.toLowerCase().includes(needle);
    });
  }, [category, query]);

  const title = unknownCategory ? 'Category not found' : (category?.title ?? (query ? 'Search results' : 'Shop'));
  usePageTitle(`${title} | Vinayaka`);

  return (
    <section className={`page-section ${styles.page}`}>
      <div className="page-container">
        <p className={styles.crumb}>
          <Link to="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <span>Shop</span>
        </p>
        <h1>{title}</h1>
        {unknownCategory ? (
          <p className={styles.lead}>That category is not in the catalog. Browse the full shop instead.</p>
        ) : (
          <p className={styles.lead}>
            {query ? `Showing matches for “${query}”. ` : ''}
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}. Prices and reviews here are
            sample values.
          </p>
        )}
        {filtered.length === 0 ? (
          <p className={styles.empty}>
            No products match this search yet. <Link to="/shop">View the full shop</Link>
          </p>
        ) : (
          <div className={grid.grid}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
