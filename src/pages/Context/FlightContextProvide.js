
import React, { createContext, useEffect, useState } from 'react';
import ResultsPage from '../ResultsPage';

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flightResults, setFlightResults] = useState([]);
  const [SelectedFlight, setSelectedFlight] = useState(null);
  const [addedPassengers, setAddedPassengers] = useState([]);
  const [booking, setBooking] = useState(null)
  const [addpassengers, setaddPassengers] = useState([]); 
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
    
  

  return (
    <FlightContext.Provider value={{ flightResults, setFlightResults,SelectedFlight,setSelectedFlight,isAuthenticated, login, logout ,addedPassengers, setAddedPassengers,booking, setBooking,addpassengers, setaddPassengers }}>
     {children}
    </FlightContext.Provider>
  );
};
