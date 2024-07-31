import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../asserts/css/Register.css';
import { register } from '../Service/Register';

export default function Register() {
  const navigate = useNavigate();
  const [registers, setRegisters] = useState({
    name: "",
    email: "",
    loginId: "",
    password: "",
    confirmPassword: "", 
    address: ""
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

 
  const handle = (e) => {
    const { name, value } = e.target;
    setRegisters({ ...registers, [name]: value });
  };


  const create = (e) => {
    e.preventDefault();

    if (registers.password !== registers.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    register(registers)
      .then((res) => {
        console.log(res.data);
        setMessage('Registration successful!');
        setRegisters({
          name: "",
          email: "",
          loginId: "",
          password: "",
          confirmPassword: "",
          address: ""
        });
        navigate("/");
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        if (error.response && error.response.status === 400) {
          const responseData = error.response.data;
          if (responseData && responseData === "Email must be unique") {
            setMessage('Email address is already registered. Please use another.');
            alert("Email address is already registered. Please use another.")
          } else if (responseData && responseData === "Login ID must be unique") {
            setMessage('Login ID already exists. Please choose another.');
            alert("Login ID already exists. Please choose another.")
          } else {
            setMessage('Registration failed. Please try again.');
            alert("Registration failed. Please try again.")
          }
        } else {
          setMessage('Registration failed. Please try again.');
          alert("Registration failed. Please try again.")
        }
      });
  };



  return (
    <div className='body'>
      <div className="register-container">
        <form className="register-form">
          <h4 style={{ color: "black" }}>Register</h4>
          <input value={registers.name} name="name" type="text" placeholder="Full Name" onChange={handle} required />
          <br />
          <input value={registers.email} name="email" type="email" placeholder="Email Address" onChange={handle} required />
          <br />
          <input value={registers.loginId} name="loginId" type="text" placeholder="Login ID" onChange={handle} required />
          <br />
          <input value={registers.password} name="password" type="password" placeholder="Password" autoComplete="new-password" onChange={handle} required />
          <br />
          <input value={registers.confirmPassword} name="confirmPassword" type="password" placeholder="Confirm Password" autoComplete="new-password" onChange={handle} required />
          <br />
          
          <button onClick={create} type="submit">Register</button>
          {/* {message && <p className='message'>{message}</p>} */}
        </form>
        
      </div>
    </div>
  );
}
