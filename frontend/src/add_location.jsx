import React, { useState } from "react";
import axios from "axios";

const AddLocation = () => {
  const [label, setLabel] = useState("");
  const [xCoord, setXCoord] = useState("");
  const [yCoord, setYCoord] = useState("");
  const [space, setSpace] = useState("");
  const [message, setMessage] = useState(null);

  const handleAddLocation = () => {
    axios
      .post("http://localhost:8081/add_location", {
        label,
        x_coord: xCoord,
        y_coord: yCoord,
        space,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Location added successfully!");
        } else {
          setMessage("Failed to add location. Please check your input.");
        }
      })
      .catch((err) => {
        setMessage("Failed to add location. Please check your input.");
        console.error(err);
      });
  };

  return (
    <div className="container mt-5">
      <h3>Procedure: Add Location</h3>
      <div className="form-group mt-3">
        <label>label:</label>
        <input
          type="text"
          className="form-control"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>x_coord:</label>
        <input
          type="number"
          className="form-control"
          value={xCoord}
          onChange={(e) => setXCoord(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>y_coord:</label>
        <input
          type="number"
          className="form-control"
          value={yCoord}
          onChange={(e) => setYCoord(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>space:</label>
        <input
          type="number"
          className="form-control"
          value={space}
          onChange={(e) => setSpace(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-primary" onClick={handleAddLocation}>
          Add
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setLabel("");
            setXCoord("");
            setYCoord("");
            setSpace("");
            setMessage(null);
          }}
        >
          Cancel
        </button>
      </div>
      {message && (
        <div
          className={`mt-3 alert ${
            message.includes("successfully")
              ? "alert-success"
              : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AddLocation;