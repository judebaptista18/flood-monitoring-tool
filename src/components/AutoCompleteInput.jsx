import React, { useState, useEffect, useRef } from "react";

const AutoCompleteInput = ({
  data = [],
  onHandleSearch,
  setSearchText,
  searchText,
  render,
  onSelectOption,
  id = "select-input",
  placeholder = "Type to search",
}) => {
  const [showResults, setShowResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // set focus on the  option
  useEffect(() => {
    if (activeIndex >= 0 && dropdownRef.current) {
      const activeItem = dropdownRef.current.querySelector(
        `[data-index="${activeIndex}"]`
      );
      if (activeItem) {
        activeItem.focus();
      }
    }
  }, [activeIndex]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < data.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      onSelectOption(data[activeIndex].notation, data[activeIndex].label);
      setSearchText(data[activeIndex].label);
      setShowResults(false);
    } else if (e.key === "Escape") {
      setShowResults(false);
    }
  };

  return (
    <>
      <div className="search-container">
        <input
          id={id}
          ref={inputRef}
          className="search-input"
          type="text"
          value={searchText || ""}
          onChange={(e) => {
            onHandleSearch && onHandleSearch(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          role="textbox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded={showResults}
          aria-controls="autocomplete-options"
          aria-activedescendant={
            activeIndex >= 0 ? `option-${activeIndex}` : undefined
          }
        />
        {searchText ? (
          <i
            className="far fa-times-circle search-icon"
            style={{ cursor: "pointer" }}
            onClick={() => setSearchText && setSearchText("")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSearchText && setSearchText("");
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Clear search"
          ></i>
        ) : (
          <span className="search-icon">&#128269;</span>
        )}
      </div>
      {showResults &&
        render &&
        render(data, dropdownRef, setShowResults, activeIndex)}
    </>
  );
};

export default AutoCompleteInput;
