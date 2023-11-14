import React from "react";
import { Link } from "react-router-dom";
import "./doctor.css";

export default function AllDetailsTable({  onDelete }) {
  const doctorData = JSON.parse(localStorage.getItem("doctorData") || "[]");
  const handleDeleteClick = (index) => {
    onDelete(index);
  };
  return (
    <div className="container">
      <h2>Details Table</h2>
     <button><Link to="/register">Add Register</Link> </button> 
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Experience</th>
            <th>Department</th>
            <th>Availability</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {doctorData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.gender}</td>
              <td>{data.experience}</td>
              <td>{data.department}</td>
              <td>{data.availability}</td>
              <td>
              <Link to={`/edit/${index}`}>Edit</Link>
              </td>
              <td>
              <button onClick={() => handleDeleteClick(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}