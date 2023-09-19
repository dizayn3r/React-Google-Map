import { GoogleMap } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "../App.css";
import { vehicleLocations } from "../data.js";
import VehicleRoute from "../Components/VehicleRoute";
import CustomMarker from "./../Components/CustomMarker";

function VehicleRouteWithMarker() {
  const [middle_coordinates, setMiddleCoordinates] = useState({
    lat: 31.878,
    lng: 34.7394,
  });

  const max_min_coordinates = {
    max_lat: -90,
    min_lat: 90,
    max_lng: -180,
    min_lng: 180,
  };

  useEffect(() => {
    if (vehicleLocations && vehicleLocations.length) {
      setMiddleCoordinates({
        lat: vehicleLocations[vehicleLocations.length - 1].latitude,
        lng: vehicleLocations[vehicleLocations.length - 1].longitude,
      });
    }
  }, [vehicleLocations]);

  const buildPolyLine = () => {
    const polylineCoordinates = [];
    let last_element = null;
    vehicleLocations.forEach((element) => {
      if (!last_element) {
        last_element = element;
        return;
      }
      if (element["time"] - last_element["time"] > 0.25 * 60) {
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
      }
    });

    return polylineCoordinates;
  };

  return (
    <GoogleMap
      mapContainerClassName="map-container"
      center={middle_coordinates}
      zoom={10}
    >
      {vehicleLocations && <VehicleRoute route={buildPolyLine()} />}
      {vehicleLocations && vehicleLocations.length && (
        <CustomMarker
          position={{
            lat: vehicleLocations[vehicleLocations.length - 1].latitude,
            lng: vehicleLocations[vehicleLocations.length - 1].longitude,
          }}
        />
      )}
    </GoogleMap>
  );
}

export default VehicleRouteWithMarker;
