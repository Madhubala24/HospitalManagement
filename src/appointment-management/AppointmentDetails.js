// // AppointmentDetails.js without admin
// import React, { useState, useEffect } from "react";
// import "./appointmentDetails.css";
// import { doctorData, patientData } from "../login/LoginData";

// export default function AppointmentDetails() {
//   const [appointments, setAppointments] = useState([]);
//   const [filterBy, setFilterBy] = useState("day");
//   const [filterValue, setFilterValue] = useState("");
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [loggedInDoctor, setLoggedInDoctor] = useState(null);
//   const [loggedInPatient, setLoggedInPatient] = useState(null);

//   const getAppointmentsData = () => {
//     const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
//     setAppointments(storedAppointments);
//     setFilteredAppointments(storedAppointments);
//   };

//   useEffect(() => {
//     getAppointmentsData();
//     const currentLoggedInDoctor = JSON.parse(localStorage.getItem("loggedInDoctor")) || null;
//     const currentLoggedInPatient = JSON.parse(localStorage.getItem("loggedInPatient")) || null;
    
//     if (currentLoggedInDoctor) {
//       setLoggedInDoctor(currentLoggedInDoctor);
//     } else if (currentLoggedInPatient) {
//       setLoggedInPatient(currentLoggedInPatient);
//     }
//   }, []);

//   const handleFilter = () => {
//     let filteredData = [...appointments];
//     if (filterBy === "day") {
//       filteredData = filteredData.filter((appointment) => appointment.day === filterValue);
//     } else if (filterBy === "user") {
//       filteredData = filteredData.filter((appointment) => appointment.patient === filterValue);
//     } else if (filterBy === "doctor") {
//       filteredData = filteredData.filter((appointment) => appointment.doctor === filterValue);
//     }
//     setFilteredAppointments(filteredData);
//   };

//   return (
//     <div className="appointment-details-container">
//       <h2>View Appointment Booking Details</h2>
//       <div>
//         <label>Filter By:</label>
//         <select
//           value={filterBy}
//           onChange={(e) => setFilterBy(e.target.value)}
//         >
//           <option value="day">Day</option>
//           <option value="user">User</option>
//           <option value="doctor">Doctor</option>
//         </select>
//         <input
//           type="text"
//           value={filterValue}
//           onChange={(e) => setFilterValue(e.target.value)}
//         />
//         <button onClick={handleFilter}>Filter</button>
//       </div>

//       <table className="appointment-table">
//         <thead>
//           <tr>
//             <th>User</th>
//             <th>Doctor</th>
//             <th>Day</th>
//             <th>Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredAppointments.map((appointment, index) => (
//             (appointment.doctor === loggedInDoctor?.doctorusername || appointment.patient === loggedInPatient?.username) && (
//               <tr key={index}>
//                 <td>{appointment.patient}</td>
//                 <td>{appointment.doctor}</td>
//                 <td>{appointment.day}</td>
//                 <td>{appointment.time}</td>
//               </tr>
//             )
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// AppointmentDetails.js
import React, { useState, useEffect } from "react";
import "./appointmentDetails.css";
import { doctorData, patientData } from "../login/LoginData";
import { useNavigate } from "react-router-dom";

export default function AppointmentDetails() {
  const navigate=useNavigate()
  const [appointments, setAppointments] = useState([]);
  const [filterBy, setFilterBy] = useState("day");
  const [filterValue, setFilterValue] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loggedInDoctor, setLoggedInDoctor] = useState(null);
  const [loggedInPatient, setLoggedInPatient] = useState(null);
  const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(false);

  const getAppointmentsData = () => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);
    setFilteredAppointments(storedAppointments);
  };

  useEffect(() => {
    getAppointmentsData();
    const currentLoggedInDoctor = JSON.parse(localStorage.getItem("loggedInDoctor")) || null;
    const currentLoggedInPatient = JSON.parse(localStorage.getItem("loggedInPatient")) || null;
    const isLoggedInAdmin = JSON.parse(localStorage.getItem("isLoggedIn")) === "adminLog";

    setLoggedInDoctor(currentLoggedInDoctor);
    setLoggedInPatient(currentLoggedInPatient);
    setIsLoggedInAdmin(isLoggedInAdmin);
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
  const  backtohome=()=>{
    navigate('/home');
  }
  return (
    <div className="appointmentview-body">
    <div className="appointment-details-container">
     <div className="back-button"> 
     <button  onClick={backtohome}>Back</button>
     </div>
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
            (isLoggedInAdmin || appointment.doctor === loggedInDoctor?.doctorusername || appointment.patient === loggedInPatient?.username) && (
              <tr key={index}>
                <td>{appointment.patient}</td>
                <td>{appointment.doctor}</td>
                <td>{appointment.day}</td>
                <td>{appointment.time}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}