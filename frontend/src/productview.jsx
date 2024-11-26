import React, { useEffect, useState } from 'react';
import axios from 'axios'

function ProductView () {
    const [productview, setView] = useState([]);
//    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/productview')
            // .then((res) => {
            //     // if (!response.ok) {
            //     //     throw new Error('Failed to fetch data');
            //     // }
            //     // return response.json();
            // })
            .then((res) => setView(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container mt-5">        
        {productview.length !== 0 ?
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Amount Available</th>
                    <th scope="col">Low Price</th>  
                    <th scope="col">High Price</th>  
                </tr>
            </thead>
            <tbody>
                {
                    productview.map(pview =>
                        <tr>
                            <td>{pview.product_name}</td>
                            <td>{pview.location}</td>
                            <td>{pview.amount_available}</td>
                            <td>{pview.low_price}</td>
                            <td>{pview.high_price}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
       : <h2>No Records</h2> }
    </div>
    );
}

export default ProductView;
