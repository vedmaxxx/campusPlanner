import React, { useContext, useEffect, useState } from "react";
import styles from "./WeekBar.module.css";
import Button from "../UI/Button/Button";
import { WeekSlotContext } from "../../context/WeekSlotContext";

const WeekBar = () => {
  const {
    decrementWeekNumber,
    incrementWeekNumber,
    currentWeekNumber,
    maxWeeks,
  } = useContext(WeekSlotContext);

  return (
    <div className={styles.week_wrapper}>
      <div className={styles.week_row}>
        <Button
          disabled={currentWeekNumber - 1 === 0 ? true : false}
          onClick={decrementWeekNumber}
        >
          Предыдущая
        </Button>

        <div className={styles.week}>{currentWeekNumber} нед.</div>
        <Button
          disabled={currentWeekNumber === maxWeeks ? true : false}
          onClick={incrementWeekNumber}
        >
          Следующая
        </Button>
      </div>
    </div>
  );
};

export default WeekBar;
