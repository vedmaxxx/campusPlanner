import React from "react";
import FormByTeacher from "../FormByTeacher/FormByTeacher";
import FormByGroup from "../FormByGroup/FormByGroup";
import FormByAuditorium from "../FormByAuditorium/FormByAuditorium";

const modes = {
  teacher: FormByTeacher,
  group: FormByGroup,
  auditorium: FormByAuditorium,
};

const FormScheduleBy = ({ mode, onSubmit, onCancel }) => {
  const SelectedModeForm = modes[mode];
  return <SelectedModeForm onSubmit={onSubmit} onCancel={onCancel} />;
};

export default FormScheduleBy;
