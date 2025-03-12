import React, { useEffect, useState } from "react";
import { STATIONS_API } from "../constants";

const StationSelectorDropdown = ({ onSelectStation }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
        try {
          const result = await fetch(STATIONS_API);
          const data = await result.json();
          console.log(data);
          setStations(data.items);
        } catch (error) {
          console.error("Error fetching stations:", error);
        } finally {
          setLoading(false);
        }
      };
    fetchStations();
  }, []);

  return (
    <div>
      <label htmlFor="station-select">Select a Station:</label>
      <select
        id="station-select"
        onChange={(e) => onSelectStation(e.target.value)}
        disabled={loading}
      >
        <option value="">
          {loading ? "Loading stations..." : "Select a station"}
        </option>
        {stations.map((station) => (
          <option
            key={station.notation}
            value={station.notation}
          >
            {station.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StationSelectorDropdown;
