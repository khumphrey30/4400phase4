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
        <div className="container mt-5">
            <h3>Add Employee</h3>
            <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* First Name */}
                <div className="form-group mb-3">
                    <label htmlFor="firstName" className="form-label">First Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Last Name */}
                <div className="form-group mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Address */}
                <div className="form-group mb-3">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Birthdate */}
                <div className="form-group mb-3">
                    <label htmlFor="birthdate" className="form-label">Birthdate:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="birthdate"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Tax ID */}
                <div className="form-group mb-3">
                    <label htmlFor="taxID" className="form-label">Tax ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="taxID"
                        name="taxID"
                        value={formData.taxID}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Hired Date */}
                <div className="form-group mb-3">
                    <label htmlFor="hired" className="form-label">Hired Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="hired"
                        name="hired"
                        value={formData.hired}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Employee Experience */}
                <div className="form-group mb-3">
                    <label htmlFor="employeeExperience" className="form-label">
                        Experience (Years):
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="employeeExperience"
                        name="employeeExperience"
                        value={formData.employeeExperience}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Salary */}
                <div className="form-group mb-3">
                    <label htmlFor="salary" className="form-label">Salary:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setFormData({
                            username: '',
                            firstName: '',
                            lastName: '',
                            address: '',
                            birthdate: '',
                            taxID: '',
                            hired: '',
                            employeeExperience: '',
                            salary: '',
                        })}
                    >
                        Reset
                    </button>
                </div>
            </form>

            {/* Message */}
            {message && (
                <div
                    className={`mt-3 alert ${
                        message.includes('successfully') ? 'alert-success' : 'alert-danger'
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default AddEmployee;
