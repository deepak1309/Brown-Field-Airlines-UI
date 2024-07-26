
import React, { createContext, useState } from 'react';
import ResultsPage from '../ResultsPage';

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flightResults, setFlightResults] = useState([]);
  const [SelectedFlight, setSelectedFlight] = useState(null);

  return (
    <FlightContext.Provider value={{ flightResults, setFlightResults,SelectedFlight,setSelectedFlight }}>
     {children}
    </FlightContext.Provider>
  );
};
