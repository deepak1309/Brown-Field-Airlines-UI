import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../asserts/css/FlightCard.css';
import { fetchFlightDetails } from '../Service/FlightCard';
import { FlightContext } from './Context/FlightContextProvide';

function FlightCard() {
  const { id } = useParams();
  const location = useLocation();
  const { flightResults } = useContext(FlightContext);
  const [flight, setFlight] = useState(null); 
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const params = {
          id:searchParams.get("id"),
          from: searchParams.get('from'),
          to: searchParams.get('to'),
          departureDate: searchParams.get('departureDate'),
          returnDate: searchParams.get('returnDate'),
          fareClass: searchParams.get('fareClass'),
          tripType: searchParams.get('tripType'),
        };
        const results = await fetchFlightDetails(params);
        console.log(results);
        const selectedFlight = results.find(flight => flight.id === parseInt(id));
        setFlight(selectedFlight); 
      } catch (error) {
        console.error('Error fetching flight results:', error);
      }
    };

    fetchResults();
  }, [id, searchParams]); 
  return (
    <div className="flight-card">
      {/* {flightResults ? ( */}
        <>
          <div className="flight-header">
            <div className="flight-route">
              <span>{flightResults.Source}</span>
              <span className="flight-arrow">→</span>
              <span>{flightResults.destination}</span>
            </div>
            <span className="flight-date">{flightResults.departureDate}</span>
          </div>
          <div className="flight-content">
            <div className="flight-details">
              <div className="flight-info">
                <span className="flight-time">{flightResults.departureTime}</span>
                <br />
                <span>Departure</span>
                <br />
                <span className="flight-terminal">{flightResults.fromTerminal}</span>
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
                  <path d="M1.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L2.707 7.5h10.586l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L13.293 8.5H2.707l1.147 1.146a.5.5 0 0 1-.708.708z" />
                </svg>
              </div>
              <div className="flight-info">
                <span className="flight-time">{flightResults.arrivalTime}</span>
                <br />
                <span>Arrival</span>
                <br />
                <span className="flight-terminal">{flightResults.toTerminal}</span>
              </div>
            </div>
          </div>
          <div className="flight-meta">
            <div className="meta-info">
              <span>Duration: {flightResults.duration}</span>
            </div>
            <div className="meta-info">
              <span>Airline: {flightResults.airline}</span>
            </div>
            <div className="meta-info">
              <span>Flight No: {flightResults.flightNumber}</span>
            </div>
          </div>
          <div className="baggage-info">
            <span className="baggage-label">Baggage:</span>
            <div className="baggage-details">
              <div className="baggage-item">
                <span>Cabin: {flightResults.cabinweight}</span>
              </div>
              <div className="baggage-item">
                <span>Check-in: {flightResults.checkinweight}</span>
              </div>
            </div>
          </div>
          <div className="flight-book">
            <div className="fare-summary">
              <h3>Fare Summary:</h3>
              <p>Base Fare: {flightResults.basefair} + taxes: {flightResults.taxes}</p>
              <p>
                <b>Total amount: {flightResults.basefair + flightResults.taxes}</b>
              </p>
            </div>
            <button className="book-button">Book</button>
          </div>
        </>
     
    </div>
  );
}

export default FlightCard;
