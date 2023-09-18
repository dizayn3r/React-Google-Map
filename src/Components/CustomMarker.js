import { MarkerF } from "@react-google-maps/api";

function CustomMarker({ position, clusterer }) {
  return <MarkerF clusterer={clusterer} position={position} />;
}

export default CustomMarker;
