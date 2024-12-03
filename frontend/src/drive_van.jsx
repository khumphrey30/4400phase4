import React, { useState, useEffect } from "react";
import axios from "axios";

const DriveVan = () => {
  const [vans, setVans] = useState([]);
  const [selectedVan, setSelectedVan] = useState("");
  const [tag, setTag] = useState("");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/vans")
      .then((res) => {
        setVans(res.data);
      })
      .catch((err) => console.error("Error fetching vans:", err));
  }, []);

  const handleDriveVan = () => {
    axios
      .post("http://localhost:8081/drive_van", {
        id: selectedVan,
        tag,
        destination,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Van driven successfully!");
        } else {
          setMessage("Failed to drive van. Please check your input.");
        }
      })
      .catch((err) => {
        setMessage("Failed to drive van. Please check your input.");
        console.error(err);
      });
  };

  return (
    <div className="d-flex align-items-center flex-column mt-3 w-50">
      <h5>Drive Van</h5>
      <form className="w-50">
        <div className="mb-3 mt-3">
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
            placeholder="Enter tag"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="destination" className="form-label">
            Destination:
          </label>
          <input
            type="text"
            className="form-control"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
          />
        </div>

        <div className="d-flex gap-2 mt-4">
          <button type="button" className="btn btn-primary" onClick={handleDriveVan}>
            Drive
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setSelectedVan("");
              setTag("");
              setDestination("");
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
            message.includes("successfully") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default DriveVan;
