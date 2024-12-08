import React, { useState, useEffect } from "react";
import axios from "axios";

const RefuelVan = () => {
  const [vans, setVans] = useState([]); // List of vans for the dropdown
  const [selectedVan, setSelectedVan] = useState("");
  const [tag, setTag] = useState("");
  const [fuelAmount, setFuelAmount] = useState("");
  const [message, setMessage] = useState(null);

  // Fetch vans for the dropdown
  useEffect(() => {
    axios
      .get("http://localhost:8081/vans")
      .then((res) => {
        setVans(res.data);
      })
      .catch((err) => console.error("Error fetching vans:", err));
  }, []);

  const handleRefuelVan = () => {
    axios
      .post("http://localhost:8081/refuel_van", {
        id: selectedVan,
        tag,
        amount: fuelAmount,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Van refueled successfully!");
        } else {
          setMessage("Failed to refuel van. Please check your input.");
        }
      })
      .catch((err) => {
        setMessage("Failed to refuel van. Please check your input.");
        console.error(err);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-10%' }}>
      <div className="d-flex align-items-center flex-column w-50">
      <h5>Refuel Van</h5>
      <form className="w-50">
        {/* Van selection */}
        <div className="mb-3">
          <label htmlFor="vanId" className="form-label">
            Van ID:
          </label>
          <select
            className="form-control"
            value={selectedVan}
            onChange={(e) => setSelectedVan(e.target.value)}
            id="vanId"
          >
            <option value="" disabled>
              Select a van ID
            </option>
            {vans.map((van) => (
              <option key={van.id} value={van.id}>
                {van.id}
              </option>
            ))}
          </select>
        </div>

        {/* Tag input */}
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag:
          </label>
          <input
            type="number"
            className="form-control"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter tag"
          />
        </div>

        {/* Fuel amount input */}
        <div className="mb-3">
          <label htmlFor="fuelAmount" className="form-label">
            More Fuel:
          </label>
          <input
            type="number"
            className="form-control"
            id="fuelAmount"
            value={fuelAmount}
            onChange={(e) => setFuelAmount(e.target.value)}
            placeholder="Enter fuel amount"
          />
        </div>

        {/* Action buttons */}
        <div className="d-flex gap-2 mt-4">
          <button type="button" className="btn btn-primary" onClick={handleRefuelVan}>
            Refuel
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setSelectedVan("");
              setTag("");
              setFuelAmount("");
              setMessage(null);
            }}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Message feedback */}
      {message && (
        <div
          className={`mt-3 alert ${
            message.includes("successfully") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
    </div>
    </div>
  );
};

export default RefuelVan;


