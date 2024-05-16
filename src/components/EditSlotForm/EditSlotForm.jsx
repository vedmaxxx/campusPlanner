import React, { useContext, useEffect, useState } from "react";
import { WeekSlotContext } from "../WeekSlotContext/WeekSlotContext";
import { SUBJECT_TYPES } from "../utils/consts";
import styles from "./EditSlotForm.module.css";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";
import ControlledSelect from "../UI/ControlledSelect/ControlledSelect";

const initFormValue = {
  type: "",
  discipline: "",
  auditorium: "",
  teacher: "",
};

const EditSlotForm = ({ slot, editSlot, onCancel }) => {
  const { week, daySlotDate } = useContext(WeekSlotContext);

  const [formValue, setFormValue] = useState(initFormValue);
  let isError = false;

  // const [type, setType] = useState("");
  // const [discipline, setDiscipline] = useState("");
  // const [auditorium, setAuditorium] = useState("");
  // const [teacher, setTeacher] = useState("");

  // доступ к первоначальным данным слота внутри select? (сделать +1 option?)
  useEffect(() => {
    setFormValue({
      ...formValue,
      type: slot?.type,
      discipline: slot?.discipline,
      auditorium: slot?.auditorium,
      teacher: slot?.teacher,
    });
  }, [slot]);

  function clearForm() {
    setFormValue(initFormValue);
  }

  function changeSlot(e) {
    e.preventDefault();

    // если хотя бы одно поле в состоянии формы пустое, ставим флаг ошиьки setError(true)
    for (let select in formValue) {
      if (formValue[select] == "" || formValue[select] == undefined) {
        alert("Заполните все поля формы!");
        isError = true;
        return;
      }
    }

    const daySlot = week.dayslots.find(
      (dayslot) => dayslot.date === daySlotDate
    );
    const newSlot = { ...slot, ...formValue };
    editSlot(daySlot, newSlot);
    isError = false;
  }

  return (
    <form className={styles.form}>
      <h3 className={styles.title}>Редактирование слота</h3>
      <hr />
      <label>Тип занятия</label>
      <ControlledSelect
        name={"type"}
        onChange={(value) => setFormValue({ ...formValue, type: value })}
        value={formValue.type}
        options={[
          { value: "lecture", name: "Лекция" },
          { value: "practice", name: "Практика" },
          { value: "laboratory", name: "Лабораторная" },
        ]}
      />
      <label>Дисциплина</label>
      <ControlledSelect
        name={"discipline"}
        onChange={(value) => setFormValue({ ...formValue, discipline: value })}
        value={formValue.discipline}
        options={[
          { value: "Программирование", name: "Программирование" },
          { value: "Философия", name: "Философия" },
          {
            value: "Средства вычислительной техники",
            name: "Средства вычислительной техники",
          },
        ]}
      />

      <label>Аудитория</label>
      <ControlledSelect
        name={"auditorium"}
        onChange={(value) => setFormValue({ ...formValue, auditorium: value })}
        value={formValue.auditorium}
        options={[
          { value: "4-513", name: "4-513" },
          { value: "4-515", name: "4-515" },
        ]}
      />
      <label>Преподаватель</label>
      <ControlledSelect
        name={"teacher"}
        onChange={(value) => setFormValue({ ...formValue, teacher: value })}
        value={formValue.teacher}
        options={[
          { value: "Иванов И.В.", name: "Иванов И. В." },
          { value: "Васильев В.В.", name: "Васильев В.В." },
          { value: "Грачев Г.Г.", name: "Грачев Г.Г." },
        ]}
      />
      <div className={styles.buttons}>
        <Button
          onClick={(e) => {
            changeSlot(e);
            if (!isError) {
              onCancel(e);
              clearForm();
            }
          }}
        >
          Изменить слот
        </Button>
        <Button onClick={onCancel}>Закрыть</Button>
      </div>
    </form>
  );
};

export default EditSlotForm;
