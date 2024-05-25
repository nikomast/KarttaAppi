import { useState } from 'react';
import PropTypes from 'prop-types';
import { addRoute } from "../ApiCalls/RoutesApi";

const NewRouteForm = ({ locations, selectedId, onRouteUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    departureLocationID: '',
    arrivalLocationID: '',
    departureTime: '',
    arrivalTime: '', 
    distance: 0,    
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const routeData = {
        ...formData,
        departureLocationID: selectedId,
      };
      console.log(routeData)
      await addRoute(routeData);
    try {
      setFormData({
        name: '',
        departureLocationID: '',
        arrivalLocationID: '',
        departureTime: '',
        arrivalTime: '',
        distance: 0,
        notes: ''
      });
      onRouteUpdate()
      alert('Route added successfully!');
    } catch (error) {
      console.error('Error adding route:', error);
      alert('Failed to add route. Please try again.');
    }
  };

  return (
  <>
    <form className='createForm' onSubmit={handleSubmit}>
    <h1>Create a new route?</h1>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      <a>From:</a>
      <p> {selectedId}, {locations.find(location => location.id === selectedId)?.name || 'Unknown'}</p>
      <label htmlFor="arrivalLocationID">To:</label>
      <select className="selectLocation" id="arrivalLocationID" name="arrivalLocationID" value={formData.arrivalLocationID} onChange={handleChange} required>
        <option value="">Select Arrival Location</option>
        {locations
            .filter(location => location.id !== selectedId)
            .map(location => (
            <option key={location.id} value={location.id}>{location.id}, {location.name}</option>
            ))}
        </select>

      
      <label htmlFor="departureTime">Departure Time:</label>
      <input type="text" id="departureTime" name="departureTime" value={formData.departureTime} onChange={handleChange} required />
      
      <label htmlFor="notes">Notes:</label>
      <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} />
      
      <button type="submit">Submit</button>
    </form>
    </>
  );
};

NewRouteForm.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    info: PropTypes.string.isRequired
  })).isRequired,
  selectedId: PropTypes.string.isRequired,
  onRouteUpdate: PropTypes.func.isRequired
};

export default NewRouteForm;
