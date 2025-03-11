import { useState } from "react";
import { READINGS_API } from "./constants";
import "./App.css";
import StationSelectorDropdown from "./components/StationSelectorDropdown";

function App() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReadings = async (stationId) => {
    setLoading(true);
    try {
      const now = new Date();
      const last24Hours = new Date(now - 24 * 60 * 60 * 1000);
      const formattedDate = last24Hours.toISOString(); // Formatted in ISO
      const response = await fetch(
        READINGS_API.replace("{stationId}", stationId).replace(
          "{time}",
          formattedDate
        )
      );
      const data = await response.json();
      console.log(data.items);
      setReadings(data.items);
    } catch (error) {
      console.error("Error fetching readings:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <StationSelectorDropdown onSelectStation={fetchReadings} />
    </>
  );
}

export default App;
