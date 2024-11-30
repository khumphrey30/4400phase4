import React from 'react';

const AddVan = () => {
    return (
        <div>
            <form action="/add_van">
                <div className="mb-3 mt-3">
                    <label htmlFor="deliveryServiceId" className="form-label">Delivery Service ID:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="deliveryServiceId" 
                        placeholder="Enter delivery service ID" 
                        name="deliveryServiceId" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="vanTag" className="form-label">Van Tag:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="vanTag" 
                        placeholder="Enter van tag" 
                        name="vanTag" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fuel" className="form-label">Fuel:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="fuel" 
                        placeholder="Enter fuel amount" 
                        name="fuel" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="capacity" className="form-label">Capacity:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="capacity" 
                        placeholder="Enter capacity" 
                        name="capacity" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="sales" className="form-label">Sales:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="sales" 
                        placeholder="Enter sales amount" 
                        name="sales" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="driverUsername" className="form-label">Driver Username:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="driverUsername" 
                        placeholder="Enter driver username" 
                        name="driverUsername" 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AddVan;
