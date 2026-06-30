import type { Minifig } from "../types";

type MinifigCardProps = {
  minifig: Minifig;
  onDelete: (id: string) => void;
  onQuantityChange: (id: string, nextQuantity: number) => void;
};

export function MinifigCard({
  minifig,
  onDelete,
  onQuantityChange,
}: MinifigCardProps) {
  const totalValue = minifig.estimatedValue * minifig.quantity;
  const isPositive = minifig.valueChangePercent >= 0;

  return (
    <article className="minifig-card">
      <div className="fig-avatar">
        <span>{minifig.imageLabel}</span>
      </div>

      <div className="fig-content">
        <div className="fig-topline">
          <span className="fig-code">{minifig.figCode}</span>
          <span className={isPositive ? "value-chip positive" : "value-chip negative"}>
            {isPositive ? "+" : ""}
            {minifig.valueChangePercent}%
          </span>
        </div>

        <h3>{minifig.name}</h3>
        <p className="fig-meta">
          {minifig.theme} · {minifig.year} · {minifig.condition}
        </p>

        <div className="fig-stats">
          <div>
            <span>Qty</span>
            <strong>{minifig.quantity}</strong>
          </div>
          <div>
            <span>Unit value</span>
            <strong>${minifig.estimatedValue.toFixed(2)}</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>${totalValue.toFixed(2)}</strong>
          </div>
        </div>

        <div className="fig-actions">
          <div className="quantity-control">
            <button
              className="small-button"
              onClick={() => onQuantityChange(minifig.id, minifig.quantity - 1)}
              disabled={minifig.quantity <= 1}
            >
              −
            </button>
            <span>{minifig.quantity}</span>
            <button
              className="small-button"
              onClick={() => onQuantityChange(minifig.id, minifig.quantity + 1)}
            >
              +
            </button>
          </div>

          <button className="danger-button" onClick={() => onDelete(minifig.id)}>
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}