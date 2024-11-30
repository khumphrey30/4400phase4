import React, { useState, useEffect } from "react";
import axios from "axios";

const PurchaseProduct = () => {
  const [services, setServices] = useState([]); // List of services for dropdown
  const [barcodes, setBarcodes] = useState([]); // List of barcodes for dropdown
  const [selectedService, setSelectedService] = useState("");
  const [selectedBarcode, setSelectedBarcode] = useState("");
  const [tag, setTag] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState(null);

  // Fetch services for dropdown
  useEffect(() => {
    axios
      .get("http://localhost:8081/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Fetch barcodes for dropdown
  useEffect(() => {
    axios
      .get("http://localhost:8081/barcodes")
      .then((res) => setBarcodes(res.data))
      .catch((err) => console.error("Error fetching barcodes:", err));
  }, []);

  const handlePurchase = () => {
    axios
      .post("http://localhost:8081/purchase_product", {
        long_name: selectedService,
        id: selectedService,
        tag,
        barcode: selectedBarcode,
        quantity,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Product purchased successfully!");
        } else {
          setMessage("Failed to purchase product. Please check your input.");
        }
      })
      .catch((err) => {
        setMessage("Failed to purchase product. Please check your input.");
        console.error(err);
      });
  };

  return (
    <div className="container mt-5">
      <h3>Procedure: Purchase Product</h3>
      <div className="form-group mt-3">
        <label>Long Name:</label>
        <select
          className="form-control"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.long_name} value={service.long_name}>
              {service.long_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label>ID:</label>
        <select
          className="form-control"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="" disabled>
            Select an ID
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.id}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label>Tag:</label>
        <input
          type="number"
          className="form-control"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>Barcode:</label>
        <select
          className="form-control"
          value={selectedBarcode}
          onChange={(e) => setSelectedBarcode(e.target.value)}
        >
          <option value="" disabled>
            Select a barcode
          </option>
          {barcodes.map((barcode) => (
            <option key={barcode} value={barcode}>
              {barcode}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label>Quantity:</label>
        <input
          type="number"
          className="form-control"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-primary" onClick={handlePurchase}>
          Purchase
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSelectedService("");
            setSelectedBarcode("");
            setTag("");
            setQuantity("");
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

export default PurchaseProduct;