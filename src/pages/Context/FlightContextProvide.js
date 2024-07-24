
import React, { createContext, useState } from 'react';
import ResultsPage from '../ResultsPage';

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flightResults, setFlightResults] = useState([]);

  return (
    <FlightContext.Provider value={{ flightResults, setFlightResults }}>
     {children}
    </FlightContext.Provider>
  );
};
