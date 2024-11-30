import React from 'react';

const HireEmployee = () => {
    return (
        <div>
            <form action="/hire_employee">
                <div className="mb-3 mt-3">
                    <label htmlFor="username" className="form-label">Worker Username:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Enter worker's username" 
                        name="username" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="serviceId" className="form-label">Delivery Service ID:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="serviceId" 
                        placeholder="Enter delivery service ID" 
                        name="serviceId" 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default HireEmployee;
