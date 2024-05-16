import React from "react";
import Button from "../Button/Button";
import styles from "./ModalConfirm.module.css";

const ModalConfirm = ({ onSubmit, onCancel, children }) => {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.buttons}>
        <Button onClick={onSubmit}>Да</Button>
        <Button onClick={onCancel}>Нет</Button>
      </div>
    </div>
  );
};

export default ModalConfirm;
