const chartData = [
  { month: "Jan", value: 92 },
  { month: "Feb", value: 118 },
  { month: "Mar", value: 132 },
  { month: "Apr", value: 126 },
  { month: "May", value: 154 },
  { month: "Jun", value: 181 },
];

export function ValueChart() {
  const maxValue = Math.max(...chartData.map((item) => item.value));

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Collection value</p>
          <h2>Value Trend</h2>
        </div>
        <span className="chart-badge">Mock data</span>
      </div>

      <div className="bar-chart">
        {chartData.map((item) => {
          const height = (item.value / maxValue) * 100;

          return (
            <div className="bar-item" key={item.month}>
              <div className="bar-track">
                <div className="bar-fill" style={{ height: `${height}%` }} />
              </div>
              <span>{item.month}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}