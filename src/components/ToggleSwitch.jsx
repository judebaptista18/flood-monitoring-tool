import React from "react";
const ToggleSwitch = ({ isOn, toggleSwitch, labelLeft, labelRight }) => {
  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggleSwitch();
    }
  };
  return (
    <div className="switch-container">
      <label id="label-left" className="label-left">
        {labelLeft}
      </label>
      <label className="switch">
        <input
          type="checkbox"
          checked={isOn}
          onChange={toggleSwitch}
          onKeyDown={handleKeyDown}
          role="switch"
          aria-checked={isOn}
          aria-labelledby="label-left label-right"
          tabIndex={0}
        />
        <span className="slider"></span>
      </label>
      <label id="label-right" className="label-right">
        {labelRight}
      </label>
    </div>
  );
};

export default React.memo(ToggleSwitch);
