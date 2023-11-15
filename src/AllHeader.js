import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const AllHeader = ({ handleLogout }) => {

  return (
    <div className="header">
      <strong>
        <h1>
          <Link to="/home" className="header-link">
            Hospital Management System
          </Link>
        </h1>
      </strong>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AllHeader;
