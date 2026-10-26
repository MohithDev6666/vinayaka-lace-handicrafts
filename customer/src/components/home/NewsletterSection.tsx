import { useId, useState, type FormEvent } from 'react';
import styles from './NewsletterSection.module.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSection() {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!emailPattern.test(value)) {
      setStatus('error');
      setMessage('Enter a valid email address.');
      return;
    }
    setStatus('success');
    setMessage(
      'Thanks for your interest. This preview only checked the address — it was not saved to a mailing list.',
    );
    setEmail('');
  }

  return (
    <section className={styles.band} aria-labelledby="newsletter-heading">
      <div className={styles.flower} aria-hidden="true">
        <FlowerOrnament />
      </div>
      <div className={`${styles.flower} ${styles.flowerRight}`} aria-hidden="true">
        <FlowerOrnament />
      </div>
      <div className={`page-container ${styles.inner}`}>
        <h2 id="newsletter-heading">Join Our Newsletter</h2>
        <p>Get updates on new arrivals, special offers and more.</p>
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <label className="sr-only" htmlFor={inputId}>
            Email address
          </label>
          <input
            id={inputId}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== 'idle') {
                setStatus('idle');
                setMessage('');
              }
            }}
            aria-invalid={status === 'error'}
            aria-describedby={message ? messageId : undefined}
          />
          <button type="submit">Subscribe</button>
        </form>
        {message ? (
          <p id={messageId} className={status === 'error' ? styles.error : styles.success} role={status === 'error' ? 'alert' : 'status'}>
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function FlowerOrnament() {
  return (
    <svg viewBox="0 0 160 160" width="150" height="150">
      <g fill="none" stroke="#C9A497" strokeWidth="1.3">
        <circle cx="80" cy="80" r="28" />
        <circle cx="80" cy="80" r="10" />
        <path d="M80 42c8 12 8 20 0 30c-8-10-8-18 0-30z" />
        <path d="M80 118c-8-12-8-20 0-30c8 10 8 18 0 30z" />
        <path d="M42 80c12-8 20-8 30 0c-10 8-18 8-30 0z" />
        <path d="M118 80c-12-8-20-8-30 0c10 8 18 8 30 0z" />
        <path d="M54 54c14 2 22 10 22 22c-12-2-18-2-26-10c1-4 2-8 4-12z" />
        <path d="M106 54c-14 2-22 10-22 22c12-2 18-2 26-10c-1-4-2-8-4-12z" />
        <path d="M54 106c14-2 22-10 22-22c-12 2-18 2-26 10c1 4 2 8 4 12z" />
        <path d="M106 106c-14-2-22-10-22-22c12 2 18 2 26 10c-1 4-2 8-4 12z" />
      </g>
    </svg>
  );
}
