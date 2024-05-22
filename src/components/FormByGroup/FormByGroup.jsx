import React, { useState } from "react";
import Select from "../UI/Select/Select";
import FormHeader from "../UI/FormHeader/FormHeader";
import styles from "./FormByGroup.module.css";
import Button from "../UI/Button/Button";
import { groupOptions } from "../utils/selectData";

const initFormValue = {
  group: "",
  faculty: "",
  department: "",
  curricilium: "",
};

const FormByGroup = ({ onSubmit, onCancel }) => {
  const [formValue, setFormValue] = useState(initFormValue);

  // функция очистки состояния формы
  function clearForm() {
    setFormValue(initFormValue);
  }

  return (
    <form className={styles.form}>
      <FormHeader>Расписание группы</FormHeader>
      <label>Учебная группа</label>
      <Select
        name={"group"}
        onChange={(value) => setFormValue({ ...formValue, group: value })}
        defaultValue={"Группа"}
        options={groupOptions}
      />
      <label>Учебный план</label>
      <Select
        name={"curricilium"}
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

export default FormByGroup;
