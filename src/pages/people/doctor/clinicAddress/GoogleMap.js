import React, { useState, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

const GoogleMap = ({ google, location, stateLocation }) => {
  const [latLng, setLatLng] = useState({});

  const onMarkerDragEnd = ({ latLng }, event) => {
    // const { latLng } = coord;
    const newLatLng = {
      lat: latLng?.lat(),
      lng: latLng?.lng(),
    };
    location(latLng);
    setLatLng(newLatLng);
  };

  const getLocations = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position?.coords;
      setLatLng({ lat: latitude, lng: longitude });
    });
  };

  useEffect(() => {
    if (!stateLocation) {
      getLocations();
    }
    if (stateLocation) {
      setLatLng(stateLocation)
    }
  }, []);
  return (
    <div style={{ position: "relative" }}>
      {Object?.keys(latLng)?.length > 0 ? (
        <Map
          google={google}
          zoom={5}
          initialCenter={{
            lat: latLng?.lat,
            lng: latLng?.lng,
          }}
          style={{
            overFlow: 'hidden',
            height: '400px',
            width:"100%",
            // margin: '20px 32px 0 -32px',
          }}
        >
          <Marker
            position={{
              lat: latLng?.lat,
              lng: latLng?.lng,
            }}
            draggable
            onDragend={(t, map, coord) => onMarkerDragEnd(coord)}
          />
        </Map>
      ) : (
        ''
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAIYlAu07QNv-0ZXEN0NPwtzX9VtOXm1yQ',
})(GoogleMap);