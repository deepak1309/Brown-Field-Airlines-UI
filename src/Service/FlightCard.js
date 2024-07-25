// Example implementation using Axios for fetchFlightDetails
import axios from 'axios';

export async function fetchFlightDetails(id) {
  try {
    const response = await axios.get(`https://api.example.com/flights/${id}`);
    return response.data; // Assuming API returns JSON data
  } catch (error) {
    console.error('Error fetching flight details:', error);
    throw error; // Propagate the error to handle it in the component
  }
}
