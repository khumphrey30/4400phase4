import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="shadow-sm">
            {/* Header Section */}
            <div className="d-flex justify-content-center py-2 fs-2 fw-bold">
                Business Supply System
            </div>

            {/* Navigation Tabs */}
            <nav className="d-flex justify-content-center">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ownerview" className="nav-link">
                            Owner View
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/employeeview" className="nav-link">
                            Employee View
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/driverview" className="nav-link">
                            Driver View
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/locationview" className="nav-link">
                            Location View
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/productview" className="nav-link">
                            Product View
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/serviceview" className="nav-link">
                            Service View
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Nav;
