import React, { useContext } from "react";
import { SUBJECTS_TYPES } from "../utils/consts";
import { WeekSlotContext } from "../WeekSlotContext/WeekSlotContext";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import IconBtn from "../UI/IconBtn/IconBtn";
import styles from "./SubjectSlot.module.css";
import cx from "classnames";

const SubjectSlot = ({ subjectSlot, date }) => {
  const { selectForDelete } = useContext(WeekSlotContext);

  return (
    <div className={styles.container}>
      <div className={cx(styles.inner, styles[subjectSlot.type])}>
        <h3 className={cx(styles.type, styles[subjectSlot.type])}>
          {subjectSlot.number}. {SUBJECTS_TYPES[subjectSlot.type]}
        </h3>
        <div>{subjectSlot.discipline}</div>
        <div>{subjectSlot.auditorium}</div>
        <div>Преподаватель</div>
        <div className={styles.footer}>
          <IconBtn icon={faPenToSquare} style={{ color: "blue" }} />
          <IconBtn
            onClick={() => {
              console.log("Нажали на кнопку удаления слота: ", subjectSlot);
              selectForDelete(subjectSlot.id, date);
            }}
            icon={faTrashAlt}
            style={{ color: "red" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectSlot;
