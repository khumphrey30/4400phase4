import React, { useState, useEffect } from "react";
import axios from "axios";

const StartFunding = () => {
  const [owners, setOwners] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [amount, setAmount] = useState("");
  const [fundDate, setFundDate] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8081/owners").then((res) => {
      setOwners(res.data);
    }).catch(err => console.error("Error fetching owners:", err));

    axios.get("http://localhost:8081/businesses").then((res) => {
      setBusinesses(res.data);
    }).catch(err => console.error("Error fetching businesses:", err));
  }, []);

  const handleStartFunding = () => {
    axios
      .post("http://localhost:8081/start_funding", {
        ip_owner: selectedOwner,
        ip_long_name: selectedBusiness,
        ip_amount: amount,
        ip_fund_date: fundDate,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Funding successfully started!");
        } else {
          setMessage("Failed to start funding. Please check your input.");
        }
      })
      .catch((err) => {
        setMessage("Failed to start funding. Please check your input.");
        console.error(err);
      });
  };

  return (
    <div className="container mt-5">
      <h3>Procedure: Start Funding</h3>
      <div className="form-group mt-3">
        <label>ip_owner:</label>
        <select
          className="form-control"
          value={selectedOwner}
          onChange={(e) => setSelectedOwner(e.target.value)}
        >
          <option value="" disabled>Select an owner</option>
          {owners.map((owner) => (
            <option key={owner.username} value={owner.username}>
              {owner.username}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label>ip_long_name:</label>
        <select
          className="form-control"
          value={selectedBusiness}
          onChange={(e) => setSelectedBusiness(e.target.value)}
        >
          <option value="" disabled>Select a business</option>
          {businesses.map((business) => (
            <option key={business.long_name} value={business.long_name}>
              {business.long_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label>ip_amount:</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>ip_fund_date:</label>
        <input
          type="date"
          className="form-control"
          value={fundDate}
          onChange={(e) => setFundDate(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-primary" onClick={handleStartFunding}>
          Fund
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSelectedOwner("");
            setSelectedBusiness("");
            setAmount("");
            setFundDate("");
            setMessage(null);
          }}
        >
          Cancel
        </button>
      </div>
      {message && (
        <div
          className={`mt-3 alert ${
            message.includes("successfully") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default StartFunding;