import React from "react";
import styles from "./WeekBar.module.css";
import Button from "../UI/Button/Button";

const WeekBar = ({ number }) => {
  return (
    <div className={styles.week_wrapper}>
      <Button>Предыдущая</Button>
      <div className={styles.week}>{number} нед.</div>
      <Button>Следующая </Button>
    </div>
  );
};

export default WeekBar;
