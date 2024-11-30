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
    <div className="container mt-5">
      <h3>Procedure: Drive Van</h3>
      <div className="form-group mt-3">
        <label>ID:</label>
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
        <label>Destination:</label>
        <input
          type="text"
          className="form-control"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-primary" onClick={handleDriveVan}>
          Drive
        </button>
        <button
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