import React, { useState } from 'react';
import '../asserts/css/Admin.css';

const AdminDetails = () => {
  const [aircraftDetails, setAircraftDetails] = useState([]);
  const [flightDetails, setFlightDetails] = useState([]);
  const [fareDetails, setFareDetails] = useState([]);

  const [aircraft, setAircraft] = useState({ flightname: '', flightmodel: '', capacity: '' });
  const [flight, setFlight] = useState({ AirlineName: '',departureTime: '', arrivalTime: '', source: '', destination: '' });
  const [fare, setFare] = useState({ flightId: '', classType: '', price: ''});

  const handleAddAircraft = () => {
    setAircraftDetails([...aircraftDetails, aircraft]);
    setAircraft({ flightname: '', flightmodel: '', capacity: '' });
  };

  const handleAddFlight = () => {
    setFlightDetails([...flightDetails, flight]);
    setFlight({ AirlineName: '', departureTime: '', arrivalTime: '', source: '', destination: '' });
  };

  const handleAddFare = () => {
    setFareDetails([...fareDetails, fare]);
    setFare({flightId: '', classType: '', price: '' });
  };

  return (
    <div className="admin-details-container">
      <h2>ADMIN</h2>

      <h3>Aircraft details</h3>
      <table>
        <thead>
          <tr>
            <th> Flight Name</th>
            <th>FlightModel</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {aircraftDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.name}</td>
              <td>{detail.model}</td>
              <td>{detail.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="input-container">
        <input
          type="text"
          placeholder="Name"
          value={aircraft.name}
          onChange={(e) => setAircraft({ ...aircraft, name: e.target.value })}
        />
        <input
          type="int"
          placeholder="Model"
          value={aircraft.model}
          onChange={(e) => setAircraft({ ...aircraft, model: e.target.value })}
        />
        <input
          type="text"
          placeholder="Capacity"
          value={aircraft.capacity}
          onChange={(e) => setAircraft({ ...aircraft, capacity: e.target.value })}
        />
        <button onClick={handleAddAircraft}>Add Aircraft</button>
      </div>

      <h3>Flight Details</h3>
      <table>
        <thead>
          <tr>
            <th>AirlineName</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Source</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {flightDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.AirlineName}</td>
              <td>{detail.departureTime}</td>
              <td>{detail.arrivalTime}</td>
              <td>{detail.source}</td>
              <td>{detail.destination}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="input-container">
      <input
          type="text"
          placeholder="Airline Name"
          value={flight.AirlineName}
          onChange={(e) => setFlight({ ...flight, AirlineName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Departure Time"
          value={flight.departureTime}
          onChange={(e) => setFlight({ ...flight, departureTime: e.target.value })}
        />
        <input
          type="text"
          placeholder="Arrival Time"
          value={flight.arrivalTime}
          onChange={(e) => setFlight({ ...flight, arrivalTime: e.target.value })}
        />
        <input
          type="text"
          placeholder="Source"
          value={flight.source}
          onChange={(e) => setFlight({ ...flight, source: e.target.value })}
        />
        <input
          type="text"
          placeholder="Destination"
          value={flight.destination}
          onChange={(e) => setFlight({ ...flight, destination: e.target.value })}
        />
        <button onClick={handleAddFlight}>Add Flight</button>
      </div>

      <h3>Fare Details</h3>
      <table>
        <thead>
          <tr>
            <th>Flight ID</th>
            <th>Class</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {fareDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.flightId}</td>
              <td>{detail.classType}</td>
              <td>{detail.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="input-container">
        <input
          type="text"
          placeholder="Flight ID"
          value={fare.flightId}
          onChange={(e) => setFare({ ...fare, flightId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Class"
          value={fare.classType}
          onChange={(e) => setFare({ ...fare, classType: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={fare.price}
          onChange={(e) => setFare({ ...fare, price: e.target.value })}
        />
        <button onClick={handleAddFare}>Add Fare</button>
      </div>
    </div>
  );
};

export default AdminDetails;
