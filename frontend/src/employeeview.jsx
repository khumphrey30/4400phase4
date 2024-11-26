import React, { useEffect, useState } from 'react';
import axios from 'axios'
import dayjs from 'dayjs'

function EmployeeView() {
    const [employeeview, setView] = useState([]);
//    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/employeeview')
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
        {employeeview.length !== 0 ?
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Tax ID</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Hired</th>
                    <th scope="col">Employee Experience</th>
                    <th scope="col">License ID</th>
                    <th scope="col">Driving Experience</th>
                    <th scope="col">Manager Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    employeeview.map(eview =>
                        <tr key={eview.username}>
                            <td>{eview.username}</td>
                            <td>{eview.taxid}</td>
                            <td>{eview.salary}</td>
                            <td>{dayjs(eview.hired).format('YYYY-MM-DD')}</td>
                            <td>{eview.employee_experience}</td>
                            <td>{eview.licenseid}</td>
                            <td>{eview.driving_experience}</td>
                            <td>{eview.manager_status}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
       : <h2>No Records</h2> }
    </div>
    );
}

export default EmployeeView;
