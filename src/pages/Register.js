import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import '../asserts/css/Register.css'
import { register } from '../Service/Register'

export default function Register() {

  let navigate=useNavigate()
  const [Registers, setRegisters] = useState({
    name: "",
    email: "",
    loginId: "",
    password: "",
    address: ""
  })
  const [message, setMessage] = useState(null);
  const [error] = useState(null);



  // useEffect(() => {
  //   Service.register().then((res)=>{
  //     console.log(res.data)
  //     setRegisters(res.data)
  //   })
  // }, [])

  let handle=(e)=>{
    const {name,value}=e.target
    setRegisters({...Registers,[name]:value})
  }

  let create=(e)=>{
     e.preventDefault();

     if (!Registers.email.includes('@')) {
      setMessage('Please enter a valid email address.');
      return;
    }
  
    register(Registers).then((res)=>{
      console.log(res.data)
      setMessage('Registration successful!');
      setRegisters({
        name: "",
        email: "",
        loginId: "",
        password: "",
        address: ""
      })
      navigate('/login');
    }
  )
  .catch((error) => {
    console.error('Registration failed:', error);

    if (error.response && error.response.status === 400) {
      const responseData = error.response.data;
      console.log('Response Data:', responseData); 
      if (responseData && responseData.message != "Email must be unique") {
        setMessage('Email address is already registered. Please use another.');
      } else if (responseData && responseData.message != "Login ID must be unique") {
        setMessage('Login ID already exists. Please choose another.');
      } else {
      }
    } else {
      setMessage('Registration failed. Please try again.');
    }
  });
  
  }


  return (
    <div className='body'>
    <div class="register-container">
    <form class="register-form">
        <h4 style={{color:"black"}}>Register</h4>
        <input value={Registers.name} name="name" type="text" placeholder="Full Name" onChange={handle}  required/>
        <br/>
        <input value={Registers.email}  name="email" type="email" placeholder="Email Address" onChange={handle} required/>
        <br/>
        <input value={Registers.loginId}  name="loginId" type="text" placeholder="Login ID" onChange={handle} required/>
        <br/>
        <input value={Registers.password}  name="password" type="password" placeholder="Password" autoComplete="password" onChange={handle} required />
        <br/>
        <input  value={Registers.address} name="address" type="address" placeholder="Address" onChange={handle} required/>
        <br/>
        <button onClick={create} type="submit">Register</button>
        {message && <p className='message'>{message}</p>} 
    </form>
</div>
</div>
  )
}
