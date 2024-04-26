import React from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const DeleteBtn = ({ deleteSlot, slot }) => {
  return (
    <button
      style={{ padding: "0", border: "none", background: "none" }}
      onClick={() => {
        deleteSlot(slot);
      }}
    >
      <FontAwesomeIcon
        icon={faTrashAlt}
        size="lg"
        style={{ color: "red", cursor: "pointer" }}
      />
    </button>
  );
};

export default DeleteBtn;
