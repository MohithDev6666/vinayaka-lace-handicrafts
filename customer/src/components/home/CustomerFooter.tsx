import { Link } from 'react-router-dom';
import { brand } from '../../data/brand.ts';
import { customerCareNav, legalNav, primaryNav } from '../../data/navigation.ts';
import { FlowerMark } from '../icons/Icons.tsx';
import styles from './CustomerFooter.module.css';

const socialNames = ['Instagram', 'Facebook', 'Pinterest', 'YouTube'];

export function CustomerFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`page-container ${styles.grid}`}>
        <div>
          <Link to="/" className={styles.brand}>
            <FlowerMark width={36} height={36} />
            <span>
              <span className={styles.name}>{brand.name}</span>
              <span className={styles.subtitle}>{brand.subtitle}</span>
              <span className={styles.tagline}>{brand.tagline}</span>
            </span>
          </Link>
          <p className={styles.experience}>30 Years of Experience</p>
        </div>

        <nav aria-label="Quick links">
          <h2>Quick links</h2>
          <ul>
            {primaryNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Customer care">
          <h2>Customer care</h2>
          <ul>
            {customerCareNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2>Social</h2>
          <ul>
            {socialNames.map((name) => (
              <li key={name}>
                <Link to="/contact">{name}</Link>
              </li>
            ))}
          </ul>
          <p className={styles.socialNote}>
            Profiles are not connected yet. These links open the contact page, where no phone number
            or email is published until the business confirms them.
          </p>
        </div>
      </div>

      <div className={`page-container ${styles.legal}`}>
        <nav aria-label="Legal">
          <ul>
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <p>© 2026 Vinayaka New Lace Handicrafts. All rights reserved.</p>
      </div>
    </footer>
  );
}
