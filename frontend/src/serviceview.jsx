import React, { useEffect, useState } from 'react';
import axios from 'axios'

function ServiceView() {
    const [serviceview, setView] = useState([]);
//    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/serviceview')
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
        {serviceview.length !== 0 ?
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Long Name</th>
                    <th scope="col">Home Base</th>
                    <th scope="col">Manager</th>  
                    <th scope="col">Revenue</th>  
                    <th scope="col">Products Carried</th>  
                    <th scope="col">Costs Carried</th>  
                    <th scope="col">Weight Carried</th>  
                </tr>
            </thead>
            <tbody>
                {
                    serviceview.map(sview =>
                        <tr key={sview.id}>
                            <td>{sview.id}</td>
                            <td>{sview.long_name}</td>
                            <td>{sview.home_base}</td>
                            <td>{sview.manager}</td>
                            <td>{sview.revenue}</td>
                            <td>{sview.products_carried}</td>
                            <td>{sview.cost_carried}</td>
                            <td>{sview.weight_carried}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
       : <h2>No Records</h2> }
    </div>
    );
}

export default ServiceView;
