import { Link } from 'react-router-dom';
import { infoPages } from '../data/navigation.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import styles from './pages.module.css';

type InfoPageProps = {
  pageKey: string;
};

export function InfoPage({ pageKey }: InfoPageProps) {
  const page = infoPages[pageKey] ?? infoPages['not-found'];
  usePageTitle(`${page.title} | Vinayaka`);

  return (
    <section className={`page-section ${styles.page}`}>
      <div className="page-container">
        <h1>{page.title}</h1>
        {page.paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.lead}>
            {paragraph}
          </p>
        ))}
        {pageKey === 'not-found' ? <Link to="/">Back to home</Link> : null}
      </div>
    </section>
  );
}
