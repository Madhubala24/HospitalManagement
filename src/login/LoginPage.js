import React, { useState } from "react";
import { patientData, doctorData } from "./LoginData"; // Import your data arrays
import "./login.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigation function

  const handleLogin = () => {
    // const patientData = JSON.parse(localStorage.getItem("userData"));
    const isPatient = patientData.find(
      (patient) => patient.username === username && patient.password === password
    );
  console.log("fv",isPatient);
    const isDoctor = doctorData.find(
      (doctor) => doctor.username === username && doctor.password === password
    );
    if (isPatient || isDoctor) {
      // If login is successful, navigate to the "All Details Table" page
      localStorage.setItem("isLoggedIn", JSON.stringify("patientLog"));
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  }
  

  return (
    <div className="login-page">
 
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

export default LoginPage;
