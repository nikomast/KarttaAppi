import axios from 'axios';

export const getLocations = async () => {
    const url = "http://localhost:3000/locations";
    const response = await axios.get(url);
    const locationData = response.data;
    return locationData
  }

// Function to add a new location
export const addLocation = async (locationData) => {
    try {
        const url = "http://localhost:3000/locations";
        const response = await axios.post(url, locationData);
        return response.data; // Optionally return data from the response
    } catch (error) {
        console.error('Error adding location:', error);
        throw error; // Handle or rethrow the error as needed
    }
};

export const updateLocationPosition = async (locationId, newPositionData) => {
  try {
      const url = `http://localhost:3000/locations/${locationId}`;
      const response = await axios.put(url, newPositionData);
      return response.data; 
  } catch (error) {
      console.error('Error updating location position:', error);
      throw error; 
  }
};

export const deleteLocation = async (locationId) => {
  try {
      const url = `http://localhost:3000/locations/${locationId}`;
      const response = await axios.delete(url);
      return response.data;
  } catch (error) {
      console.error('Error deleting location:', error);
      throw error;
  }
};

