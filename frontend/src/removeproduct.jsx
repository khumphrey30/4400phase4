import React from 'react';

const RemoveProduct = () => {
    return (
        <div>
            <form action="/remove_product">
                <div className="mb-3 mt-3">
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
