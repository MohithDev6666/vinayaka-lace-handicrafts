export type ModuleIconName =
  | 'dashboard'
  | 'carousel'
  | 'banner'
  | 'category'
  | 'collection'
  | 'star'
  | 'heart'
  | 'mail'
  | 'box'
  | 'warehouse'
  | 'cart'
  | 'card'
  | 'users'
  | 'chart'
  | 'spark';

export interface AdminModule {
  label: string;
  to: string;
  group: 'Overview' | 'Homepage' | 'Catalog' | 'Sales' | 'Insights';
  icon: ModuleIconName;
  end?: boolean;
}

export const modules: AdminModule[] = [
  { label: 'Dashboard', to: '/', group: 'Overview', icon: 'dashboard', end: true },
  { label: 'Hero carousel', to: '/carousel', group: 'Homepage', icon: 'carousel' },
  { label: 'Banners & offers', to: '/banners', group: 'Homepage', icon: 'banner' },
  { label: 'Categories', to: '/categories', group: 'Homepage', icon: 'category' },
  { label: 'Collections', to: '/collections', group: 'Homepage', icon: 'collection' },
  { label: 'Featured & trending', to: '/picks', group: 'Homepage', icon: 'spark' },
  { label: 'Reviews', to: '/reviews', group: 'Homepage', icon: 'star' },
  { label: 'Trust benefits', to: '/benefits', group: 'Homepage', icon: 'heart' },
  { label: 'Newsletter', to: '/newsletter', group: 'Homepage', icon: 'mail' },
  { label: 'Products', to: '/products', group: 'Catalog', icon: 'box' },
  { label: 'Inventory', to: '/inventory', group: 'Catalog', icon: 'warehouse' },
  { label: 'Orders', to: '/orders', group: 'Sales', icon: 'cart' },
  { label: 'Payments', to: '/payments', group: 'Sales', icon: 'card' },
  { label: 'Customers', to: '/customers', group: 'Sales', icon: 'users' },
  { label: 'Reports', to: '/reports', group: 'Insights', icon: 'chart' },
];

export const moduleGroups = ['Overview', 'Homepage', 'Catalog', 'Sales', 'Insights'] as const;

export interface Crumb {
  label: string;
  to?: string;
}

export function crumbsFor(pathname: string): Crumb[] {
  const home: Crumb = { label: 'Dashboard', to: '/' };
  if (pathname === '/') return [{ label: 'Dashboard' }];
  if (pathname === '/products/new') return [home, { label: 'Products', to: '/products' }, { label: 'Add product' }];
  if (pathname.startsWith('/products/')) return [home, { label: 'Products', to: '/products' }, { label: 'Edit product' }];
  if (pathname.startsWith('/orders/')) {
    const id = pathname.split('/')[2] ?? 'Order';
    return [home, { label: 'Orders', to: '/orders' }, { label: id }];
  }
  const match = modules.find((item) => item.to === pathname);
  return match ? [home, { label: match.label }] : [home, { label: 'Page' }];
}
