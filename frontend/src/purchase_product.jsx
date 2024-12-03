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
    <div className="d-flex align-items-center flex-column mt-3 w-50">
      <h5>Add Location</h5>
      <form className="w-100">
        <div className="form-group mt-3">
          <label htmlFor="label">Label:</label>
          <input
            type="text"
            className="form-control"
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter location label"
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="xCoord">X Coordinate:</label>
          <input
            type="number"
            className="form-control"
            id="xCoord"
            value={xCoord}
            onChange={(e) => setXCoord(e.target.value)}
            placeholder="Enter X Coordinate"
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="yCoord">Y Coordinate:</label>
          <input
            type="number"
            className="form-control"
            id="yCoord"
            value={yCoord}
            onChange={(e) => setYCoord(e.target.value)}
            placeholder="Enter Y Coordinate"
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="space">Space:</label>
          <input
            type="number"
            className="form-control"
            id="space"
            value={space}
            onChange={(e) => setSpace(e.target.value)}
            placeholder="Enter space value"
          />
        </div>

        <div className="d-flex gap-2 mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddLocation}
          >
            Add Location
          </button>
          <button
            type="button"
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
      </form>

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
