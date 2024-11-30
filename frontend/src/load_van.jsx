import React, { useState, useEffect } from "react";
import axios from "axios";

const LoadVan = () => {
  const [vans, setVans] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedVan, setSelectedVan] = useState("");
  const [tag, setTag] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [numPackages, setNumPackages] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8081/vans").then((res) => {
      setVans(res.data);
    }).catch(err => console.error("Error fetching vans:", err));

    axios.get("http://localhost:8081/products").then((res) => {
      setProducts(res.data);
    }).catch(err => console.error("Error fetching products:", err));
  }, []);

  const handleLoadVan = () => {
    axios
      .post("http://localhost:8081/load_van", {
        id: selectedVan,
        tag,
        barcode: selectedProduct,
        num_packages: numPackages,
        price,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Van loaded successfully!");
        } else {
          setMessage("Failed to load van. Please check your input.");
        }
      })
      .catch((err) => {
        setMessage("Failed to load van. Please check your input.");
        console.error(err);
      });
  };

  return (
    <div className="container mt-5">
      <h3>Procedure: Load Van</h3>
      <div className="form-group mt-3">
        <label>ID:</label>
        <select
          className="form-control"
          value={selectedVan}
          onChange={(e) => setSelectedVan(e.target.value)}
        >
          <option value="" disabled>Select a van ID</option>
          {vans.map((van) => (
            <option key={van.id} value={van.id}>
              {van.id}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label>tag:</label>
        <input
          type="number"
          className="form-control"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>barcode:</label>
        <select
          className="form-control"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="" disabled>Select a barcode</option>
          {products.map((product) => (
            <option key={product.barcode} value={product.barcode}>
              {product.barcode}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label>num. packages:</label>
        <input
          type="number"
          className="form-control"
          value={numPackages}
          onChange={(e) => setNumPackages(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>price:</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-primary" onClick={handleLoadVan}>
          Deliver
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSelectedVan("");
            setTag("");
            setSelectedProduct("");
            setNumPackages("");
            setPrice("");
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

export default LoadVan;