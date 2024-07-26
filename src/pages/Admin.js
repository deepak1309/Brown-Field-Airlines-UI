import React, { useEffect, useState } from 'react';
import '../asserts/css/Admin.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AdminDetails = () => {
 const {id}= useParams()
  const [aircraftDetails, setAircraftDetails] = useState({
    "name": "",
"model": "",
"capacity": ""
  });
  const [flightDetails, setFlightDetails] = useState({
    "id":"",
    "flightNumber": "",
   "departureTime": "",
   "arrivalTime": "",
   "source": "",   
   "destination": "",
   "aircraft": {"id": 0 }
  });
  const [fareDetails, setFareDetails] = useState({
    "flight": {"id": 0},
   "fareClass": "",
   "price":0
  });

  const [aircraft, setAircraft] = useState([]);
  const [flights, setFlights] = useState([]);

  // const [flight, setFlight] = useState({ AirlineName: '',departureTime: '', arrivalTime: '', source: '', destination: '' });
  // const [fare, setFare] = useState({ flightId: '', classType: '', price: ''});

  const handleAddAircraft = (e) => {
    const {name , value}=e.target
    setAircraftDetails({...aircraftDetails,[name]:value });
  };

  const handleAircraft=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8080/api/aircraft",aircraftDetails).then(
      (res)=>{
        console.log(res.data)
        setAircraftDetails(res.data)
      }
    )
  }


  const deleteair=(id)=>{
    axios.delete(`http://localhost:8080/api/aircraft/${id}`).then((res)=>{
      console.log(res.data)
    })
  }
 
  useEffect(() => {
    setTimeout(() => {
      axios.get("http://localhost:8080/api/aircraft",aircraft).then(
        (res)=>{
          console.log(res.data)
          setAircraft(res.data)
        })
    }, 100);
}, [])



  const handleAddFlight = (e) => {
    const {name , value}=e.target
    setFlightDetails({...flightDetails, [name]:value});
   
  };

useEffect(() => {
  axios.get("http://localhost:8080/flights",flights).then(
    (res)=>{
      console.log(res.data)
      setFlights(res.data)
    })
}, [])

const handlegetFlight=()=>{
  axios.get(`http://localhost:8080/flights/getBy/${flightDetails.flightNumber}`).then(
          (res)=>{
            console.log(res.data)
            setFlightDetails(res.data)
          })
}

  const handleFlight=()=>{
    axios.post("http://localhost:8080/flights",flightDetails).then(
      (res)=>{
        console.log(res.data)
      }
    )
  }

  const handleAddFare = (e) => {
    const {name , value}=e.target
    setFareDetails({...fareDetails,[name]:value });
  };

  const handleFare=()=>{
    axios.post("http://localhost:8080/api/fares/add",fareDetails).then(
      (res)=>{
        console.log(res.data)
      }
    )
  }
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
          {aircraft.map((detail, index) => (
            <tr key={index}>
              <td>{detail.name}</td>
              <td>{detail.model}</td>
              <td>{detail.capacity}</td>
              <td><button onClick={deleteair}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="input-container">
        <input
          type="text"
          placeholder="Name"
          name='name'
          onChange={handleAddAircraft}
        />
        <input
          type="int"
          name='model'
          placeholder="Model"
          onChange={handleAddAircraft}
        />
        <input
          type="text"
          placeholder="Capacity"
          name='capacity'
          onChange={handleAddAircraft}
        />
        <button onClick={handleAircraft}>Add Aircraft</button>
      </div>

      <h3>Flight Details</h3>
      <input    type="text"
          placeholder="ID"
          name='flightNumber'
          onChange={handleAddFlight}/>
          <button onClick={handlegetFlight}>GET</button>
          <table>
        <thead>
          <tr>
            <th>AirlineNumber</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Source</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tr key={flightDetails.id}>
              <td>{flightDetails.flightNumber}</td>
              <td>{flightDetails.departureTime}</td>
              <td>{flightDetails.arrivalTime}</td>
              <td>{flightDetails.source}</td>
              <td>{flightDetails.destination}</td>
            </tr>
        
      {/* <table> */}
        <thead>
          <tr>
            <th>AirlineNumber</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Source</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((Details, index) => (
            <tr>
              <td>{Details.flightNumber}</td>
              <td>{Details.departureTime}</td>
              <td>{Details.arrivalTime}</td>
              <td>{Details.source}</td>
              <td>{Details.destination}</td>
            </tr>
          ))}
        </tbody>
        <tbody>
          {/* {flightDetails.map((detail, index) => ( */}
            {/* <tr key={flightDetails.id}>
              <td>{flightDetails.flightNumber}</td>
              <td>{flightDetails.departureTime}</td>
              <td>{flightDetails.arrivalTime}</td>
              <td>{flightDetails.source}</td>
              <td>{flightDetails.destination}</td>
            </tr> */}
          {/* ))} */}
        </tbody>
      </table>
      <div className="input-container">
      <input
          type="text"
          placeholder="Airline Name"
          name="flightNumber"
          onChange={handleAddFlight}
        />
        <input
          type="text"
          placeholder="Departure Time"
          name="departureTime"
          onChange={handleAddFlight}
        />
        <input
          type="text"
          placeholder="Arrival Time"
          name="arrivalTime"
          onChange={handleAddFlight}
        />
        <input
          type="text"
          placeholder="Source"
          name="source"
          onChange={handleAddFlight}
        />
        <input
          type="text"
          placeholder="Destination"
          name="destination"
          onChange={handleAddFlight}
        />
          <input
          type="text"
          placeholder="Id"
          name="id"
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
          {/* {fareDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.flightId}</td>
              <td>{detail.classType}</td>
              <td>{detail.price}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
      <div className="input-container">
        <input
          type="text"
          placeholder="Flight ID"
          name='flight'
          onChange={(e)=>setFareDetails({...fareDetails,flight:{ id: e.target.value }})}
        />
        <input
          type="text"
          placeholder="Class"
          name="fareClass"
          onChange={handleAddFare}
        />
        <input
          type="text"
          placeholder="Price"
          name="price"
          onChange={handleAddFare}
        />
        <button onClick={handleFare}>Add Fare</button>
      </div>
    </div>
  );
};

export default AdminDetails;
