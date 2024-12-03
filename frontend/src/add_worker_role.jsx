import React, { useState } from 'react';
import axios from 'axios';

const AddWorkerRole = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('/api/add-worker-role', { username });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    }
  };

  const handleCancel = () => {
    setUsername('');
    setMessage('');
  };

  return (
    <div className="d-flex align-items-center flex-column mt-3 w-50">
      <h5>Add Worker Role</h5>
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">
            Add Role
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
  );
};

export default AddWorkerRole;

