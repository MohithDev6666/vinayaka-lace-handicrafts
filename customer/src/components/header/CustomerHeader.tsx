import { useLayoutEffect, useRef, useState, type FormEvent } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { Burger, Drawer, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { brand } from '../../data/brand.ts';
import { primaryNav } from '../../data/navigation.ts';
import { useShopState } from '../../context/shop-state.ts';
import { CartIcon, HeartIcon, SearchIcon, UserIcon } from '../icons/Icons.tsx';
import styles from './CustomerHeader.module.css';

type SearchFormProps = {
  inputId: string;
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function fitWordmark(nameEl: HTMLElement, subEl: HTMLElement, logoEl: HTMLElement) {
  const width = nameEl.getBoundingClientRect().width;
  subEl.style.width = `${width}px`;
  const height = Math.round(subEl.getBoundingClientRect().bottom - nameEl.getBoundingClientRect().top);
  logoEl.style.width = `${height}px`;
  logoEl.style.height = `${height}px`;
}

function SearchForm({ inputId, query, onQueryChange, onSubmit }: SearchFormProps) {
  return (
    <form className={styles.search} role="search" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={inputId}>
        Search products
      </label>
      <button className={styles.searchButton} type="submit" aria-label="Search">
        <SearchIcon />
      </button>
      <input
        id={inputId}
        name="q"
        type="search"
        placeholder="Search products"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
    </form>
  );
}

export function CustomerHeader() {
  const [menuOpened, { open, close }] = useDisclosure(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { cartCount } = useShopState();
  const paramQuery = params.get('q') ?? '';
  const [query, setQuery] = useState(paramQuery);
  const [syncedQuery, setSyncedQuery] = useState(paramQuery);
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

  if (paramQuery !== syncedQuery) {
    setSyncedQuery(paramQuery);
    setQuery(paramQuery);
  }

  function closeOverlays() {
    close();
    setSearchOpen(false);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = query.trim();
    closeOverlays();
    navigate(next ? `/shop?q=${encodeURIComponent(next)}` : '/shop');
  }

  return (
    <header className={styles.header}>
      <a className={styles.skip} href="#main">
        Skip to content
      </a>
      <div className={`page-container ${styles.bar}`}>
        <Burger
          className={styles.burger}
          opened={menuOpened}
          onClick={open}
          aria-label="Open menu"
          size="sm"
          color="#173F3D"
        />
        <Link to="/" className={styles.brand} aria-label={`${brand.name}, ${brand.subtitle}`} onClick={closeOverlays}>
          <img ref={logoRef} className={styles.logo} src="/images/logo.png" alt="" width={40} height={40} />
          <span className={styles.brandText}>
            <span ref={nameRef} className={styles.name}>{brand.name}</span>
            <span ref={subtitleRef} className={styles.subtitle}>
              {brand.subtitle.split('').map((char, index) => (
                <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeOverlays}
              className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.desktopSearch}>
            <SearchForm
              inputId="header-search"
              query={query}
              onQueryChange={setQuery}
              onSubmit={submitSearch}
            />
          </div>
          <button
            type="button"
            className={styles.searchToggle}
            aria-expanded={searchOpen}
            aria-controls="mobile-search"
            onClick={() => setSearchOpen((openState) => !openState)}
          >
            <SearchIcon />
            <span className="sr-only">Search</span>
          </button>
          <Menu position="bottom-end" shadow="sm" width={220}>
            <Menu.Target>
              <button type="button" className={`${styles.iconButton} ${styles.account}`} aria-label="Account">
                <UserIcon />
              </button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Sign-in is not connected</Menu.Label>
              <Menu.Item onClick={() => navigate('/account')}>Account</Menu.Item>
              <Menu.Item onClick={() => navigate('/wishlist')}>Wishlist</Menu.Item>
              <Menu.Item onClick={() => navigate('/cart')}>Cart</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Link to="/wishlist" className={`${styles.iconButton} ${styles.wishLink}`} aria-label="Wishlist" onClick={closeOverlays}>
            <HeartIcon />
          </Link>
          <Link to="/cart" className={styles.iconButton} aria-label={`Cart, ${cartCount} items`} onClick={closeOverlays}>
            <CartIcon />
            {cartCount > 0 ? <span className={styles.badge}>{cartCount}</span> : null}
          </Link>
          <span className="sr-only" aria-live="polite">
            {cartCount} items in cart
          </span>
        </div>
      </div>

      {searchOpen ? (
        <div id="mobile-search" className={styles.mobileSearch}>
          <div className="page-container">
            <SearchForm
              inputId="mobile-search-input"
              query={query}
              onQueryChange={setQuery}
              onSubmit={submitSearch}
            />
          </div>
        </div>
      ) : null}

      <div className={styles.lace} aria-hidden="true" />

      <Drawer
        opened={menuOpened}
        onClose={close}
        position="left"
        size={300}
        title="Menu"
        zIndex={400}
        styles={{
          title: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: '#173F3D' },
        }}
      >
        <div className={styles.drawerSearch}>
          <SearchForm
            inputId="drawer-search"
            query={query}
            onQueryChange={setQuery}
            onSubmit={submitSearch}
          />
        </div>
        <nav className={styles.drawerNav} aria-label="Mobile">
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeOverlays}
              className={({ isActive }) =>
                isActive ? `${styles.drawerLink} ${styles.drawerActive}` : styles.drawerLink
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/wishlist" className={styles.drawerLink} onClick={closeOverlays}>
            Wishlist
          </NavLink>
          <NavLink to="/cart" className={styles.drawerLink} onClick={closeOverlays}>
            Cart ({cartCount})
          </NavLink>
          <NavLink to="/account" className={styles.drawerLink} onClick={closeOverlays}>
            Account
          </NavLink>
        </nav>
      </Drawer>
    </header>
  );
}
