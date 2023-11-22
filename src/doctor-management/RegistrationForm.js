import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./register.css";
import AllHeader from "../header.js/AllHeader";

export default function RegistrationForm() {
  // Initialize necessary state variables
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  // Form data state

  const [formData, setFormData] = useState({
    name: "",
    gender: "Male",
    department: "",
    experience: "",
    availability: [],
    fromTime: "09:00",
    toTime: "20:00",
    emergencyNumber: "",
  });
  // const selectedDaysString = formData.availability.join(", ");
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "availability") {
      let updatedSelectedDays;

      if (checked) {
        // If the day is checked, add it to the selected days
        updatedSelectedDays = [...selectedDays, value];
      } else {
        // If the day is unchecked, remove it from the selected days
        updatedSelectedDays = selectedDays.filter((day) => day !== value);
      }

      setSelectedDays(updatedSelectedDays);
      setFormData({ ...formData, [name]: updatedSelectedDays });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve existing doctor data from local storage
    const doctorData = JSON.parse(localStorage.getItem("doctorData") || "[]");

    // Add new form data to the existing doctor data
    doctorData.push(formData);

    // Update local storage with the new data
    localStorage.setItem("doctorData", JSON.stringify(doctorData));

    // Display success popup
    setShowPopup(true);

    // Reset form data after submission
    setFormData({
      name: "",
      gender: "Male",
      department: "",
      experience: "",
      availability: [],
      fromTime: "09:00",
      toTime: "20:00",
      emergencyNumber: "",
    });

    // Hide success popup after 5 seconds
    setTimeout(() => {
      setShowPopup(false);
      navigate("/doctor-management");
    }, 3000);
  };

  // Navigate back to the doctor management page
  const backtodoctor = () => {
    navigate("/doctor-management");
  };

  return (
    <>
      <AllHeader />
      <div className="register-body">
        <div className="registration-container">
          <h1>Doctor Registration Form</h1>
          <div className="back-button">
            <button onClick={backtodoctor}>
              <FontAwesomeIcon icon={faArrowLeft} />
              Back
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-element">
              <label htmlFor="name" className="label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="form-element">
              <label className="label">Gender:</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={handleChange}
                  />
                  Other
                </label>
              </div>
            </div>

            <div className="form-element">
              <label htmlFor="department" className="label">
              Specialist:
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="form-element">
              <label htmlFor="experience" className="label">
                Experience (in years):
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="input"
                required
                min="0"
              />
            </div>

            <div>
              <label htmlFor="availability" className="label">
                Availability:
              </label>
              {daysOfWeek.map((day) => (
                <div key={day} >
                  <input
                    type="checkbox"
                    id={day}
                    name="availability"
                    value={day}
                    checked={selectedDays.includes(day)}
                    onChange={handleChange}
                  />
                  <label htmlFor={day}>{day}</label>
                </div>
              ))}
            </div>
            <div className="form-element">
              <p className="selected-days">Selected Days: {selectedDays.join(", ")}</p>
            </div>
            <div className="form-element">
              <label htmlFor="fromTime" className="label">
                From:
              </label>
              <input
                type="time"
                id="fromTime"
                name="fromTime"
                value={formData.fromTime}
                onChange={handleChange}
                className="input"
                required
              />
              <label htmlFor="toTime" className="label">
                To:
              </label>
              <input
                type="time"
                id="toTime"
                name="toTime"
                value={formData.toTime}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            
          <div className="form-element">
            <label htmlFor="emergencyNumber" className="label">
              Emergency Number:
            </label>
            <input
              type="tel"
              id="emergencyNumber"
              name="emergencyNumber"
              value={formData.emergencyNumber}
              onChange={handleChange}
              className="input"
              required
              pattern="[0-9]*"
            />
          </div>

            <div className="form-element">
              <input type="submit" value="Submit" className="submit-button" />
            </div>
          </form>

          {/* Success popup */}
          <Modal show={showPopup} onHide={() => setShowPopup(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your submission was successful!</Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}
