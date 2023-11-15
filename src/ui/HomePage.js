import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AllHeader from "../AllHeader";
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
      {/* <AllHeader handleLogout={handleLogout}/> */}
      <div className="header">
        <strong>
          <h1>Welcome to the Hospital Management System</h1>
        </strong>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="center-content">
        <div className="container-wrapper">
          <div className="buttons">
            {loggedInDoctor && (
              <Link to="/doctor-management">
                <button className="container doctor">Doctor Management</button>
              </Link>
            )}
            {loggedInDoctor && (
              <Link to="/appointment-details">
                <button className="container viewing">
                  Appointment Details
                </button>
              </Link>
            )}

            {loggedInPatient && (
              <Link to="/appointment-management">
                <button className="container appointment"></button>
              </Link>
            )}
            {loggedInPatient && (
              <Link to="/appointment-details">
                <strong>
                  {" "}
                  <button className="container viewing">
                    Appointment Details
                  </button>{" "}
                </strong>
              </Link>
            )}

            {loggedInAdmin && (
              <Link to="/appointment-details">
                <button className="container viewing">
                  Appointment Details
                </button>
              </Link>
            )}

            {loggedInAdmin && (
              <Link to="/doctor-management">
                <button className="container doctor">doctor management</button>
              </Link>
            )}
            {loggedInAdmin && (
              <Link to="/appointment-management">
                <button className="container appointment">
                  appointment-management
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
