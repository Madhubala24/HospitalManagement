import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AllHeader from "../AllHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./DoctorAvailability.css";

export default function DoctorAvailability({ doctors }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToAppointmentPage = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(false);
    navigate("/appointment-management", { state: { selectedDoctor: doctor } });
  };
  

  const backToHome = () => {
    navigate("/home");
  };

  return (
    <>
    <AllHeader />
    <div className="doctoravailability-body">
    <div className="doctor-availability-container">
    <div className="back-button">
      <button onClick={backToHome}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
    </div>
      <h2>Doctor Availability</h2>
      <table className="doctor-table">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Department</th>
            <th>Available Day</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index}>
              <td>{doctor.name}</td>
              <td>
      {doctor.department || "N/A"}
    </td>
    <td>{doctor.availability || "N/A"}</td>

              <td>
                <button onClick={() => handleBookClick(doctor)}>Book</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Book Confirmation */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Do you want to book an appointment with Dr. {selectedDoctor?.name}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            No
          </Button>
          <Button variant="primary" onClick={goToAppointmentPage}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    </>
  );
}
