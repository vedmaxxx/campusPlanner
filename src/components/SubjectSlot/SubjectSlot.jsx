import React, { useContext, useEffect, useState } from "react";
import { SUBJECT_TYPES } from "../../utils/consts";
import { WeekSlotContext } from "../../context/WeekSlotContext";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import IconBtn from "../UI/IconBtn/IconBtn";
import styles from "./SubjectSlot.module.css";
import cx from "classnames";
import TeacherService from "../../API/TeacherService";

const SubjectSlot = ({ subjectSlot, date }) => {
  const scheduleParams = JSON.parse(localStorage.getItem("scheduleParams"));
  const { mode } = scheduleParams;

  const [teacherName, setTeacherName] = useState("");
  const [groupName, setGroupName] = useState("");

  const { setDeleteModal, setEditModal, selectSlots } =
    useContext(WeekSlotContext);

  const fetchData = async () => {
    const teacherData = await TeacherService.getById(subjectSlot.teacher);
    setTeacherName(
      teacherData.surname +
        " " +
        teacherData.name[0] +
        "." +
        teacherData.patronymic[0] +
        "."
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={cx(styles.inner, styles[subjectSlot.type])}>
        <h3 className={cx(styles.type, styles[subjectSlot.type])}>
          {subjectSlot.number}. {SUBJECT_TYPES[subjectSlot.type]}
        </h3>
        <div>{subjectSlot.discipline}</div>

        {mode !== "auditorium" ? <div>{subjectSlot.auditorium}</div> : null}
        {mode !== "teacher" ? <div>{teacherName}</div> : null}
        {mode !== "group" ? <div>{subjectSlot.group}</div> : null}

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
