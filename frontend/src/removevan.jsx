import React, { useState } from 'react';
import axios from 'axios';

function RemoveVan() {
    const [formData, setFormData] = useState({
        id: '',
        tag: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/remove_van', formData);
            setMessage('Van removed successfully!');
            setError('');
            // Clear form
            setFormData({
                id: '',
                tag: ''
            });
        } catch (err) {
            setError(err.response?.data?.Error || 'An error occurred');
            setMessage('');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container">
            <h2>Remove Van</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Van ID:</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Van Tag:</label>
                    <input
                        type="text"
                        name="tag"
                        value={formData.tag}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-danger">Remove Van</button>
            </form>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default RemoveVan;
/*
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
*/