import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import logo from "../src/assets/websitelogo.png"

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
      {/* <strong>
        <h1>
          <Link to="/home" className="header-link">
            Hospital Management System
          </Link>
        </h1>
      </strong> */}
      <div className="logout" onClick={handleLogout}>
  <FontAwesomeIcon icon={faSignOutAlt} />
  Logout
</div>
    </div>
  );
};

export default AllHeader;