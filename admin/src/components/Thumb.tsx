export function Thumb({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={46}
      height={46}
      style={{ width: 46, height: 46, objectFit: 'cover', borderRadius: 8, background: '#F7F0E8', display: 'block' }}
    />
  );
}
