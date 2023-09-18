import {
  GoogleMap,
  MarkerClustererF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useMemo, useRef, useState, useEffect } from "react";
import "./App.css";
import { fleetLocations, vehicleLocations } from "./data.js";

const google = window.google;

function Map() {
  const [bounds, setBounds] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
    }),
    []
  );

  const map = useRef(null);

  useEffect(() => {
    if (!bounds && fleetLocations !== null && fleetLocations.length) {
      setBounds({
        lat: fleetLocations[0].last_location.latitude,
        lng: fleetLocations[0].last_location.longitude,
      });
      //eslint-disable-next-line
      const titles = new google.maps.LatLngBounds();
      const _locations = fleetLocations
        ? fleetLocations.filter(
            (location) =>
              location?.last_location?.latitude &&
              location?.last_location?.longitude
          )
        : [];

      _locations.forEach(({ last_location }) =>
        titles.extend({
          lat: last_location.latitude,
          lng: last_location.longitude,
        })
      );
    }
  }, [fleetLocations, map]);

  const max_min_coordinates = {
    max_lat: -90,
    min_lat: 90,
    max_lng: -180,
    min_lng: 180,
  };

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

  return !isLoaded ? (
    <h1>Loading...</h1>
  ) : (
    <GoogleMap
      ref={map}
      mapContainerClassName="map-container"
      center={bounds}
      zoom={10}
    >
      {fleetLocations && (
        <MarkerClustererF
          minimumClusterSize={10}
          styles={[
            {
              url: "img/blue-circle.svg",
              height: 40,
              width: 40,
              textColor: "#FFFFFF",
              textSize: 16,
            },
          ]}
        >
          {(cluster) =>
            fleetLocations
              .filter((location) => location?.last_location?.latitude)
              .map((location) => {
                return (
                  location.mac !== "ALONHALON" && (
                    <MarkerF
                      clusterer={cluster}
                      position={{
                        lat: location.last_location.latitude,
                        lng: location.last_location.longitude,
                      }}
                      onMouseOver={() => {
                        console.log(location.mac);
                      }}
                    >
                      {location.mac}
                    </MarkerF>
                  )
                );
              })
          }
        </MarkerClustererF>
      )}
    </GoogleMap>
  );
}

export default Map;
