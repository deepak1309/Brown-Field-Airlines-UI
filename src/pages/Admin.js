import React, { useEffect, useState } from 'react';
import '../asserts/css/Admin.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

const airports = [
  {
    city: "Mumbai",
    code: " BOM - Chhatrapati Shivaji International Airport",
    airport: "Chhatrapati Shivaji International Airport",
  },
  {
    city: "New Delhi",
    code: "DEL",
    airport: "Indira Gandhi International Airport",
  },
  {
    city: "Bengaluru",
    code: "BLR - Kempegowda International Airport",
    airport: "Kempegowda International Airport",
  },
  { city: "Pune", code: "PNQ", airport: "Pune Airport" },
  { city: "Chennai", code: "MAA", airport: "Chennai International Airport" },
  {
    city: "Kolkata",
    code: "CCU",
    airport: "Netaji Subhas Chandra Bose International Airport",
  },
  {
    city: "Hyderabad",
    code: "HYD",
    airport: "Rajiv Gandhi International Airport",
  },
  {
    city: "Ahmedabad",
    code: "AMD",
    airport: "Sardar Vallabhbhai Patel International Airport",
  },
  { city: "Goa", code: "GOI", airport: "Dabolim Airport" },
  {
    city: "Lucknow",
    code: "LKO",
    airport: "Chaudhary Charan Singh International Airport",
  },
  { city: "Jaipur", code: "JAI", airport: "Jaipur International Airport" },
  { city: "Chandigarh", code: "IXC", airport: "Chandigarh Airport" },
  {
    city: "Coimbatore",
    code: "CJB",
    airport: "Coimbatore International Airport",
  },
  {
    city: "Thiruvananthapuram",
    code: "TRV",
    airport: "Trivandrum International Airport",
  },
  { city: "Kochi", code: "COK", airport: "Cochin International Airport" },
  {
    city: "Nagpur",
    code: "NAG",
    airport: "Dr. Babasaheb Ambedkar International Airport",
  },
  { city: "Vadodara", code: "BDQ", airport: "Vadodara Airport" },
  { city: "Bhopal", code: "BHO", airport: "Raja Bhoj International Airport" },
  { city: "Indore", code: "IDR", airport: "Devi Ahilya Bai Holkar Airport" },
  {
    city: "Patna",
    code: "PAT",
    airport: "Jay Prakash Narayan International Airport",
  },
];
const AdminDetails = () => {
  const { id } = useParams();
  const [aircraft, setAircraft] = useState([]);
  const [aircraftEdit, setAircraftEdit] = useState({});
  const [flightEdit, setFlightEdit] = useState({});
  const [fareEdit, setFareEdit] = useState({});
  const [aircraftDetails, setAircraftDetails] = useState({ name: '', model: '', capacity: '' });
  const [currentPageAircraft, setCurrentPageAircraft] = useState(1);
  const [itemsPerPageAircraft] = useState(5);
  const [showAircraftTable, setShowAircraftTable] = useState(false);
  const [showFlightTable, setShowFlightTable] = useState(false);
  const [showFareTable, setShowFareTable] = useState(false);
  const [flightDetails, setFlightDetails] = useState({
    flightNumber: '',
    departureTime: '',
    arrivalTime: '',
    source: '',
    destination: '',
    aircraft: { id: '' }
  });
  const [flights, setFlights] = useState([]);
  const [fares, setFares] = useState([]);
  const [currentPageFlights, setCurrentPageFlights] = useState(1);
  const [itemsPerPageFlights] = useState(5);
  const [fareDetails, setFareDetails] = useState({
    flight: { id: '' },
    fareClass: '',
    price: 0
  });
  const [currentPageFare, setCurrentPageFare] = useState(1);
  const [itemsPerPageFare] = useState(5);

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const handleError = (error) => {
    console.error("Error:", error.response?.data || error.message);
    alert(error.response?.data || "An error occurred.");
  };

  const fetchData = async () => {
    try {
      const [aircraftRes, flightsRes, faresRes] = await Promise.all([
        axios.get("http://localhost:8080/api/aircraft"),
        axios.get("http://localhost:8080/flights"),
        axios.get("http://localhost:8080/api/fares")
      ]);
      setAircraft(aircraftRes.data);
      setFlights(flightsRes.data);
      setFares(faresRes.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paginate = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

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

  const handleAddAircraft = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/aircraft", aircraftDetails);
      setAircraft(prev => [res.data, ...prev]);
      setAircraftDetails({ name: '', model: '', capacity: '' });
      alert("Aircraft added successfully");
    } catch (error) {
      handleError(error);
    }
  };

  const handleAircraftEdit = async (id) => {
    if (!id) return;
    try {
      const res = await axios.patch(`http://localhost:8080/api/aircraft/${id}`, aircraftEdit);
      setAircraft(prev => prev.map(ac => (ac.id === id ? res.data : ac)));
      setAircraftEdit({});
      alert("Aircraft updated successfully");
    } catch (error) {
      handleError(error);
    }
  };

  const deleteAircraft = async (id) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:8080/api/aircraft/${id}`);
      setAircraft(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  const deleteFlight = async (id) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:8080/flights/${id}`);
      setFlights(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  const deleteFare = async (id) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:8080/api/fares/${id}`);
      setFares(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  const handleAddFlight = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/flights", flightDetails);
      setFlights(prev => [res.data, ...prev]);
      setFareDetails(prev => ({ ...prev, flight: { id: res.data.id } }));
      setFlightDetails({
        flightNumber: '',
        departureTime: '',
        arrivalTime: '',
        source: '',
        destination: '',
        aircraft: { id: '' }
      });
      alert("Flight added successfully");
    } catch (error) {
      handleError(error);
    }
  };

  const handleFlightEdit = async (id) => {
    if (!id) return;
    try {
      const res = await axios.patch(`http://localhost:8080/flights/${id}`, flightEdit);
      setFlights(prev => prev.map(flight => (flight.id === id ? res.data : flight)));
      setFlightEdit({});
      alert("Flight updated successfully");
    } catch (error) {
      handleError(error);
    }
  };

  const handleGetFlight = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/flights/getBy/${flightDetails.flightNumber}`);
      setFlightDetails(res.data);
    } catch (error) {
      handleError(error);
    }
  };

  const handleAddFare = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/fares/add", fareDetails);
      setFares(prev => [res.data, ...prev]);
      setFareDetails({ flight: { id: '' }, fareClass: '', price: 0 });
      alert("Fare added successfully");
    } catch (error) {
      handleError(error);
    }
  };

  const handleFareEdit = async (id) => {
    if (!id) return;
    try {
      const res = await axios.patch(`http://localhost:8080/api/fares/${id}`, fareEdit);
      setFares(prev => prev.map(fare => (fare.id === id ? res.data : fare)));
      setFareDetails({ flight: { id: '' }, fareClass: '', price: 0 });
      setFareEdit({});
      alert("Fare updated successfully");
    } catch (error) {
      handleError(error);
    }
  };

  const paginatedAircraft = paginate(aircraft, currentPageAircraft, itemsPerPageAircraft);
  const paginatedFlights = paginate(flights, currentPageFlights, itemsPerPageFlights);
  const paginatedFares = paginate(fares, currentPageFare, itemsPerPageFare);

  return (
    <div className="admin-details-container">
      <h2>ADMIN</h2>

      {/* Aircraft Section */}
      <h3>Aircraft Details</h3>
      <button
        onClick={() => setShowAircraftTable(prev => !prev)}
        type="button"
        className="btn btn-success"
      >
        {showAircraftTable ? 'Hide' : 'Add'} Aircraft Details
      </button>

      {showAircraftTable && (
        <>
          <div className="input-container">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={aircraftDetails.name}
              onChange={handleChange(setAircraftDetails)}
            />
            <input
              type="text"
              placeholder="Model"
              name="model"
              value={aircraftDetails.model}
              onChange={handleChange(setAircraftDetails)}
            />
            <input
              type="text"
              placeholder="Capacity"
              name="capacity"
              value={aircraftDetails.capacity}
              onChange={handleChange(setAircraftDetails)}
            />
            <button onClick={handleAddAircraft} className="btn btn-primary">Add Aircraft</button>
          </div>

          {aircraftEdit.id && (
            <div className="edit-container">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={aircraftEdit.name || ''}
                onChange={handleChange(setAircraftEdit)}
              />
              <input
                type="text"
                placeholder="Model"
                name="model"
                value={aircraftEdit.model || ''}
                onChange={handleChange(setAircraftEdit)}
              />
              <input
                type="text"
                placeholder="Capacity"
                name="capacity"
                value={aircraftEdit.capacity || ''}
                onChange={handleChange(setAircraftEdit)}
              />
              <button onClick={() => handleAircraftEdit(aircraftEdit.id)} type="button" className="btn btn-primary">
                Update Aircraft
              </button>
            </div>
          )}
        </>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAircraft.map((detail) => (
            <tr key={detail.id}>
              <td>{detail.name}</td>
              <td>{detail.model}</td>
              <td>{detail.capacity}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteAircraft(detail.id)}>
                  Delete
                </button>
                &nbsp;&nbsp;
                <button onClick={() => setAircraftEdit(detail)} type="button" className="btn btn-primary">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPageAircraft}
        totalItems={aircraft.length}
        itemsPerPage={itemsPerPageAircraft}
        onPageChange={(page) => handlePageChange(page, 'aircraft')}
      />

      {/* Flight Section */}
      <h3>Flight Details</h3>
      <button
        onClick={() => setShowFlightTable(prev => !prev)}
        type="button"
        className="btn btn-success"
      >
        {showFlightTable ? 'Hide' : 'Add'} Flight Details
      </button>

      {showFlightTable && (
  <>
    <input
      style={{ marginTop: "10px", margin: "5px" }}
      type="text"
      placeholder="Flight Number"
      name="flightNumber"
      value={flightDetails.flightNumber}
      onChange={handleChange(setFlightDetails)}
    />
    <button onClick={handleGetFlight} type="button" className="btn btn-info">
      GET
    </button>

    <div className="input-container" style={{ marginTop: "15px" }}>
      <input
        type="text"
        placeholder="Flight Number"
        name="flightNumber"
        value={flightDetails.flightNumber}
        onChange={handleChange(setFlightDetails)}
        required
      />
      <input
        type="datetime-local"
        placeholder="Departure Time"
        name="departureTime"
        value={flightDetails.departureTime}
        onChange={handleChange(setFlightDetails)}
        required
      />
      <input
        type="datetime-local"
        placeholder="Arrival Time"
        name="arrivalTime"
        value={flightDetails.arrivalTime}
        onChange={handleChange(setFlightDetails)}
        required
      />
       <select
        name="source"
        value={flightDetails.source}
        onChange={handleChange(setFlightDetails)}
        required
      >
        <option value="">Select Source</option>
        {airports.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {airport.city}, {airport.code} - {airport.airport}
          </option>
        ))}
      </select>

      <select
        name="destination"
        value={flightDetails.destination}
        onChange={handleChange(setFlightDetails)}
        required
      >
        <option value="">Select Destination</option>
        {airports.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {airport.city}, {airport.code} - {airport.airport}
          </option>
        ))}
      </select>

      <select
        name="aircraft.id"
        value={flightDetails.aircraft.id}
        onChange={(e) => setFlightDetails(prev => ({
          ...prev,
          aircraft: { id: e.target.value }
        }))}
        required
      >
        <option value="">Select Aircraft</option>
        {aircraft.map(ac => (
          <option key={ac.id} value={ac.id}>
            {ac.name} ({ac.model})
          </option>
        ))}
      </select>
      <button onClick={handleAddFlight} className="btn btn-primary">
        Add Flight
      </button>
    </div>
  


          {flightEdit.id && (
         <div className="edit-container">
         <input
           type="text"
           placeholder="Flight Number"
           name="flightNumber"
           value={flightEdit.flightNumber || ''}
           onChange={handleChange(setFlightEdit)}
         />
         <input
           type="datetime-local"
           placeholder="Departure Time"
           name="departureTime"
           value={flightEdit.departureTime || ''}
           onChange={handleChange(setFlightEdit)}
         />
         <input
           type="datetime-local"
           placeholder="Arrival Time"
           name="arrivalTime"
           value={flightEdit.arrivalTime || ''}
           onChange={handleChange(setFlightEdit)}
         />
       
         <div className="select-container"  >
           <select
             name="source"
             value={flightEdit.source || ''}
             onChange={handleChange(setFlightEdit)}
             required
           >
             <option value="">Select Source</option>
             {airports.map((airport) => (
               <option key={airport.code} value={airport.code}>
                 {airport.city}, {airport.code} - {airport.airport}
               </option>
             ))}
           </select>
         </div>
       
         <div className="select-container">
           <select
             name="destination"
             value={flightEdit.destination || ''}
             onChange={handleChange(setFlightEdit)}
             required
           >
             <option value="">Select Destination</option>
             {airports.map((airport) => (
               <option key={airport.code} value={airport.code}>
                 {airport.city}, {airport.code} - {airport.airport}
               </option>
             ))}
           </select>
         </div>
       
         <select
           name="aircraft.id"
           value={flightEdit.aircraft?.id || ''}
           onChange={(e) => setFlightEdit(prev => ({
             ...prev,
             aircraft: { id: e.target.value }
           }))}
         >
           <option value="">Select Aircraft</option>
           {aircraft.map(ac => (
             <option key={ac.id} value={ac.id}>
               {ac.name} ({ac.model})
             </option>
           ))}
         </select>
       
         <button onClick={() => handleFlightEdit(flightEdit.id)} type="button" className="btn btn-primary">
           Update Flight
         </button>
       </div>
       
           
          )}
        </>
      )}

      <table>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFlights.map(flight => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalTime}</td>
              <td>{flight.source}</td>
              <td>{flight.destination}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteFlight(flight.id)}>
                  Delete
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-primary" onClick={() => setFlightEdit(flight)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPageFlights}
        totalItems={flights.length}
        itemsPerPage={itemsPerPageFlights}
        onPageChange={(page) => handlePageChange(page, 'flights')}
      />

      <h3>Fare Details</h3>

      <button
        onClick={() => setShowFareTable(prev => !prev)}
        type="button"
        className="btn btn-success"
      >
        {showFareTable ? 'Hide' : 'Add'} Fare Details
      </button>
      {showFareTable && (
        <>
       
      <div className="input-container">
        <input
          type="text"
          placeholder="Flight ID"
          name="flight.id"
          value={fareDetails.flight.id}
          onChange={(e) => setFareDetails(prev => ({
            ...prev,
            flight: { id: e.target.value }
          }))}
        />
        <input
          type="text"
          placeholder="Fare Class"
          name="fareClass"
          value={fareDetails.fareClass}
          onChange={handleChange(setFareDetails)}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={fareDetails.price}
          onChange={handleChange(setFareDetails)}
        />
        <button onClick={handleAddFare} className="btn btn-primary">Add Fare</button>
      </div>
      {fareEdit.id && (
        <div className="edit-container">
          <input
            type="text"
            placeholder="Flight ID"
            name="flight.id"
            value={fareEdit.flight.id}
            onChange={(e) => setFareDetails(prev => ({
              ...prev,
              flight: { id: e.target.value }
            }))}
          />
          <input
            type="text"
            placeholder="Fare Class"
            name="fareClass"
            value={fareEdit.fareClass}
            onChange={handleChange(setFareEdit)}
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={fareEdit.price}
            onChange={handleChange(setFareEdit)}
          />
          <button onClick={() => handleFareEdit(fareEdit.id)} className="btn btn-primary">Update Fare</button>
        </div>
      )}
        </>
      )}

      <table>
        <thead>
          <tr>
            <th>Flight ID</th>
            <th>Fare Class</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFares.map(fare => (
            <tr key={fare.id}>
              <td>{fare.flight.id}</td>
              <td>{fare.fareClass}</td>
              <td>{fare.price}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteFare(fare.id)}>
                  Delete
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-primary"  onClick={() => setFareEdit(fare)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPageFare}
        totalItems={fares.length}
        itemsPerPage={itemsPerPageFare}
        onPageChange={(page) => handlePageChange(page, 'fare')}
      />
    </div>
  );
};

export default AdminDetails;