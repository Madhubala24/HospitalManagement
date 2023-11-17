import React, { useState } from "react";
import { doctorData, patientData, adminData } from "./LoginData";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./login.css";

export default function LoginPage({ onLogin }) { //onlogin func pass from app.js
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if( !username || !password){
      setError("Please enter both username and password")
      return;
    }
    const lowercaseUsername = username.toLowerCase(); // Convert entered username to lowercase
    //check if the entered credent belong to a doctor
    const isDoctor = doctorData.find(
      (doctor) =>
        doctor.doctorusername.toLowerCase() === lowercaseUsername && doctor.password === password
    );

    const isPatient = patientData.find(
      //check if the entered credent belong to a patient
      (patient) =>
        patient.username.toLowerCase() === lowercaseUsername && patient.password === password
    );

    const isAdmin = adminData.find(
      //check if the entered credent belong to a admin
      (admin) => admin.email.toLowerCase() === lowercaseUsername && admin.password === password
    );

    if (isDoctor) {
      //save doctor details to localstorage
      localStorage.setItem("loggedInDoctor", JSON.stringify(isDoctor));
      localStorage.setItem("isLoggedIn", JSON.stringify("doctorLog"));
      onLogin(true);
      navigate("/home");
    } else if (isPatient) {
      //save patient details to localstorage
      localStorage.setItem("loggedInPatient", JSON.stringify(isPatient));
      localStorage.setItem("isLoggedIn", JSON.stringify("patientLog"));
      onLogin(true);
      navigate("/home");
    } else if (isAdmin) {
      //save admin details to locastorage
      localStorage.setItem("loggedInAdmin", JSON.stringify(isAdmin));
      localStorage.setItem("isLoggedIn", JSON.stringify("adminLog"));
      onLogin(true);
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-body">
      <form className="login-form">
        <div className="input-group">
          <label className="input-label">Username</label>
          
          <input
            className="input-field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
         </div>
        <div className="input-group password-input">
          <label className="input-label">Password</label>
          <div className="password-field">
          <input
            className="input-field with-icon"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
     <FontAwesomeIcon
      icon={showPassword ? faEye : faEyeSlash}
      className="eye-icon"
      onClick={() => setShowPassword(!showPassword)}
    />
    </div>
    </div>
        <button className="login-button" type="button" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
