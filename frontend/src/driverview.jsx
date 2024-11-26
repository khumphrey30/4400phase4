import React, { useEffect, useState } from 'react';
import axios from 'axios'

function DriverView() {
    const [driverview, setView] = useState([]);
//    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/driverview')
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
        {driverview.length !== 0 ?
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">License ID</th>
                    <th scope="col">Successful Trips</th>
                    <th scope="col">Vans Controlled</th>  
                </tr>
            </thead>
            <tbody>
                {
                    driverview.map(dview =>
                        <tr key={dview.username}>
                            <td>{dview.username}</td>
                            <td>{dview.licenseID}</td>
                            <td>{dview.successful_trips}</td>
                            <td>{dview.vans_controlled}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
       : <h2>No Records</h2> }
    </div>
    );
}

export default DriverView;
