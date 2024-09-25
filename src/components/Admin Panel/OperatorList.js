import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function OperatorList() {
    const [operator, setOperator] = useState('');
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
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!operator.trim()) {
            setOperatorsList((prevList) => [...prevList, operator]);
            setOperator('');
            alert("Operator name cannot be empty!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/operators", {
                method: "POST",
                body: JSON.stringify({
                    operator: operator,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Operator added successfully:", data);
                alert("Added Successfully")
            } else {
                console.log("Error:", data);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }

        setOperator("");
    };

    return (
        <div className="container p-4">
            <h3>Operators</h3>
            <div className="card mt-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 row">
                            <div className="col-md-5">
                                <label htmlFor="operatorInput" className="col-form-label">Add Operator</label>
                                <input
                                    type="text"
                                    id="operatorInput"
                                    className="form-control mt-2"
                                    placeholder="Enter operator"
                                    value={operator}
                                    onChange={(e) => setOperator(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary mt-4">Add</button>
                            </div>
                        </div>
                    </form>

                    <h3 className="mt-4">Operators List</h3>
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>S No</th>
                                <th>Operator</th>
                            </tr>
                        </thead>
                        <tbody>
                            {operatorsList.map((op, index) => (
                                <tr key={op._id}> {/* Use unique key from the operator object */}
                                    <td>{index + 1}</td>
                                    <td>{op.operator}</td> {/* Access the operator name here */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OperatorList;
