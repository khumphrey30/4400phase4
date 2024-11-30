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
    <div className="container mt-5">
      <h3>Procedure: Refuel Van</h3>
      <div className="form-group mt-3">
        <label>Id:</label>
        <select
          className="form-control"
          value={selectedVan}
          onChange={(e) => setSelectedVan(e.target.value)}
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
      <div className="form-group mt-3">
        <label>Tag:</label>
        <input
          type="number"
          className="form-control"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>More Fuel:</label>
        <input
          type="number"
          className="form-control"
          value={fuelAmount}
          onChange={(e) => setFuelAmount(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-primary" onClick={handleRefuelVan}>
          Refuel
        </button>
        <button
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
  );
};

export default RefuelVan;