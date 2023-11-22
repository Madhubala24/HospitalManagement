import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AllDetailsTable from "./doctor-management/AllDetailsTable";
import RegistrationForm from "./doctor-management/RegistrationForm";
import EditForm from "./doctor-management/EditForm";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./login/LoginPage";
import HomePage from "./ui/HomePage";
import AppointmentBookingForm from "./appointment-management/AppointmentBookingFormCopy";
import AppointmentDetails from "./appointment-management/AppointmentDetails";   
import DoctorAvailability from "./appointment-management/DoctorAvailability";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  //function to retrieve doctor data from local storage

  const getDoctorData = () => {
    const storedDoctorData =
      JSON.parse(localStorage.getItem("doctorData")) || []; //or empty arry to be default value
    setDoctors(storedDoctorData);
  };
  //function to retrieve appointment data from local storage
  const getAppointmentData = () => {
    const storedAppointmentData =
      JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointmentData);
  };

  // Function to retrieve user login status from local storage
  const getIsLoggedIn = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    //check if the retrieved value is true & notequal to String
    if (isLoggedIn && isLoggedIn !== "undefined") {
      const log = JSON.parse(isLoggedIn);
      setUserIsLoggedIn(log);
    } else {
      //if false mean default value of false in localstorage
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      setUserIsLoggedIn(false);
    }
  };

  //Use useEffect to initial data and user login status
  useEffect(() => {
    getDoctorData();
    getAppointmentData();
    getIsLoggedIn();
  }, []);

  const currentLogInStatus = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(
    "patientLog" === currentLogInStatus ||
      "adminLog" === currentLogInStatus ||
      "doctorLog" === currentLogInStatus
  );

  //func to handle doc delete
  const handleDelete = (index) => {
    const updatedDoctors = [...doctors];
    updatedDoctors.splice(index, 1);
    setDoctors(updatedDoctors);
    localStorage.setItem("doctorData", JSON.stringify(updatedDoctors));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage isLoggedIn={userIsLoggedIn} onLogin={getIsLoggedIn} />
          }
        />
        {userIsLoggedIn ? (
          <>
            <Route path="/home" element={<HomePage />} />
            {/* Add a route for the home page */}
            <Route
              path="/doctor-management"
              element={
                <AllDetailsTable onDelete={(index) => handleDelete(index)} />
              }
            />
            <Route
              path="/appointment-details"
              element={
                <AppointmentDetails
                  appointments={appointments}
                  doctors={doctors}
                />
              }
            />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/edit/:index" element={<EditForm />} />
            <Route
              path="/appointment-management"
              element={<AppointmentBookingForm doctors={doctors} />}
            />
            <Route
              path="/doctor-availability"
              element={<DoctorAvailability doctors={doctors} />}
            />
          </>
        ) : null}
        {!userIsLoggedIn && <Route path="/*" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
  );
}

export default App;
