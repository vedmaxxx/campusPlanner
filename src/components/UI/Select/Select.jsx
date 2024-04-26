import React from "react";
import styles from "./Select.module.css";

const Select = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.select}
    >
      <option disabled value="">
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

export default Select;
