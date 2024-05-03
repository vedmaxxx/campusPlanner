import React from "react";
import Button from "../Button/Button";
import styles from "./ModalConfirm.module.css";

const ModalConfirm = ({ onSubmit, onCancel }) => {
  return (
    <div className={styles.confirm_container}>
      <div>Вы уверены, что хотите удалить пару?</div>
      <div className={styles.confirm_bnts}>
        <Button onClick={onSubmit}>Да</Button>
        <Button onClick={onCancel}>Нет</Button>
      </div>
    </div>
  );
};

export default ModalConfirm;
