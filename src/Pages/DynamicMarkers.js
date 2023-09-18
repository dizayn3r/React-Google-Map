import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import React, { useMemo } from "react";

const google = window.google;

function DynamicMarkers() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const markers = [
    { lat: 18.5204, lng: 73.8567 },
    { lat: 18.5314, lng: 73.8446 },
    { lat: 18.5642, lng: 73.7769 },
  ];

  const onLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const center = useMemo(() => ({ lat: 18.5204, lng: 73.8567 }), []);

  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
    }),
    []
  );

  return !isLoaded ? (
    <h1>Loading...</h1>
  ) : (
    <GoogleMap
      center={center}
      options={options}
      zoom={12}
      mapContainerClassName="map-container"
      onLoad={onLoad}
    >
      {markers.map(({ lat, lng }) => (
        <MarkerF position={{ lat, lng }} />
      ))}
    </GoogleMap>
  );
}

export default DynamicMarkers;
