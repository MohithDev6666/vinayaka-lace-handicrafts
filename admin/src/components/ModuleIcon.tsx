import type { ModuleIconName } from '../routes/modules.ts';

const glyphs: Record<ModuleIconName, string[]> = {
  dashboard: ['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z'],
  carousel: ['M4 7h16v10H4z', 'M8 7V5', 'M16 7V5', 'M9 12h6'],
  banner: ['M4 6h16v8H4z', 'M8 18h8', 'M12 14v4'],
  category: ['M12 3l2.2 4.6L19 8.2l-3.5 3.4.8 4.9L12 14.2 7.7 16.5l.8-4.9L5 8.2l4.8-.6z'],
  collection: ['M4 8l8-4 8 4-8 4z', 'M4 12l8 4 8-4', 'M4 16l8 4 8-4'],
  star: ['M12 3.2l2.2 4.6 5 .7-3.6 3.5.9 5L12 14.8 7.5 17l.9-5L4.8 8.5l5-.7z'],
  heart: ['M12 18s-6-3.6-6-7.4A3.2 3.2 0 0 1 12 8.2a3.2 3.2 0 0 1 6 2.4C18 14.4 12 18 12 18z'],
  mail: ['M4 7h16v10H4z', 'M4 7l8 6 8-6'],
  box: ['M4 8l8-4 8 4v8l-8 4-8-4z', 'M12 12V4', 'M4 8l8 4 8-4'],
  warehouse: ['M3 10l9-6 9 6', 'M5 10v8h14v-8', 'M10 18v-4h4v4'],
  cart: ['M5 6h2l1.2 8h9.2l1.4-5H8', 'M9 18a1 1 0 1 0 0.01 0', 'M16 18a1 1 0 1 0 0.01 0'],
  card: ['M3 7h18v10H3z', 'M3 11h18', 'M7 15h4'],
  users: ['M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M3.5 18c.6-2.4 2.4-3.6 5.5-3.6s4.9 1.2 5.5 3.6', 'M16 11a2.4 2.4 0 1 0 0-4.8', 'M16.5 14.5c1.8.2 3.2 1.1 3.8 3.5'],
  chart: ['M4 19V5', 'M4 19h16', 'M8 15v-4', 'M12 15V8', 'M16 15v-6'],
  spark: ['M12 3v4', 'M12 17v4', 'M3 12h4', 'M17 12h4', 'M6 6l2.5 2.5', 'M15.5 15.5L18 18', 'M18 6l-2.5 2.5', 'M8.5 15.5L6 18'],
};

export function ModuleIcon({ name }: { name: ModuleIconName }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {glyphs[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
