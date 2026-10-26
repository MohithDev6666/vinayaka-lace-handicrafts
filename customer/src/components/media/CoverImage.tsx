import { useState } from 'react';
import { PENDING_IMAGE } from '../../data/media.ts';
import styles from './CoverImage.module.css';

type CoverImageProps = {
  src: string;
  alt: string;
  position?: string;
  pending?: boolean;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  showCaption?: boolean;
};

export function CoverImage({
  src,
  alt,
  position = 'center',
  pending = false,
  loading = 'lazy',
  fetchPriority = 'auto',
  showCaption = false,
}: CoverImageProps) {
  const [failed, setFailed] = useState(false);

  if (pending || failed) {
    return (
      <div className={styles.pending}>
        <img src={PENDING_IMAGE} alt="" width={120} height={120} />
        {showCaption ? <span>Photo coming soon</span> : <span className="sr-only">{alt}</span>}
      </div>
    );
  }

  return (
    <img
      className={styles.photo}
      data-cover=""
      src={src}
      alt={alt}
      width={800}
      height={600}
      loading={loading}
      fetchPriority={fetchPriority}
      style={{ objectPosition: position }}
      onError={() => setFailed(true)}
    />
  );
}
