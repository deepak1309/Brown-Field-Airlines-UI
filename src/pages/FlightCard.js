import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FlightContext } from "./Context/FlightContextProvide";
import "../asserts/css/FlightCard.css";
import { Row, Col, Button } from 'react-bootstrap';
import axios from "axios";

function FlightCard() {
  const navigate = useNavigate();
  const { SelectedFlight, setAddedPassengers } = useContext(FlightContext);

  const [passenger, setPassenger] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    gender: ''
  });

  const [error, setError] = useState(null); // State for handling errors

  if (!SelectedFlight) {
    return <div>No flight details available</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassenger(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleClick = () => {
    navigate("/details");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found.');
      setError('No authentication token found.');
      return;
    }

    console.log('Sending passenger data:', passenger);

    axios.post("http://localhost:8080/api/addPassengerList", [passenger], {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      console.log('Passenger added successfully:', res.data);
      setAddedPassengers(prevList => [...prevList, passenger]);
      setPassenger({
        name: '',
        email: '',
        phoneNumber: '',
        gender: ''
      });
      navigate("/add");
    })
    .catch(error => {
      console.error('Error adding passenger list:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error : 'An error occurred while adding the passenger. Please try again later.');
    });
  };

  return (
    <div className="flight-card">
      <div className="flight-header">
        <div className="flight-route">
          <span>{SelectedFlight.source}</span>
          <span className="flight-arrow">→</span>
          <span>{SelectedFlight.destination}</span>
        </div>
        <span className="flight-date">{SelectedFlight.date}</span>
      </div>
      <div className="flight-content">
        <div className="flight-details">
          <div className="flight-info">
            <span className="flight-time">{SelectedFlight.departureTime}</span>
            <br />
            <span>Departure</span>
            <br />
            <span className="flight-terminal">{SelectedFlight.fromTerminal}</span>
          </div>
          <div className="flight-arrow-symbol">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="black"
              className="bi bi-arrows"
              viewBox="0 0 16 16"
            >
              <path d="M1.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L2.707 7.5h10.586l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 1 1-.708-.708L13.293 8.5H2.707l1.146 1.146a.5.5 0 0 1-.708.708l-2-2z" />
            </svg>
          </div>
          <div className="flight-info">
            <span className="flight-time">{SelectedFlight.arrivalTime}</span>
            <br />
            <span>Arrival</span>
            <br />
            <span className="flight-terminal">{SelectedFlight.toTerminal}</span>
          </div>
        </div>
        <div className="flight-duration">
          <span>{SelectedFlight.duration}</span>
        </div>
      </div>
      <div className="flight-footer">
        <div className="flight-price">
          <span>Price:</span>
          <span className="price-value">{SelectedFlight.price}</span>
        </div>
       
      </div>

      <div className="main">
        <h5 style={{ marginLeft: "12px", padding: "3px" }}>
          Traveller Details
        </h5>
        <p style={{ marginLeft: "17px" }}>
          Adult(12 yrs+)
        </p>
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "9px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Row>
            <Col>
              <label>Name</label>
              <input
                className="form-control"
                placeholder="Name"
                type="text"
                name="name"
                value={passenger.name}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <label style={{ display: "flex" }}>Gender</label>
              <input
                type="radio"
                name="gender"
                value="MALE"
                onChange={handleChange}
                id="MALE"
              />
              <label style={{ width: "40px", margin: "5px" }} htmlFor="MALE">
                MALE
              </label>

              <input
                type="radio"
                name="gender"
                value="FEMALE"
                onChange={handleChange}
                id="FEMALE"
              />
              <label style={{ margin: "5px" }} htmlFor="FEMALE">
                FEMALE
              </label>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                style={{ width: "270px" }}
                placeholder="Email"
                name="email"
                value={passenger.email}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <label htmlFor="phone">Mobile No.</label>
              <input
                className="form-control"
                placeholder="Mobile"
                style={{ width: "250px" }}
                type="tel"
                name="phoneNumber"
                value={passenger.phoneNumber}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <hr />
          <Button
            type="submit"
            style={{
              padding: "7px",
              marginRight: "15px",
              width: "150px",
              marginTop: "10px",
            }}
            size="sm"
          >
            + ADD NEW ADULT
          </Button>
          {error && (
            <p style={{ color: 'red', marginTop: '10px' }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default FlightCard;
