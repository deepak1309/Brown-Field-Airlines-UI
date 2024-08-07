import React, { useEffect, useState } from 'react';
import '../asserts/css/Admin.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AdminDetails = () => {
  const { id } = useParams();
  const [aircraftDetails, setAircraftDetails] = useState({
    name: '',
    model: '',
    capacity: ''
  });
  const [aircraft, setAircraft] = useState([]);
  const [currentPageAircraft, setCurrentPageAircraft] = useState(1);
  const [itemsPerPageAircraft] = useState(5);
  const [showAircraftTable, setShowAircraftTable] = useState(false);
  const [showFlightTable, setShowFilghtTable] = useState(false);
  const [flightDetails, setFlightDetails] = useState({
    id: '',
    flightNumber: '',
    departureTime: '',
    arrivalTime: '',
    source: '',
    destination: '',
    aircraft: { id: 0 }
  });
  const [flights, setFlights] = useState([]);
  const [currentPageFlights, setCurrentPageFlights] = useState(1);
  const [itemsPerPageFlights] = useState(5);

  const [fareDetails, setFareDetails] = useState({
    flight: { id: 0 },
    fareClass: '',
    price: 0
  });
  const [currentPageFare, setCurrentPageFare] = useState(1);
  const [itemsPerPageFare] = useState(5);


  const handleAddAircraft = (e) => {
    const { name, value } = e.target;
    setAircraftDetails((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleAircraft = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/aircraft", aircraftDetails)
      .then((res) => {
        setAircraft((prev) => [res.data, ...prev]);
        setAircraftDetails({ name: '', model: '', capacity: '' });
        alert("Aircraft added successfully");
      })
      .catch((error) => {
        console.error("Error adding aircraft:", error.response?.data || error.message);
        alert(error.response?.data || "An error occurred while adding the aircraft.");
      });
  };


  const deleteAircraft = (id) => {
    axios.delete(`http://localhost:8080/api/aircraft/${id}`)
      .then(() => {
        setAircraft((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting aircraft:", error.response?.data || error.message);
      });
  };


  const handleAddFlight = (e) => {
    const { name, value } = e.target;
    setFlightDetails((prev) => ({ ...prev, [name]: value }));
  };


  const handleGetFlight = () => {
    axios.get(`http://localhost:8080/flights/getBy/${flightDetails.flightNumber}`)
      .then((res) => {
        setFlightDetails(res.data);
      })
      .catch((error) => {
        console.error("Error fetching flight details:", error.response?.data || error.message);
      });
  };

    const handleFlight = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/flights", flightDetails)
      .then((res) => {
        setFlights((prev) => [res.data, ...prev]);
        setFlightDetails({
          id: '',
          flightNumber: '',
          departureTime: '',
          arrivalTime: '',
          source: '',
          destination: '',
          aircraft: { id: 0 }
        });
        alert("Flight added successfully");
      })
      .catch((error) => {
        console.error("Error adding flight:", error.response?.data || error.message);
        alert(error.response?.data || "An error occurred while adding the flight.");
      });
  };

  const handleAddFare = (e) => {
    const { name, value } = e.target;
    setFareDetails((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleFare = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/fares/add", fareDetails)
      .then(() => {
        setFareDetails({
          flight: { id: 0 },
          fareClass: '',
          price: 0
        });
        alert("Fare added successfully");
      })
      .catch((error) => {
        console.error("Error adding fare:", error.response?.data || error.message);
        alert(error.response?.data || "An error occurred while adding the fare.");
      });
  };


  const flightget=()=>{
    axios.get("http://localhost:8080/flights")
      .then((res) => {
        setFlights(res.data);
        setShowFilghtTable((prev) => !prev)
      })
      .catch((error) => {
        console.error("Error fetching flights:", error.response?.data || error.message);
      });
  }

  const aircraftGet = () => {
    axios.get("http://localhost:8080/api/aircraft")
      .then((res) => {
        setAircraft(res.data);
        setShowAircraftTable((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error fetching aircraft:", error.response?.data || error.message);
      });
  };


  const paginate = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const paginatedAircraft = paginate(aircraft, currentPageAircraft, itemsPerPageAircraft);
  const paginatedFlights = paginate(flights, currentPageFlights, itemsPerPageFlights);

  const handlePageChange = (page, type) => {
    switch (type) {
      case 'aircraft':
        setCurrentPageAircraft(page);
        break;
      case 'flights':
        setCurrentPageFlights(page);
        break;
      case 'fare':
        setCurrentPageFare(page);
        break;
      default:
        break;
    }
  };

  return (
    <div className="admin-details-container">
      <h2>ADMIN</h2>

      <h3>Aircraft Details</h3>
      <div className="input-container">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={aircraftDetails.name}
          onChange={handleAddAircraft}
        />
        <input
          type="text"
          placeholder="Model"
          name="model"
          value={aircraftDetails.model}
          onChange={handleAddAircraft}
        />
        <input
          type="text"
          placeholder="Capacity"
          name="capacity"
          value={aircraftDetails.capacity}
          onChange={handleAddAircraft}
        />
        <button onClick={handleAircraft}>Add Aircraft</button>
      </div>
      <button onClick={aircraftGet} type="button" class="btn btn-success">
        {showAircraftTable ? 'Hide Aircraft Table' : 'Show Aircraft Table'}
      </button>
      {showAircraftTable && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Model</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAircraft.map((detail) => (
                <tr key={detail.id}>
                  <td>{detail.id}</td>
                  <td>{detail.name}</td>
                  <td>{detail.model}</td>
                  <td>{detail.capacity}</td>
                  <td><button className="delete" onClick={() => deleteAircraft(detail.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPageAircraft - 1, 'aircraft')}
              disabled={currentPageAircraft === 1}
            >
              Previous
            </button>
            <span>Page {currentPageAircraft}</span>
            <button
              onClick={() => handlePageChange(currentPageAircraft + 1, 'aircraft')}
              disabled={paginatedAircraft.length < itemsPerPageAircraft}
            >
              Next
            </button>
          </div>
        </>
      )}

      <h3>Flight Details</h3>
      <input
        type="text"
        placeholder="Flight Number"
        name="flightNumber"
        value={flightDetails.flightNumber}
        onChange={handleAddFlight}
      />
      <button onClick={handleGetFlight}>GET</button>
     
      <div className="input-container">
        <input
          type="text"
          placeholder="Flight Number"
          name="flightNumber"
          value={flightDetails.flightNumber}
          onChange={handleAddFlight}
        />
        <input
          type="text"
          placeholder="Departure Time"
          name="departureTime"
          value={flightDetails.departureTime}
          onChange={handleAddFlight}
        />
        <input
          type="text"
          placeholder="Arrival Time"
          name="arrivalTime"
          value={flightDetails.arrivalTime}
          onChange={handleAddFlight}
        />
        <input
          type="text"
          placeholder="Source"
          name="source"
          value={flightDetails.source}
          onChange={handleAddFlight}
        />
        <input
          type="text"
          placeholder="Destination"
          name="destination"
          value={flightDetails.destination}
          onChange={handleAddFlight}
        />
        <input
          type="number"
          placeholder="Aircraft ID"
          name="aircraft.id"
          value={flightDetails.aircraft.id}
          onChange={handleAddFlight}
        />
        <button onClick={handleFlight}>Add Flight</button>
      </div>

      <button onClick={flightget} type="button" class="btn btn-success">
        {showFlightTable ? 'Hide Aircraft Table' : 'Show Aircraft Table'}
      </button>
      { showFlightTable && (
      <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Flight Number</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Aircraft ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFlights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.flightNumber}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalTime}</td>
              <td>{flight.source}</td>
              <td>{flight.destination}</td>
              <td>{flight.aircraft.id}</td>
              <td><button className="delete">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
      )}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPageFlights - 1, 'flights')}
          disabled={currentPageFlights === 1}
        >
          Previous
        </button>
        <span>Page {currentPageFlights}</span>
        <button
          onClick={() => handlePageChange(currentPageFlights + 1, 'flights')}
          disabled={paginatedFlights.length < itemsPerPageFlights}
        >
          Next
        </button>
      </div>

      <h3>Fare Details</h3>
      <div className="input-container">
        <input
          type="text"
          placeholder="Flight ID"
          name="flight.id"
          value={fareDetails.flight.id}
          onChange={handleAddFare}
        />
        <input
          type="text"
          placeholder="Fare Class"
          name="fareClass"
          value={fareDetails.fareClass}
          onChange={handleAddFare}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={fareDetails.price}
          onChange={handleAddFare}
        />
        <button onClick={handleFare}>Add Fare</button>
      </div>
    </div>
  );
};

export default AdminDetails;
