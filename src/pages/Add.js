import React, { useContext, useState } from 'react';
import { FlightContext } from "./Context/FlightContextProvide";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button, Divider } from '@mui/material';
import "../asserts/css/Details.css";
import axios from 'axios'; // Import axios for making API requests

export default function Add() {
  const { addedPassengers } = useContext(FlightContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State to handle errors

  const handleAddAgain = () => {
    navigate("/flight/:flightNumber"); // Adjust the route as needed
  };

  const handleBook = async () => {
    try {
      // Send a POST request to add passengers
      await axios.post('/api/addPassengerList', { passengers: addedPassengers });
      // On success, navigate to a confirmation page or display a success message
      navigate('/confirmation'); // Adjust the route as needed
    } catch (error) {
      console.error('Error adding passenger list:', error);
      setError('Failed to add passengers. Please try again later.'); // Set an error message
    }
  };

  return (
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
            <Button variant="contained" color="primary" onClick={handleAddAgain}>
              Add Again
            </Button>
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
  );
}
