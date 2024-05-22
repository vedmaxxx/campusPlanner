import React, { useState } from "react";
import Select from "../UI/Select/Select";
import FormHeader from "../UI/FormHeader/FormHeader";
import styles from "./FormByAuditorium.module.css";
import Button from "../UI/Button/Button";

const initFormValue = {
  auditorium: "",
};

const FormByAuditorium = ({ onSubmit, onCancel }) => {
  const [formValue, setFormValue] = useState(initFormValue);

  // функция очистки состояния формы
  function clearForm() {
    setFormValue(initFormValue);
  }

  return (
    <form className={styles.form}>
      <FormHeader>Расписание аудитории</FormHeader>
      <label>Номер аудитории</label>
      <Select
        name={"auditorium"}
        onChange={(value) => setFormValue({ ...formValue, auditorium: value })}
        defaultValue={"Аудитория"}
        options={[{ value: "7-415", name: "7-415" }]}
      />

      <div className={styles.buttons}>
        <Button onClick={(e) => onSubmit(e, formValue)}>
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
