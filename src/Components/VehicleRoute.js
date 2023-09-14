import { PolylineF } from "@react-google-maps/api";

function VehicleRoute({ route }) {
  return route.map((path) => (
    <PolylineF
      path={path}
      options={{ strokeColor: "#FF0000", strokeWeight: 2 }}
    />
  ));
}

export default VehicleRoute;
