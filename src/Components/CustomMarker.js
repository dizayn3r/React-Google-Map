import { MarkerF } from "@react-google-maps/api";

function CustomMarker({ position }) {
  return <MarkerF position={position} />;
}

export default CustomMarker;
