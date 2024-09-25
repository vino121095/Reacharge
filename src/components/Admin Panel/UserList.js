import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserList() {
  const [modalShow, setModalShow] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const transactions = [
    { id: 1, user: "John Doe", amount: "$10", status: "Completed", date: "2023-09-23" },
    { id: 2, user: "Jane Smith", amount: "$15", status: "Pending", date: "2023-09-22" },
  ];

  const handleViewClick = (transaction) => {
    setCurrentTransaction(transaction);
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
    setCurrentTransaction(null);
  };

  return (
    <div className="d-flex">
      <div className="sidebar p-3" style={{ width: '250px' }}>
        <h4>Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item"><a className="nav-link" href="#">Users</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Operators</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Plans</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Log Out</a></li>
         
        </ul>
      </div>

      <div className="container p-4">
     
        <div className="mt-4">
          <h3>User List</h3>
          {/* <div className="card"> */}
          {/* <div className="card-body"> */}

          <table className="table mt-4" id='tablecard'>
            <thead>
              <tr>
                <th>S No</th>
                <th>User</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.user}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.status}</td>
                  <td>{transaction.date}</td>
                  <td>
                    <i
                      onClick={() => handleViewClick(transaction)}
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
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>

      {/* Modal for viewing transaction details */}
      {currentTransaction && (
        <div className={`modal ${modalShow ? 'show' : ''}`} style={{ display: modalShow ? 'block' : 'none' }} onClick={handleClose}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Transaction Details</h5>
                {/* <button type="button" className="close" onClick={handleClose}>&times;</button> */}
              </div>
              <div className="modal-body text-left">
                <p style={{ margin: 0 }}><strong>User:</strong> {currentTransaction.user}</p>
                <p style={{ margin: 0 }}><strong>Amount:</strong> {currentTransaction.amount}</p>
                <p style={{ margin: 0 }}><strong>Status:</strong> {currentTransaction.status}</p>
                <p style={{ margin: 0 }}><strong>Date:</strong> {currentTransaction.date}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {modalShow && <div className="modal-backdrop fade show" />}
    </div>
  );
}

export default UserList;
