import React, { useState } from "react";
import Select from "../UI/Select/Select";
import FormHeader from "../UI/FormHeader/FormHeader";
import styles from "./FormByAuditorium.module.css";
import Button from "../UI/Button/Button";

const initFormValue = {
  auditorium: "",
};

const FormByAuditorium = ({ submitHandler, onCancel }) => {
  const [formValue, setFormValue] = useState(initFormValue);

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
        <Button onClick={(e) => submitHandler(e, formValue)}>
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
