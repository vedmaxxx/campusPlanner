import React, { useContext } from "react";
import styles from "./WeekSlot.module.css";
import DaySlot from "../DaySlot/DaySlot";
import Button from "../UI/Button/Button";

const WeekSlot = ({ week }) => {
  // если неделя пуста, отображаем сообщение

  if (
    week === undefined ||
    Object.keys(week).length === 0 ||
    week.dayslots.length === 0
  )
    return <div className={styles.empty}>Неделя пуста!</div>;
  else
    return (
      <div className={styles.week_grid}>
        {week.dayslots.map((daySlot) => (
          <DaySlot key={daySlot.id} daySlot={daySlot} />
        ))}
      </div>
    );
};

export default WeekSlot;
