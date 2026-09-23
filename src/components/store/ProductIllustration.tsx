import type { ProductKind } from "@/data/store";

type Props = {
  kind: ProductKind;
  color: string;
  className?: string;
};

// Ilustrações simples em SVG para substituir fotos enquanto os dados são mockados
export default function ProductIllustration({ kind, color, className }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {kind === "tshirt" && (
        <path d="M42 18 L24 28 L12 48 L28 56 L32 50 L32 104 L88 104 L88 50 L92 56 L108 48 L96 28 L78 18 C74 26 67 30 60 30 C53 30 46 26 42 18 Z" fill={color} />
      )}
      {kind === "hoodie" && (
        <>
          <path d="M40 22 L22 32 L10 76 L24 80 L32 56 L32 104 L88 104 L88 56 L96 80 L110 76 L98 32 L80 22 C76 34 68 40 60 40 C52 40 44 34 40 22 Z" fill={color} />
          <path d="M42 84 L78 84 L74 100 L46 100 Z" fill="#000" opacity="0.15" />
        </>
      )}
      {kind === "mug" && (
        <>
          <rect x="24" y="30" width="56" height="66" rx="6" fill={color} />
          <path d="M80 44 C98 44 98 80 80 80" stroke={color} strokeWidth="9" fill="none" />
          <rect x="24" y="30" width="56" height="8" rx="4" fill="#000" opacity="0.12" />
        </>
      )}
      {kind === "cap" && (
        <>
          <path d="M20 72 C20 44 38 30 60 30 C82 30 100 44 100 72 Z" fill={color} />
          <path d="M60 72 L112 72 C112 82 100 86 88 86 L60 86 Z" fill={color} opacity="0.8" />
          <circle cx="60" cy="30" r="4" fill="#000" opacity="0.2" />
        </>
      )}
      {kind === "bag" && (
        <>
          <path d="M44 42 C44 20 76 20 76 42" stroke={color} strokeWidth="6" fill="none" />
          <rect x="26" y="40" width="68" height="64" rx="4" fill={color} />
        </>
      )}
      {kind === "bottle" && (
        <>
          <rect x="50" y="12" width="20" height="12" rx="3" fill="#000" opacity="0.3" />
          <rect x="40" y="24" width="40" height="84" rx="12" fill={color} />
          <rect x="40" y="50" width="40" height="24" fill="#fff" opacity="0.25" />
        </>
      )}
    </svg>
  );
}
