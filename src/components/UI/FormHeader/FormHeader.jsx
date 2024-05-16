import React from "react";
import styles from "./FormHeader.module.css";

const FormHeader = ({ children }) => {
  return (
    <div className={styles.header}>
      {children ? (
        <>
          <h1 className={styles.title}>{children}</h1>
          <hr />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FormHeader;
