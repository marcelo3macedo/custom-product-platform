import type { Creation } from "@/data/creators";
import ProductIllustration, { PRINT_AREAS } from "@/components/store/ProductIllustration";
import DesignArtwork from "./DesignArtwork";

export default function CreationPreview({ creation, className }: { creation: Creation; className?: string }) {
  const area = PRINT_AREAS[creation.kind];
  return (
    <ProductIllustration kind={creation.kind} color={creation.color} className={className}>
      <DesignArtwork elements={creation.elements} {...area} />
    </ProductIllustration>
  );
}
