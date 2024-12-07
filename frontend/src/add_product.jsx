import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [message, setMessage] = useState(null);

  const handleAddProduct = () => {
    axios
      .post("http://localhost:8081/add_product", {
        barcode,
        name,
        weight,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Product added successfully.");
        } else {
          setMessage("Failed to add product. Please check your input.");
        }
      })
      .catch((err) => {
        setMessage("Failed to add product. Please check your input.");
        console.error(err);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-13%' }}>
      <div className="d-flex align-items-center flex-column w-50">
      <h5>Add Product</h5>

      <div className="form-group mt-3 w-50">
        <label>Barcode:</label>
        <input
          type="text"
          className="form-control"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
      </div>

      <div className="form-group mt-3 w-50">
        <label>Name:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group mt-3 w-50">
        <label>Weight:</label>
        <input
          type="number"
          className="form-control"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-primary" onClick={handleAddProduct}>
          Add
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setBarcode("");
            setName("");
            setWeight("");
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
    </div>
  );
};

export default AddProduct;
