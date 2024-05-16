import React from "react";
import styles from "./FormWrapper.module.css";

const FormWrapper = ({ title, children }) => {
  return (
    <div className={styles.form}>
      {title ? (
        <>
          <h1 className={styles.title}>{title}</h1>
          <hr />
        </>
      ) : (
        <></>
      )}

      {children}
    </div>
  );
};

export default FormWrapper;
