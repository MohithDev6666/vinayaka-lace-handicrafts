export function BrandMark({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#F7F0E8" stroke="#173F3D" strokeWidth="1.2" />
      <g fill="none" stroke="#173F3D" strokeWidth="1.3">
        <circle cx="24" cy="24" r="10" />
        <circle cx="24" cy="24" r="4" />
        <path d="M24 12.5c2.6 3.2 2.6 5.6 0 8.4c-2.6-2.8-2.6-5.2 0-8.4z" />
        <path d="M24 35.5c-2.6-3.2-2.6-5.6 0-8.4c2.6 2.8 2.6 5.2 0 8.4z" />
        <path d="M12.5 24c3.2-2.6 5.6-2.6 8.4 0c-2.8 2.6-5.2 2.6-8.4 0z" />
        <path d="M35.5 24c-3.2-2.6-5.6-2.6-8.4 0c2.8 2.6 5.2 2.6 8.4 0z" />
      </g>
      <circle cx="24" cy="24" r="1.6" fill="#173F3D" />
    </svg>
  );
}
