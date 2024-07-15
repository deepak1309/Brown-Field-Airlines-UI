import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';
import '../asserts/css/ResultsPage.css';

const flightData = [
  {
    id: 1, // Add an id to uniquely identify each flight
    airline: 'IndiGo',
    flightNumber: '6E 2434',
    departureTime: '11:30',
    departureCity: 'New Delhi',
    arrivalTime: '14:20',
    arrivalCity: 'Bengaluru',
    duration: '02 h 50 m',
    price: '₹7,955',
    discount: 'Use code MMTSUPER and get FLAT Rs. 217 OFF',
  },
  {
    id: 2, // Add an id to uniquely identify each flight
    airline: 'Air India Express',
    flightNumber: 'IX 740',
    departureTime: '06:55',
    departureCity: 'New Delhi',
    arrivalTime: '09:50',
    arrivalCity: 'Bengaluru',
    duration: '02 h 55 m',
    price: '₹8,479',
    discount: 'Use code MMTSUPER and get FLAT Rs. 500 OFF',
  },
];

const ResultsPage = () => {

  const navigate = useNavigate();
  const handleViewPrices = (id) => {
    navigate(`/flight/${id}`);
  };

  return (
    <Container component="main">
      <Typography variant="h4" component="h1" gutterBottom>
        Flight Results
      </Typography>
      {flightData.map((flight) => (
        <Paper key={flight.id} elevation={3} className="flight-card">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <Typography>{flight.airline}</Typography>
              <Typography>{flight.flightNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography>{flight.departureTime}</Typography>
              <Typography>{flight.departureCity}</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography>{flight.duration}</Typography>
              <Typography>Non stop</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography>{flight.arrivalTime}</Typography>
              <Typography>{flight.arrivalCity}</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography>{flight.price}</Typography>
              <Button variant="outlined" onClick={() => handleViewPrices(flight.id)}>
                VIEW
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography className="discount">{flight.discount}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
};

export default ResultsPage;
