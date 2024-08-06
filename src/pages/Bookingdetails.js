import React, { useContext, useState } from 'react';
import { FlightContext } from './Context/FlightContextProvide';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function BookingDetails() {
  const nav = useNavigate();
  const { SelectedFlight, addpassengers, booking, setBooking } = useContext(FlightContext);
  const [pay, setPay] = useState({
    flightNumber: SelectedFlight?.flightNumber || "",
    fareClass: SelectedFlight?.fareClass || ""
  });
  const [error, setError] = useState(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

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
  
      const response = await axios.post("http://localhost:8080/api/bookings/create/payment", { ...pay, addpassengers }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const bookingData = response.data;
      localStorage.setItem("bookingData", JSON.stringify(bookingData));
      setBooking(bookingData);
      setBookingSubmitted(true);
      nav("/pay");
  
    } catch (error) {
      console.error('Error booking flight:', error);
      setError('Failed to book the flight. Please try again later.');
    }
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Booking Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined" style={{ maxWidth: 600, margin: '0 auto' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Passenger Details
              </Typography>
              {addpassengers.length === 0 ? (
                <Typography variant="body1" style={{ fontSize: '16px' }}>
                  No passengers added.
                </Typography>
              ) : (
                <div>
                  {addpassengers.map((p, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                      <Typography variant="body1" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Passenger {index + 1}:
                      </Typography>
                      <Typography variant="body1" style={{ fontSize: '16px' }}>
                        Name: {p.name}
                      </Typography>
                      <Typography variant="body1" style={{ fontSize: '16px' }}>
                        Email: {p.email}
                      </Typography>
                      <Typography variant="body1" style={{ fontSize: '16px' }}>
                        Phone: {p.phoneNumber}
                      </Typography>
                      <Typography variant="body1" style={{ fontSize: '16px' }}>
                        Gender: {p.gender}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}

              <Typography variant="h6" style={{ marginTop: '20px' }}>
                Flight Information
              </Typography>
              {SelectedFlight && (
                <div>
                  <Typography variant="body1" style={{ fontSize: '16px' }}>
                    Flight Number: {SelectedFlight.flightNumber || 'N/A'}
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: '16px' }}>
                    Source: {SelectedFlight.source || 'N/A'}
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: '16px' }}>
                    Destination: {SelectedFlight.destination || 'N/A'}
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: '16px' }}>
                    Fare Class: {SelectedFlight.fareClass || 'N/A'}
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: '16px' }}>
                    Date: {SelectedFlight.date || 'N/A'}
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: '16px' }}>
                    Aircraft Name: {SelectedFlight.name || 'N/A'}
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: '16px' }}>
                    Price per Passenger: Rs {SelectedFlight.price || 'N/A'}
                  </Typography>
                </div>
              )}

             
            </CardContent>
            <div style={{ padding: '16px', textAlign: 'center' }}>
              {error && <Typography color="error">{error}</Typography>}
              <Button onClick={handleBook} variant="contained" color="primary">
                Confirm Booking
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
