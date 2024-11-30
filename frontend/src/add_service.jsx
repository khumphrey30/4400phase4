import React, { useState } from "react";
import axios from "axios";

const AddService = () => {
  const [id, setId] = useState("");
  const [longName, setLongName] = useState("");
  const [homeBase, setHomeBase] = useState("");
  const [manager, setManager] = useState("");
  const [message, setMessage] = useState(null); // For success/failure messages

  const handleAddService = () => {
    axios
      .post("http://localhost:8081/add_service", {
        id,
        long_name: longName,
        home_base: homeBase,
        manager,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Valid Input"); // this doesn't necessarily mean the service was added
        } else {
          setMessage("Failed to add service. Please check your input.");
        }
      })
      .catch((err) => {
        setMessage("Failed to add service. Please check your input.");
        console.error(err);
      });
  };

  return (
    <div className="container mt-5">
      <h3>Procedure: Add Service</h3>
      <div className="form-group mt-3">
        <label>id:</label>
        <input
          type="text"
          className="form-control"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>long_name:</label>
        <input
          type="text"
          className="form-control"
          value={longName}
          onChange={(e) => setLongName(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>home_base:</label>
        <input
          type="text"
          className="form-control"
          value={homeBase}
          onChange={(e) => setHomeBase(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>manager:</label>
        <input
          type="text"
          className="form-control"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-primary" onClick={handleAddService}>
          Add
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setId("");
            setLongName("");
            setHomeBase("");
            setManager("");
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

export default AddService;
