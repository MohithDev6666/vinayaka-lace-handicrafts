import { StarIcon } from '../icons/Icons.tsx';
import styles from './RatingStars.module.css';

type RatingStarsProps = {
  rating: number;
  reviewCount?: number;
};

export function RatingStars({ rating, reviewCount }: RatingStarsProps) {
  const safe = Math.max(0, Math.min(5, rating));

  return (
    <p className={styles.row}>
      <span className={styles.stars} aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => {
          const fill = Math.max(0, Math.min(1, safe - index));
          return (
            <span className={styles.star} key={index}>
              <StarIcon className={styles.empty} />
              <span className={styles.fill} style={{ width: `${fill * 100}%` }}>
                <StarIcon />
              </span>
            </span>
          );
        })}
      </span>
      <span className="sr-only">{safe} out of 5 stars</span>
      {reviewCount != null ? <span className={styles.count}>({reviewCount})</span> : null}
    </p>
  );
}
