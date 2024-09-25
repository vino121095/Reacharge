import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

function Home() {
    const [selectedType, setSelectedType] = useState('');
    const [operatorsList, setOperatorsList] = useState([]);

    // Fetch operators when the component mounts
    useEffect(() => {
        const fetchOperators = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/operators");
                const data = await response.json();
                if (response.ok) {
                    // Assuming the response is an array of objects with an `operator` property
                    setOperatorsList(data); // Set the fetched operators list
                } else {
                    console.error("Error fetching operators:", data);
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            }
        };

        fetchOperators();
    }, []); 

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    return (
        <div className="container">
            <div className="row justify-content-center text-align-center align-items-center vh-100">
                <div className="col-md-5">
                    <div className="card" id="signcard">
                        <div className="card-header text-center">
                            <h4>Mobile Recharge</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="mobile-number">Mobile Number</label>
                                    <input
                                        type="tel"
                                        className="form-control mt-2"
                                        id="mobile-number"
                                        placeholder="Enter mobile number"
                                        required
                                    />
                                </div>
                                <div className="form-group mt-4">
                                    <label>Select Type</label>
                                    <div className="form-check mt-2">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="prepaid"
                                            name="mobileType"
                                            value="prepaid"
                                            checked={selectedType === 'prepaid'}
                                            onChange={handleTypeChange}
                                        />
                                        <label className="form-check-label" htmlFor="prepaid">Prepaid</label>
                                    </div>
                                    <div className="form-check mt-2">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="postpaid"
                                            name="mobileType"
                                            value="postpaid"
                                            checked={selectedType === 'postpaid'}
                                            onChange={handleTypeChange}
                                        />
                                        <label className="form-check-label" htmlFor="postpaid">Postpaid</label>
                                    </div>
                                </div>
                                <div className="form-group mt-4">
                                    <label htmlFor="operator">Select Operator</label>
                                    <select className="form-control mt-2" id="operator" required>
            <option value="" disabled selected>Select operator</option>
            {operatorsList.map((operator, index) => (
                <option key={index} value={operator.operator}>{operator.operator}</option>
            ))}
        </select>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-4 w-100">Proceed</button>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <p>Need assistance? <a href="#">Contact Us</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
