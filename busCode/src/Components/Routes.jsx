import { useState} from 'react';
import { deleteRoute } from "../ApiCalls/RoutesApi";
import PropTypes from 'prop-types';
import Comments from "./Comment";

const RoutesByLocation = ({ locations, selectedLocation, routes, onRouteUpdate }) => {
    const [selectedRoute, setSelectedRoute] = useState(null);

    const handleRouteClick = (routeId) => {
        console.log(routeId, selectedLocation.name)
        setSelectedRoute(routeId === selectedRoute ? null : routeId);
    };

    const routesFilteredByLocation = routes.filter(route => route.departureLocationID === selectedLocation.id);

    async function handleDeleteRoute(id) {
        try {
            await deleteRoute(id);
            onRouteUpdate();
        } catch (error) {
            console.error('Error deleting route:', error);
        }
    }

    return (
        <div className='create-route'>
            <h1>Routes</h1>
            {routesFilteredByLocation.length > 0 ? (
                <div className="viewObjects">
                    {routesFilteredByLocation.map(route => (
                        <div className="mapRoute" key={route.id}>
                            <h2 onClick={() => handleRouteClick(route.id)}>{route.name}</h2>
                            {selectedRoute === route.id && (
                                <div>
                                    <p>Departure Location: {selectedLocation.name}</p>
                                    <p>Arrival Location: {locations.find(location => location.id === route.arrivalLocationID)?.name || 'Unknown'}</p>
                                    <p>Departure Time: {route.departureTime}</p>
                                    <p>Arrival Time: {route.arrivalTime}</p>
                                    <p>Distance: {route.distance}</p>
                                    <p>Notes: {route.notes}</p>
                                    <button onClick={() => handleDeleteRoute(route.id)}>Delete</button>
                                    <Comments entityId={route.id} entityType="route" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No routes found for this location.</p>
            )}
        </div>
    );
}

RoutesByLocation.propTypes = {
    selectedLocation: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        positionX: PropTypes.number.isRequired,
        positionY: PropTypes.number.isRequired,
        info: PropTypes.string.isRequired
    }).isRequired,
    locations: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        positionX: PropTypes.number.isRequired,
        positionY: PropTypes.number.isRequired,
        info: PropTypes.string.isRequired
    })).isRequired,
    routes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        departureLocationID: PropTypes.string.isRequired,
        arrivalLocationID: PropTypes.string.isRequired,
        departureTime: PropTypes.string.isRequired,
        arrivalTime: PropTypes.string.isRequired,
        distance: PropTypes.number.isRequired,
        notes: PropTypes.string.isRequired
    })).isRequired,
    onRouteUpdate: PropTypes.func.isRequired,
};


export default RoutesByLocation;