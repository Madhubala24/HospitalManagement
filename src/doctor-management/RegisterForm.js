import React, { useState } from 'react';
import './RegisterForm.css'; // Import your CSS file

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    department: '',
    experience: '',
    availabilityFrom: '',
    availabilityTo: '',
    emergencyNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience (in years):</label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="availabilityFrom">Availability (Day and timing): From</label>
          <input
            type="text"
            id="availabilityFrom"
            name="availabilityFrom"
            value={formData.availabilityFrom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="availabilityTo">To:</label>
          <input
            type="text"
            id="availabilityTo"
            name="availabilityTo"
            value={formData.availabilityTo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emergencyNumber">Emergency Number:</label>
          <input
            type="tel"
            id="emergencyNumber"
            name="emergencyNumber"
            value={formData.emergencyNumber}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
