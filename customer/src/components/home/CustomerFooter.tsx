import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand.ts';
import { customerCareNav, legalNav, primaryNav } from '../../data/navigation.ts';
import styles from './CustomerFooter.module.css';

const socialNames = ['Instagram', 'Facebook', 'Pinterest', 'YouTube'];

function fitWordmark(nameEl: HTMLElement, subEl: HTMLElement, logoEl: HTMLElement) {
  const width = nameEl.getBoundingClientRect().width;
  subEl.style.width = `${width}px`;
  const height = Math.round(subEl.getBoundingClientRect().bottom - nameEl.getBoundingClientRect().top);
  logoEl.style.width = `${height}px`;
  logoEl.style.height = `${height}px`;
}

export function CustomerFooter() {
  const nameRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const nameEl = nameRef.current;
    const subEl = subtitleRef.current;
    const logoEl = logoRef.current;
    if (!nameEl || !subEl || !logoEl) return;
    const fit = () => fitWordmark(nameEl, subEl, logoEl);
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={`page-container ${styles.grid}`}>
        <div className={styles.identity}>
          <Link to="/" className={styles.brand} aria-label={`${brand.name}, ${brand.subtitle}`}>
            <img ref={logoRef} className={styles.logo} src="/images/logo.png" alt="" width={44} height={44} />
            <span className={styles.brandText}>
              <span ref={nameRef} className={styles.name}>{brand.name}</span>
              <span ref={subtitleRef} className={styles.subtitle}>
                {brand.subtitle.split('').map((char, index) => (
                  <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </span>
              <span className={styles.tagline}>{brand.tagline}</span>
            </span>
          </Link>
          <img className={styles.stamp} src="/images/30yrs_stamp.png" alt="30 years of experience" width={148} height={148} />
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
