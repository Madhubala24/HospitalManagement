import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./AllDetailsTable.css";

export default function AllDetailsTable({ onDelete }) {
  //state variables
  const navigate = useNavigate();
  const doctorData = JSON.parse(localStorage.getItem("doctorData") || "[]");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Handle click event to trigger delete confirmation modal
  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowConfirmation(true);
  };

  // Handle delete confirmation
  const confirmDelete = () => {
    onDelete(deleteIndex);
    setShowConfirmation(false);
  };

  // Handle cancel delete action
  const cancelDelete = () => {
    setDeleteIndex(null);
    setShowConfirmation(false);
  };

  // Navigate back to home
  const backtohome = () => {
    navigate("/home");
  };

  return (
    <div className="doctortable-body">
      {/* Button to navigate to registration page */}
      <div className="register-button">
     
          <Link to="/register">For Register</Link>
       
      </div>

      {/* Back button to navigate back to home */}
      <div className="back-button">
        <button onClick={backtohome}>Back</button>
      </div>

      {/* Table displaying doctor details */}
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Experience</th>
            <th>Department</th>
            <th>Availability</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through doctorData and display details in table */}
          {doctorData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.gender}</td>
              <td>{data.experience}</td>
              <td>{data.department}</td>
              <td>{data.availability}</td>
              <td>
                {/* Link to navigate to edit page */}
                <Link to={`/edit/${index}`} className="edit-button">
                  Edit
                </Link>
              </td>
              <td>
                {/* Button to trigger delete confirmation */}
                <button
                  onClick={() => handleDeleteClick(index)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for delete confirmation */}
      <Modal show={showConfirmation} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete {doctorData[deleteIndex]?.name}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            No
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
