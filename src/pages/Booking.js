import axios from 'axios';
import React, { useState } from 'react';

export default function Booking() {
  const [book, setBook] = useState({
    flightNumber: "",
    fareClass: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Booking data:', book);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found.');
        return;
      }

      const response = await axios.post("http://localhost:8080/api/bookings/create/payment", book, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Booking response:', response.data);
      setSuccess('Booking successful!');
      setError(null);

      
    } catch (error) {
      console.error('Error booking flight:', error);
      if (error.response) {
        setError(`Response error: ${error.response.data}`);
      } else if (error.request) {
        setError('No response received from server.');
      } else {
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Book a Flight</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Flight Number:</label>
          <input
            name='flightNumber'
            value={book.flightNumber}
            onChange={handleChange}
            placeholder='Enter flight number'
            required
          />
        </div>
        <div>
          <label>Fare Class:</label>
          <input
            name='fareClass'
            value={book.fareClass}
            onChange={handleChange}
            placeholder='Enter fare class'
            required
          />
        </div>
        <button type='submit'>Book</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
