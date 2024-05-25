import axios from 'axios';

export const getRoutes = async () => {
  const url = "http://localhost:3000/routes";
  const response = await axios.get(url);
  return response.data;
}

export const addRoute = async (newRoute) => {
  const url = "http://localhost:3000/routes";
  try {
    const response = await axios.post(url, newRoute);
    return response.data;
  } catch (error) {
    console.error('Error adding route:', error);
    throw error; // Handle or rethrow the error as needed
  }
}

export const deleteRoute = async (id) => {
    const url = `http://localhost:3000/routes/${id}`;
    try{
        const response = await axios.delete(url);
        return response.data;
    }catch(error){
        console.error(error)
        throw error
    }

}