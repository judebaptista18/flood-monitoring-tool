import { useState, useEffect } from "react";
import { STATIONS_API } from "./constants";
import "./App.css";

function App() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchStationsList();
  }, []);

  const fetchStationsList = async () => {
    const result = await fetch(STATIONS_API);
    const data = await result.json();
    console.log(data);
    setStations(data.items);
  };
  return <></>;
}

export default App;
