
import React, { createContext, useEffect, useState } from 'react';
import ResultsPage from '../ResultsPage';

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flightResults, setFlightResults] = useState([]);
  const [SelectedFlight, setSelectedFlight] = useState(null);
  const [addedPassengers, setAddedPassengers] = useState([]);
  // const [user, setUser] = useState(null)
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
    <FlightContext.Provider value={{ flightResults, setFlightResults,SelectedFlight,setSelectedFlight,isAuthenticated, login, logout ,addedPassengers, setAddedPassengers }}>
     {children}
    </FlightContext.Provider>
  );
};
