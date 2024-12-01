import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        address: '',
        birthdate: '',
        taxID: '',
        hired: '',
        employeeExperience: '',
        salary: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/add-employee', formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(
                error.response?.data?.error || 'An error occurred. Please try again.'
            );
        }
    };

    return (
        <div>
            <h1>Add New Employee</h1>
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
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Birthdate:
                    <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Tax ID:
                    <input
                        type="text"
                        name="taxID"
                        value={formData.taxID}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Hired Date:
                    <input
                        type="date"
                        name="hired"
                        value={formData.hired}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Experience (Years):
                    <input
                        type="number"
                        name="employeeExperience"
                        value={formData.employeeExperience}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Salary:
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Add Employee</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddEmployee;
