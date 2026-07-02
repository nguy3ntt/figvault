import type { ValueSnapshot } from "../types";

type ValueChartProps = {
  snapshots: ValueSnapshot[];
  currentTotal: number;
};

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

function isSameDay(a: string, b: string) {
  return a.slice(0, 10) === b.slice(0, 10);
}

function formatSnapshotLabel(createdAt: string, allSameDay: boolean) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  if (allSameDay) {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function ValueChart({ snapshots, currentTotal }: ValueChartProps) {
  const chartData = snapshots.slice(-8);
  const maxValue = Math.max(1, ...chartData.map((item) => item.totalValue));
  const latestSnapshot = chartData.at(-1);
  const previousSnapshot = chartData.length >= 2 ? chartData.at(-2) : undefined;

  const changeAmount =
    latestSnapshot && previousSnapshot
      ? latestSnapshot.totalValue - previousSnapshot.totalValue
      : 0;

  const changePercent =
    previousSnapshot && previousSnapshot.totalValue > 0
      ? (changeAmount / previousSnapshot.totalValue) * 100
      : 0;

  const allSameDay =
    chartData.length > 1 &&
    chartData.every((item) => isSameDay(item.createdAt, chartData[0].createdAt));

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Collection value</p>
          <h2>Value History</h2>
        </div>
        <span className="chart-badge">Live local data</span>
      </div>

      <div className="value-summary">
        <div>
          <span>Current Value</span>
          <strong>{formatCurrency(currentTotal)}</strong>
        </div>

        <div>
          <span>Latest Change</span>
          <strong className={changeAmount >= 0 ? "positive-text" : "negative-text"}>
            {changeAmount >= 0 ? "+" : ""}
            {formatCurrency(changeAmount)}
          </strong>
        </div>

        <div>
          <span>Change %</span>
          <strong className={changePercent >= 0 ? "positive-text" : "negative-text"}>
            {changePercent >= 0 ? "+" : ""}
            {changePercent.toFixed(1)}%
          </strong>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="empty-state compact-empty">
          <h3>No value history yet</h3>
          <p>Add or update minifigures to start tracking collection value.</p>
        </div>
      ) : (
        <div className="bar-chart">
          {chartData.map((item) => {
            const height = (item.totalValue / maxValue) * 100;

            return (
              <div className="bar-item" key={item.id}>
                <div className="bar-track" title={formatCurrency(item.totalValue)}>
                  <div className="bar-fill" style={{ height: `${height}%` }} />
                </div>
                <span>{formatSnapshotLabel(item.createdAt, allSameDay)}</span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}