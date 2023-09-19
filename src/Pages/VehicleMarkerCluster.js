import {
  GoogleMap,
  MarkerClusterer,
  Marker,
} from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";
import "./App.css";
import { fleetLocations } from "../data.js";

function VehicleMarkerCluster() {
  const [bounds, setBounds] = useState(null);

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

  return (
    <GoogleMap
      ref={map}
      mapContainerClassName="map-container"
      center={bounds}
      zoom={10}
    >
      {fleetLocations && (
        <MarkerClusterer
          minimumClusterSize={5}
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
                    <Marker
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
                    </Marker>
                  )
                );
              })
          }
        </MarkerClusterer>
      )}
    </GoogleMap>
  );
}

export default VehicleMarkerCluster;
