import { useEffect, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand.ts';
import { carouselSlides } from '../../data/carouselSlides.ts';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons.tsx';
import styles from './HeroCarousel.module.css';

export function HeroCarousel() {
  const slides = carouselSlides;
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const slide = slides[index] ?? slides[0];
  const paused = hovering || focused || reducedMotion;

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, index, slides.length]);

  function go(next: number) {
    const count = slides.length;
    setIndex(((next % count) + count) % count);
  }

  function onControlKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(index - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(index + 1);
    }
  }

  function onBlurCapture(event: FocusEvent<HTMLElement>) {
    const next = event.relatedTarget;
    if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
      setFocused(false);
    }
  }

  if (!slide) return null;

  return (
    <section className={styles.hero} aria-roledescription="carousel" aria-label="Featured promotions">
      <div className="page-container">
        <div
          className={styles.viewport}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={onBlurCapture}
        >
          <div className={styles.deck}>
            {slides.map((item, slideIndex) => {
              const active = slideIndex === index;
              return (
                <article
                  key={item.id}
                  className={active ? `${styles.slide} ${styles.active}` : `${styles.slide} ${styles.inactive}`}
                  aria-hidden={active ? undefined : true}
                  inert={active ? undefined : true}
                >
                  <div className={styles.copy}>
                    <p className={styles.eyebrow}>{item.eyebrow}</p>
                    <h1>{item.title}</h1>
                    <p className={styles.description}>{item.description}</p>
                    <Link className={styles.cta} to={item.ctaHref}>
                      {item.ctaLabel}
                      <span aria-hidden="true">→</span>
                    </Link>
                    <p className={styles.highlight}>{item.highlight}</p>
                    <ul className={styles.points}>
                      {brand.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.photo}>
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      width={1200}
                      height={800}
                      style={{ objectPosition: item.imagePosition ?? 'center' }}
                      fetchPriority={slideIndex === 0 ? 'high' : 'auto'}
                      loading={slideIndex === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                </article>
              );
            })}
          </div>
          <button
            type="button"
            className={`${styles.arrow} ${styles.prev}`}
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
            onKeyDown={onControlKey}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            aria-label="Next slide"
            onClick={() => go(index + 1)}
            onKeyDown={onControlKey}
          >
            <ChevronRightIcon />
          </button>
          <div className={styles.dots} role="group" aria-label="Choose a slide">
            {slides.map((item, dotIndex) => (
              <button
                key={item.id}
                type="button"
                className={dotIndex === index ? `${styles.dot} ${styles.dotActive}` : styles.dot}
                aria-label={`Go to slide ${dotIndex + 1}: ${item.title}`}
                aria-current={dotIndex === index ? 'true' : undefined}
                onClick={() => go(dotIndex)}
                onKeyDown={onControlKey}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
