import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Grid, Button } from "@mui/material";
import { fetchFlightResults } from "../Service/ResultsService";
import { FlightContext } from "./Context/FlightContextProvide";
import axios from "axios";

const Results = () => {
  const { flightResults, setFlightResults,setSelectedFlight } = useContext(FlightContext);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const params = {
          from: searchParams.get("from"),
          to: searchParams.get("to"),
          departureDate: searchParams.get("departureDate"),
          returnDate: searchParams.get("returnDate"),
          fareClass: searchParams.get("fareClass"),
          tripType: searchParams.get("tripType"),
        };

        const results = await fetchFlightResults(params);
        console.log('Fetched Results:', results);
        setFlightResults(results);
      } catch (error) {
        console.error("Error fetching flight results:", error);
      }
    };

    fetchResults();
  }, [searchParams, setFlightResults]);

  const handleViewPrices = async (flightNumber) => {
    try {
      const flight = flightResults.find(flight => flight.flightNumber === flightNumber);
      console.log(flight)
      if (flight) {
        localStorage.setItem(`flight_${flightNumber}`, JSON.stringify(flight));
        setSelectedFlight(flight );
        navigate(`/flight/${flightNumber}`);
      }
    } catch (error) {
      console.error('Error fetching flight details:', error);
      alert("Failed to fetch flight details");
    }
  };

  const handleViewPrice = async (flightNumber) => {
    try {
      const flight = flightResults.returnFlights.find(flight => flight.flightNumber === flightNumber);
      console.log(flight)
      if (flight) {
        localStorage.setItem(`flight_${flightNumber}`, JSON.stringify(flight));
        setSelectedFlight(flight );
        navigate(`/flight/${flightNumber}`);
      }
    } catch (error) {
      console.error('Error fetching flight details:', error);
      alert("Failed to fetch flight details");
    }
  };

  const handleViewPricess = async (flightNumber, flightType) => {
    try {
      if (!flightResults || !flightResults[flightType]) {
        throw new Error("Flight results or flight type not available.");
      }

      const flight = flightResults[flightType].find(flight => flight.flightNumber === flightNumber);
      
      if (flight) {
        localStorage.setItem(`flight_${flightNumber}`, JSON.stringify(flight));
        setSelectedFlight(flight);
        navigate(`/flight/${flightNumber}`);
      } else {
        alert("Flight not found.");
      }
    } catch (error) {
      console.error('Error fetching flight details:', error);
      alert("Failed to fetch flight details");
    }
  };
  
  
  return (
    <Container component="main">
    <Typography variant="h4" component="h1" gutterBottom>
      Flight Results
    </Typography>
    {flightResults.length ? (
      <Typography></Typography>
    ) : (
      <div>
        <h3>Outbound Flights</h3>
        <ul>
          {flightResults.outboundFlights.map(flight => (
           <Paper key={flight.id} elevation={3} className="flight-card">
           <Grid container spacing={2}>
           <Typography>{flight.date}</Typography>
             <Grid item xs={12} sm={2}>
               <Typography>{flight.name}</Typography>
               <Typography>{flight.flightNumber}</Typography>
             </Grid>
             &nbsp;&nbsp;&nbsp;&nbsp;
             <Grid item xs={12} sm={2}>
               <Typography>{flight.departureTime}</Typography>
               <Typography>{flight.source}</Typography>
             </Grid>
             <Grid item xs={12} sm={2}>
               <Typography>{flight.duration}</Typography>
               <Typography>Non-stop</Typography>
             </Grid>
             <Grid item xs={12} sm={2}>
               <Typography>{flight.arrivalTime}</Typography>
               <Typography>{flight.destination}</Typography>
             </Grid>
             
             <Grid item xs={12} sm={2}>
               <Typography>{flight.price}</Typography>
               <Button
                 variant="outlined"
                 onClick={() => handleViewPricess(flight.flightNumber,'outboundFlights')}
               >
                 VIEW
               </Button>
             </Grid>
             <Grid item xs={12}>
               <Typography className="discount">{flight.discount}</Typography>
             </Grid>
           </Grid>
         </Paper>
          ))}
        </ul>
        
        <h3>Return Flights</h3>
        <ul>
          {flightResults.returnFlights.map(flight => (
            <Paper key={flight.id} elevation={3} className="flight-card">
            <Grid container spacing={2}>
            <Typography>{flight.date}</Typography>
              <Grid item xs={12} sm={2}>
                <Typography>{flight.name}</Typography>
                <Typography>{flight.flightNumber}</Typography>
              </Grid>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Grid item xs={12} sm={2}>
                <Typography>{flight.departureTime}</Typography>
                <Typography>{flight.source}</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography>{flight.duration}</Typography>
                <Typography>Non-stop</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography>{flight.arrivalTime}</Typography>
                <Typography>{flight.destination}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={2}>
                <Typography>{flight.price}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleViewPrice(flight.flightNumber,'returnFlights')}
                >
                  VIEW
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography className="discount">{flight.discount}</Typography>
              </Grid>
            </Grid>
          </Paper>
          ))}
        </ul>
      </div>
  
  )
}
  </Container>
  );
};

export default Results;
