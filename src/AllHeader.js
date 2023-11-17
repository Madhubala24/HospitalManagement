import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";


const AllHeader = () => {
  const navigate=useNavigate();
  const handleLogout = () => {
    //Clear logged-in status and details
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInDoctor");
    localStorage.removeItem("loggedInPatient");
    localStorage.removeItem("loggedInAdmin");
    //Redirect to the login page
    navigate ("/");
  };
  return (
    <div className="header">
      <strong>
        <h1>
          <Link to="/home" className="header-link">
            Hospital Management System
          </Link>
        </h1>
      </strong>
      <button className="logout-button" onClick={handleLogout}>
  <FontAwesomeIcon icon={faSignOutAlt} />
  Logout
</button>
    </div>
  );
};

export default AllHeader;
