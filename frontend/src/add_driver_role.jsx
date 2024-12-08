import React, { useState } from "react";
import axios from "axios";

const AddDriverRole = () => {
  const [values, setValues] = useState({
    username: "",
    licenseID: "",
    licenseType: "",
    driverExperience: "",
  });

  const [message, setMessage] = useState(null);

  const handleAddDriverRole = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!values.username || !values.licenseID || !values.licenseType || !values.driverExperience) {
      setMessage("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/add_driver_role", values);

      if (response.status === 200) {
        setMessage("Driver added successfully.");
        setValues({
          username: "",
          licenseID: "",
          licenseType: "",
          driverExperience: "",
        }); // Reset the form
      } else {
        setMessage("Failed to add driver. Please check your input.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add driver. Please check your input.");
      console.error("Error during POST request:", error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: "1%" }}>
      <div className="d-flex align-items-center flex-column w-50">
        <h5>Add Driver Role</h5>
        <form className="w-50" onSubmit={handleAddDriverRole}>
          <div className="mb-3 mt-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              name="username"
              onChange={(e) => setValues({ ...values, username: e.target.value })}
              value={values.username}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="licenseID" className="form-label">License ID:</label>
            <input
              type="text"
              className="form-control"
              id="licenseID"
              name="licenseID"
              onChange={(e) => setValues({ ...values, licenseID: e.target.value })}
              placeholder="Enter license ID"
              value={values.licenseID}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="licenseType" className="form-label">License Type:</label>
            <input
              type="text"
              className="form-control"
              id="licenseType"
              placeholder="Enter license type"
              name="licenseType"
              onChange={(e) => setValues({ ...values, licenseType: e.target.value })}
              value={values.licenseType}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="driverExperience" className="form-label">Driver Experience (Successful Trips):</label>
            <input
              type="number"
              className="form-control"
              id="driverExperience"
              placeholder="Enter successful trips"
              name="driverExperience"
              onChange={(e) => setValues({ ...values, driverExperience: e.target.value })}
              value={values.driverExperience}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        {message && (
          <div className={`mt-3 alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDriverRole;
