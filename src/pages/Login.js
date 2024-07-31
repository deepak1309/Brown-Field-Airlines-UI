import React, { useState } from "react";
import travel from "../asserts/images/travel.jpg";
import "../asserts/css/Login.css";
import { login } from "../Service/Login";
import { useAuth } from './Context/Auth';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();
  const [loginData, setLoginData] = useState({
    loginId: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginData)
      .then((res) => {
        const token = res.data; 
        setAuth(token);
        setMessage("Logged In Successfully");
        navigate("/searchPage");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setMessage("Invalid Login ID or Password. Please try again.");
      });
  };

  return (
    <div className="login">
      <div>
        <img
          src={travel}
          alt="Travel"
          style={{
            width: "660px",
            height: "470px",
            marginLeft: "5px",
            marginTop: "0.5%",
          }}
        />
      </div>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <input
            value={loginData.loginId}
            type="text"
            placeholder="Username"
            name="loginId"
            onChange={handleInputChange}
            required
          />
          <br />
          <input
            value={loginData.password}
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            required
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <br />
          <div className="password">
            <a className="nav-link" href="/forgot">
              Forgot Password
            </a>
            <a
              className="nav-link"
              style={{ marginLeft: "235px", marginTop: "-7%" }}
              href="/register"
            >
              New User
            </a>
          </div>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
