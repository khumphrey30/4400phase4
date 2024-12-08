import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'; // Import dayjs

const AddEmployee = () => {
    const [values, setValues] = useState({
        username: "",
        fname: "",
        lname: "",
        address: "",
        bdate: "",
        taxID: "",
        hired: "",
        experience: "",
        salary: ""
    });

    const [message, setMessage] = useState(null); // State for messages

    const handleAddEmployee = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/add_employees", values);
            
            if (response.status === 200) {
                setMessage("Employee added successfully.");
            } else {
                setMessage("Failed to add Employee. Please check your input.");
            }
        } catch (error) {
            setMessage("Failed to add Employee. Please check your input.");
            console.error('Error during POST request:', error);
        }
    };

    const handleBdateChange = (e) => {
        const formattedDate = dayjs(e.target.value).format('YYYY-MM-DD');
        setValues({ ...values, bdate: formattedDate });
    };
    const handleHiredChange = (e) => {
        const formattedDate = dayjs(e.target.value).format('YYYY-MM-DD');
        setValues({ ...values, hired: formattedDate });
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '10%' }}>
        <div className="d-flex align-items-center flex-column w-50">
            <h5>Add Employee</h5>
            <form className="w-50" onSubmit={handleAddEmployee}>
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
                <div className="mb-3">
                    <label htmlFor="fname" className="form-label">First Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fname"
                        placeholder="Enter first name"
                        name="fname"
                        onChange={(e) => setValues({ ...values, fname: e.target.value })}
                        value={values.fname}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lname" className="form-label">Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lname"
                        placeholder="Enter last name"
                        name="lname"
                        onChange={(e) => setValues({ ...values, lname: e.target.value })}
                        value={values.lname}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter address"
                        name="address"
                        onChange={(e) => setValues({ ...values, address: e.target.value })}
                        value={values.address}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="bdate" className="form-label">Birthdate:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="bdate"
                        name="bdate"
                        onChange={handleBdateChange}
                        value={values.bdate}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="taxID" className="form-label">Tax ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="taxID"
                        name="taxID"
                       
                        onChange={(e) => setValues({ ...values, taxID: e.target.value })}
                        placeholder="Enter tax ID"
                        value={values.taxID}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="hired" className="form-label">Hired:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="hired"
                        name="hired"
                        onChange={handleHiredChange}
                        value={values.hired}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="employeeExperience" className="form-label">Experience (Years):</label>
                    <input
                        type="number"
                        className="form-control"
                        id="employeeExperience"
                        name="employeeExperience"
           
                        onChange={(e) => setValues({ ...values, experience: e.target.value })}
                        placeholder="Enter experience in years"
                        value={values.experience}
                        
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="salary" className="form-label">Salary:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="salary"
                        name="salary"
                        
                        onChange={(e) => setValues({ ...values, salary: e.target.value })}
                        placeholder="Enter salary"
                        value={values.salary}
                        
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

export default AddEmployee;
