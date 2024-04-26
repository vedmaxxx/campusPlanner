import React from "react";
import EmptySlot from "../EmptySlot/EmptySlot";
import SubjectSlot from "../SubjectSlot/SubjectSlot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./DaySlotItem.module.css";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { BREAK_TIME } from "../utils/consts";
import SlotTime from "../SlotTime/SlotTime";

function getBreakAfterSlot(slotNumber) {
  if (slotNumber % 2 == 0 && slotNumber < 7)
    return (
      <div className={styles.break}>
        <FontAwesomeIcon icon={faClock} size="sm" />
        <div className={styles.break_time}>{BREAK_TIME} мин</div>
      </div>
    );
}

const getSlot = (slot, deleteSlot) => {
  if (slot.isEmpty) {
    return <EmptySlot key={slot.number} />;
  } else {
    return (
      <SubjectSlot
        key={slot.number}
        subjectSlot={slot}
        deleteSlot={deleteSlot}
      />
    );
  }
};

const DaySlotItem = ({ subjectSlot, deleteSlot }) => {
  return (
    <>
      <SlotTime key={Date.now()} number={subjectSlot.number} />
      {getSlot(subjectSlot, deleteSlot)}
      {getBreakAfterSlot(subjectSlot.number)}
    </>
  );
};

export default DaySlotItem;
