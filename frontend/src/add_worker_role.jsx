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

  return (
    <div className="container mt-5">
      <h3>Procedure: Add Worker Role</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Role
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

export default AddWorkerRole;
