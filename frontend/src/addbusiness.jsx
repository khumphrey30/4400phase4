import React, { useState } from "react";
import axios from 'axios';

const AddBusiness = () => {
    const [values, setValues] = useState({
        long_name: "",
        rating: "",
        spent: "",
        location: ""
    });

    const [message, setMessage] = useState(null); // State for messages
    
    const handleAddBusiness = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/addbusiness", values);
            
            if (response.status === 200) {
                setMessage("Business added successfully.");
            } else {
                setMessage("Failed to add business. Please check your input.");
            }
        } catch (error) {
            setMessage("Failed to add business. Please check your input.");
            console.error('Error during POST request:', error);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-5%' }}>
      <div className="d-flex align-items-center flex-column w-50">
            <h5>Add Business</h5>
            <form className="w-50" onSubmit={handleAddBusiness}>
                <div className="mb-3 mt-3">
                    <label htmlFor="longName" className="form-label">Business Long Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="longName"
                        placeholder="Enter business name"
                        name="longName"
                        onChange={(e) => setValues({ ...values, long_name: e.target.value })}
                        value={values.long_name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="rating"
                        placeholder="Enter rating (1-5)"
                        name="rating"
                        min="1"
                        max="5"
                        onChange={(e) => setValues({ ...values, rating: e.target.value })}
                        value={values.rating}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="spent" className="form-label">Spent:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="spent"
                        placeholder="Enter amount spent"
                        name="spent"
                        onChange={(e) => setValues({ ...values, spent: e.target.value })}
                        value={values.spent}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        placeholder="Enter location label"
                        name="location"
                        onChange={(e) => setValues({ ...values, location: e.target.value })}
                        value={values.location}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {message && (
                <div className={`mt-3 alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`}>
                    {message}
                </div>
            )}
        </div>
        </div>
    );
};

export default AddBusiness;
