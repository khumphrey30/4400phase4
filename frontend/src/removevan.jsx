import React from "react";

const RemoveVan = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-10%' }}>
      <div className="d-flex align-items-center flex-column w-50">
      <h5>Remove Van</h5>
      <form action="/remove_van" className="w-50">
        <div className="mb-3 mt-3">
          <label htmlFor="serviceId" className="form-label">
            Delivery Service ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="serviceId"
            placeholder="Enter delivery service ID"
            name="serviceId"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="vanTag" className="form-label">
            Van Tag:
          </label>
          <input
            type="number"
            className="form-control"
            id="vanTag"
            placeholder="Enter van tag"
            name="vanTag"
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Remove Van
        </button>
      </form>
    </div>
    </div>
  );
};

export default RemoveVan;
