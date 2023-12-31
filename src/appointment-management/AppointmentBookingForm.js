import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import AllHeader from "../header.js/AllHeader";
import "./AppointmentBooking.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function AppointmentBookingForm({ doctors }) {
  //state variables to manage form input amd state
  const [patientName, setPatientName] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState("");
  //list of bookedslots to prevent doublebooking
  const [bookedSlots, setBookedSlots] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [availableDays, setAvailableDays] = useState([]);
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  //navigate function
  const navigate = useNavigate();
  const location = useLocation();
  // const selectedDoctor = location.state?.selectedDoctor || null;

  const handleDoctorChange = (selectedDoctor) => {
    console.log("Selected Doctor:", selectedDoctor);

    // Find the selected doctor's data
    const doctorData = doctors.find((doctor) => doctor.name === selectedDoctor);

    // Update available days based on the selected doctor
    setAvailableDays(doctorData ? doctorData.availability : []);
    console.log("Available Days:", doctorData ? doctorData.availability : []);
  };
  
  //handle for submission
  const handleSubmit = (e) => {
    e.preventDefault();

    //validate form inputs
    if (!patientName || !selectedDoctor || !selectedDay || !selectedTime) {
      setError("Please fill in all fields.");
      return;
    }

    //check if the selected doctor is valid
    const isValidDoctor = doctors.some(
      (doctor) => doctor.name === selectedDoctor
    );
    if (!isValidDoctor) {
      setError("Selected doctor is not valid.");
      return;
    }

    //Check if the selected day is valid for the selected doctor
    const selectedDoctorData = doctors.find(
      (doctor) => doctor.name === selectedDoctor
    );
    if (!selectedDoctorData.availability.includes(selectedDay)) {
      setError("Selected doctor is not available on the chosen day.");
      return;
    }

    // Check if the selected slot is available
    const isSlotAvailable = !bookedSlots.some((slot) => {
      return (
        slot.doctor === selectedDoctor &&
        slot.day === selectedDay &&
        slot.time === selectedTime
      );
    });

    if (!isSlotAvailable) {
      setError(
        "Selected slot is already booked. Please choose a different time."
      );
      return;
    }
    //update localstroage with the booked appointments
    const appointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    const appointmentData = {
      patient: patientName,
      doctor: selectedDoctor,
      day: selectedDay,
      time: selectedTime,
    };
    appointments.push(appointmentData);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    //update the list of booked slots
    setBookedSlots([...bookedSlots, appointmentData]); // Update the list of booked slots
    //reset form
    setPatientName("");
    setSelectedDoctor("");
    setSelectedDay("");
    setSelectedTime("");
    setError("");
    setShowPopup(true); // show success popup
    // Set appointment information for displaying in the modal
    setAppointmentInfo({
      patient: patientName,
      doctor: selectedDoctor,
      day: selectedDay,
      time: selectedTime,
    });
    navigate("/appointment-management");
    //close popup aftr 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 20000);
  };

  const backtohome = () => {
    navigate("/home");
  };
  const timeSlots = ["09:00", "13:00", "15:00"]; // Define  time slots

  return (
    <>
      <AllHeader />
      <div className="appointment-body">
        <div className="appointment-form-container">
          <div className="back-button">
            <button onClick={backtohome}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
          </div>
          <h2>Book an Appointment</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <div>
              <strong>
                <label>Patient Name:</label>
              </strong>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>

            <div>
              <strong>
                {" "}
                <label>Select a Doctor:</label>
              </strong>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Doctor
                </option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor.name}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <strong>
                {" "}
                <label>Select a Day:</label>
              </strong>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Day
                </option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>

            <div>
              <strong>
                {" "}
                <label>Select a Time:</label>{" "}
              </strong>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Time
                </option>
                {timeSlots.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="submit">
              Book Appointment
            </button>
          </form>

          <Modal show={showPopup} onHide={() => setShowPopup(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Your appointment was successfully booked!</p>
              <p>
                Patient Name: {appointmentInfo?.patient} <br />
                Doctor: {appointmentInfo?.doctor} <br />
                Day: {appointmentInfo?.day} <br />
                Time: {appointmentInfo?.time}
              </p>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}
