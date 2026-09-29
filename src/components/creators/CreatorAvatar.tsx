import type { Creator } from "@/data/creators";

const SIZES = {
  sm: "h-6 w-6 text-xs",
  md: "h-12 w-12 text-2xl",
  lg: "h-24 w-24 text-5xl sm:h-32 sm:w-32 sm:text-6xl",
};

export default function CreatorAvatar({
  creator,
  size = "md",
  className = "",
}: {
  creator: Creator;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${SIZES[size]} ${className}`}
      style={{ background: creator.logo.bg }}
    >
      {creator.logo.src ? (
        // Logos enviados pelos criadores podem vir de qualquer origem
        // eslint-disable-next-line @next/next/no-img-element
        <img src={creator.logo.src} alt={`Logo de ${creator.name}`} className="h-full w-full object-cover" />
      ) : (
        <span aria-hidden="true">{creator.logo.emoji}</span>
      )}
    </span>
  );
}
