import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React, { useRef, useMemo, useCallback, useState } from "react";
import Places from "../Components/Places";

function Map() {
  const mapRef = useRef(null);
  const [office, setOffice] = useState({})
  const center = useMemo(() => ({ lat: 28.612272, lng: 77.3592445 }), []);

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    <div className="App">
      <div className="sidebar">
        <h1>Select Address</h1>
        <Places setOffice={(position) => {
          setOffice(position);
          mapRef.current?.panTo(position);
        }} />
        {!office && <p>Enter the address of your office.</p>}
      </div>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
        onLoad={onLoad}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
}

export default Map;
