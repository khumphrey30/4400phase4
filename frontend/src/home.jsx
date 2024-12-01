import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container mt-5">
            <h3 className="mb-4">Manage Your Business</h3>
            <h5 className="mb-4 mt-5">Owners</h5>
            <div className="d-flex flex-wrap gap-3 mb-5">
                <Link to="/addowner" className="btn btn-success">
                    Add Owner
                </Link>
                <Link to="/start_funding" className="btn btn-primary">
                    Start Funding
                </Link>
                <Link to="/addbusiness" className="btn btn-success">
                    Add Business
                </Link>
                <Link to="/add_service" className="btn btn-success">
                    Add Service
                </Link>
            </div>
            <h5 className="mb-4 mt-5">Employees</h5>
            <div className="d-flex flex-wrap gap-3">
                <Link to="/add_employees" className="btn btn-success">
                    Add Employees
                </Link>
                <Link to="/add_driver_role" className="btn btn-success">
                    Add Driver Role
                </Link>
                <Link to="/add_worker_role" className="btn btn-success">
                    Add Worker Role
                </Link>
                <Link to="/hireemployee" className="btn btn-primary">
                    Hire Employee
                </Link>
                <Link to="/manageservice" className="btn btn-primary">
                    Manage Service
                </Link>
                <Link to="/removedriverrole" className="btn btn-danger">
                    Remove Driver Role
                </Link>
                <Link to="/fireemployee" className="btn btn-danger">
                    Fire Employee
                </Link>
            </div>

            <h5 className="mb-4 mt-5">Vans</h5>
            <div className="d-flex flex-wrap gap-3">
                <Link to="/addvan" className="btn btn-success">
                    Add Van
                </Link>
                <Link to="/takeover_van" className="btn btn-primary">
                    Takeover Van
                </Link>
                <Link to="/load_van" className="btn btn-primary">
                    Load Van
                </Link>
                <Link to="/refuel_van" className="btn btn-primary">
                    Refuel Van
                </Link>
                <Link to="/drive_van" className="btn btn-primary">
                    Drive Van
                </Link>
                <Link to="/removevan" className="btn btn-danger">
                    Remove Van
                </Link>
            </div>

            <h5 className="mb-4 mt-5">Products</h5>
            <div className="d-flex flex-wrap gap-3">
                <Link to="/add_product" className="btn btn-success">
                    Add Product
                </Link>
                <Link to="/purchase_product" className="btn btn-primary">
                    Purchase Product
                </Link>
                <Link to="/removeproduct" className="btn btn-danger">
                    Remove Product
                </Link>
                </div>



            <h5 className="mb-4 mt-5">Locations</h5>
            <div className="d-flex flex-wrap gap-3">
                <Link to="/add_location" className="btn btn-success">
                    Add Location
                </Link>
                </div>


        </div>
    );
};

export default Home;
