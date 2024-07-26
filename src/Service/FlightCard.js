import axios from "axios";

const API_URL = "http://localhost:8080/api/flights"; 

export const fetchFlightDetails = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching flight details:", error);
    throw error;
  }
};
