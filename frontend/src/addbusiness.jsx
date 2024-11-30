import React from 'react';

const AddBusiness = () => {
    return (
        <div>
            <form action="/add_business">
                <div className="mb-3 mt-3">
                    <label htmlFor="longName" className="form-label">Business Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="longName" 
                        placeholder="Enter business name" 
                        name="longName" 
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
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AddBusiness;
