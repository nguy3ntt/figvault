import { useEffect, useState } from "react";
import type { MinifigFormInput } from "../types";

type UploadPanelProps = {
  onConfirmMatch: (input: MinifigFormInput) => void;
};

const mockCandidate: MinifigFormInput = {
  figCode: "sw0173",
  name: "Obi Wan Kenobi",
  theme: "Star Wars",
  year: 2007,
  condition: "Excellent",
  quantity: 1,
  estimatedValue: 34,
  purchasePrice: undefined,
};

export function UploadPanel({ onConfirmMatch }: UploadPanelProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
    setConfirmed(false);
  }

  function handleConfirm() {
    onConfirmMatch(mockCandidate);
    setConfirmed(true);
  }

  return (
    <section className="panel identify-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Image-assisted recognition</p>
          <h2>Identify a Minifigure</h2>
        </div>
      </div>

      <div className="upload-zone">
        {previewUrl ? (
          <img className="uploaded-preview" src={previewUrl} alt="Uploaded minifigure preview" />
        ) : (
          <div className="upload-icon">📸</div>
        )}

        <h3>Upload a minifigure photo</h3>
        <p>
          This version uses a mock recognition result. Later, the image will be sent to
          the FastAPI backend and compared with known minifigure images.
        </p>

        <label className="primary-button">
          Choose Image
          <input type="file" accept="image/*" hidden onChange={handleImageChange} />
        </label>
      </div>

      <div className="mock-result">
        <p className="eyebrow">Mock Recognition Result</p>
        <h3>Possible match: {mockCandidate.name}</h3>
        <p>
          Code: <strong>{mockCandidate.figCode}</strong> · Confidence:{" "}
          <strong>84%</strong>
        </p>

        <div className="result-actions">
          <button className="primary-button" onClick={handleConfirm}>
            Confirm & Add
          </button>
          <button className="ghost-button">View Alternatives</button>
        </div>

        {confirmed && (
          <p className="success-message">
            Added to collection. If it already existed, quantity was increased.
          </p>
        )}
      </div>
    </section>
  );
}