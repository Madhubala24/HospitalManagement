import React, { useState, useEffect } from "react";
import "./appointmentDetails.css"; // Import your CSS file

export default function AppointmentDetails() {
  const [appointments, setAppointments] = useState([]);
  const [filterBy, setFilterBy] = useState("day");
  const [filterValue, setFilterValue] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  // Function to retrieve appointment data from local storage
  const getAppointmentsData = () => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);
    setFilteredAppointments(storedAppointments); // Initialize with all appointments
  };

  // Use useEffect to retrieve appointment data when the component mounts
  useEffect(() => {
    getAppointmentsData();
  }, []);

  const handleFilter = () => {
    let filteredData = [...appointments];
    if (filterBy === "day") {
      filteredData = filteredData.filter((appointment) => appointment.day === filterValue);
    } else if (filterBy === "user") {
      filteredData = filteredData.filter((appointment) => appointment.patient === filterValue);
    } else if (filterBy === "doctor") {
      filteredData = filteredData.filter((appointment) => appointment.doctor === filterValue);
    }
    setFilteredAppointments(filteredData);
  };

  return (
    <div className="appointment-details-container">
      <h2>View Appointment Booking Details</h2>
      <div>
        <label>Filter By:</label>
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="day">Day</option>
          <option value="user">User</option>
          <option value="doctor">Doctor</option>
        </select>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>

      <table className="appointment-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Doctor</th>
            <th>Day</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.patient}</td>
              <td>{appointment.doctor}</td>
              <td>{appointment.day}</td>
              <td>{appointment.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
