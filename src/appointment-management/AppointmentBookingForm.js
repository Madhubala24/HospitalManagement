import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./AppointmentBooking.css";

export default function AppointmentBookingForm({ doctors }) {
  const [patientName, setPatientName] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patientName || !selectedDoctor || !selectedDay || !selectedTime) {
      setError("Please fill in all fields.");
      return;
    }

    const isValidDoctor = doctors.some((doctor) => doctor.name === selectedDoctor);

    if (!isValidDoctor) {
      setError("Selected doctor is not valid.");
      return;
    }

    // Check if the selected day is valid for the selected doctor
    const selectedDoctorData = doctors.find((doctor) => doctor.name === selectedDoctor);
    if (!selectedDoctorData.availability.includes(selectedDay)) {
      setError("Selected doctor is not available on the chosen day.");
      return;
    }

    // Check if the selected slot is available
    const isSlotAvailable = !bookedSlots.some((slot) => {
      return slot.doctor === selectedDoctor && slot.day === selectedDay && slot.time === selectedTime;
    });

    if (!isSlotAvailable) {
      setError("Selected slot is already booked. Please choose a different time.");
      return;
    }

    
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const appointmentData = {
      patient: patientName,
      doctor: selectedDoctor,
      day: selectedDay,
      time: selectedTime,
    };
    appointments.push(appointmentData);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // setSuccessMessage("Appointment booked successfully!");
    setBookedSlots([...bookedSlots, appointmentData]); // Update the list of booked slots

    setPatientName("");
    setSelectedDoctor("");
    setSelectedDay("");
    setSelectedTime("");
    setError("");
    setShowPopup(true);

    navigate("/appointment-management");
       //popup
       setTimeout(() => {
        setShowPopup(false);
      }, 3000);
  };
const  backtohome=()=>{
  navigate('/home');
}
  const timeSlots = ["09:00", "13:00", "15:00"]; // Define  time slots

  return (
    <div className="appointment-body">
    <div className="appointment-form-container">
      <div className="back-button">
      <button onClick={backtohome}>Back</button>
      </div>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {/* {successMessage && <p className="success-message">{successMessage}</p>} */}

        <div className="appointment-form">
          <label className="heading">Patient Name:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>

        <div>
         <strong> <label>Select a Doctor:</label></strong>
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
        <strong> <label>Select a Day:</label></strong>
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
        <strong> <label>Select a Time:</label> </strong>
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
        <Modal.Body>Your submission was successful!</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary" onClick={() => setShowPopup(false)}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
    </div>
  );
}