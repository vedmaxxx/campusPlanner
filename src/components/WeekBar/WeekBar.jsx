import React from "react";
import styles from "./WeekBar.module.css";
import Button from "../UI/Button/Button";

const WeekBar = ({ number, setNumber, maxWeeks }) => {
  return (
    <div className={styles.week_wrapper}>
      <Button
        disabled={number - 1 == 0 ? true : false}
        onClick={() => {
          const newNumber = number - 1;
          if (newNumber > 0) setNumber(newNumber);
        }}
      >
        Предыдущая
      </Button>
      <div className={styles.week}>{number} нед.</div>
      <Button
        disabled={number == maxWeeks ? true : false}
        onClick={() => {
          const newNumber = number + 1;
          if (newNumber <= maxWeeks) setNumber(newNumber);
        }}
      >
        Следующая
      </Button>
    </div>
  );
};

export default WeekBar;
