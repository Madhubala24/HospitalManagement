import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditForm() {
  const { index } = useParams();
  const doctorData = JSON.parse(localStorage.getItem("doctorData") || "[]");
  const [formData, setFormData] = useState(doctorData[index]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doctorData[index] = formData;
    localStorage.setItem("doctorData", JSON.stringify(doctorData));
    navigate("/doctor-management"); // Redirect to the details page after editing
  };
  const backtohome=()=>{
    navigate('/doctor-management');
  }

  return (
    <div className="container">
      <button onClick={backtohome}> Back </button>
      <h1>Edit Doctor Information</h1>
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
          <label className="radio-label">Gender:</label>
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

        <div className="form-element">
          <label htmlFor="department" className="label">
            Department:
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
          />
        </div>

        <div className="form-element">
          <label htmlFor="availability" className="label">
            Availability:
          </label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
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
          <input type="submit" value="Save" className="submit-button" />
        </div>
      </form>
    </div>
  );
}