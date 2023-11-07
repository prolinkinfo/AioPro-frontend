// MapComponent.js
import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { apiget } from '../../service/api';
// import micon from './assets/icons/m_icon.png'

const MapComponent = (props) => {
  const [chemistList, setChemistList] = useState([]);
  const { google, location1, location2 } = props;
  // const distance = calculateDistance(location1, location2);

  const chemistGetApi = async () => {
    const result = await apiget(`/api/chemist`);
    if (result && result.status === 200) {
      setChemistList(result?.data);
    }
  };

  useEffect(() => {
    chemistGetApi();
  }, []);

  const customIcon = {
    url: 'http://localhost:8080/public/syringe.png', // Replace with the path to your custom icon image
    scaledSize: new google.maps.Size(32, 32), // Specify the desired width and height for the icon
  };

  return (
    <>

      <Map google={google} initialCenter={location1} center={location1} zoom={10}>
        {chemistList?.map((item, index) => (
          <Marker position={{ lat: item?.lat, lng: item?.lng }} icon={customIcon}  />
        ))}
      </Map>
    </>
  );
};

// // Helper function to calculate the distance between two points in kilometers
// function calculateDistance(point1, point2) {
//   const lat1 = point1.lat;
//   const lon1 = point1.lng;
//   const lat2 = point2.lat;
//   const lon2 = point2.lng;

//   const R = 6371; // Radius of the Earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c; // Distance in km
//   return distance;
// }

// function deg2rad(deg) {
//   return deg * (Math.PI / 180);
// }

export default GoogleApiWrapper({ apiKey: 'AIzaSyAIYlAu07QNv-0ZXEN0NPwtzX9VtOXm1yQ' })(MapComponent);
