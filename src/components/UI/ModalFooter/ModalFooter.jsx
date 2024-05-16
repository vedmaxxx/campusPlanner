import React from "react";
import styles from "./ModalFooter.module.css";

const ModalFooter = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>{children}</div>
    </div>
  );
};

export default ModalFooter;
