import React from "react";
import styles from "./WeekSlot.module.css";
import DaySlot from "../DaySlot/DaySlot";

const WeekSlot = ({ daySlots }) => {
  console.log("DaySlots:", daySlots);
  return (
    <div className={styles.weekSlot_grid}>
      {daySlots.map((daySlot) => (
        <DaySlot key={daySlot.id} daySlot={daySlot} />
      ))}
    </div>
  );
};

export default WeekSlot;
