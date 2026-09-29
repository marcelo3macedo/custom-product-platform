import type { Creation } from "@/data/creators";
import CreationCard from "./CreationCard";

export default function CreationGrid({ creations, showCreator = true }: { creations: Creation[]; showCreator?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {creations.map((creation) => (
        <CreationCard key={creation.id} creation={creation} showCreator={showCreator} />
      ))}
    </div>
  );
}
