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

  return (
    <div className="container mt-5">
      <h3>Procedure: Add Driver Role</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>License ID:</label>
          <input
            type="text"
            className="form-control"
            name="licenseID"
            value={formData.licenseID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>License Type:</label>
          <input
            type="text"
            className="form-control"
            name="licenseType"
            value={formData.licenseType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Driver Experience (years):</label>
          <input
            type="number"
            className="form-control"
            name="driverExperience"
            value={formData.driverExperience}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Add Driver Role
        </button>
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
  );
};

export default AddDriverRole;

