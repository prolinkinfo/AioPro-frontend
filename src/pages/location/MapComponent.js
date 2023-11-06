// MapComponent.js
import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import VaccinesIcon from '@mui/icons-material/Vaccines';

const MapComponent = (props) => {
  const { google, location1, location2 } = props;
  const distance = calculateDistance(location1, location2);

  return (
    <Map google={google} initialCenter={location1} center={location1} zoom={10}>
      <Marker position={location1} name="Location 1" icon={<VaccinesIcon />} />
      <Marker position={location2} name="Location 2" icon={<VaccinesIcon />} />

      {/* <InfoWindow position={location1}>
        <div>
          <h2>Location 1</h2>
          <p>Latitude: {location1.lat}</p>
          <p>Longitude: {location1.lng}</p>
        </div>
      </InfoWindow>

      <InfoWindow position={location2}>
        <div>
          <h2>Location 2</h2>
          <p>Latitude: {location2.lat}</p>
          <p>Longitude: {location2.lng}</p>
        </div>
      </InfoWindow> */}

      {/* <InfoWindow
        position={{
          lat: (location1.lat + location2.lat) / 2,
          lng: (location1.lng + location2.lng) / 2,
        }}
      >
        <div>
          <h2>Distance</h2>
          <p>{distance.toFixed(2)} km</p>
        </div>
      </InfoWindow> */}
    </Map>
  );
};

// Helper function to calculate the distance between two points in kilometers
function calculateDistance(point1, point2) {
  const lat1 = point1.lat;
  const lon1 = point1.lng;
  const lat2 = point2.lat;
  const lon2 = point2.lng;

  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyAIYlAu07QNv-0ZXEN0NPwtzX9VtOXm1yQ' })(MapComponent);
