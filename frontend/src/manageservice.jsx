import React from 'react';

const ManageService = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-15%' }}>
      <div className="d-flex align-items-center flex-column w-50">
      <h5>Manage Service</h5>
      <form action="/manage_service" className="w-50">
        <div className="mb-3 mt-3">
          <label htmlFor="username" className="form-label">
            Worker Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Enter worker's username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="serviceId" className="form-label">
            Delivery Service ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="serviceId"
            name="serviceId"
            placeholder="Enter delivery service ID"
          />
        </div>
        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">
            Appoint Manager
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ManageService;
