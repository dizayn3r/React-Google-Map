import {
  GoogleMap,
  Marker,
  Circle,
  DirectionsRenderer,
} from "@react-google-maps/api";
import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";
import Places from "../Components/Places";
import Direction from "../Components/Direction";

const google = window.google || {};

function Map() {
  const mapRef = useRef(null);
  const [office, setOffice] = useState({});
  const [currentLocation, setCurrentLocation] = useState({});
  const [directions, setDirections] = useState();
  const center = useMemo(() => ({ lat: 28.612272, lng: 77.3592445 }), []);

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      setCurrentLocation(center);
    }
  }, [center]);

  const fetchDirections = (address) => {
    if (!office) return;
    // eslint-disable-next-line
    const directionsService = new window.google.maps.DirectionsService()
    directionsService.route(
      {
        origin: currentLocation,
        destination: address,
        // eslint-disable-next-line
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <div className="App">
      <div className="sidebar">
        <h1>Select Address</h1>
        <Places
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
        {directions && <Direction directions={directions}/>}
      </div>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
        onLoad={onLoad}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        {office && (
          <>
            <Marker
              position={office}
              onClick={() => {
                fetchDirections(office);
              }}
            />
            <Circle center={office} radius={15000} options={closeOptions} />
            <Circle center={office} radius={30000} options={middleOptions} />
            <Circle center={office} radius={45000} options={farOptions} />
          </>
        )}
        {/* <Marker position={center} /> */}
      </GoogleMap>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

export default Map;
