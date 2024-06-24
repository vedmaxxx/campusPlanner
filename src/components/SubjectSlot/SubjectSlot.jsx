import React, { useContext, useEffect, useState } from "react";
import { SUBJECT_TYPES } from "../../utils/consts";
import { WeekSlotContext } from "../../context/WeekSlotContext";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import IconBtn from "../UI/IconBtn/IconBtn";
import styles from "./SubjectSlot.module.css";
import cx from "classnames";

const SubjectSlot = ({ subjectSlot, date }) => {
  const scheduleParams = JSON.parse(localStorage.getItem("scheduleParams"));
  const { mode } = scheduleParams;
  const {
    setDeleteModal,
    setEditModal,
    selectSlots,
    getTeacherFullNameByID,
    getGroupNumberByID,
    getAuditoriumByID,
    getDisciplineByID,
  } = useContext(WeekSlotContext);

  const [teacher, setTeacherName] = useState("");
  const [group, setGroupName] = useState("");
  const [auditorium, setAuditoriumName] = useState("");
  const [discipline, setDisciplineName] = useState("");

  useEffect(() => {
    setTeacherName(getTeacherFullNameByID(subjectSlot.teacher));
    setGroupName(getGroupNumberByID(subjectSlot.group).number);
    setAuditoriumName(getAuditoriumByID(subjectSlot.auditorium).number);
    setDisciplineName(getDisciplineByID(subjectSlot.discipline).title);
  }, [subjectSlot]);

  return (
    <div className={styles.container}>
      <div className={cx(styles.inner, styles[subjectSlot.type])}>
        <h3 className={cx(styles.type, styles[subjectSlot.type])}>
          {subjectSlot.number}. {SUBJECT_TYPES[subjectSlot.type]}
        </h3>
        <div>{discipline}</div>

        {mode !== "auditorium" ? <div>{auditorium}</div> : null}
        {mode !== "teacher" ? <div>{teacher}</div> : null}
        {mode !== "group" ? <div>{group}</div> : null}

        <div className={styles.footer}>
          <IconBtn
            onClick={() => {
              selectSlots(subjectSlot.id, date);
              setEditModal(true);
            }}
            icon={faPenToSquare}
            style={{ color: "blue" }}
          />
          <IconBtn
            onClick={() => {
              selectSlots(subjectSlot.id, date);
              setDeleteModal(true);
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
