import { useState } from "react";
import type { MinifigCondition, MinifigFormInput } from "../types";

type ManualAddFormProps = {
  onAdd: (input: MinifigFormInput) => void;
};

type FormState = {
  figCode: string;
  name: string;
  theme: string;
  year: string;
  condition: MinifigCondition;
  quantity: string;
  estimatedValue: string;
  purchasePrice: string;
};

const initialForm: FormState = {
  figCode: "",
  name: "",
  theme: "",
  year: "",
  condition: "Excellent",
  quantity: "1",
  estimatedValue: "",
  purchasePrice: "",
};

export function ManualAddForm({ onAdd }: ManualAddFormProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const year = Number(form.year);
    const quantity = Number(form.quantity);
    const estimatedValue = Number(form.estimatedValue);
    const purchasePrice =
      form.purchasePrice.trim() === "" ? undefined : Number(form.purchasePrice);

    if (!form.figCode.trim() || !form.name.trim() || !form.theme.trim()) {
      setError("Please fill in the minifigure code, name, and theme.");
      return;
    }

    if (!Number.isFinite(year) || year < 1978) {
      setError("Please enter a valid LEGO minifigure year.");
      return;
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      setError("Quantity must be greater than 0.");
      return;
    }

    if (!Number.isFinite(estimatedValue) || estimatedValue < 0) {
      setError("Estimated value must be 0 or higher.");
      return;
    }

    if (purchasePrice !== undefined && (!Number.isFinite(purchasePrice) || purchasePrice < 0)) {
      setError("Purchase price must be 0 or higher.");
      return;
    }

    onAdd({
      figCode: form.figCode.trim(),
      name: form.name.trim(),
      theme: form.theme.trim(),
      year,
      condition: form.condition,
      quantity,
      estimatedValue,
      purchasePrice,
    });

    setForm(initialForm);
    setError("");
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Manual input</p>
          <h2>Add Minifigure</h2>
        </div>
      </div>

      <form className="manual-form" onSubmit={handleSubmit}>
        <label>
          Minifigure Code
          <input
            placeholder="e.g. sw0173"
            value={form.figCode}
            onChange={(event) => updateField("figCode", event.target.value)}
          />
        </label>

        <label>
          Name
          <input
            placeholder="e.g. Obi Wan Kenobi"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </label>

        <label>
          Theme
          <input
            placeholder="e.g. Star Wars"
            value={form.theme}
            onChange={(event) => updateField("theme", event.target.value)}
          />
        </label>

        <div className="form-row">
          <label>
            Year
            <input
              placeholder="2007"
              type="number"
              value={form.year}
              onChange={(event) => updateField("year", event.target.value)}
            />
          </label>

          <label>
            Quantity
            <input
              placeholder="1"
              type="number"
              min="1"
              value={form.quantity}
              onChange={(event) => updateField("quantity", event.target.value)}
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Condition
            <select
              value={form.condition}
              onChange={(event) =>
                updateField("condition", event.target.value as MinifigCondition)
              }
            >
              <option>New</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Worn</option>
              <option>Damaged</option>
            </select>
          </label>

          <label>
            Estimated Value
            <input
              placeholder="34.00"
              type="number"
              min="0"
              step="0.01"
              value={form.estimatedValue}
              onChange={(event) => updateField("estimatedValue", event.target.value)}
            />
          </label>
        </div>

        <label>
          Purchase Price Optional
          <input
            placeholder="18.00"
            type="number"
            min="0"
            step="0.01"
            value={form.purchasePrice}
            onChange={(event) => updateField("purchasePrice", event.target.value)}
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button className="primary-button" type="submit">
          Add to Collection
        </button>
      </form>
    </section>
  );
}