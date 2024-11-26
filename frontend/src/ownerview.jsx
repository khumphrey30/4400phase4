import React, { useEffect, useState } from 'react';
import axios from 'axios'

function OwnerView() {
    const [ownerview, setView] = useState([]);
//    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/ownerview')
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
        {ownerview.length !== 0 ?
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Address</th>
                    <th scope="col">Number of Businesses</th>
                    <th scope="col">Number of Places</th>
                    <th scope="col">Highs</th>
                    <th scope="col">Lows</th>
                    <th scope="col">Debt</th>
                </tr>
            </thead>
            <tbody>
                {
                    ownerview.map(oview =>
                        <tr key={oview.username}>
                            <td>{oview.username}</td>
                            <td>{oview.first_name}</td>
                            <td>{oview.last_name}</td>
                            <td>{oview.address}</td>
                            <td>{oview.num_businesses}</td>
                            <td>{oview.num_places}</td>
                            <td>{oview.highs}</td>
                            <td>{oview.lows}</td>
                            <td>{oview.debt}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
       : <h2>No Records</h2> }
    </div>
    );
}

export default OwnerView;
