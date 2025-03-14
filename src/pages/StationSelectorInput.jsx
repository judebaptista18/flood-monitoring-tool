import React, { useCallback, useState, useRef } from "react";

import AutoCompleteInput from "../components/AutoCompleteInput";
import { STATIONS_API } from "../constants";
import { debounce, capitalizeWords } from "../utils";

const StationSelectorDropdown = ({ onSelectStation }) => {
  const [searchItem, setSearchItem] = useState("");
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchStationsDebounce = useCallback(debounce(fetchStations, 300), []);
  const abortControllerRef = useRef(null);

  async function fetchStations(search) {
    if (!search) {
      setStations([]);
      return;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    try {
      setIsLoading(true);
      const result = await fetch(STATIONS_API + `?search=${search}`, {
        signal: abortControllerRef.current.signal,
      });
      const data = await result.json();
      setStations(data.items);
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }

  const onHandleSearch = (searchText) => {
    const value = capitalizeWords(searchText);
    setSearchItem(searchText);
    fetchStationsDebounce(value);
  };

  const handleEventAction = (e, cb) => {
    if (e.target.tagName === "SPAN") {
      onSelectStation(e.target.dataset.value, e.target.innerText);
      setSearchItem(e.target.innerText);
      cb(false);
    }
  };

  return (
    <div className="select-container">
      <AutoCompleteInput
        id="station-select"
        searchText={searchItem}
        setSearchText={setSearchItem}
        data={stations}
        onHandleSearch={onHandleSearch}
        onSelectOption={onSelectStation}
        placeholder="Type to search station..."
        render={(
          data,
          dropdownRef,
          setShowResults,
          activeIndex
        ) => {
          return searchItem ? (
            <div
              ref={dropdownRef}
              className="select-list"
              role="listbox"
              aria-live="polite"
              onClick={(e) => {
                handleEventAction(e, setShowResults);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleEventAction(e, setShowResults);
                }
              }}
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : data.length != 0 ? (
                data.map((item, index) => (
                  <span
                    key={item.notation}
                    data-value={item.notation}
                    role="option"
                    tabIndex="0"
                    data-index={index}
                    aria-selected={index === activeIndex}
                  >
                    {item.label}
                  </span>
                ))
              ) : searchItem ? (
                <p data-value={null}>No record found</p>
              ) : (
                ""
              )}
            </div>
          ) : (
            <></>
          );
        }}
      />
    </div>
  );
};

export default StationSelectorDropdown;
