import React, { useContext, useState } from "react";
import Select from "../UI/Select/Select";
import FormHeader from "../UI/FormHeader/FormHeader";
import styles from "./FormByAuditorium.module.css";
import Button from "../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { ScheduleContext } from "../../context/ScheduleContext";

const initFormValue = {
  auditorium: "",
};

const FormByAuditorium = ({ setScheduleParams, onCancel }) => {
  const [formValue, setFormValue] = useState(initFormValue);
  const { viewMode } = useContext(ScheduleContext);
  const navigate = useNavigate();

  // функция очистки состояния формы
  function clearForm() {
    setFormValue(initFormValue);
  }

  return (
    <form className={styles.form}>
      <FormHeader>Расписание группы</FormHeader>
      <label>Номер аудитории</label>
      <Select
        name={"auditorium"}
        onChange={(value) => setFormValue({ ...formValue, auditorium: value })}
        defaultValue={"Аудитория"}
        options={[{ value: "Иванов И.И.", name: "Иванов И.И." }]}
      />

      <div className={styles.buttons}>
        <Button
          onClick={() => {
            navigate(`/${viewMode}/schedule`);
            clearForm();
          }}
        >
          Перейти к расписанию
        </Button>
        <Button
          onClick={(e) => {
            onCancel(e);
            clearForm();
          }}
        >
          Закрыть
        </Button>
      </div>
    </form>
  );
};

export default FormByAuditorium;
