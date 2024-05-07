import React from "react";
import styles from "./Button.module.css";
import cx from "classnames";

const Button = ({ children, mix, ...props }) => {
  return (
    <button {...props} className={cx(styles.btn, mix)}>
      {children}
    </button>
  );
};

export default Button;
