import type { Metadata } from "next";
import type { ProductKind } from "@/data/store";
import { getCreation, getCreator } from "@/data/creators";
import CustomizerClientWrapper from "@/components/customizer/CustomizerClientWrapper";

export const metadata: Metadata = {
  title: "Personalizar Produto · Estúdio Criativo | custom.store",
  description: "Personalize camisetas, canecas, bonés e muito mais com nosso editor interativo online.",
};

type PageProps = {
  searchParams: Promise<{
    produto?: string;
    cor?: string;
    criacao?: string;
  }>;
};

export default async function CustomizarPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const creation = params.criacao ? getCreation(params.criacao) : undefined;
  const creator = creation && getCreator(creation.creatorSlug);

  const initialKind = (params.produto as ProductKind) || creation?.kind || "tshirt";
  const initialColor = params.cor || creation?.color || undefined;
  const initialDesign =
    creation && creator
      ? {
          title: creation.title,
          creatorName: creator.name,
          creatorSlug: creator.slug,
          elements: creation.elements,
        }
      : undefined;

  return (
    <main className="min-h-screen">
      <CustomizerClientWrapper initialKind={initialKind} initialColor={initialColor} initialDesign={initialDesign} />
    </main>
  );
}
