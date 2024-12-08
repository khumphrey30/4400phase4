import React, { useState } from 'react';
import axios from 'axios';


const AddWorkerRole = () => {
    const [values, setValues] = useState({
        username: "",

    });

    const [message, setMessage] = useState(null); // State for messages

    const handleAddWorkerRole = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/add_worker_role", values);
            
            if (response.status === 200) {
                setMessage("Worker added successfully.");
            } else {
                setMessage("Failed to add worker. Please check your input.");
            }
        } catch (error) {
            setMessage("Failed to add worker. Please check your input.");
            console.error('Error during POST request:', error);
        }
    };


    return (
        <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-5%' }}>
        <div className="d-flex align-items-center flex-column w-50">
            <h5>Add Worker Role</h5>
            <form className="w-50" onSubmit={handleAddWorkerRole}>
                <div className="mb-3 mt-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        name="username"
                        onChange={(e) => setValues({ ...values, username: e.target.value })}
                        value={values.username}
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

export default AddWorkerRole;
