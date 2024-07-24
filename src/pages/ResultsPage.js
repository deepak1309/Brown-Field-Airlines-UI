import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Grid, Button } from "@mui/material";
import { fetchFlightResults } from "../Service/ResultsService";
import "../asserts/css/ResultsPage.css";
import { FlightContext } from "./Context/FlightContextProvide";

const ResultsPage = ({flightData}) => {
  const { flightResults } = useContext(FlightContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    console.log(flightResults)
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
        console.log(results);
        setFlights(results);
      } catch (error) {
        console.error("Error fetching flight results:", error);
      }
    };

    fetchResults();
  }, [searchParams]);

  const handleViewPrices = (id) => {
    navigate(`/flight/${id}`);
  };

  return (
    <Container component="main">
      <Typography variant="h4" component="h1" gutterBottom>
        Flight Results
      </Typography>
      {flightResults.length ? (
        flightResults.map((flight) => (
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
                <Typography>Non-stop</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography>{flight.arrivalTime}</Typography>
                <Typography>{flight.arrivalCity}</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography>{flight.price}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleViewPrices(flight.id)}
                >
                  VIEW
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography className="discount">{flight.discount}</Typography>
              </Grid>
            </Grid>
          </Paper>
        ))
      ) : (
        <Typography>No flights found</Typography>
      )}
    </Container>
  );
};

export default ResultsPage;
