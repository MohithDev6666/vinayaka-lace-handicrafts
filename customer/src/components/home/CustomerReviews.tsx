import { sampleReviews } from '../../data/reviews.ts';
import { RatingStars } from '../product/RatingStars.tsx';
import { SectionHeading } from './SectionHeading.tsx';
import styles from './CustomerReviews.module.css';

export function CustomerReviews() {
  return (
    <section className="page-section" aria-labelledby="reviews-heading">
      <div className="page-container">
        <SectionHeading
          id="reviews-heading"
          title="Loved by Our Customers"
          subtitle="Every stitch tells a story of care and craftsmanship."
        />
        <p className={styles.notice}>
          Sample stories for this layout preview. These are not verified customer reviews and will be
          replaced with genuine feedback before launch.
        </p>
        <div className={styles.grid}>
          {sampleReviews.map((review) => (
            <article key={review.id} className={styles.card}>
              <div className={styles.person}>
                <span className={styles.avatar} aria-hidden="true">
                  {review.initials}
                </span>
                <div>
                  <h3>{review.name}</h3>
                  <p className={styles.sample}>Sample review</p>
                </div>
              </div>
              <RatingStars rating={review.rating} />
              <blockquote>{review.text}</blockquote>
              <p className={styles.product}>{review.productName}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
