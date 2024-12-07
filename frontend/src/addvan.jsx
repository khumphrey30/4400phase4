import React from 'react';

const AddVan = () => {
  return (
      <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-5%' }}>
      <div className="d-flex align-items-center flex-column w-50">
      <h5>Add Van</h5>
      <form action="/add_van" className="w-50">
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
            name="vanTag"
            placeholder="Enter van tag"
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

export default AddVan;
