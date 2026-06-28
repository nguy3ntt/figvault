import { useMemo, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { StatCard } from "./components/StatCard";
import { UploadPanel } from "./components/UploadPanel";
import { ManualAddForm } from "./components/ManualAddForm";
import { CollectionPanel } from "./components/CollectionPanel";
import { ValueChart } from "./components/ValueChart";
import { mockMinifigs } from "./data/mockMinifigs";

function App() {
  const [activeView, setActiveView] = useState("Dashboard");

  const stats = useMemo(() => {
    const totalFigures = mockMinifigs.reduce((sum, item) => sum + item.quantity, 0);

    const totalValue = mockMinifigs.reduce(
      (sum, item) => sum + item.quantity * item.estimatedValue,
      0
    );

    const uniqueThemes = new Set(mockMinifigs.map((item) => item.theme)).size;

    const topFigure = [...mockMinifigs].sort(
      (a, b) => b.estimatedValue * b.quantity - a.estimatedValue * a.quantity
    )[0];

    return {
      totalFigures,
      totalValue,
      uniqueThemes,
      topFigure,
    };
  }, []);

  return (
    <main className="app-shell">
      <Header activeView={activeView} onChangeView={setActiveView} />

      {activeView === "Dashboard" && (
        <>
          <section className="hero-panel">
            <div>
              <p className="eyebrow">Portfolio project MVP</p>
              <h2>Track, value, and identify your LEGO minifigure collection.</h2>
              <p>
                Start with manual storage and mock pricing. Later, connect
                Rebrickable, BrickLink, and image-assisted recognition.
              </p>
            </div>

            <button className="primary-button" onClick={() => setActiveView("Identify")}>
              Identify Minifigure
            </button>
          </section>

          <section className="stats-grid">
            <StatCard
              label="Total Value"
              value={`$${stats.totalValue.toFixed(2)}`}
              helper="Estimated market value"
            />
            <StatCard
              label="Figures Stored"
              value={String(stats.totalFigures)}
              helper="Including duplicates"
            />
            <StatCard
              label="Themes"
              value={String(stats.uniqueThemes)}
              helper="Unique LEGO themes"
            />
            <StatCard
              label="Top Figure"
              value={stats.topFigure.name}
              helper={`$${stats.topFigure.estimatedValue.toFixed(2)} unit value`}
            />
          </section>

          <div className="dashboard-grid">
            <ValueChart />
            <UploadPanel />
          </div>

          <CollectionPanel minifigs={mockMinifigs} />
        </>
      )}

      {activeView === "Collection" && <CollectionPanel minifigs={mockMinifigs} />}

      {activeView === "Identify" && <UploadPanel />}

      {activeView === "Add Manual" && <ManualAddForm />}
    </main>
  );
}

export default App;