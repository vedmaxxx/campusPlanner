import React from "react";
import styles from "./DaySlot.module.css";
import { dataTransform, getDayWeek } from "../utils/date";
import { MAX_SLOTS_PER_DAY } from "../utils/consts";
import DaySlotItem from "../DaySlotItem/DaySlotItem";

function createDaySlot(slots) {
  const daySlotView = [];
  for (let i = 1; i <= MAX_SLOTS_PER_DAY; i++) {
    if (slots.find((slot) => slot.number === i)) {
      daySlotView.push(slots.find((slot) => slot.number === i));
    } else {
      daySlotView.push({ number: i, isEmpty: true });
    }
  }
  return daySlotView;
}

const DaySlot = ({ daySlot, deleteSlot }) => {
  return (
    <div className={styles.dayslot}>
      <h1 className={styles.day}>{getDayWeek(daySlot.date)}</h1>
      <h2 className={styles.date}>{dataTransform(daySlot.date)}</h2>

      {createDaySlot(daySlot.slots).map((slot) => (
        <DaySlotItem key={slot.id} subjectSlot={slot} deleteSlot={deleteSlot} />
      ))}
    </div>
  );
};

export default DaySlot;
