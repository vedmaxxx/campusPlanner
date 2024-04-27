import React, { useContext } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { WeekSlotContext } from "../../WeekSlotContext/WeekSlotContext";

const DeleteBtn = ({ deleteSlot, slot, date }) => {
  const { week } = useContext(WeekSlotContext);
  return (
    <button
      style={{ padding: "0", border: "none", background: "none" }}
      onClick={() => {
        let dayslot = week.find((dayslot) => dayslot.date == date);
        deleteSlot(dayslot, slot);
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
