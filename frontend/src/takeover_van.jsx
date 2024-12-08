import React, { useState, useEffect } from "react";
import axios from "axios";

const TakeoverVan = () => {
  const [drivers, setDrivers] = useState([]); // List of drivers for the dropdown
  const [vans, setVans] = useState([]); // List of vans for the dropdown
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedVan, setSelectedVan] = useState("");
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState(null);

  // Fetch dropdown data on component load
  useEffect(() => {
    axios
      .get("http://localhost:8081/drivers")
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((err) => console.error("Error fetching drivers:", err));

    axios
      .get("http://localhost:8081/vans")
      .then((res) => {
        setVans(res.data);
      })
      .catch((err) => console.error("Error fetching vans:", err));
  }, []);

  const handleTakeoverVan = () => {
    axios
      .post("http://localhost:8081/takeover_van", {
        username: selectedDriver,
        id: selectedVan,
        tag,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Van takeover successful!");
        } else {
          setMessage("Failed to takeover van. Please check your input.");
        }
      })
      .catch((err) => {
        setMessage("Failed to takeover van. Please check your input.");
        console.error(err);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-5%' }}>
      <div className="d-flex align-items-center flex-column w-50">
      <h5>Takeover Van</h5>
      <form className="w-50">
        <div className="mb-3 mt-3">
          <label htmlFor="driver" className="form-label">
            Username:
          </label>
          <select
            className="form-control"
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            id="driver"
          >
            <option value="" disabled>
              Select a driver
            </option>
            {drivers.map((driver) => (
              <option key={driver.username} value={driver.username}>
                {driver.username}
              </option>
            ))}
          </select>
        </div>

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
            placeholder="Enter van tag"
          />
        </div>

        <div className="d-flex gap-2 mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleTakeoverVan}
          >
            Add
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setSelectedDriver("");
              setSelectedVan("");
              setTag("");
              setMessage(null);
            }}
          >
            Cancel
          </button>
        </div>
      </form>

      {message && (
        <div
          className={`mt-3 alert ${
            message.includes("successful") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
    </div>
    </div>
  );
};

export default TakeoverVan;

