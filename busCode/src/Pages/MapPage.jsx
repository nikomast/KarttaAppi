import { useState, useEffect, useContext  } from 'react';
import { getLocations, updateLocationPosition } from "../ApiCalls/MappiApi";
import { getRoutes } from "../ApiCalls/RoutesApi";
import { ClickedContext  } from '../Contexts/ClickedContext';
import Map from "../Components/Map";
import Routes from "../Components/Routes";
import Create from "../Components/RouteForm"

const MapPage = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [routes, setRoutes] = useState([]);
    const { clicked, updateClicked } = useContext(ClickedContext);

    useEffect(() => {
        async function fetchLocationsAndRoutes() {
            try {
                const fetchedLocations = await getLocations();
                setLocations(fetchedLocations);
                const fetchedRoutes = await getRoutes();
                setRoutes(fetchedRoutes);
                updateClicked(fetchedLocations[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching locations:', error);
                setLoading(false);
            }
        }
        fetchLocationsAndRoutes();
    }, []);
    

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleLocationUpdate = (updatedLocations) => {
        //Myös täällä pitää päivittää reitit?
        if(locations.length <= updatedLocations.length){
            for(let i = 0; i < locations.length; i++){
                if(locations[i] != updatedLocations[i]){
                    updateLocationPosition(updatedLocations[i].id,{
                        name: updatedLocations[i].name,
                        positionX: updatedLocations[i].positionX,
                        positionY: updatedLocations[i].positionY,
                        info: updatedLocations[i].info
                    });
                }
            }
        }
        
        setLocations(updatedLocations);
        handleRouteUpdate()
    };


    async function handleRouteUpdate() {
        console.log(clicked);
        const fetchedRoutes = await getRoutes();
        setRoutes(fetchedRoutes)

        const updatedRoutes = [];
        for (const route of fetchedRoutes) {

            const departureLocation = locations.find(city => city.id === route.departureLocationID)
            const arrivalLocation = locations.find(city => city.id === route.arrivalLocationID)
    
            const departurePosition = { x: departureLocation.positionX, y: departureLocation.positionY }
            const arrivalPosition = { x: arrivalLocation.positionX, y: arrivalLocation.positionY }
    
            const distance =  Math.round(calculateDistance(departurePosition, arrivalPosition))
    
            const timeTakenHours = distance / 50;

            console.log("Montako tuntia aikaa menee", timeTakenHours)
            
            //Miten saan ajat järkevästi laskettua?
            //const departureTime = route.departureTime
            //const arrivalTime = departureTime + timeTakenHours
    
            const updatedRoute = { ...route, distance: distance };
            updatedRoutes.push(updatedRoute);
        }

        setRoutes(updatedRoutes);
}
    function calculateDistance(point1, point2) {
        // Assuming Euclidean distance formula
        return  Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    } 
    

    return (
        <div>
            <h1>Locations</h1>
            {locations.length > 0 && <Map locations={locations} onLocationUpdate={handleLocationUpdate} selectedLocation={clicked} />}
            <Routes selectedLocation={clicked} locations={locations} routes={routes} onRouteUpdate={handleRouteUpdate} />
            <Create locations={locations} selectedId={clicked.id} onRouteUpdate={handleRouteUpdate}  />
        </div>
    );
    
}

export default MapPage;
