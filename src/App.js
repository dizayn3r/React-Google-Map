import "./App.css";
import Map from "./Pages/Map";
import {useLoadScript} from "@react-google-maps/api";

function App() {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  })

  if (!isLoaded) return <div>Loading...</div>
      return <Map />;
}

export default App;
