import axios from "axios";

const BASE_URL = "http://localhost:8080/api/flights";

const SearchService = {
  searchOneWayFlights: async (
    source,
    destination,
    departureDate,
    fareClass
  ) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/oneway`, {
        params: {
          source,
          destination,
          departureDate,
          fareClass: fareClass?.toUpperCase(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching one-way flights:", error);
      throw error;
    }
  },

  searchTwoWayFlights: async (
    source,
    destination,
    departureDate,
    returnDate,
    fareClass
  ) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/twoway`, {
        params: {
          source,
          destination,
          departureDate,
          returnDate,
          fareClass: fareClass?.toUpperCase(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching two-way flights:", error);
      throw error;
    }
  },
};

export default SearchService;
