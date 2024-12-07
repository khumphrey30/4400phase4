import React, { useState } from "react";

const AddBusiness = () => {
    const [values, setValues] = useState({
        longName: "",
        rating: "",
        spent: "",
        location: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add form submission logic here, e.g., making a POST request
        console.log("Form Submitted:", values);
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-10%' }}>
      <div className="d-flex align-items-center flex-column w-50">
            <h5>Add Business</h5>
            <form className="w-50" onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="longName" className="form-label">Business Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="longName"
                        placeholder="Enter business name"
                        name="longName"
                        onChange={(e) => setValues({ ...values, longName: e.target.value })}
                        value={values.longName}
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
        </div>
        </div>
    );
};

export default AddBusiness;
