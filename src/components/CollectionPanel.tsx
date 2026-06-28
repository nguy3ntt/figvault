import type { Minifig } from "../types";
import { MinifigCard } from "./MinifigureCard";

type CollectionPanelProps = {
  minifigs: Minifig[];
};

export function CollectionPanel({ minifigs }: CollectionPanelProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Stored Minifigures</p>
          <h2>Your Collection</h2>
        </div>
        <button className="ghost-button">Export CSV</button>
      </div>

      <div className="collection-grid">
        {minifigs.map((minifig) => (
          <MinifigCard key={minifig.id} minifig={minifig} />
        ))}
      </div>
    </section>
  );
}