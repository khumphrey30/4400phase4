import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StartFunding = () => {
    const [owners, setOwners] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [values, setValues] = useState({
        selectedOwner: "",
        selectedBusiness: "",
        amount: "",
        fundDate: ""
    });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchOwnersAndBusinesses = async () => {
            try {
                const ownersResponse = await axios.get('http://localhost:8081/owners');
                setOwners(ownersResponse.data);

                const businessesResponse = await axios.get('http://localhost:8081/businesses');
                setBusinesses(businessesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchOwnersAndBusinesses();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/start_funding', {
                ip_owner: values.selectedOwner,
                ip_long_name: values.selectedBusiness,
                ip_amount: values.amount,
                ip_fund_date: values.fundDate
            });
            if (response.status === 200) {
                setMessage('Funding successfully started!');
            } else {
                setMessage('Failed to start funding. Please check your input.');
            }
        } catch (error) {
            setMessage('Failed to start funding. Please check your input.');
            console.error('Error during POST request:', error);
        }
    };

    const handleReset = () => {
        setValues({
            selectedOwner: "",
            selectedBusiness: "",
            amount: "",
            fundDate: ""
        });
        setMessage(null);
    };

    return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ marginTop: '-5%' }}>
      <div className="d-flex align-items-center flex-column w-50">
            <h5>Start Funding</h5>
            <form className="w-50" onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="selectedOwner" className="form-label">Owner:</label>
                    <select
                        className="form-control"
                        id="selectedOwner"
                        value={values.selectedOwner}
                        onChange={(e) => setValues({ ...values, selectedOwner: e.target.value })}
                    >
                        <option value="" disabled>Select an owner</option>
                        {owners.map((owner) => (
                            <option key={owner.username} value={owner.username}>
                                {owner.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="selectedBusiness" className="form-label">Business:</label>
                    <select
                        className="form-control"
                        id="selectedBusiness"
                        value={values.selectedBusiness}
                        onChange={(e) => setValues({ ...values, selectedBusiness: e.target.value })}
                    >
                        <option value="" disabled>Select a business</option>
                        {businesses.map((business) => (
                            <option key={business.long_name} value={business.long_name}>
                                {business.long_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        value={values.amount}
                        onChange={(e) => setValues({ ...values, amount: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fundDate" className="form-label">Funding Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fundDate"
                        value={values.fundDate}
                        onChange={(e) => setValues({ ...values, fundDate: e.target.value })}
                    />
                </div>
                <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">Fund</button>
                    <button type="button" className="btn btn-secondary" onClick={handleReset}>Cancel</button>
                </div>
            </form>
            {message && (
                <div
                    className={`mt-3 alert ${
                        message.includes('successfully') ? 'alert-success' : 'alert-danger'
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
        </div>
    );
};

export default StartFunding;
