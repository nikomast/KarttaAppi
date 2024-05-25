import PropTypes from 'prop-types';
import Comments from "../Components/Comment";
import { addLocation, deleteLocation } from "../ApiCalls/MappiApi";
import { useClicked } from '../Utils/clickedUtils';
const Map = ({ locations, onLocationUpdate, selectedLocation }) => {
    const mapSize = 30;
    const { updateClicked } = useClicked();

    const handleCellClick = (location) => {
        if (location !== undefined) {
            updateClicked(location)
        }
    };

    const handleDragStart = (event, location) => {
        event.dataTransfer.setData('location', JSON.stringify(location));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, rowIndex, cellIndex) => {
        event.preventDefault();
        const location = JSON.parse(event.dataTransfer.getData('location'));
        const updatedLocation = { ...location, positionX: cellIndex, positionY: rowIndex };
    
        // Update the locations array with the updated location
        const updatedLocations = locations.map(loc => {
            if (loc.id === updatedLocation.id) {
                return updatedLocation;
            }
            return loc;
        });

        onLocationUpdate(updatedLocations);

    };

    const handleAddLocation = async () => {
        try {
            const name = prompt('Enter location name:');
            const info = prompt('Enter location information:');
    
            const middlePosition = Math.floor(mapSize / 2);
    
            const lastId = locations.reduce((maxId, loc) => Math.max(maxId, parseInt(loc.id)), 0);
            const newId = (lastId + 1).toString();
    
            const newLocation = {
                id: newId,
                name: name,
                positionX: middlePosition,
                positionY: middlePosition,
                info: info
            };
    
            await addLocation(newLocation);
            const updatedLocations = [...locations, newLocation];
            await onLocationUpdate(updatedLocations)


        } catch (error) {
            console.error('Error adding location:', error);
        }
    };

    const handleDeleteLocation = async () => {
        try {
            await deleteLocation(selectedLocation.id);
            const updatedLocations = locations.filter(loc => loc.id !== selectedLocation.id);
            onLocationUpdate(updatedLocations);
        } catch (error) {
            console.error('Error adding location:', error);
        }
    };
    

    return (
        <div>
            <div className="map">
                {Array.from({ length: mapSize }).map((_, rowIndex) => (
                    <div key={rowIndex} className="map-row">
                        {Array.from({ length: mapSize }).map((_, cellIndex) => {
                            const location = locations.find(loc => loc.positionX === cellIndex && loc.positionY === rowIndex);
                            return (
                                <div
                                    key={`${rowIndex}-${cellIndex}`}
                                    className={`map-cell ${location ? 'location' : ''}`}
                                    onClick={() => handleCellClick(location)}
                                    onDragOver={(event) => handleDragOver(event)}
                                    onDrop={(event) => handleDrop(event, rowIndex, cellIndex)}
                                    draggable={location && selectedLocation && location.id === selectedLocation.id}
                                    onDragStart={(event) => handleDragStart(event, location)}
                                >
                                    {location && selectedLocation && location.id === selectedLocation.id}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <>
            <button onClick={handleAddLocation}>Add</button>
            </>
            {selectedLocation && (
                <div className="mapLocation">
                    <h3>{selectedLocation.name}</h3>
                    <p>{selectedLocation.info}</p>
                    <button onClick={handleDeleteLocation}>Delete</button>
                    <Comments entityId={selectedLocation.id} entityType="location" />
                </div>
            )}
            <>
            </>
        </div>
    );
};

Map.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        positionX: PropTypes.number.isRequired,
        positionY: PropTypes.number.isRequired,
        info: PropTypes.string.isRequired
    })).isRequired,
    onLocationUpdate: PropTypes.func.isRequired,
    selectedLocation: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        positionX: PropTypes.number.isRequired,
        positionY: PropTypes.number.isRequired,
        info: PropTypes.string.isRequired
    }).isRequired,
};

export default Map;
