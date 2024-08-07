import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FlightContext } from "./Context/FlightContextProvide";
import "../asserts/css/FlightCard.css";
import { Row, Col, Button } from 'react-bootstrap';
import axios from "axios";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "../asserts/css/Details.css";

function FlightCard() {
  const navigate = useNavigate();
  const { SelectedFlight, setBooking,setaddPassengers,addpassengers } = useContext(FlightContext);
  const [passengers, setPassengers] = useState([]); 
  const [passenger, setPassenger] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    gender: ''
  });
  const [pay, setPay] = useState({
    flightNumber: SelectedFlight?.flightNumber || "",
    fareClass: SelectedFlight?.fareClass || ""
  });
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

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

  const handleAddPassenger = (e) => {
    e.preventDefault();
    if (!passenger.name || !passenger.email || !passenger.phoneNumber || !passenger.gender) {
      setError('All passenger details are required.');
      return;
    }

    setPassengers(prevList => [...prevList, passenger]);
    setPassenger({
      name: '',
      email: '',
      phoneNumber: '',
      gender: ''
    });
    setError(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found.');
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/addPassengerList", passengers, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then((res)=>{
        console.log(res.data)
        setPassengers([passengers]);
        setPassenger({
          name: '',
          email: '',
          phoneNumber: '',
          gender: ''
        });
        setaddPassengers(res.data)
        navigate("/Book");
      })

    } catch (error) {
      setError('An error occurred while adding the passengers. Please try again later.');
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!pay.flightNumber || !pay.fareClass) {
      setError('Flight number and fare class are required.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found.');
        return;
      }

      
      const response = await axios.post("http://localhost:8080/api/bookings/create/payment", { ...pay, passengers }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      setBooking(response.data);
      setBookingDetails(response.data);
      setBookingSubmitted(true);
      navigate("/Book");

    } catch (error) {
      setError('Failed to book the flight. Please try again later.');
    }
  };

  return (
    <div className="flight-card">
      <div className="flight-header">
        <div className="flight-route">
          <span>{SelectedFlight.source}</span>
          <span className="flight-arrow">→</span>
          <span>{SelectedFlight.destination}</span>
        </div>
        <span className="flight-date">{SelectedFlight.flightNumber}</span>
        <span className="flight-date">{SelectedFlight.fareClass}</span>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="black" className="bi bi-arrows" viewBox="0 0 16 16">
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
        <h5 className="traveller-details-heading">Traveller Details</h5>
        <p className="traveller-details-subtitle">Adult (12 yrs+)</p>
        <form
          className="passenger-form"
          onSubmit={handleAddPassenger}
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
                checked={passenger.gender === 'MALE'}
              />
              <label style={{ width: "40px", margin: "5px" }} htmlFor="MALE">MALE</label>
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                onChange={handleChange}
                id="FEMALE"
                checked={passenger.gender === 'FEMALE'}
              />
              <label style={{ margin: "5px" }} htmlFor="FEMALE">FEMALE</label>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <label>Email</label>
              <input
                type="email"
                className="form-control"
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
            className="add-passenger-button"
            size="sm"
          >
            + ADD NEW ADULT
          </Button>
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}
        </form>
      </div>

      <div className="card-container">
        <Card>
          <CardContent>
            <Typography variant="h6" component="div" className="card-title">
              Passenger Details
            </Typography>
            {passengers.length === 0 ? (
              <Typography variant="body1" component="div">
                No passengers added.
              </Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><Typography variant="h6">Passenger</Typography></TableCell>
                      <TableCell><Typography variant="h6">Name</Typography></TableCell>
                      <TableCell><Typography variant="h6">Email</Typography></TableCell>
                      <TableCell><Typography variant="h6">Phone</Typography></TableCell>
                      <TableCell><Typography variant="h6">Gender</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {passengers.map((info, ind) => (
                      <TableRow key={ind}>
                        <TableCell><Typography variant="body1">Passenger {ind + 1}</Typography></TableCell>
                        <TableCell><Typography variant="body1">{info.name}</Typography></TableCell>
                        <TableCell><Typography variant="body1">{info.email}</Typography></TableCell>
                        <TableCell><Typography variant="body1">{info.phoneNumber}</Typography></TableCell>
                        <TableCell><Typography variant="body1">{info.gender}</Typography></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {error && (
              <Typography variant="body1" color="error" className="error-message">
                {error}
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>

      <Button
        onClick={handleSubmit}
        className="book-flight-button"
      >
        Add Passengers
      </Button>
      {/* <Button
        onClick={handleBook}
        className="book-flight-button"
      >
        Book Flight
      </Button> */}
    </div>
  );
}

export default FlightCard;
