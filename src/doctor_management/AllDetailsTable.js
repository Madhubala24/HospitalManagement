import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./AllDetailsTable.css";
import AllHeader from "../AllHeader";
import { useNavigate } from "react-router-dom";

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

  // Navigate back to the doctor management page
  const backToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <AllHeader />
      <div className="doctortable-body">
      <div className="back-button">
          <button onClick={backToHome}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back </button>
        </div>
        {/* Button to navigate to registration page */}
        <div className="register-button">
          <Link to="/register">For Register</Link>
        </div>

        {/* Table displaying doctor details */}
        {doctorData.length !== 0 ? (
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
        ) : (
          <p>No projects found. You can create new projects to proceed.</p>
        )}
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
    </>
  );
}
