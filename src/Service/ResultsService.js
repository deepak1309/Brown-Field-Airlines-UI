// src/services/resultsService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/flights"; 

export const fetchFlightResults = async (searchParams) => {
  try {
    const response = await axios.get(
      `${API_URL}/search/${searchParams.tripType}`,
      {
        params: {
          source: searchParams.from,
          destination: searchParams.to,
          departureDate: searchParams.departureDate,
          returnDate: searchParams.returnDate,
          fareClass: searchParams.fareClass,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching flight results:", error);
    throw error;
  }
};
