import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css";
import logo from '../assets/websitelogo.png'

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
  const getDoctorContent = () => {
    // Content for the doctor when logged in
    return (
      <div>
        <h2>Welcome, Dr. {loggedInDoctor.doctorusername}!</h2>
        <p className="tick-mark"> Manage your appointments and stay connected with your patients</p>
        <p className="tick-mark"> Utilize our advanced tools for diagnosis and treatment planning</p>
        <p className="tick-mark"> Ensure the best healthcare outcomes for your patients</p>
      </div>
    );
  };

  const getPatientContent = () => {
    // Content for the patient when logged in
    return (
      <div>
        <h2>Welcome, {loggedInPatient.username}!</h2>
        <p className="tick-mark"> Book your appointments and manage your healthcare journey with ease</p>
        <p className="tick-mark"> Access your medical records and stay informed about your health</p>
        <p className="tick-mark"> Experience personalized care and attention from our healthcare professionals</p>
      </div>
    );
  };

  const getAdminContent = () => {
    // Content for the admin when logged in
    return (
      <div>
        <h2>Welcome, Administrator!</h2>
        <p className="tick-mark">Streamline hospital operations with our comprehensive management system</p>
        <p className="tick-mark">Monitor and optimize resource allocation for efficient healthcare delivery</p>
        <p className="tick-mark">Ensure compliance with healthcare standards and regulations</p>
      </div>
    );
  };
  return (
    <div className="home-body">
      <header className="header">
        <div className="leftlogo"> 
        <div className="logo">
        <img src={logo} alt="HMS Logo" />
        </div>
        <div className="heading">
        <strong>
          <h1>HMS</h1>
        </strong>
        </div>
        </div>
        <div className="nav-buttons">
          {/* Doctor Role */}
          {loggedInDoctor && (
            <div className="logout">
            
              <Link to="/doctor-management">Doctor Management</Link>
              {/* <Link to="/appointment-details">View Appointments</Link> */}
            </div>
          )}

          {/* Patient Role */}
          {loggedInPatient && (
            <>
              {/* <Link to="/appointment-management">Book Appointment</Link> */}
              <Link to="/appointment-details">View Appointments</Link>
            </>
          )}

          {/* Admin Role */}
          {loggedInAdmin && (
            <>
              <Link to="/appointment-details">View Appointments</Link>
              <Link to="/doctor-management">Doctor Management</Link>
              <Link to="/appointment-management">Appointment Management</Link>
            </>
          )}
        </div>
      
        <div className="logout" onClick={handleLogout}>
  <FontAwesomeIcon icon={faSignOutAlt} />
  Logout
</div>
      </header>
      <div className="center-content">
      {loggedInDoctor && getDoctorContent()}
        {loggedInPatient && getPatientContent()}
        {loggedInAdmin && getAdminContent()}
         {/* Conditional button based on user role */}
         {loggedInDoctor && (
          <div className="button-container">
            <Link to="/appointment-details">
              <button className="button">View Appointments</button>
            </Link>
          </div>
        )}

        {loggedInPatient && (
          <div className="button-container">
            <Link to="/appointment-management">
              <button className="button">Book Appointment</button>
            </Link>
          </div>
        )}

        {loggedInAdmin && (
          <div className="button-container">
            {/* Add any specific admin button */}
          </div>
        )}
      </div>
      </div>
 
  );
}
