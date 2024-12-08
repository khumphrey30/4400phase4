import React from 'react';

const RemoveDriverRole = () => {
  return (
      <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-10%' }}>
        <div className="d-flex align-items-center flex-column w-50">
      <h5>Remove Driver Role</h5>
      <form action="/remove_driver_role" className="w-50">
        <div className="mb-3 mt-3">
          <label htmlFor="username" className="form-label">
            Driver Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Enter driver's username"
          />
        </div>
        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-danger">
            Remove Driver
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default RemoveDriverRole;
