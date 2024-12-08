import React, { useState } from "react";
import axios from "axios";

const ManageService = () => {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState(null); // For success/failure messages

  const handleManageService = () => {
    axios
      .post("http://localhost:8081/manage_service", {
        username,
        id,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Service management initiated successfully!");
        } else {
          setMessage("Failed to initiate service management. Please check your input.");
        }
      })
      .catch((err) => {
        setMessage("Failed to initiate service management. Please check your input.");
        console.error(err);
      });
  };

  return (
    <div className="container mt-5">
      <h3>Procedure: Manage Service</h3>
      <div className="form-group mt-3">
        <label>username:</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>ID:</label>
        <input
          type="text"
          className="form-control"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-primary" onClick={handleManageService}>
          Begin
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setUsername("");
            setId("");
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

export default ManageService;

/*
const ManageService = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-10%' }}>
      <div className="d-flex align-items-center flex-column w-50">
      <h5>Manage Service</h5>
      <form action="/manage_service" className="w-50">
        <div className="mb-3 mt-3">
          <label htmlFor="username" className="form-label">
            Worker Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Enter worker's username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="serviceId" className="form-label">
            Delivery Service ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="serviceId"
            name="serviceId"
            placeholder="Enter delivery service ID"
          />
        </div>
        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">
            Appoint Manager
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ManageService;
*/