import "./App.css";
import Map from "./Pages/Map";
import { useLoadScript } from "@react-google-maps/api";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCQMBxKwo1kGGqBEdamN9OhSIjpugkD5aA",
    libraries: ["places"]
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map/>;
}

export default App;
