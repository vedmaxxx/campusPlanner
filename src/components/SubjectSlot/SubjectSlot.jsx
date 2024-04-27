import React, { useState } from "react";
import styles from "./SubjectSlot.module.css";
import { SUBJECTS_TYPES } from "../utils/consts";
import Modal from "../UI/Modal/Modal";
import EditSlotForm from "../EditSlotForm/EditSlotForm";
import DeleteBtn from "../UI/Button/DeleteBtn";
import EditBtn from "../UI/Button/EditBtn";

const SubjectSlot = ({ subjectSlot, deleteSlot, date }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [slot, setSlot] = useState(subjectSlot);

  return (
    <div className={styles.container}>
      <Modal visible={modalIsVisible} setVisible={setModalIsVisible}>
        <EditSlotForm slot={slot} setSlot={setSlot} />
      </Modal>
      <div className={[styles.inner, styles[slot.type]].join(" ")}>
        <h3 className={[styles.type, styles[slot.type]].join(" ")}>
          {slot.number}. {SUBJECTS_TYPES[slot.type]}
        </h3>
        <div>{slot.discipline}</div>
        <div>{slot.auditorium}</div>
        <div>Преподаватель</div>
        <div className={styles.footer}>
          <EditBtn />
          <DeleteBtn deleteSlot={deleteSlot} slot={slot} date={date} />
        </div>
      </div>
    </div>
  );
};

export default SubjectSlot;
