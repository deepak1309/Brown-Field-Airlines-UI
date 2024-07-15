import React from 'react';
import { useParams } from 'react-router-dom';
import '../asserts/css/FlightCard.css'

const flightData = [
  {
    id: 1,
    airline: 'IndiGo',
    flightNumber: '6E 2434',
    departureTime: '11:30',
    departureCity: 'New Delhi',
    arrivalTime: '14:20',
    arrivalCity: 'Bengaluru',
    duration: '02 h 50 m',
    price: '₹7,955',
    from: 'New Delhi',
    to: 'Bengaluru',
    date: '2023-07-10',
    fromTerminal: "Indira Gandhi International Airport, New Delhi T1",
    toTerminal: "Kempegowda International Airport, Bangalore T2",
    cabinweight: '7kg',
    checkinweight: '15kg',
    basefair: 7000,
    taxes: 955,
  },
  {
    id: 2,
    airline: 'Air India Express',
    flightNumber: 'IX 740',
    departureTime: '06:55',
    departureCity: 'New Delhi',
    arrivalTime: '09:50',
    arrivalCity: 'Bengaluru',
    duration: '02 h 55 m',
    price: '₹8,479',
    from: 'New Delhi',
    to: 'Bengaluru',
    date: '2024-11-23',
    fromTerminal: 'Indira Gandhi International Airport, New Delhi T3',
    toTerminal: 'Kempegowda International Airport, Bangalore T1',
    cabinweight: '7kg',
    checkinweight: '20kg',
    basefair: 8000,
    taxes: 479,
  },
];

function FlightCard() {
  const { id } = useParams();
  const flight = flightData.find((flight) => flight.id === parseInt(id));


  return (
    <div className="flight-card">
      <div className="flight-header">
        <div className="flight-route">
          <span>{flight.from}</span>
          <span className="flight-arrow">→</span>
          <span>{flight.to}</span>
        </div>
        <span className="flight-date">{flight.date}</span>
      </div>
      <div className="flight-content">
        <div className="flight-details">
          <div className="flight-info">
            <span className="flight-time">{flight.departureTime}</span>
            <br />
            <span>Departure</span>
            <br />
            <span className="flight-terminal"> {flight.fromTerminal}</span>
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
            <span className="flight-time">{flight.arrivalTime}</span>
            <br />
            <span>Arrival</span>
            <br />
            <span className="flight-terminal">{flight.toTerminal}</span>
          </div>
        </div>
      </div>
      <div className="flight-meta">
        <div className="meta-info">
          <span>Duration: {flight.duration}</span>
        </div>
        <div className="meta-info">
          <span>Airline: {flight.airline}</span>
        </div>
        <div className="meta-info">
          <span>Flight No: {flight.flightNumber}</span>
        </div>
      </div>
      <div className="baggage-info">
        <span className="baggage-label">Baggage:</span>
        <div className="baggage-details">
          <div className="baggage-item">
            <span>Cabin: {flight.cabinweight}</span>
          </div>
          <div className="baggage-item">
            <span>Check-in: {flight.checkinweight}</span>
          </div>
        </div>
      </div>
      <div className="flight-book">
        <div className="fare-summary">
          <h3>Fare Summary:</h3>
          <p>Base Fare: {flight.basefair} + taxes: {flight.taxes}</p>
          <p><b>Total amount: {flight.basefair + flight.taxes}</b></p>
        </div>
        <button className="book-button">Book</button>
      </div>
    </div>
  );
}

export default FlightCard;
