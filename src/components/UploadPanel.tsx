export function UploadPanel() {
  return (
    <section className="panel identify-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Image-assisted recognition</p>
          <h2>Identify a Minifigure</h2>
        </div>
      </div>

      <div className="upload-zone">
        <div className="upload-icon">📸</div>
        <h3>Upload a minifigure photo</h3>
        <p>
          The first version will return mock candidates. Later, this will send
          the image to a FastAPI backend and compare it against known LEGO
          minifigure images.
        </p>

        <label className="primary-button">
          Choose Image
          <input type="file" accept="image/*" hidden />
        </label>
      </div>

      <div className="mock-result">
        <p className="eyebrow">Mock Recognition Result</p>
        <h3>Possible match: Clone Trooper Phase 1</h3>
        <p>
          Confidence: <strong>84%</strong>
        </p>
        <div className="result-actions">
          <button className="primary-button">Confirm & Add</button>
          <button className="ghost-button">View Alternatives</button>
        </div>
      </div>
    </section>
  );
}