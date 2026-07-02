import { useMemo, useState } from "react";
import type { Minifig, MinifigCondition } from "../types";
import { MinifigCard } from "./MinifigureCard";

type SortOption = "recent" | "value-high" | "value-low" | "name" | "quantity";

type CollectionPanelProps = {
  minifigs: Minifig[];
  onEdit: (minifig: Minifig) => void;
  onDelete: (id: string) => void;
  onQuantityChange: (id: string, nextQuantity: number) => void;
  onExportCsv: () => void;
  onResetDemoData: () => void;
};

const conditionOptions: Array<"All" | MinifigCondition> = [
  "All",
  "New",
  "Excellent",
  "Good",
  "Worn",
  "Damaged",
];

export function CollectionPanel({
  minifigs,
  onEdit,
  onDelete,
  onQuantityChange,
  onExportCsv,
  onResetDemoData,
}: CollectionPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [conditionFilter, setConditionFilter] = useState<"All" | MinifigCondition>("All");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const filteredMinifigs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return [...minifigs]
      .filter((minifig) => {
        const matchesSearch =
          minifig.name.toLowerCase().includes(search) ||
          minifig.figCode.toLowerCase().includes(search) ||
          minifig.theme.toLowerCase().includes(search);

        const matchesCondition =
          conditionFilter === "All" || minifig.condition === conditionFilter;

        return matchesSearch && matchesCondition;
      })
      .sort((a, b) => {
        if (sortBy === "value-high") {
          return b.estimatedValue * b.quantity - a.estimatedValue * a.quantity;
        }

        if (sortBy === "value-low") {
          return a.estimatedValue * a.quantity - b.estimatedValue * b.quantity;
        }

        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }

        if (sortBy === "quantity") {
          return b.quantity - a.quantity;
        }

        return b.lastUpdated.localeCompare(a.lastUpdated);
      });
  }, [conditionFilter, minifigs, searchTerm, sortBy]);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Stored Minifigures</p>
          <h2>Your Collection</h2>
        </div>

        <div className="collection-actions">
          <button className="ghost-button" onClick={onExportCsv} disabled={minifigs.length === 0}>
            Export CSV
          </button>
          <button className="ghost-button" onClick={onResetDemoData}>
            Reset Demo
          </button>
        </div>
      </div>

      <div className="collection-toolbar">
        <label>
          Search
          <input
            placeholder="Search name, code, or theme"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <label>
          Condition
          <select
            value={conditionFilter}
            onChange={(event) =>
              setConditionFilter(event.target.value as "All" | MinifigCondition)
            }
          >
            {conditionOptions.map((condition) => (
              <option key={condition}>{condition}</option>
            ))}
          </select>
        </label>

        <label>
          Sort
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
          >
            <option value="recent">Recently updated</option>
            <option value="value-high">Highest total value</option>
            <option value="value-low">Lowest total value</option>
            <option value="name">Name A-Z</option>
            <option value="quantity">Highest quantity</option>
          </select>
        </label>
      </div>

      <p className="match-count">
        Showing {filteredMinifigs.length} of {minifigs.length} stored minifigures.
      </p>

      {minifigs.length === 0 ? (
        <div className="empty-state">
          <h3>No minifigures stored yet</h3>
          <p>Add your first minifigure manually or confirm an image-recognition result.</p>
        </div>
      ) : filteredMinifigs.length === 0 ? (
        <div className="empty-state">
          <h3>No matching minifigures</h3>
          <p>Try changing your search term or condition filter.</p>
        </div>
      ) : (
        <div className="collection-grid">
          {filteredMinifigs.map((minifig) => (
            <MinifigCard
              key={minifig.id}
              minifig={minifig}
              onEdit={onEdit}
              onDelete={onDelete}
              onQuantityChange={onQuantityChange}
            />
          ))}
        </div>
      )}
    </section>
  );
}