import React, { useState } from "react";
import axios from "axios";

const RemoveProduct = () => {
  const [barcode, setBarcode] = useState("");
  const [message, setMessage] = useState(null);

  const handleRemove = () => {
    axios
      .post("http://localhost:8081/remove_product", { barcode })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Product removed successfully!");
        } else {
          setMessage("Failed to remove product. Please check the barcode.");
        }
      })
      .catch((err) => {
        setMessage("Failed to remove product. Please check the barcode.");
        console.error(err);
      });
  };

  return (
    <div className="d-flex align-items-center flex-column mt-3 w-50">
      <h5>Remove Product</h5>

      <div className="form-group mt-3 w-50">
        <label>Product Barcode:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter product barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-danger" onClick={handleRemove}>
          Remove Product
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setBarcode("");
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

export default RemoveProduct;


