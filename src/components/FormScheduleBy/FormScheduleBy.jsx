import React from "react";
import FormByTeacher from "../FormByTeacher/FormByTeacher";
import FormByGroup from "../FormByGroup/FormByGroup";
import FormByAuditorium from "../FormByAuditorium/FormByAuditorium";

const modes = {
  teacher: FormByTeacher,
  group: FormByGroup,
  auditorium: FormByAuditorium,
};

const FormScheduleBy = ({ mode, onCancel }) => {
  const SelectedMode = modes[mode];
  return <SelectedMode onCancel={onCancel} />;
};

export default FormScheduleBy;
