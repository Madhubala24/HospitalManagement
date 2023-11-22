import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import AllHeader from "../header.js/AllHeader";
import "./AppointmentBooking.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function AppointmentBookingFormCopy({ doctors }) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    patientName: "",
    selectedDoctor: "",
    availableDays: "",
    selectedTime: "",
    error: "",
    appointmentInfo: null,
    showPopup: false
  });

  const timeSlots = ["09:00", "13:00", "15:00"];
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [availableDays, setAvailableDays] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleDayChange = (e) => {
    setFormState({
      ...formState,
      availableDays: e.target.value,
    });
  };

  useEffect(() => {
    // Fetch the selected doctor's data from local storage
    const storedDoctor =
      JSON.parse(localStorage.getItem("selectedDoctor")) || {};
    setSelectedDoctor(storedDoctor);
    setAvailableDays(storedDoctor.availability || []); // Set availableDays to the array of strings
  }, [selectedDoctor]);

  const backtohome = () => {
    navigate(-1);
  };

  const bookedAppointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

  const checkDoctorAvailability = (selectedDoctor, selectedDay, selectedTime) => {
    // Check if the selected doctor is already booked for the specified day and time
    return bookedAppointments.some(
      (appointment) =>
        appointment.doctor === selectedDoctor &&
        appointment.day === selectedDay &&
        appointment.time === selectedTime
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the selected doctor is already booked for the specified day and time
    const isDoctorAlreadyBooked = checkDoctorAvailability(
      selectedDoctor.name,
      formState.availableDays,
      formState.selectedTime
    );

    // Update the state accordingly
    if (isDoctorAlreadyBooked) {
      setFormState({
        ...formState,
        error:
          "Selected doctor is already booked for the specified day and time.",
      });
    } else {
      // Your existing logic for successful appointment booking
      const newAppointment = {
        patient: formState.patientName,
        doctor: selectedDoctor.name,
        day: formState.availableDays,
        time: formState.selectedTime,
      };

      // Add the new appointment to the local storage
      localStorage.setItem(
        "appointments",
        JSON.stringify([...bookedAppointments, newAppointment])
      );

      setFormState({
        patientName: "",
        selectedDoctor: "",
        availableDays: "",
        selectedTime: "",
        error: "",
        appointmentInfo: newAppointment,
        showPopup: true,
      });
    }
//     setTimeout(() => {
//      formState.setShowPopup(false);
//       // Navigate to the appointment details page
//       navigate("/doctor-availability");
//     }, 2000);
 };

  const handleClose = () => {
    // Clear form values after closing the modal
    setFormState({
      ...formState,
      patientName: "",
      selectedDoctor: "",
      availableDays: "",
      selectedTime: "",
      error: "",
      appointmentInfo: null,
      showPopup: false,
    });
  };

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
            {formState.error && (
              <p className="error-message">{formState.error}</p>
            )}
            <div>
              <strong>
                <label>Patient Name:</label>
              </strong>
              <input
                type="text"
                value={formState.patientName}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    patientName: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
  <strong>
    <label>Selected Doctor:</label>
  </strong>
  <input
    type="text"
    value={selectedDoctor.name}
    readOnly // Add this to make the input read-only
  />
</div>

            <div>
  <strong>
    <label>Available Day:</label>
  </strong>
  <select
    value={formState.availableDays || (availableDays.length > 0 ? availableDays[0] : "")}
    onChange={handleDayChange}
    required
  >
    <option value="" disabled>
      Select Day
    </option>
    {availableDays.map((day, index) => (
      <option key={index} value={day}>
        {day}
      </option>
    ))}
  </select>
</div>

            <div>
              <strong>
                {" "}
                <label>Select a Time:</label>{" "}
              </strong>
              <select
                value={formState.selectedTime}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    selectedTime: e.target.value,
                  })
                }
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

          <Modal
            show={formState.showPopup}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Your appointment was successfully booked!</p>
              <p>
                Patient Name : {formState.appointmentInfo?.patient} <br />
                Doctor : {formState.appointmentInfo?.doctor} <br />
                Day: {Array.isArray(formState.appointmentInfo?.day) ? formState.appointmentInfo?.day.join(", ") : formState.appointmentInfo?.day} <br />
                Time : {formState.appointmentInfo?.time}
              </p>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}
