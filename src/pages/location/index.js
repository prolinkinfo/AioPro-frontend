import { useEffect, useState } from "react";
import MapComponent from "./MapComponent";

const Location =()=>{
    const [currLocation, setCurrLocation] = useState(null);
    const [location1, setLocation1] = useState(null);
    const [location2, setLocation2] = useState(null);
  
    useEffect(() => {
      setLocation1({
        lat: 21.2204517,
        lng: 72.892196,
      });
      setLocation2({ lat: 23.1004517, lng: 72.6021963 }); // Los Angeles
    }, []);
  
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        setCurrLocation({ latitude, longitude });
      });
    };
  
    useEffect(() => {
      getLocation();
    }, []);
    return (
        <div>
          {location1 && location2 ? (
            <MapComponent location1={location1} location2={location2} />
          ) : (
            <p>Loading locations...</p>
          )}
        </div>
      );
}

export default Location;