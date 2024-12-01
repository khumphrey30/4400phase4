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
        <div>
            <h1>Add Driver Role</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    License ID:
                    <input
                        type="text"
                        name="licenseID"
                        value={formData.licenseID}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    License Type:
                    <input
                        type="text"
                        name="licenseType"
                        value={formData.licenseType}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Driver Experience:
                    <input
                        type="number"
                        name="driverExperience"
                        value={formData.driverExperience}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Add Driver Role</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddDriverRole;

