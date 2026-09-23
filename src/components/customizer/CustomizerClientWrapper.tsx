"use client";

import dynamic from "next/dynamic";
import type { ProductKind } from "@/data/store";

const CustomizerStudio = dynamic(
  () => import("@/components/customizer/CustomizerStudio"),
  {
    ssr: false,
    loading: () => <CustomizerSkeleton />,
  },
);

function CustomizerSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8">
        <div className="h-6 w-48 animate-pulse rounded bg-zinc-200" />
        <div className="h-8 w-32 animate-pulse rounded-lg bg-zinc-200" />
      </header>
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-6 p-8 lg:grid-cols-12">
        <div className="h-[500px] animate-pulse rounded-3xl bg-zinc-200 lg:col-span-4" />
        <div className="h-[500px] animate-pulse rounded-3xl bg-zinc-200 lg:col-span-5" />
        <div className="h-[500px] animate-pulse rounded-3xl bg-zinc-200 lg:col-span-3" />
      </div>
    </div>
  );
}

type Props = {
  initialKind: ProductKind;
  initialColor?: string;
};

export default function CustomizerClientWrapper({ initialKind, initialColor }: Props) {
  return <CustomizerStudio initialKind={initialKind} initialColor={initialColor} />;
}
