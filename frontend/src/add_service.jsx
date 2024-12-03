import React, { useState } from "react";
import axios from "axios";

const AddService = () => {
    const [values, setValues] = useState({
        id: "",
        longName: "",
        homeBase: "",
        manager: ""
    });
    const [message, setMessage] = useState(null); // For success/failure messages

    const handleAddService = () => {
        axios
            .post("http://localhost:8081/add_service", {
                id: values.id,
                long_name: values.longName,
                home_base: values.homeBase,
                manager: values.manager
            })
            .then((res) => {
                if (res.status === 200) {
                    setMessage("Valid Input"); // This doesn't necessarily mean the service was added
                } else {
                    setMessage("Failed to add service. Please check your input.");
                }
            })
            .catch((err) => {
                setMessage("Failed to add service. Please check your input.");
                console.error(err);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleCancel = () => {
        setValues({ id: "", longName: "", homeBase: "", manager: "" });
        setMessage(null);
    };

    return (
        <div className="d-flex align-items-center flex-column mt-3 w-50">
            <h5>Add Service</h5>
            <form className="w-50">
                <div className="mb-3 mt-3">
                    <label htmlFor="id" className="form-label">ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        name="id"
                        value={values.id}
                        onChange={handleInputChange}
                        placeholder="Enter service ID"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="longName" className="form-label">Long Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="longName"
                        name="longName"
                        value={values.longName}
                        onChange={handleInputChange}
                        placeholder="Enter long name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="homeBase" className="form-label">Home Base:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="homeBase"
                        name="homeBase"
                        value={values.homeBase}
                        onChange={handleInputChange}
                        placeholder="Enter home base"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="manager" className="form-label">Manager:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="manager"
                        name="manager"
                        value={values.manager}
                        onChange={handleInputChange}
                        placeholder="Enter manager name"
                    />
                </div>
                <div className="d-flex gap-2 mt-4">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAddService}
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
            {message && (
                <div
                    className={`mt-3 alert ${
                        message.includes("Valid")
                            ? "alert-success"
                            : "alert-danger"
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default AddService;
