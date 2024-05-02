import React, { useContext } from "react";
import styles from "./WeekSlot.module.css";
import DaySlot from "../DaySlot/DaySlot";

const WeekSlot = ({ week }) => {
  return (
    <div className={styles.week_grid}>
      {week.map((daySlot) => (
        <DaySlot key={daySlot.id} daySlot={daySlot} />
      ))}
    </div>
  );
};

export default WeekSlot;
