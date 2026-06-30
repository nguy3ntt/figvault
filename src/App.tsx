import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { StatCard } from "./components/StatCard";
import { UploadPanel } from "./components/UploadPanel";
import { ManualAddForm } from "./components/ManualAddForm";
import { CollectionPanel } from "./components/CollectionPanel";
import { ValueChart } from "./components/ValueChart";
import { mockMinifigs } from "./data/mockMinifigs";
import type { Minifig, MinifigFormInput } from "./types";

const STORAGE_KEY = "figvault-minifigs";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createImageLabel(name: string) {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "MF";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function loadStoredMinifigs() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return mockMinifigs;
    }

    const parsed = JSON.parse(saved) as Minifig[];

    if (!Array.isArray(parsed)) {
      return mockMinifigs;
    }

    return parsed;
  } catch {
    return mockMinifigs;
  }
}

function escapeCsvField(value: string | number | undefined) {
  if (value === undefined) {
    return "";
  }

  const stringValue = String(value);

  if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
}

function App() {
  const [activeView, setActiveView] = useState("Dashboard");
  const [minifigs, setMinifigs] = useState<Minifig[]>(loadStoredMinifigs);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(minifigs));
  }, [minifigs]);

  function addMinifig(input: MinifigFormInput) {
    setMinifigs((currentMinifigs) => {
      const existingIndex = currentMinifigs.findIndex(
        (item) =>
          item.figCode.toLowerCase() === input.figCode.toLowerCase() &&
          item.condition === input.condition
      );

      if (existingIndex !== -1) {
        return currentMinifigs.map((item, index) => {
          if (index !== existingIndex) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity + input.quantity,
            estimatedValue: input.estimatedValue,
            purchasePrice: input.purchasePrice ?? item.purchasePrice,
            lastUpdated: new Date().toISOString().slice(0, 10),
          };
        });
      }

      const newMinifig: Minifig = {
        id: createId(),
        figCode: input.figCode,
        name: input.name,
        theme: input.theme,
        year: input.year,
        condition: input.condition,
        quantity: input.quantity,
        estimatedValue: input.estimatedValue,
        purchasePrice: input.purchasePrice,
        imageLabel: createImageLabel(input.name),
        valueChangePercent: 0,
        lastUpdated: new Date().toISOString().slice(0, 10),
      };

      return [newMinifig, ...currentMinifigs];
    });

    setActiveView("Collection");
  }

  function deleteMinifig(id: string) {
    const shouldDelete = window.confirm("Remove this minifigure from your collection?");

    if (!shouldDelete) {
      return;
    }

    setMinifigs((currentMinifigs) => currentMinifigs.filter((item) => item.id !== id));
  }

  function updateMinifigQuantity(id: string, nextQuantity: number) {
    if (nextQuantity < 1) {
      return;
    }

    setMinifigs((currentMinifigs) =>
      currentMinifigs.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          quantity: nextQuantity,
          lastUpdated: new Date().toISOString().slice(0, 10),
        };
      })
    );
  }

  function resetDemoData() {
    const shouldReset = window.confirm(
      "Reset your local collection back to the demo minifigure data?"
    );

    if (!shouldReset) {
      return;
    }

    setMinifigs(mockMinifigs);
  }

  function exportCollectionCsv() {
    const headers = [
      "Fig Code",
      "Name",
      "Theme",
      "Year",
      "Condition",
      "Quantity",
      "Estimated Unit Value",
      "Estimated Total Value",
      "Purchase Price",
      "Value Change Percent",
      "Last Updated",
    ];

    const rows = minifigs.map((item) => [
      item.figCode,
      item.name,
      item.theme,
      item.year,
      item.condition,
      item.quantity,
      item.estimatedValue.toFixed(2),
      (item.estimatedValue * item.quantity).toFixed(2),
      item.purchasePrice?.toFixed(2),
      item.valueChangePercent,
      item.lastUpdated,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((field) => escapeCsvField(field)).join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `figvault-collection-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  const stats = useMemo(() => {
    const totalFigures = minifigs.reduce((sum, item) => sum + item.quantity, 0);

    const totalValue = minifigs.reduce(
      (sum, item) => sum + item.quantity * item.estimatedValue,
      0
    );

    const uniqueThemes = new Set(minifigs.map((item) => item.theme)).size;

    const topFigure =
      minifigs.length > 0
        ? [...minifigs].sort(
            (a, b) => b.estimatedValue * b.quantity - a.estimatedValue * a.quantity
          )[0]
        : null;

    return {
      totalFigures,
      totalValue,
      uniqueThemes,
      topFigure,
    };
  }, [minifigs]);

  const collectionPanel = (
    <CollectionPanel
      minifigs={minifigs}
      onDelete={deleteMinifig}
      onQuantityChange={updateMinifigQuantity}
      onExportCsv={exportCollectionCsv}
      onResetDemoData={resetDemoData}
    />
  );

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
              value={stats.topFigure?.name ?? "None yet"}
              helper={
                stats.topFigure
                  ? `$${stats.topFigure.estimatedValue.toFixed(2)} unit value`
                  : "Add your first minifigure"
              }
            />
          </section>

          <div className="dashboard-grid">
            <ValueChart />
            <UploadPanel onConfirmMatch={addMinifig} />
          </div>

          {collectionPanel}
        </>
      )}

      {activeView === "Collection" && collectionPanel}

      {activeView === "Identify" && <UploadPanel onConfirmMatch={addMinifig} />}

      {activeView === "Add Manual" && <ManualAddForm onAdd={addMinifig} />}
    </main>
  );
}

export default App;