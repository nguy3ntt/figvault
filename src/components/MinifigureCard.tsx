import type { Minifig } from "../types";

type MinifigCardProps = {
  minifig: Minifig;
};

export function MinifigCard({ minifig }: MinifigCardProps) {
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
      </div>
    </article>
  );
}