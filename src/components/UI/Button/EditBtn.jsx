import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const EditBtn = () => {
  return (
    <button style={{ padding: "0", border: "none", background: "none" }}>
      <FontAwesomeIcon
        icon={faPenToSquare}
        size="lg"
        style={{ color: "blue", cursor: "pointer" }}
      />
    </button>
  );
};

export default EditBtn;
