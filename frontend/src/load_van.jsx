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
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-7%' }}>
      <div className="d-flex align-items-center flex-column w-50">
      <h5>Load Van</h5>
      <form className="w-50">
        <div className="mb-3 mt-3">
          <label htmlFor="vanId" className="form-label">
            Van ID:
          </label>
          <select
            className="form-control"
            value={selectedVan}
            onChange={(e) => setSelectedVan(e.target.value)}
            id="vanId"
          >
            <option value="" disabled>
              Select a van ID
            </option>
            {vans.map((van) => (
              <option key={van.id} value={van.id}>
                {van.id}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag:
          </label>
          <input
            type="number"
            className="form-control"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter tag"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productBarcode" className="form-label">
            Barcode:
          </label>
          <select
            className="form-control"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            id="productBarcode"
          >
            <option value="" disabled>
              Select a barcode
            </option>
            {products.map((product) => (
              <option key={product.barcode} value={product.barcode}>
                {product.barcode}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="numPackages" className="form-label">
            Number of Packages:
          </label>
          <input
            type="number"
            className="form-control"
            id="numPackages"
            value={numPackages}
            onChange={(e) => setNumPackages(e.target.value)}
            placeholder="Enter number of packages"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </div>

        <div className="d-flex gap-2 mt-4">
          <button type="button" className="btn btn-primary" onClick={handleLoadVan}>
            Deliver
          </button>
          <button
            type="button"
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

export default LoadVan;
