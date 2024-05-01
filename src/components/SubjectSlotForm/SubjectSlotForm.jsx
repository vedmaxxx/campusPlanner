import React, { useContext, useState } from "react";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";
import { WeekSlotContext } from "../WeekSlotContext/WeekSlotContext";
import styles from "./SubjectSlotForm.module.css";

const SubjectSlotForm = ({ createSlot }) => {
  const { week } = useContext(WeekSlotContext);

  const [number, setNumber] = useState(1);
  const [type, setType] = useState("lecture");
  const [discipline, setDiscipline] = useState("Программирование");
  const [auditorium, setAuditorium] = useState("6-303");
  const [day, setDay] = useState("monday");

  function addNewSlot(e) {
    e.preventDefault();

    const newSlot = {
      id: Date.now(),
      number: Number(number),
      type: type,
      discipline: discipline,
      auditorium: auditorium,
      day: day,
    };

    const newDaySlot = week.find((daySlot) => daySlot.day == day);

    createSlot(newDaySlot, newSlot);
    console.log("Слот успешно добавлен!");
  }

  return (
    <form action="" className={styles.form}>
      <h3 className={styles.title}>Создание слота</h3>
      <label>День недели</label>
      <Select
        onChange={setDay}
        defaultValue={"День"}
        options={[
          { value: "monday", name: "Пн" },
          { value: "tuesday", name: "Вт" },
          { value: "wednesday", name: "Ср" },
          { value: "thursday", name: "Чт" },
          { value: "friday", name: "Пт" },
          { value: "saturday", name: "Сб" },
        ]}
      />
      <label>Номер пары</label>
      <Select
        onChange={setNumber}
        defaultValue={"Номер пары"}
        options={[
          { value: 1, name: 1 },
          { value: 2, name: 2 },
          { value: 3, name: 3 },
          { value: 4, name: 4 },
          { value: 5, name: 5 },
          { value: 6, name: 6 },
          { value: 7, name: 7 },
          { value: 8, name: 8 },
        ]}
      />
      <label>Вид занятия</label>

      <Select
        onChange={setType}
        defaultValue={"Тип занятия"}
        options={[
          { value: "lecture", name: "Лекция" },
          { value: "practice", name: "Практика" },
          { value: "laboratory", name: "Лабораторная" },
        ]}
      />
      <label>Дисциплина</label>

      <Select
        onChange={setDiscipline}
        defaultValue={"Дисциплина"}
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

      <Select
        onChange={setAuditorium}
        defaultValue={"Аудитория"}
        options={[
          { value: "6-201", name: "6-201" },
          { value: "6-202", name: "6-202" },
          {
            value: "6-203",
            name: "6-203",
          },
        ]}
      />

      <Button mix={{ red: true }} onClick={addNewSlot}>
        Создать слот
      </Button>
    </form>
  );
};

export default SubjectSlotForm;
