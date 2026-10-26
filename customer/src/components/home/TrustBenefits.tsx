import { trustBenefits } from '../../data/benefits.ts';
import type { BenefitIcon } from '../../types/customer.ts';
import { HeadsetIcon, HeartIcon, ShieldIcon, TruckIcon } from '../icons/Icons.tsx';
import styles from './TrustBenefits.module.css';

const icons: Record<BenefitIcon, typeof TruckIcon> = {
  truck: TruckIcon,
  shield: ShieldIcon,
  heart: HeartIcon,
  headset: HeadsetIcon,
};

export function TrustBenefits() {
  return (
    <section className={styles.band} aria-label="Shopping benefits">
      <ul className={`page-container ${styles.list}`}>
        {trustBenefits.map((benefit) => {
          const Icon = icons[benefit.icon];
          return (
            <li key={benefit.id} className={styles.item}>
              <span className={styles.icon}>
                <Icon />
              </span>
              <span>
                <span className={styles.title}>{benefit.title}</span>
                <span className={styles.description}>{benefit.description}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
