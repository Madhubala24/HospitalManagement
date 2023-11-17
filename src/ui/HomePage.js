import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loggedInDoctor = JSON.parse(localStorage.getItem("loggedInDoctor"));
  const loggedInPatient = JSON.parse(localStorage.getItem("loggedInPatient"));
  const loggedInAdmin = JSON.parse(localStorage.getItem("loggedInAdmin")); 

  const handleLogout = () => {
    //Clear logged-in status and details
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInDoctor");
    localStorage.removeItem("loggedInPatient");
    localStorage.removeItem("loggedInAdmin");
    //Redirect to the login page
    navigate("/");
  };

  return (
    <div className="home-body">
      <div className="header">
        <strong>
          <h1>Hospital Management System</h1>
        </strong>
        <div onClick={handleLogout}>
  <FontAwesomeIcon icon={faSignOutAlt} />
  Logout
</div>
      </div>
      <div className="center-content">
        <div className="container">
          {loggedInDoctor && (
            <div className="button-container">
              <div >
                <Link to="/doctor_management">
                  <button className="button">Doctor Management--> </button>
                </Link>
              </div>
              <div >
                <Link to="/appointment-details">
                  <button className="button"> View Appointment--> </button>
                </Link>
              </div>
            </div>
          )}

          {loggedInPatient && (
            <div className="button-container">
              <div >
                <Link to="/appointment_management">
                  <button className="button">Appointment Booking--> </button>
                </Link>
              </div>
              <div>
                <Link to="/appointment-details">
                  <strong>
                    <button className="button"> View Appointment--> </button>
                  </strong>
                </Link>
              </div>
            </div>
          )}

          {loggedInAdmin && (
            <div className="button-container">
              <div>
                <Link to="/appointment-details">
                  <button className="button">View Appointment--> </button>
                </Link>
              </div>
              <div >
                <Link to="/doctor_management">
                  <button className="button">Doctor Management--> </button>
                </Link>
              </div>
              <div >
                <Link to="/appointment_management">
                  <button className="button">Appointment Management--> </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
