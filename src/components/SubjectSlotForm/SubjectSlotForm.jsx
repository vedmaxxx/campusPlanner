import React, { useContext, useEffect, useState } from "react";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";
import { WeekSlotContext } from "../WeekSlotContext/WeekSlotContext";
import styles from "./SubjectSlotForm.module.css";
import AuditoriumService from "../../API/AuditoriumService";
import { MAX_SLOTS_PER_DAY, SLOT_TIME_NUMBER } from "../utils/consts";

const SubjectSlotForm = ({ mode, createSlot, onCancel }) => {
  const { week } = useContext(WeekSlotContext);

  return <div>dsad</div>;
};

export default SubjectSlotForm;
