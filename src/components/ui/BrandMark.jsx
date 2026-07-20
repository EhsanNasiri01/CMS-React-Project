
export default function BrandMark({ className = "size-8" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="32" height="32" rx="9" fill="#0F1A2E" />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="8.5"
        stroke="#2C3857"
      />
      <g transform="translate(16 16)">
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <path
            key={deg}
            d="M0 -9 L7.8 -4.5 L4.5 1.2 Z"
            transform={`rotate(${deg})`}
            fill="#2DE2C5"
            opacity={0.35 + i * 0.13}
          />
        ))}
        <circle r="2.6" fill="#070B14" />
      </g>
    </svg>
  );
}
