import { useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';

const Location = () => {
  const [currLocation, setCurrLocation] = useState(null);
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);

  useEffect(() => {
    setLocation1({
      lat: 21.2204517,
      lng: 72.872196,
    });
    setLocation2({ lat:  21.2204517, lng: 72.872196 }); // Los Angeles
  }, []);

  const getLocation = async () => {
    const location = await axios.get('https://ipapi.co/json');
    setCurrLocation(location.data);
  };


  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div>
      {location1 && location2 ? (
        <MapComponent location1={{ lat: currLocation?.latitude, lng: currLocation?.longitude }} location2={location2} />
      ) : (
        <p>Loading locations...</p>
      )}
    </div>
  );
};

export default Location;
