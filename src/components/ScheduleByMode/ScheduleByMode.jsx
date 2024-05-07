import React from "react";
import FormByTeacher from "../FormByTeacher/FormByTeacher";
import FormByGroup from "../FormByGroup/FormByGroup";

const modes = {
  teacher: FormByTeacher,
  group: FormByGroup,
};

const ScheduleByMode = ({ mode }) => {
  const SelectedMode = modes[mode];
  return <SelectedMode />;
};

export default ScheduleByMode;
