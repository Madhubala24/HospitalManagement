import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Hospital Management System</h1>
      <p>Choose an option:</p>
      <div className="buttons">
        <Link to="/doctor-management">
          <button>Doctor Management</button>
        </Link>
        <Link to="/appointment-management">
          <button>Appointment Booking</button>
        </Link>
        <Link to="/appointment-details">
          <button>Appointment Details</button>
        </Link>
      </div>
    </div>
  );
}
