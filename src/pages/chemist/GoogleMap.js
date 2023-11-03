import React, { useState,useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Grid } from '@mui/material';

const GoogleMap = ({ google, locatio }) => {
  const [latLng, setLatLng] = useState({lat:0,lng:0});

  const onMarkerDragEnd = ({latLng}, event) => {
    // const { latLng } = coord;
    const newLatLng = {
      lat: latLng?.lat(),
      lng: latLng?.lng(),
    };
    locatio(latLng);
    setLatLng(newLatLng);
  };

  const getLocations = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position?.coords;
      setLatLng({ lat: latitude, lng: longitude });
    });
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} >
      <Grid item xs={12} sm={12} md={12} className='google-map'>
        <Map
          google={google}
          zoom={5}
          initialCenter={{
            lat: latLng?.lat,
            lng: latLng?.lng,
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
      </Grid>
    </Grid>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAIYlAu07QNv-0ZXEN0NPwtzX9VtOXm1yQ',
})(GoogleMap);
