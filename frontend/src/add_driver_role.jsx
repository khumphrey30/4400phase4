import React, { useState } from 'react';
import axios from 'axios';

const AddDriverRole = () => {
  const [formData, setFormData] = useState({
    username: '',
    licenseID: '',
    licenseType: '',
    driverExperience: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/add-driver-role', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.error || 'An error occurred. Please try again.'
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      username: '',
      licenseID: '',
      licenseType: '',
      driverExperience: '',
    });
    setMessage('');
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-10%' }}>
      <div className="d-flex align-items-center flex-column w-50">
        <h5>Add Driver Role</h5>
        <form className="w-50" onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="licenseID" className="form-label">License ID:</label>
            <input
              type="text"
              className="form-control"
              id="licenseID"
              name="licenseID"
              value={formData.licenseID}
              onChange={handleChange}
              placeholder="Enter license ID"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="licenseType" className="form-label">License Type:</label>
            <input
              type="text"
              className="form-control"
              id="licenseType"
              name="licenseType"
              value={formData.licenseType}
              onChange={handleChange}
              placeholder="Enter license type"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="driverExperience" className="form-label">Driver Experience (years):</label>
            <input
              type="number"
              className="form-control"
              id="driverExperience"
              name="driverExperience"
              value={formData.driverExperience}
              onChange={handleChange}
              placeholder="Enter years of experience"
              required
            />
          </div>
          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
        {message && (
          <div
            className={`mt-3 alert ${
              message.toLowerCase().includes('error') ? 'alert-danger' : 'alert-success'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDriverRole;
