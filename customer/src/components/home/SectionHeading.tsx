import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

type SectionHeadingProps = {
  id: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  titleAs?: 'h1' | 'h2';
};

export function SectionHeading({ id, title, subtitle, action, titleAs = 'h2' }: SectionHeadingProps) {
  const TitleTag = titleAs;
  return (
    <div className={styles.row}>
      <div className={styles.copy}>
        <TitleTag id={id}>{title}</TitleTag>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
