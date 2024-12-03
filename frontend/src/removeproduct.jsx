import React from 'react';

const RemoveProduct = () => {
    return (
        <div className="d-flex align-items-center flex-column mt-3 w-50">
            <h5>Remove Product</h5>
            <form action="/remove_product" className="w-100">
                <div className="mb-3 mt-3 w-100">
                    <label htmlFor="barcode" className="form-label">Product Barcode:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="barcode" 
                        placeholder="Enter product barcode" 
                        name="barcode" 
                    />
                </div>
                <button type="submit" className="btn btn-danger">Remove Product</button>
            </form>
        </div>
    );
};

export default RemoveProduct;

