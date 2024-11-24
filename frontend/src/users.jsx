import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081')
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err))

    }, [])
    return (
        <div className="container mt-5">
            <Link to="/create" className="btn btn-success">Create Book</Link>
            {users.length !== 0 ?
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Address</th>
                        <th scope="col">Birthdate</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <tr key={user.username}>
                                <td>{user.username}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.address}</td>
                                <td>{user.birthdate}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
           : <h2>No Records</h2> }
        </div>
    )
}


export default Users