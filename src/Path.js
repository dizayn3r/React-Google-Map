import React from "react";
import { Polyline } from "@react-google-maps/api";

function Route({route}) {
  return route.map((path) => (
    <Polyline
      path={path}
      options={{ strokeColor: "#FF0000", strokeWeight: 2 }}
    />
  ));
}

export default Route;
