import React, { useContext, useEffect, useState } from "react";
import { SLOT_TIME_NUMBER } from "../utils/consts";
import { WeekSlotContext } from "../WeekSlotContext/WeekSlotContext";
import styles from "./CreateSlotForm.module.css";
import Button from "../UI/Button/Button";
import ControlledSelect from "../UI/ControlledSelect/ControlledSelect";
import AuditoriumService from "../../API/AuditoriumService";

const CreateSlotForm = ({ handleCreateSlot, onCancel }) => {
  const { week } = useContext(WeekSlotContext);
  const timeOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [auditorium, setAuditorium] = useState("");
  const [day, setDay] = useState("");
  const [teacher, setTeacher] = useState("");
  const [group, setGroup] = useState("");

  const [auditoriumList, setAuditoriumList] = useState([]);

  async function fetchAuditoriums() {
    const response = await AuditoriumService.getAll();
    console.log(response.data);
    setAuditoriumList(response.data);
  }

  function addNewSlot(e) {
    e.preventDefault();

    const newSlot = {
      id: Date.now(),
      number: Number(number),
      type: type,
      discipline: discipline,
      auditorium: auditorium,
      day: day,
      teacher: teacher,
      group: group,
    };

    const newDaySlot = week.dayslots.find((daySlot) => daySlot.day === day);
    handleCreateSlot(newDaySlot, newSlot);
  }

  function clearForm() {
    setDay("");
    setNumber("");
    setType("");
    setDiscipline("");
    setAuditorium("");
    setTeacher("");
    setGroup("");
  }

  useEffect(() => {
    fetchAuditoriums();
  }, []);

  return (
    <form className={styles.form}>
      <h3 className={styles.title}>Создание слота</h3>
      <hr />
      <label>День недели</label>
      {}
      <ControlledSelect
        onChange={setDay}
        value={day}
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
      <ControlledSelect
        onChange={setNumber}
        value={number}
        options={timeOptions.map((option) => ({
          value: option,
          name: `${option} пара ${SLOT_TIME_NUMBER[option]}`,
        }))}
      />
      <label>Вид занятия</label>
      <ControlledSelect
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
        options={auditoriumList.map((auditorium) => {
          return { value: auditorium.id, name: auditorium.number };
        })}
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
      <label>Группа</label>
      <ControlledSelect
        onChange={setGroup}
        value={group}
        options={[
          { value: "ПРО-430Б", name: "ПРО-430Б" },
          { value: "ПРО-431Б", name: "ПРО-431Б" },
          { value: "ПРО-432Б", name: "ПРО-432Б" },
        ]}
      />
      <div className={styles.buttons}>
        <Button
          onClick={(e) => {
            addNewSlot(e);
          }}
        >
          Создать слот
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

export default CreateSlotForm;
