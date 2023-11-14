import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Route,Routes,Navigate,} from "react-router-dom";
import AllDetailsTable from "./doctor-management/AllDetailsTable";
import RegistrationForm from "./doctor-management/RegistrationForm";
import EditForm from "./doctor-management/EditForm";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./login/LoginPage";
import HomePage from "./ui/HomePage"
import AppointmentBookingForm from "./appointment-management/AppointmentBookingForm";
import AppointmentDetails from "./appointment-management/AppointmentDetails";


function App() {
  const [doctors, setDoctors] = useState([]);

// Function to retrieve doctor data from local storage
const getDoctorData = () => {
  const storedDoctorData = JSON.parse(localStorage.getItem("doctorData")) || [];
  setDoctors(storedDoctorData);
};

// Use useEffect to retrieve doctor data when the component mounts
useEffect(() => {
  getDoctorData();
}, []);// Initialize doctors state with an empty array
const [appointments, setAppointments] = useState([]);

const getAppointmentData = () => {
  const storedAppointmentData = JSON.parse(localStorage.getItem("appointments")) || [];
  setAppointments(storedAppointmentData);
};
useEffect(() => {
  getAppointmentData();
}, []);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentLogInStatus = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(
    "patientLog" === currentLogInStatus
  );

  // Function to retrieve user login status from local storage
  const getIsLoggedIn = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn && isLoggedIn !== "undefined") {
      const temp = JSON.parse(isLoggedIn);
      setUserIsLoggedIn(temp);
    } else {
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      setUserIsLoggedIn(false);
    }
  }

  // Use useEffect to initialize user login status
  useEffect(() => {
    getIsLoggedIn();
    console.log(userIsLoggedIn);
  }, []);

  const handleDelete = (index) => {
    const updatedDoctors = [...doctors];
    updatedDoctors.splice(index, 1);
    setDoctors(updatedDoctors);
    localStorage.setItem("doctorData", JSON.stringify(updatedDoctors));
  };
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage isLoggedIn={userIsLoggedIn} onLogin={getIsLoggedIn} />} />
        {userIsLoggedIn ? (
          <>
            <Route path="/home" element={<HomePage />} /> {/* Add a route for the home page */}
            <Route
  path="/doctor-management"
  element={<AllDetailsTable onDelete={(index) => handleDelete(index)} />}
/>

            <Route path="/appointment-details" element={<AppointmentDetails appointments={appointments} doctors={doctors} />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/edit/:index" element={<EditForm />} />
         
            <Route
  path="/appointment-management"
  element={
    <AppointmentBookingForm
      doctors={doctors}
    />
  }
/>


          </>
        ) : null}
        {!userIsLoggedIn && <Route path="/*" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
  );
}

export default App;
