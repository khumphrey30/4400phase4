import React, { useState } from "react";
import axios from "axios";

const AddVan = () => {
  const [values, setValues] = useState({
    id: "",
    tag: "",
    fuel: "",
    capacity: "",
    sales: "",
    driven_by: ""
  });

  const [message, setMessage] = useState(null); // State for messages

  const handleAddVan = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/addvan", values);

      if (response.status === 200) {
        setMessage("Van added successfully.");
        setValues({
          id: "",
          tag: "",
          fuel: "",
          capacity: "",
          sales: "",
          driven_by: ""
        });
      } else {
        setMessage("Failed to add van. Please check your input.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add van. Please check your input.");
      console.error("Error during POST request:", error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: "1%" }}>
      <div className="d-flex align-items-center flex-column w-50">
        <h5>Add Van</h5>
        <form className="w-50" onSubmit={handleAddVan}>
          <div className="mb-3 mt-3">
            <label htmlFor="deliveryServiceId" className="form-label">
              Delivery Service ID:
            </label>
            <input
              type="text"
              className="form-control"
              id="deliveryServiceId"
              name="deliveryServiceId"
              placeholder="Enter delivery service ID"
              onChange={(e) => setValues({ ...values, id: e.target.value })}
              value={values.id}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="vanTag" className="form-label">
              Van Tag:
            </label>
            <input
              type="text"
              className="form-control"
              id="vanTag"
              name="vanTag"
              placeholder="Enter van tag"
              onChange={(e) => setValues({ ...values, tag: e.target.value })}
              value={values.tag}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fuel" className="form-label">
              Fuel:
            </label>
            <input
              type="number"
              className="form-control"
              id="fuel"
              name="fuel"
              placeholder="Enter fuel amount"
              onChange={(e) => setValues({ ...values, fuel: e.target.value })}
              value={values.fuel}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="capacity" className="form-label">
              Capacity:
            </label>
            <input
              type="number"
              className="form-control"
              id="capacity"
              name="capacity"
              placeholder="Enter capacity"
              onChange={(e) => setValues({ ...values, capacity: e.target.value })}
              value={values.capacity}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sales" className="form-label">
              Sales:
            </label>
            <input
              type="number"
              className="form-control"
              id="sales"
              name="sales"
              placeholder="Enter sales amount"
              onChange={(e) => setValues({ ...values, sales: e.target.value })}
              value={values.sales}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="driverUsername" className="form-label">
              Driver Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="driverUsername"
              name="driverUsername"
              placeholder="Enter driver username"
              onChange={(e) => setValues({ ...values, driven_by: e.target.value })}
              value={values.driven_by}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
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
    </div>
  );
};

export default AddVan;
