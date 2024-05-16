import React, { useContext } from "react";
import FormByTeacher from "../FormByTeacher/FormByTeacher";
import FormByGroup from "../FormByGroup/FormByGroup";
import FormByAuditorium from "../FormByAuditorium/FormByAuditorium";
import { ScheduleContext } from "../../context/ScheduleContext";
import { useNavigate } from "react-router-dom";

const modes = {
  teacher: FormByTeacher,
  group: FormByGroup,
  auditorium: FormByAuditorium,
};

const FormScheduleBy = ({ mode, onCancel }) => {
  const { setScheduleParams, viewMode } = useContext(ScheduleContext);
  const navigate = useNavigate();

  function submitHandler(e, formValue) {
    e.preventDefault();
    for (let select in formValue) {
      if (formValue[select] === "" || formValue[select] === undefined) {
        alert("Заполните все поля формы!");
        return;
      }
    }
    setScheduleParams(formValue);
    navigate(`/${viewMode}/schedule`);
  }

  const SelectedModeForm = modes[mode];
  return <SelectedModeForm submitHandler={submitHandler} onCancel={onCancel} />;
};

export default FormScheduleBy;
