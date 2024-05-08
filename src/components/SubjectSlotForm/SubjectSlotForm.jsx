import React, { useContext, useEffect, useReducer, useState } from "react";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";
import { WeekSlotContext } from "../WeekSlotContext/WeekSlotContext";
import styles from "./SubjectSlotForm.module.css";
import AuditoriumService from "../../API/AuditoriumService";
import { MAX_SLOTS_PER_DAY, SLOT_TIME_NUMBER } from "../utils/consts";

const SubjectSlotForm = ({ createSlot, onCancel }) => {
  const { week } = useContext(WeekSlotContext);

  const [auditoriumList, setAuditoriumList] = useState([]);

  const [number, setNumber] = useState(-1);
  const [type, setType] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [auditorium, setAuditorium] = useState("");
  const [day, setDay] = useState("");
  const [teacher, setTeacher] = useState("");
  const [group, setGroup] = useState("");

  // массив номеров пар-слотов
  let timeCounter = 1;
  const timeOptions = Array.from(
    { length: MAX_SLOTS_PER_DAY },
    () => timeCounter++
  );

  async function fetchAudotriums() {
    const response = await AuditoriumService.getAll();
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
    createSlot(newDaySlot, newSlot);
  }

  useEffect(() => {
    fetchAudotriums();
  }, []);

  return (
    <form className={styles.form}>
      <h3 className={styles.title}>Создание слота</h3>
      <hr />
      <label>День недели</label>
      <Select
        onChange={setDay}
        defaultValue={"Выберите день недели"}
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
        options={timeOptions.map((option) => ({
          value: option,
          name: `${option} пара ${SLOT_TIME_NUMBER[option]}`,
        }))}
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
      {/* подгрузка с API */}
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
      {/* подгрузка с API */}
      <label>Аудитория</label>
      <Select
        onChange={setAuditorium}
        defaultValue={"Аудитория"}
        options={auditoriumList.map((auditorium) => {
          return {
            value: `${auditorium.number}`,
            name: `${auditorium.number}`,
          };
        })}
      />
      {/* подгрузка с API */}
      <label>Преподаватель</label>
      <Select
        onChange={setTeacher}
        defaultValue={"Преподаватель"}
        options={[
          { value: "Иванов И.В.", name: "Иванов И. В." },
          { value: "Васильев В.В.", name: "Васильев В.В." },
          { value: "Грачев Г.Г.", name: "Грачев Г.Г." },
        ]}
      />
      {/* подгрузка с API */}
      <label>Группа</label>
      <Select
        onChange={setGroup}
        defaultValue={"Группа"}
        options={[
          { value: "ПРО-430Б", name: "ПРО-430Б" },
          { value: "ПРО-431Б", name: "ПРО-431Б" },
          { value: "ПРО-432Б", name: "ПРО-432Б" },
        ]}
      />
      <div className={styles.buttons}>
        <Button onClick={addNewSlot}>Создать слот</Button>
        <Button onClick={onCancel}>Закрыть</Button>
      </div>
    </form>
  );
};

export default SubjectSlotForm;
