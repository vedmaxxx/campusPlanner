import React from "react";
import styles from "./ControlledSelect.module.css";

const ControlledSelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.select}
    >
      <option key={defaultValue} disabled value={defaultValue}>
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default ControlledSelect;
