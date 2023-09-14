import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";
import "./App.css";
import { locations } from "./data.js";
import VehicleRoute from "./Components/VehicleRoute";
import CustomMarker from "./Components/CustomMarker";

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const center = useMemo(() => ({ lat: 28.692307, lng: 77.400018 }), []);

  const options = useMemo(() => ({
    disableDefaultUI: false,
    clickableIcons: true,
  }), []);

  const max_min_coordinates = {
    max_lat: -90,
    min_lat: 90,
    max_lng: -180,
    min_lng: 180,
  };

  const buildPolyLine = () => {
    const polylineCoordinates = [];
    let last_element = null;
    locations.forEach((element) => {
      if (!last_element) {
        last_element = element;
        return;
      }

      if (element["latitude"] > max_min_coordinates.max_lat) {
        max_min_coordinates.max_lat = element["latitude"];
      }
      if (element["latitude"] < max_min_coordinates.min_lat) {
        max_min_coordinates.min_lat = element["latitude"];
      }
      if (element["longitude"] > max_min_coordinates.max_lng) {
        max_min_coordinates.max_lng = element["longitude"];
      }
      if (element["longitude"] < max_min_coordinates.min_lng) {
        max_min_coordinates.min_lng = element["longitude"];
      }
      polylineCoordinates.push([
        { lat: last_element.latitude, lng: last_element.longitude },
        {
          lat: element.latitude,
          lng: element.longitude,
        },
      ]);
      last_element = element;
    });

    return polylineCoordinates;
  };


  return !isLoaded ? (
    <h1>Loading...</h1>
  ) : (
    <GoogleMap mapContainerClassName="map-container" center={center} zoom={15} options={options}>
      {locations && <VehicleRoute route={buildPolyLine()} />}
      {locations && locations.length && (
        <CustomMarker
          position={{
            lat: locations[locations.length - 1].latitude,
            lng: locations[locations.length - 1].longitude,
          }}
        />
      )}
    </GoogleMap>
  );
}

export default Map;
