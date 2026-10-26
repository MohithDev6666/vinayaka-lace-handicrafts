import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    viewBox: '0 0 24 24',
    width: 22,
    height: 22,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...props,
  };
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16.5L20 20.5" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.2c1.4-3 3.6-4.4 6.5-4.4s5.1 1.4 6.5 4.4" />
    </svg>
  );
}

export function HeartIcon({ filled, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 19.2s-6.4-3.9-6.4-8.1A3.5 3.5 0 0 1 12 8.4a3.5 3.5 0 0 1 6.4 2.7c0 4.2-6.4 8.1-6.4 8.1z"
        fill={filled ? 'currentColor' : 'none'}
      />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 8.5h11l-.8 9.2a1.5 1.5 0 0 1-1.5 1.3H8.8a1.5 1.5 0 0 1-1.5-1.3L6.5 8.5z" />
      <path d="M9 8.4V7.2A3 3 0 0 1 12 4.2v0a3 3 0 0 1 3 3v1.2" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 7.5h11v8H3z" />
      <path d="M14 11h4.2l2.3 2.4V15.5H14" />
      <circle cx="7" cy="17.5" r="1.4" />
      <circle cx="17.2" cy="17.5" r="1.4" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.8l7 2.4v5.6c0 4.2-2.8 6.8-7 8.4c-4.2-1.6-7-4.2-7-8.4V6.2l7-2.4z" />
      <path d="M8.8 12.1l2.2 2.2 4.2-4.4" />
    </svg>
  );
}

export function HeadsetIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 13.5v-1.2a7 7 0 0 1 14 0v1.2" />
      <rect x="4" y="13" width="3.2" height="5.2" rx="1" />
      <rect x="16.8" y="13" width="3.2" height="5.2" rx="1" />
      <path d="M18.4 18.2v.6a2 2 0 0 1-2 2H13" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14.5 6.5L9 12l5.5 5.5" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.5 6.5L15 12l-5.5 5.5" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M10 1.8l2.1 4.5 4.9.6-3.6 3.4.9 4.9L10 13l-4.3 2.2.9-4.9L3 6.9l4.9-.6L10 1.8z"
      />
    </svg>
  );
}

export function FlowerMark(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" width="42" height="42" aria-hidden="true" {...props}>
      <circle cx="24" cy="24" r="22" fill="#F7F0E8" stroke="#173F3D" strokeWidth="1.2" />
      <g fill="none" stroke="#173F3D" strokeWidth="1.3">
        <circle cx="24" cy="24" r="10" />
        <circle cx="24" cy="24" r="4.2" />
        <path d="M24 12.5c2.6 3.2 2.6 5.6 0 8.4c-2.6-2.8-2.6-5.2 0-8.4z" />
        <path d="M24 35.5c-2.6-3.2-2.6-5.6 0-8.4c2.6 2.8 2.6 5.2 0 8.4z" />
        <path d="M12.5 24c3.2-2.6 5.6-2.6 8.4 0c-2.8 2.6-5.2 2.6-8.4 0z" />
        <path d="M35.5 24c-3.2-2.6-5.6-2.6-8.4 0c2.8 2.6 5.2 2.6 8.4 0z" />
        <path d="M15.8 15.8c3.6.4 5.4 2.2 5.6 5.4c-3-.6-4.8-.4-6.6-2.2c.2-1.2.6-2.2 1-3.2z" />
        <path d="M32.2 15.8c-3.6.4-5.4 2.2-5.6 5.4c3-.6 4.8-.4 6.6-2.2c-.2-1.2-.6-2.2-1-3.2z" />
        <path d="M15.8 32.2c3.6-.4 5.4-2.2 5.6-5.4c-3 .6-4.8.4-6.6 2.2c.2 1.2.6 2.2 1 3.2z" />
        <path d="M32.2 32.2c-3.6-.4-5.4-2.2-5.6-5.4c3 .6 4.8.4 6.6 2.2c-.2 1.2-.6 2.2-1 3.2z" />
      </g>
      <circle cx="24" cy="24" r="1.6" fill="#173F3D" />
    </svg>
  );
}
