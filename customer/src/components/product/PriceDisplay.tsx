import { formatInr } from '../../utils/formatInr.ts';
import styles from './PriceDisplay.module.css';

type PriceDisplayProps = {
  price: number;
  originalPrice?: number;
};

export function PriceDisplay({ price, originalPrice }: PriceDisplayProps) {
  const hasDiscount = originalPrice != null && originalPrice > price;
  const discount = hasDiscount ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <p className={styles.price}>
      <span className={styles.current}>{formatInr(price)}</span>
      {hasDiscount ? (
        <>
          <span className={styles.original}>{formatInr(originalPrice)}</span>
          <span className={styles.discount}>{discount}% off</span>
        </>
      ) : null}
    </p>
  );
}
