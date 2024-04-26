import React from "react";
import { SLOT_TIME_NUMBER } from "../utils/consts";
import styles from "./SlotTime.module.css";

const SlotTime = ({ number }) => {
  return (
    <div className={styles.time}>
      {SLOT_TIME_NUMBER[number]} ({number} пара)
    </div>
  );
};

export default SlotTime;
