import { Carousel } from '@mantine/carousel';
import { Button, Checkbox, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EmblaCarouselType } from 'embla-carousel';
import '@mantine/carousel/styles.css';
import { useAuth } from '../context/auth.tsx';
import { previewAccount } from '../data/demo.ts';
import styles from './login.module.css';

/** Pexels photos, free to use. Kept on this page so the rest of the studio data is unchanged. */
const loginSlides = [
  {
    src: '/images/login/shrug-cream.jpg',
    alt: 'Woman in a white openwork crochet top by a bright window',
    position: 'center 35%',
  },
  {
    src: '/images/login/sweater-open.jpg',
    alt: 'Woman in a cream openwork crochet top and white skirt',
    position: 'center 48%',
  },
  {
    src: '/images/login/woman-pink.jpg',
    alt: 'Woman in a pink openwork crochet top',
    position: 'center 24%',
  },
  {
    src: '/images/login/skirt-red.jpg',
    alt: 'Woman in a white crochet top and red skirt outdoors',
    position: 'center 30%',
  },
  {
    src: '/images/login/lace-skirt.jpg',
    alt: 'Woman in a white lace shrug and patterned skirt',
    position: 'center 42%',
  },
  {
    src: '/images/login/table-lace.jpg',
    alt: 'Lace table cover set with plates and glassware',
    position: 'center center',
  },
];

function fitWordmark(nameEl: HTMLElement, subEl: HTMLElement, logoEl: HTMLElement) {
  subEl.style.letterSpacing = '0px';
  const target = nameEl.getBoundingClientRect().width;
  const natural = subEl.getBoundingClientRect().width;
  const gaps = Math.max((subEl.textContent?.length ?? 1) - 1, 1);
  subEl.style.letterSpacing = `${(target - natural) / gaps}px`;
  const corrected = nameEl.getBoundingClientRect().width - subEl.getBoundingClientRect().width;
  if (Math.abs(corrected) > 0.5) {
    subEl.style.letterSpacing = `${(target - natural + corrected) / gaps}px`;
  }
  const height = Math.round(subEl.getBoundingClientRect().bottom - nameEl.getBoundingClientRect().top);
  logoEl.style.width = `${height}px`;
  logoEl.style.height = `${height}px`;
}

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const paused = useRef(false);
  const nameRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    if (!embla) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      if (!paused.current) embla.scrollNext();
    }, 5000);
    return () => window.clearInterval(timer);
  }, [embla]);
  const form = useForm({
    initialValues: { email: '', password: '', remember: true },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Enter a valid email'),
      password: (value) => (value.length > 0 ? null : 'Enter the preview password'),
    },
  });

  return (
    <main className={styles.shell}>
      <section
        className={styles.visual}
        aria-label="Vinayaka studio"
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          paused.current = false;
        }}
        onFocus={() => {
          paused.current = true;
        }}
        onBlur={() => {
          paused.current = false;
        }}
      >
        <Carousel
          className={styles.carousel}
          height="100%"
          withIndicators
          emblaOptions={{ loop: true }}
          getEmblaApi={setEmbla}
          controlSize={36}
          styles={{
            control: { background: 'rgba(255,255,255,0.92)', color: '#173F3D', border: 0 },
            indicators: { top: 28, bottom: 'auto', left: 48, right: 'auto', zIndex: 2 },
            indicator: {
              width: 28,
              height: 3,
              background: 'rgba(255,255,255,0.55)',
              '&[data-active]': { background: '#fff' },
            },
          }}
        >
          {loginSlides.map((slide) => (
            <Carousel.Slide key={slide.src} className={styles.slide}>
              <img src={slide.src} alt={slide.alt} style={{ objectPosition: slide.position }} />
              <div className={styles.veil} />
            </Carousel.Slide>
          ))}
        </Carousel>
        <div className={styles.copy}>
          <p className={styles.kicker}>Handmade with love</p>
          <h1>Crafting tradition for tomorrow</h1>
          <p>Thirty years of purely handmade crochet lace, photographed in warm light for the studio desk.</p>
          <ul className={styles.pills}>
            <li>30 Years of Experience</li>
            <li>Purely Handmade Products</li>
          </ul>
        </div>
      </section>
      <section className={styles.panel}>
        <div className={styles.card}>
          <div className={styles.brand}>
            <img ref={logoRef} className={styles.logo} src="/images/logo.png" alt="" width={48} height={48} />
            <div className={styles.brandText}>
              <strong ref={nameRef} className={styles.name}>Vinayaka</strong>
              <span ref={subtitleRef} className={styles.subtitle}>New Lace Handicrafts</span>
            </div>
          </div>
          <Text size="xs" tt="uppercase" fw={600} c="#8d847c" style={{ letterSpacing: '0.14em' }}>
            Admin portal
          </Text>
          <Title order={2} c="#173F3D" mt={4}>
            Admin Login
          </Title>
          <Text c="dimmed" size="sm" mt={6} mb="lg">
            Preview sign-in for the studio dashboard. No account is created and no password is sent to a server.
          </Text>
          <form
            onSubmit={form.onSubmit((values) => {
              const email = values.email.trim().toLowerCase();
              if (email !== previewAccount.email || values.password !== previewAccount.password) {
                form.setFieldError('password', 'Use the preview email and password shown below.');
                return;
              }
              signIn(
                { name: previewAccount.name, email: previewAccount.email, role: previewAccount.role },
                values.remember,
              );
              navigate('/');
            })}
          >
            <TextInput label="Email" placeholder="admin@vinayaka.local" withAsterisk {...form.getInputProps('email')} />
            <PasswordInput label="Password" placeholder="Password" mt="md" withAsterisk {...form.getInputProps('password')} />
            <Checkbox label="Remember this browser" mt="md" {...form.getInputProps('remember', { type: 'checkbox' })} />
            <Button type="submit" fullWidth mt="lg" size="md">
              Login
            </Button>
            <Button
              type="button"
              variant="subtle"
              color="vinayaka"
              fullWidth
              mt={6}
              onClick={() =>
                notifications.show({
                  title: 'Password reset is not connected',
                  message: 'Use the preview password on this screen. No reset email is sent.',
                  color: 'yellow',
                })
              }
            >
              Forgot password?
            </Button>
          </form>
          <div className={styles.sample}>
            Preview account
            <br />
            Email <code>{previewAccount.email}</code>
            <br />
            Password <code>{previewAccount.password}</code>
          </div>
        </div>
      </section>
    </main>
  );
}
