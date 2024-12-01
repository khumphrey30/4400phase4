
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
    <div>
      <h2>Add Worker Role</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Role</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddWorkerRole;
