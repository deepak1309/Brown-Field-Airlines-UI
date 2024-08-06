import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../asserts/css/Register.css'; // Ensure this path is correct
import { register } from '../Service/Register';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    loginId: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    const { name, email, loginId, password, confirmPassword } = formData;

    if (!name) errors.name = 'Full Name is required.';
    if (!email) {
      errors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email Address is invalid.';
    }
    if (!loginId) errors.loginId = 'Login ID is required.';
    if (!password) errors.password = 'Password is required.';
    if (password && password.length < 6) errors.password = 'Password must be at least 6 characters long.';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length > 0) return; // Stop submission if there are validation errors
  
    register(formData)
      .then((res) => {
        console.log('Registration response:', res.data);
  
     
        if (res.data === "Email must be unique") {
          setMessage('Email address is already registered. Please use another.');
          alert('Email address is already registered. Please use another.');
        } else if (res.data === "Login ID must be unique") {
          setMessage('Login ID already exists. Please choose another.');
          alert('Login ID already exists. Please choose another.');
        } else {
          setMessage('Registration successful!');
          setFormData({
            name: "",
            email: "",
            loginId: "",
            password: "",
            confirmPassword: ""
          });
          navigate("/");
        }
      })
      .catch((error) => {
        console.error('Registration failed:', error);
  
        if (error.response) {
          const responseData = error.response.data;
          const responseStatus = error.response.status;
  
          console.log('Error response data:', responseData);
          console.log('Error response status:', responseStatus);
  
          if (responseStatus === 200) {
            if (responseData === "Email must be unique") {
              setMessage('Email address is already registered. Please use another.');
              alert('Email address is already registered. Please use another.');
            } else if (responseData === "Login ID must be unique") {
              setMessage('Login ID already exists. Please choose another.');
              alert('Login ID already exists. Please choose another.');
            } else {
              setMessage('Registration failed. Please try again.');
              alert('Registration failed. Please try again.');
            }
          } else {
            setMessage('Registration failed. Please try again.');
            alert('Registration failed. Please try again.');
          }
        } else {
          setMessage('Registration failed. Please try again.');
          alert('Registration failed. Please try again.');
        }
      });
  };
  
  
  

  return (
    <div className='body'>
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h4 style={{ color: "black" }}>Register</h4>
          <div>
            <input
              value={formData.name}
              name="name"
              type="text"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            {errors.name && <p className='error'>{errors.name}</p>}
          </div>
          <div>
            <input
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
            {errors.email && <p className='error'>{errors.email}</p>}
          </div>
          <div>
            <input
              value={formData.loginId}
              name="loginId"
              type="text"
              placeholder="Login ID"
              onChange={handleChange}
              required
            />
            {errors.loginId && <p className='error'>{errors.loginId}</p>}
          </div>
          <div>
            <input
              value={formData.password}
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              onChange={handleChange}
              required
            />
            {errors.password && <p className='error'>{errors.password}</p>}
          </div>
          <div>
            <input
              value={formData.confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
          </div>
          <button type="submit">Register</button>
          {message && <p className='message'>{message}</p>}
        </form>
      </div>
    </div>
  );
}
