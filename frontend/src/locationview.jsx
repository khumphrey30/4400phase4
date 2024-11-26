import React, { useEffect, useState } from 'react';
import axios from 'axios'

function LocationView() {
    const [locationview, setView] = useState([]);
//    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/locationview')
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
        {locationview.length !== 0 ?
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Label</th>
                    <th scope="col">Long Name</th>
                    <th scope="col">X-Coordinate</th>
                    <th scope="col">Y-Coordinate</th>  
                    <th scope="col">Space</th>  
                    <th scope="col">Number of Vans</th>  
                    <th scope="col">Van ID</th>  
                    <th scope="col">Remaining Capacity</th>  
                </tr>
            </thead>
            <tbody>
                {
                    locationview.map(lview =>
                        <tr key={lview.label}>
                            <td>{lview.label}</td>
                            <td>{lview.long_name}</td>
                            <td>{lview.x_coord}</td>
                            <td>{lview.y_coord}</td>
                            <td>{lview.space}</td>
                            <td>{lview.num_vans}</td>
                            <td>{lview.van_ids}</td>
                            <td>{lview.remaining_capacity}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
       : <h2>No Records</h2> }
    </div>
    );
}

export default LocationView;
