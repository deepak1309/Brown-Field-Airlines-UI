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
  const [itemsPerPageAircraft, setItemsPerPageAircraft] = useState(5);

 
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
  const [itemsPerPageFlights, setItemsPerPageFlights] = useState(5);

 
  const [fareDetails, setFareDetails] = useState({
    flight: { id: 0 },
    fareClass: '',
    price: 0
  });
  const [currentPageFare, setCurrentPageFare] = useState(1);
  const [itemsPerPageFare, setItemsPerPageFare] = useState(5);

  // Handlers
  const handleAddAircraft = (e) => {
    const { name, value } = e.target;
    setAircraftDetails({ ...aircraftDetails, [name]: value });
  };

  const handleAircraft = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/aircraft", aircraftDetails)
      .then((res) => {
        console.log(res.data);
        setAircraft((prev) => [res.data, ...prev]);
        setAircraftDetails({ name: '', model: '', capacity: '' });
        alert("added")
      })
      .catch((error) => {
        console.error("Error adding aircraft:", error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data : "An error occurred while adding the aircraft.");
      });
  };
  

  const deleteair = (id) => {
    axios.delete(`http://localhost:8080/api/aircraft/${id}`)
      .then((res) => {
        console.log(res.data);
        setAircraft((prev) => prev.filter((item) => item.id !== id));
      });
  };

  const handleAddFlight = (e) => {
    const { name, value } = e.target;
    setFlightDetails({ ...flightDetails, [name]: value });
  };

  const handlegetFlight = () => {
    axios.get(`http://localhost:8080/flights/getBy/${flightDetails.flightNumber}`)
      .then((res) => {
        console.log(res.data);
        setFlightDetails(res.data);
      });
  };

  const handleFlight = () => {
    axios.post("http://localhost:8080/flights", flightDetails)
      .then((res) => {
        console.log(res.data);
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
        alert("added")
      })
      .catch((error) => {
        console.error("Error adding flight:", error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data : "An error occurred while adding the flight.");
      });
  };
  

  const handleAddFare = (e) => {
    const { name, value } = e.target;
    setFareDetails({ ...fareDetails, [name]: value });
  };

  const handleFare = () => {
    axios.post("http://localhost:8080/api/fares/add", fareDetails)
      .then((res) => {
        console.log(res.data);
        setFareDetails({
          flight: { id: 0 },
          fareClass: '',
          price: 0
        })
        alert("added")
      }) .catch((error) => {
        console.error("Error adding flight:", error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data : "An error occurred while adding the flight.");
      });
  };

 
  useEffect(() => {
    axios.get("http://localhost:8080/api/aircraft")
      .then((res) => {
        console.log(res.data);
        setAircraft(res.data);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/flights")
      .then((res) => {
        console.log(res.data);
        setFlights(res.data);
      });
  }, []);

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

      <h3>Aircraft details</h3>
      <table>
        <thead>
          <tr>
            <th>Flight Name</th>
            <th>Flight Model</th>
            <th>Capacity</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {paginatedAircraft.map((detail) => (
            <tr key={detail.id}>
              <td>{detail.name}</td>
              <td>{detail.model}</td>
              <td>{detail.capacity}</td>
              {/* <td><button onClick={() => deleteair(detail.id)}>Delete</button></td> */}
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

      <h3>Flight Details</h3>
      <input
        type="text"
        placeholder="Flight Number"
        name="flightNumber"
        value={flightDetails.flightNumber}
        onChange={handleAddFlight}
      />
      <button onClick={handlegetFlight}>GET</button>
      <table>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Source</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFlights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalTime}</td>
              <td>{flight.source}</td>
              <td>{flight.destination}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
          type="text"
          placeholder="Aircraft ID"
          name="id"
          value={flightDetails.aircraft.id}
          onChange={(e) => setFlightDetails({
            ...flightDetails,
            aircraft: { id: e.target.value }
          })}
        />
        <button onClick={handleFlight}>Add Flight</button>
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

        </tbody>
      </table>
      {/* <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPageFare - 1, 'fare')}
          disabled={currentPageFare === 1}
        >
          Previous
        </button>
        <span>Page {currentPageFare}</span>
        <button
          onClick={() => handlePageChange(currentPageFare + 1, 'fare')}
        >
          Next
        </button>
      </div> */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Flight ID"
          name="flight"
          value={fareDetails.flight.id}
          onChange={(e) => setFareDetails({ ...fareDetails, flight: { id: e.target.value } })}
        />
        <input
          type="text"
          placeholder="Class"
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
