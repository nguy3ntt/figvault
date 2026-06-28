export function ManualAddForm() {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Manual input</p>
          <h2>Add Minifigure</h2>
        </div>
      </div>

      <form className="manual-form">
        <label>
          Minifigure Code
          <input placeholder="e.g. sw0173" />
        </label>

        <label>
          Name
          <input placeholder="e.g. Clone Trooper Phase 1" />
        </label>

        <label>
          Theme
          <input placeholder="e.g. Star Wars" />
        </label>

        <div className="form-row">
          <label>
            Year
            <input placeholder="2008" type="number" />
          </label>

          <label>
            Quantity
            <input placeholder="1" type="number" />
          </label>
        </div>

        <div className="form-row">
          <label>
            Condition
            <select defaultValue="Excellent">
              <option>New</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Worn</option>
              <option>Damaged</option>
            </select>
          </label>

          <label>
            Estimated Value
            <input placeholder="34.00" type="number" />
          </label>
        </div>

        <button className="primary-button" type="button">
          Add to Collection
        </button>
      </form>
    </section>
  );
}