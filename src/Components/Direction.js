import React from "react";

function Direction({ directions }) {
  return (
    <>
      <h4>Start Address</h4>
      <p>{directions.routes[0].legs[0].start_address}</p>
      <h4>End Address</h4>
      <p>{directions.routes[0].legs[0].end_address}</p>
      <h4>Distance</h4>
      <p>{directions.routes[0].legs[0].distance.text}</p>
      <h4>Duration</h4>
      <p>{directions.routes[0].legs[0].duration.text}</p>
    </>
  );
}

export default Direction;
