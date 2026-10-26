import { Link } from 'react-router-dom';
import { collections } from '../../data/collections.ts';
import { FlowerMark } from '../icons/Icons.tsx';
import { SectionHeading } from './SectionHeading.tsx';
import styles from './CollectionsSection.module.css';

type CollectionsSectionProps = {
  titleAs?: 'h1' | 'h2';
};

export function CollectionsSection({ titleAs = 'h2' }: CollectionsSectionProps) {
  return (
    <section className="page-section" aria-labelledby="collections-heading">
      <div className="page-container">
        <SectionHeading
          id="collections-heading"
          title="Shop Our Collections"
          subtitle="Curated for every corner of your life"
          titleAs={titleAs}
        />
        <div className={styles.grid}>
          {collections.map((collection) => (
            <Link key={collection.id} className={styles.card} to={`/collections/${collection.slug}`}>
              {collection.imagePending ? (
                <span className={styles.pending} aria-hidden="true">
                  <FlowerMark width={64} height={64} />
                </span>
              ) : (
                <img
                  data-cover=""
                  src={collection.image}
                  alt=""
                  width={900}
                  height={700}
                  loading="lazy"
                  style={{ objectPosition: collection.imagePosition ?? 'center' }}
                />
              )}
              <span className={styles.shade} />
              <span className={styles.copy}>
                <span className={styles.title}>{collection.title}</span>
                <span className={styles.description}>{collection.description}</span>
                {collection.imagePending ? (
                  <span className={styles.pendingNote}>Photography coming soon</span>
                ) : null}
                <span className={styles.cta}>{collection.ctaLabel} →</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
