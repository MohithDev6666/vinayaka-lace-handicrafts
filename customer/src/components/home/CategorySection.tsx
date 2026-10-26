import { Link } from 'react-router-dom';
import { categories } from '../../data/categories.ts';
import { CoverImage } from '../media/CoverImage.tsx';
import { SectionHeading } from './SectionHeading.tsx';
import styles from './CategorySection.module.css';

export function CategorySection() {
  return (
    <section className="page-section" aria-labelledby="category-heading">
      <div className="page-container">
        <SectionHeading
          id="category-heading"
          title="Shop by Category"
          subtitle="Explore our wide range of handmade crochet lace products"
        />
        <div className={styles.scroller}>
          <ul className={styles.row}>
            {categories.map((category) => (
              <li key={category.id} className={styles.item}>
                <Link
                  className={styles.link}
                  to={`/shop/${category.slug}`}
                  aria-label={
                    category.imagePending
                      ? `${category.title}. Photograph coming soon`
                      : category.title
                  }
                >
                  <span className={styles.circle}>
                    <CoverImage
                      src={category.image}
                      alt={category.imageAlt}
                      position={category.imagePosition}
                      pending={category.imagePending}
                      loading="eager"
                    />
                  </span>
                  <span className={styles.label}>{category.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
