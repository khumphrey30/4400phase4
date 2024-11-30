import React from 'react';

const RemoveDriverRole = () => {
    return (
        <div>
            <form action="/remove_driver_role">
                <div className="mb-3 mt-3">
                    <label htmlFor="username" className="form-label">Driver Username:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Enter driver's username" 
                        name="username" 
                    />
                </div>
                <button type="submit" className="btn btn-danger">Remove Driver</button>
            </form>
        </div>
    );
};

export default RemoveDriverRole;
