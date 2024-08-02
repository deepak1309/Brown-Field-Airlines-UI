import React, { useState } from "react";
import travel from "../asserts/images/travel.jpg";
import "../asserts/css/Login.css";
import { login } from "../Service/Login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [Loggin, setLoggin] = useState({
    loginId: "",
    password: "",
  });
  const [message, setmessage] = useState(null);

  let handleId = (e) => {
    const { name, value } = e.target;
    setLoggin({ ...Loggin, [name]: value });
  };

  let handlelog = (e) => {
    e.preventDefault();
    login(Loggin)
      .then((res) => {
        const { token, role, name, email } = res.data;
        const userData = { role, name, email }; // Include name and email
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData)); // Save user data
        setmessage("Logged In Successfully");
        navigate("/searchPage");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setmessage("Invalid LoginId or Password. Please try again"); // Set error message for unsuccessful login
      });
  };

  return (
    <div className="login">
      <div>
        <img
          src={travel}
          style={{
            width: "660px",
            height: "470px",
            marginLeft: "5px",
            marginTop: "0.5%",
          }}
        />
      </div>
      <div className="login-container">
        <form>
          <input
            value={Loggin.loginId}
            type="text"
            placeholder="Username"
            name="loginId"
            onChange={handleId}
            required
          />
          <br />
          <input
            value={Loggin.password}
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="password"
            onChange={handleId}
            required
          />
          <br />
          <button type="submit" className="btn btn-primary" onClick={handlelog}>
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
