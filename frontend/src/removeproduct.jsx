import React, { useState, useEffect } from "react";
import axios from "axios";

const RemoveProduct = () => {
  const [barcodes, setBarcodes] = useState([]); // To store available barcodes
  const [selectedBarcode, setSelectedBarcode] = useState("");
  const [message, setMessage] = useState(null); // For success/failure messages

  useEffect(() => {
    // Fetch the list of barcodes from the database
    axios
      .get("http://localhost:8081/get_barcodes")
      .then((res) => setBarcodes(res.data))
      .catch((err) => console.error("Error fetching barcodes:", err));
  }, []);

  const handleRemoveProduct = () => {
    if (!selectedBarcode) {
      setMessage("Please select a barcode to remove.");
      return;
    }

    axios
      .post("http://localhost:8081/remove_product", {
        barcode: selectedBarcode,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Product removed successfully!");
          // Remove the barcode from the dropdown list
          setBarcodes((prev) => prev.filter((barcode) => barcode !== selectedBarcode));
          setSelectedBarcode("");
        } else {
          setMessage("Failed to remove product. Please check your input.");
        }
      })
      .catch((err) => {
        setMessage("Failed to remove product. Please check your input.");
        console.error(err);
      });
  };

  return (
    <div className="container mt-5">
      <h3>Procedure: Remove Product</h3>
      <div className="form-group mt-3">
        <label>Barcode:</label>
        <select
          className="form-control"
          value={selectedBarcode}
          onChange={(e) => setSelectedBarcode(e.target.value)}
        >
          <option value="">-- Select a Barcode --</option>
          {barcodes.map((barcode) => (
            <option key={barcode} value={barcode}>
              {barcode}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-danger" onClick={handleRemoveProduct}>
          Remove
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSelectedBarcode("");
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

/*
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
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-15%' }}>
      <div className="d-flex align-items-center flex-column w-50">
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
    </div>
  );
};

export default RemoveProduct;


*/