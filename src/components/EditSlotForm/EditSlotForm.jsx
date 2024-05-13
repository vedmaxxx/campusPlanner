import React, { useContext, useEffect, useState } from "react";
import { WeekSlotContext } from "../WeekSlotContext/WeekSlotContext";
import { SUBJECT_TYPES } from "../utils/consts";
import styles from "./EditSlotForm.module.css";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";
import ControlledSelect from "../UI/ControlledSelect/ControlledSelect";

const EditSlotForm = ({ slot, editSlot, onCancel }) => {
  const { week, daySlotDate } = useContext(WeekSlotContext);
  const [type, setType] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [auditorium, setAuditorium] = useState("");
  const [teacher, setTeacher] = useState("");

  // доступ к первоначальным данным слота внутри select? (сделать +1 option?)
  useEffect(() => {
    setType(slot?.type);
    setDiscipline(slot?.discipline);
    setAuditorium(slot?.auditorium);
    setTeacher(slot?.teacher);
  }, [slot]);

  function clearForm() {
    setType("");
    setDiscipline("");
    setAuditorium("");
    setTeacher("");
  }

  function changeSlot(e) {
    e.preventDefault();
    const daySlot = week.dayslots.find(
      (dayslot) => dayslot.date === daySlotDate
    );
    const newSlot = { ...slot, type, discipline, auditorium, teacher };
    editSlot(daySlot, newSlot);
  }

  return (
    <form className={styles.form}>
      <h3 className={styles.title}>Редактирование слота</h3>
      <hr />
      <label>Тип занятия</label>
      <ControlledSelect
        name="selectedType"
        onChange={setType}
        value={type}
        options={[
          { value: "lecture", name: "Лекция" },
          { value: "practice", name: "Практика" },
          { value: "laboratory", name: "Лабораторная" },
        ]}
      />
      <label>Дисциплина</label>
      <ControlledSelect
        name="selectedDiscipline"
        onChange={setDiscipline}
        value={discipline}
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
        onChange={setAuditorium}
        value={auditorium}
        options={[
          { value: "4-513", name: "4-513" },
          { value: "4-515", name: "4-515" },
        ]}
      />
      <label>Преподаватель</label>
      <ControlledSelect
        onChange={setTeacher}
        value={teacher}
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
            clearForm();
            onCancel(e);
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
