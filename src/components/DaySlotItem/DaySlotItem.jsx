import React, { useContext } from "react";
import EmptySlot from "../EmptySlot/EmptySlot";
import SubjectSlot from "../SubjectSlot/SubjectSlot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./DaySlotItem.module.css";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { BREAK_TIME } from "../utils/consts";
import SlotTime from "../SlotTime/SlotTime";
import { WeekSlotContext } from "../WeekSlotContext/WeekSlotContext";

function getBreakAfterSlot(slotNumber) {
  if (slotNumber % 2 == 0 && slotNumber < 7)
    return (
      <div className={styles.break}>
        <FontAwesomeIcon icon={faClock} size="sm" />
        <div className={styles.break_time}>{BREAK_TIME} мин</div>
      </div>
    );
}

const DaySlotItem = ({ subjectSlot }) => {
  const { deleteSlot } = useContext(WeekSlotContext);

  return (
    <>
      <SlotTime key={Date.now()} number={subjectSlot.number} />

      {subjectSlot.isEmpty ? (
        <EmptySlot key={subjectSlot.number} />
      ) : (
        <SubjectSlot
          key={subjectSlot.number}
          subjectSlot={subjectSlot}
          deleteSlot={deleteSlot}
        />
      )}

      {getBreakAfterSlot(subjectSlot.number)}
    </>
  );
};

export default DaySlotItem;
