// // LoginPage.js without admin
// import React, { useState } from "react";
// import { doctorData, patientData } from "./LoginData";
// import "./login.css";
// import { useNavigate } from "react-router-dom";

// function LoginPage({ onLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     const isDoctor = doctorData.find(
//       (doctor) => doctor.doctorusername === username && doctor.password === password
//     );

//     const isPatient = patientData.find(
//       (patient) => patient.username === username && patient.password === password
//     );

//     if (isDoctor) {
//       localStorage.setItem("loggedInDoctor", JSON.stringify(isDoctor));
//       localStorage.setItem("isLoggedIn", JSON.stringify("doctorLog"));
//       onLogin(true);
//       navigate("/home");
//     } else if (isPatient) {
//       localStorage.setItem("loggedInPatient", JSON.stringify(isPatient));
//       localStorage.setItem("isLoggedIn", JSON.stringify("patientLog"));
//       onLogin(true);
//       navigate("/home"); // You can redirect to a patient-specific page if needed
//     } else {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="login-page">
//       <form className="login-form">
//         <div className="input-group">
//           <label className="input-label">Username</label>
//           <input
//             className="input-field"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div className="input-group">
//           <label className="input-label">Password</label>
//           <input
//             className="input-field"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button className="login-button" type="button" onClick={handleLogin}>
//           Login
//         </button>
//         {error && <p className="error-message">{error}</p>}
//       </form>
//     </div>
//   );
// }

// export default LoginPage;

// LoginPage.js
import React, { useState } from "react";
import { doctorData, patientData, adminData } from "./LoginData";
import "./login.css";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const isDoctor = doctorData.find(
      (doctor) => doctor.doctorusername === username && doctor.password === password
    );

    const isPatient = patientData.find(
      (patient) => patient.username === username && patient.password === password
    );

    const isAdmin = adminData.find(
      (admin) => admin.email === username && admin.password === password
    );

    if (isDoctor) {
      localStorage.setItem("loggedInDoctor", JSON.stringify(isDoctor));
      localStorage.setItem("isLoggedIn", JSON.stringify("doctorLog"));
      onLogin(true);
      navigate("/home");
    } else if (isPatient) {
      localStorage.setItem("loggedInPatient", JSON.stringify(isPatient));
      localStorage.setItem("isLoggedIn", JSON.stringify("patientLog"));
      onLogin(true);
      navigate("/home");
    } else if (isAdmin) {
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

export default LoginPage;