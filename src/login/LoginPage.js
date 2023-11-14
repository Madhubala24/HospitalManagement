import React, { useState } from "react";
import { doctorData, patientData, adminData } from "./LoginData";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    //check if the entered credent belong to a doctor
    const isDoctor = doctorData.find(
      (doctor) =>
        doctor.doctorusername === username && doctor.password === password
    );

    const isPatient = patientData.find(
      //check if the entered credent belong to a patient
      (patient) =>
        patient.username === username && patient.password === password
    );

    const isAdmin = adminData.find(
      //check if the entered credent belong to a admin
      (admin) => admin.email === username && admin.password === password
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
          <label className="input-label">Username (Email)</label>
          <input
            className="input-field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password</label>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" type="button" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
