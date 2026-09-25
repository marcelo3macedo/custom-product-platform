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
    <div className="relative h-dvh w-full overflow-hidden bg-zinc-100">
      <div className="absolute top-4 left-4 h-11 w-56 animate-pulse rounded-full bg-zinc-200" />
      <div className="absolute top-4 right-4 h-11 w-64 animate-pulse rounded-full bg-zinc-200" />
      <div className="absolute inset-0 flex items-center justify-center px-4 pt-16 pb-24 sm:pr-32 sm:pb-8 sm:pl-8">
        <div
          className="aspect-[4/5] animate-pulse rounded-3xl bg-zinc-200"
          style={{ width: "min(540px, calc((100dvh - 7rem) * 0.8), 100%)" }}
        />
      </div>
      <div className="absolute top-1/2 right-4 hidden h-96 w-24 -translate-y-1/2 animate-pulse rounded-2xl bg-zinc-200 sm:block" />
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
