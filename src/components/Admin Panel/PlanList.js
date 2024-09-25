import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PlanList() {
  const [modalShow, setModalShow] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: '', amount: '', validity: '' });

  const plans = [
    { id: 1, name: "Plan A", amount: "$10", validity: "30 days" },
    { id: 2, name: "Plan B", amount: "$20", validity: "60 days" },
    { id: 3, name: "Plan C", amount: "$30", validity: "90 days" },
  ];

  const handleViewClick = (plan) => {
    setCurrentPlan(plan);
    setModalShow(true);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
    setCurrentPlan(null);
    setShowAddForm(false);
    setNewPlan({ name: '', amount: '', validity: '' });
  };

  const handleAddPlan = () => {
    // Add your logic to save the new plan
    console.log("New Plan Added:", newPlan);
    handleClose(); // Close the modal after adding
  };

  // Prevent modal close when clicking inside the modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="container p-4">
      {/* <h2>Recharge Plans</h2> */}
      <div className="d-flex justify-content-between mb-3">
        <h3>Plans List</h3>
        <button className="btn btn-primary" onClick={handleAddClick}>Add</button>
      </div>
      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Plan Name</th>
              <th>Amount</th>
              <th>Validity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.id}</td>
                <td>{plan.name}</td>
                <td>{plan.amount}</td>
                <td>{plan.validity}</td>
                <td>
                  <i
                    onClick={() => handleViewClick(plan)}
                    style={{ cursor: "pointer", color: "#007bff", marginRight: "10px" }}
                    className="bi bi-eye-fill"
                  />
                  <i
                    style={{ cursor: "pointer", color: "red" }}
                    className="bi bi-trash-fill"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing plan details */}
      {currentPlan && (
        <div className={`modal ${modalShow ? 'show' : ''}`} style={{ display: modalShow ? 'block' : 'none' }} onClick={handleClose}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" onClick={handleModalClick}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Plan Details</h5>
                {/* <button type="button" className="close" onClick={handleClose}>&times;</button> */}
              </div>
              <div className="modal-body text-left">
                <p style={{ margin: 0 }}><strong>Plan Name:</strong> {currentPlan.name}</p>
                <p style={{ margin: 0 }}><strong>Amount:</strong> {currentPlan.amount}</p>
                <p style={{ margin: 0 }}><strong>Validity:</strong> {currentPlan.validity}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding a new plan */}
      {showAddForm && (
        <div className={`modal ${modalShow ? 'show' : ''}`} style={{ display: modalShow ? 'block' : 'none' }} onClick={handleClose}>
          <div className="modal-dialog modal-dialog-centered" onClick={handleModalClick}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Plan</h5>
                {/* <button type="button" className="close" onClick={handleClose}>&times;</button> */}
              </div>
              <div className="modal-body text-left">
                <div className="mb-3">
                  <label htmlFor="planName" className="form-label">Plan Name</label>
                  <input
                    type="text"
                    id="planName"
                    className="form-control"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="planAmount" className="form-label">Amount</label>
                  <input
                    type="text"
                    id="planAmount"
                    className="form-control"
                    value={newPlan.amount}
                    onChange={(e) => setNewPlan({ ...newPlan, amount: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="planValidity" className="form-label">Validity</label>
                  <input
                    type="text"
                    id="planValidity"
                    className="form-control"
                    value={newPlan.validity}
                    onChange={(e) => setNewPlan({ ...newPlan, validity: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleAddPlan}>Add Plan</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {modalShow && <div className="modal-backdrop fade show" />}
    </div>
  );
}

export default PlanList;
