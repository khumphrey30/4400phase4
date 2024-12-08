import React, { useState } from 'react';
import axios from 'axios';

function RemoveDriverRole() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/remove_driver_role', { username });
            setMessage('Driver role removed successfully!');
            setError('');
            // Clear form
            setUsername('');
        } catch (err) {
            setError(err.response?.data?.Error || 'An error occurred');
            setMessage('');
        }
    };

    return (
        <div className="container">
            <h2>Remove Driver Role</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-danger">Remove Driver Role</button>
            </form>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default RemoveDriverRole;
/*
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
*/