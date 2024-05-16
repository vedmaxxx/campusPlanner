import React, { useState } from "react";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";
import FormHeader from "../UI/FormHeader/FormHeader";
import styles from "./FormByTeacher.module.css";

const initFormValue = {
  teacher: "",
  faculty: "",
  department: "",
  curricilium: "",
};

const FormByTeacher = ({ submitHandler, onCancel }) => {
  const [formValue, setFormValue] = useState(initFormValue);

  // функция очистки состояния формы
  function clearForm() {
    setFormValue(initFormValue);
  }

  return (
    <form className={styles.form}>
      <FormHeader>Расписание преподавателя</FormHeader>
      <label>ФИО преподавателя</label>
      <Select
        name={"teacher"}
        onChange={(value) => setFormValue({ ...formValue, teacher: value })}
        defaultValue={"Преподаватель"}
        options={[{ value: "Иванов И.И.", name: "Иванов И.И." }]}
      />
      <label>Учебный план</label>
      <Select
        name={"curricilum"}
        onChange={(value) => setFormValue({ ...formValue, curricilium: value })}
        defaultValue={"Номер учебного плана"}
        options={[
          { value: "38.03.05 БИ БА 3 2021", name: "38.03.05 БИ БА 3 2021" },
          {
            value: "38.03.06 БП БА 3 2021",
            name: "38.03.06 БП БА 3 2021",
          },
        ]}
      />
      <label>Факультет</label>
      <Select
        name={"faculty"}
        onChange={(value) => setFormValue({ ...formValue, faculty: value })}
        defaultValue={"Факультет"}
        options={[
          { value: "ИИМРТ", name: "ИИМРТ" },
          { value: "ФАДЭТ", name: "ФАДЭТ" },
        ]}
      />
      <label>Кафедра</label>
      <Select
        name={"department"}
        onChange={(value) => setFormValue({ ...formValue, department: value })}
        defaultValue={"Кафедра"}
        options={[
          { value: "ВМиК", name: "ВМиК" },
          { value: "ИИиМО", name: "ИИиМО" },
        ]}
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

export default FormByTeacher;
