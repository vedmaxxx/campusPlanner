import React, { useState } from "react";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";

const SubjectSlotForm = ({ createSlot }) => {
  const [number, setNumber] = useState(0);
  const [type, setType] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [auditorium, setAuditorium] = useState("");
  const [day, setDay] = useState("");

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
    console.log(newSlot);

    createSlot(newSlot);
  }

  return (
    <form action="" className="form_panel">
      <h2>Создать слот пары</h2>
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
      <Select
        onChange={setType}
        defaultValue={"Тип занятия"}
        options={[
          { value: "lecture", name: "Лекция" },
          { value: "practice", name: "Практика" },
          { value: "laboratory", name: "Лабораторная" },
        ]}
      />
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
      <Button onClick={addNewSlot}>Создать слот</Button>
    </form>
  );
};

export default SubjectSlotForm;
