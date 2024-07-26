import React, { useContext } from "react";
import { FlightContext } from "./Context/FlightContextProvide";
import "../asserts/css/FlightCard.css";

function FlightCard() {
  const { SelectedFlight } = useContext(FlightContext);

  if (!SelectedFlight) {
    return <div>No flight details available</div>;
  }

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
    </div>
  );
}

export default FlightCard;
