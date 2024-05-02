import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./IconBtn.module.css";

const IconBtn = ({ icon, size, style, ...props }) => {
  return (
    <button {...props} className={styles.iconBtn}>
      <FontAwesomeIcon
        icon={icon}
        size={size ? size : "lg"}
        style={{ ...style, cursor: "pointer" }}
      />
    </button>
  );
};

export default IconBtn;
