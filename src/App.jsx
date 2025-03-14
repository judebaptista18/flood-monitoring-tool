import { useCallback, useState } from "react";

import StationSelectorDropdown from "./pages/StationSelectorInput";
import ReadingsChart from "./pages/ReadingsChart";
import ReadingsTable from "./pages/ReadingsTable";
import Placeholder from "./components/Placeholder";
import ToggleSwitch from "./components/ToggleSwitch";
import GraphSkeleton from "./components/Skeletons/GraphSkeleton";
import TableSkeleton from "./components/Skeletons/TableSkeleton";
import LineSkeleton from "./components/Skeletons/LineSkeleton";
import { READINGS_API, readingsDisplayType } from "./constants";

import StationIcon from "./assets/icons/station.png";
import NoDataFoundIcon from "./assets/icons/no-data.png";

function App() {
  const [readings, setReadings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [selectedStation, setSelectedStation] = useState("");

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const fetchReadings = useCallback(async (stationId, stationName) => {
    if (!stationId) return;
    setSelectedStation("");
    setReadings([]);
    setIsLoading(true);
    try {
      const now = new Date();
      const last24Hours = new Date(now - 24 * 60 * 60 * 1000);
      const formattedDate = last24Hours.toISOString();
      const response = await fetch(
        READINGS_API.replace("{stationId}", stationId) +
          `?_sorted&since=${formattedDate}`
      );
      const data = await response.json();
      setSelectedStation(stationName);
      setReadings(data.items);
    } catch (error) {
      console.error("Error fetching readings:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const readingsType = {
    [readingsDisplayType.graph]: {
      component: ReadingsChart,
      skeleton: GraphSkeleton,
    },
    [readingsDisplayType.table]: {
      component: ReadingsTable,
      skeleton: TableSkeleton,
    },
  };

  const ReadingsComponent =
    readingsType[!isOn ? readingsDisplayType.graph : readingsDisplayType.table]
      .component;

  const ReadingsSkeleton =
    readingsType[!isOn ? readingsDisplayType.graph : readingsDisplayType.table]
      .skeleton;

  return (
    <div className="app-container">
      <div className="app-title">
        <h1>Flood Monitoring Tool</h1>
      </div>
      <div className="flex-container">
        <div className="flex-item">
          <StationSelectorDropdown onSelectStation={fetchReadings} />
        </div>
        <div className="flex-item">
          {isLoading ? <LineSkeleton /> : <h2>{selectedStation}</h2>}
        </div>
        <div className="flex-item">
          {readings.length > 0 && (
            <ToggleSwitch
              isOn={isOn}
              toggleSwitch={toggleSwitch}
              labelLeft="Graph View"
              labelRight="Table View"
            />
          )}
        </div>
      </div>
      <div className="main-container">
        <div className="container-label">
          {isLoading ? (
            <LineSkeleton />
          ) : (
            readings.length > 0 && <h3>Readings Over the Last 24 Hours</h3>
          )}
        </div>

        {isLoading && <ReadingsSkeleton />}
        {readings.length > 0 ? (
          <ReadingsComponent readings={readings} />
        ) : (
          selectedStation && (
            <Placeholder>
              <picture>
                <source srcSet={NoDataFoundIcon} type="image/png" />
                <img
                  src={NoDataFoundIcon}
                  alt="No Reading Found"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
              <p>No Reading Available</p>
              <p>Please re-try after sometime</p>
            </Placeholder>
          )
        )}

        {readings.length === 0 && !selectedStation && !isLoading && (
          <Placeholder>
            <picture>
              <source srcSet={StationIcon} type="image/png" />
              <img
                src={StationIcon}
                alt="Station Icon"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
            <p>No Station Selected</p>
            <p>Select a station from the input</p>
          </Placeholder>
        )}
      </div>
    </div>
  );
}

export default App;
