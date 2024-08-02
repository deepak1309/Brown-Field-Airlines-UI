import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FlightContext } from "./Context/FlightContextProvide";
import "../asserts/css/FlightCard.css";
import { Row, Col, Button } from 'react-bootstrap';
import axios from "axios";
import { Card, CardContent, Typography, Grid, Divider } from '@mui/material';
import "../asserts/css/Details.css";

function FlightCard() {
  const navigate = useNavigate();
  const { SelectedFlight, setBooking } = useContext(FlightContext);
  const [addedPassengers, setAddedPassengers] = useState([]);
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

  const handleAddAgain = () => {
    navigate(`/flight/${SelectedFlight.flightNumber}`);
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
        console.error('No authentication token found.');
        setError('No authentication token found.');
        return;
      }

      const response = await axios.post("http://localhost:8080/api/bookings/create/payment", pay, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Booking response:', response.data); // Debugging log
      setBooking(response.data);
      setBookingSubmitted(true);
      navigate("/Book")
      
    } catch (error) {
      console.error('Error booking flight:', error);
      setError('Failed to book the flight. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found.');
      setError('No authentication token found.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/addPassengerList", [passenger], {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Passenger added successfully:', response.data);
      setAddedPassengers(prevList => [...prevList, passenger]);
      setPassenger({
        name: '',
        email: '',
        phoneNumber: '',
        gender: ''
      });
      
    } catch (error) {
      console.error('Error adding passenger list:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error : 'An error occurred while adding the passenger. Please try again later.');
    }
  };



  return (
    <div className="flight-card">
      {/* Flight details rendering */}
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

      {/* Passenger form */}
      <div className="main">
        <h5 style={{ marginLeft: "12px", padding: "3px" }}>Traveller Details</h5>
        <p style={{ marginLeft: "17px" }}>Adult (12 yrs+)</p>
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
              <label style={{ width: "40px", margin: "5px" }} htmlFor="MALE">MALE</label>
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                onChange={handleChange}
                id="FEMALE"
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

      {/* Booking Details */}
      {bookingSubmitted && bookingDetails ? (
        <div style={{ padding: '20px' }}>
          <Card style={{ maxWidth: '800px', margin: 'auto' }}>
            <CardContent>
              <Typography variant="h6" component="div" style={{ marginBottom: '20px' }}>
                Booking Details
              </Typography>
              <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
                <strong>Booking Reference:</strong> {bookingDetails.reference}
              </Typography>
              <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
                <strong>Flight Number:</strong> {bookingDetails.flightNumber}
              </Typography>
              <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
                <strong>Fare Class:</strong> {bookingDetails.fareClass}
              </Typography>
              <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
                <strong>Price:</strong> {bookingDetails.price}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <Typography variant="body1" component="div" style={{ color: 'grey' }}>
            {/* No booking details available. */}
          </Typography>
        </div>
      )}

      {/* Passenger List */}
      <div style={{ padding: '20px' }}>
        <Card style={{ maxWidth: '800px', margin: 'auto' }}>
          <CardContent>
            <Typography variant="h6" component="div" style={{ marginBottom: '20px' }}>
              Passenger Details
            </Typography>
            {addedPassengers.length === 0 ? (
              <Typography variant="body1" component="div">
                No passengers added.
              </Typography>
            ) : (
              addedPassengers.map((info, ind) => (
                <div key={ind} style={{ marginBottom: '20px' }}>
                  <Typography variant="h6" component="div" style={{ marginBottom: '10px' }}>
                    Passenger {ind + 1}
                  </Typography>
                  <Divider style={{ marginBottom: '10px' }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" component="div">
                        <strong>Name:</strong> {info.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" component="div">
                        <strong>Email:</strong> {info.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" component="div">
                        <strong>Phone:</strong> {info.phoneNumber}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" component="div">
                        <strong>Gender:</strong> {info.gender}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider style={{ margin: '20px 0' }} />
                </div>
              ))
            )}
            <div className="book" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button variant="contained" color="secondary" onClick={handleBook}>
                Book
              </Button>
            </div>
            {error && (
              <Typography variant="body1" color="error" style={{ marginTop: '20px' }}>
                {error}
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FlightCard;
