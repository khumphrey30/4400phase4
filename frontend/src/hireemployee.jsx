import React, { useState } from "react";
import axios from "axios";

const HireEmployee = () => {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState(null); // For success/failure messages

  const handleHireEmployee = () => {
    axios
      .post("http://localhost:8081/hire_employee", {
        username,
        id,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Employee hired successfully!");
        } else {
          setMessage("Failed to hire employee. Please check your input.");
        }
      })
      .catch((err) => {
        setMessage("Failed to hire employee. Please check your input.");
        console.error(err);
      });
  };

  return (
    <div className="container mt-5">
      <h3>Procedure: Hire Employee</h3>
      <div className="form-group mt-3">
        <label>Username:</label>
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
        <button className="btn btn-primary" onClick={handleHireEmployee}>
          Hire
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
            message.includes("successfully") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default HireEmployee;
/*
const HireEmployee = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-10%' }}>
      <div className="d-flex align-items-center flex-column w-50">
      <h5>Hire Employee</h5>
      <form action="/hire_employee" className="w-50">
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
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default HireEmployee;
*/