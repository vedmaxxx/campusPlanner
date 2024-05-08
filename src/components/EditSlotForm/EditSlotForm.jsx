import React, { useContext, useState } from "react";
import { WeekSlotContext } from "../WeekSlotContext/WeekSlotContext";
import { MAX_SLOTS_PER_DAY, SLOT_TIME_NUMBER } from "../utils/consts";
import styles from "./EditSlotForm.module.css";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";

const EditSlotForm = ({ editSlot, editBtnHandler, onCancel }) => {
  const { week, daySlotDate } = useContext(WeekSlotContext);

  // const [number, setNumber] = useState(subjectSlot.number);
  // const [type, setType] = useState(subjectSlot.type);
  // const [discipline, setDiscipline] = useState(subjectSlot.discipline);
  // const [auditorium, setAuditorium] = useState(subjectSlot.auditorium);
  // const [day, setDay] = useState(subjectSlot.day);
  // const [teacher, setTeacher] = useState(subjectSlot.teacher);

  function changeSlot(e) {
    e.preventDefault();

    const slot = {
      // id: Date.now(),
      // number: Number(number),
      // type: type,
      // discipline: discipline,
      // auditorium: auditorium,
      // day: day,
      // teacher: teacher,
      // group: group,
    };

    // const daySlot = week.dayslots.find((daySlot) => daySlot.day === day);
    // editSlot(daySlot, slot);
  }

  return (
    <form className={styles.form}>
      <h3 className={styles.title}>Редактирование слота</h3>
      <hr />

      {/* <label>День недели</label>
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
      /> */}
      {/* подгрузка с API */}
      {/* <label>Дисциплина</label>
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
      /> */}
      {/* подгрузка с API */}
      {/* <label>Аудитория</label>
      <Select
        onChange={setAuditorium}
        defaultValue={"Аудитория"}
        options={[
          { value: 1, name: "4-513" },
          { value: 2, name: "4-515" },
        ]}
      /> */}
      {/* подгрузка с API */}
      {/* <label>Преподаватель</label>
      <Select
        onChange={setTeacher}
        defaultValue={"Преподаватель"}
        options={[
          { value: "Иванов И.В.", name: "Иванов И. В." },
          { value: "Васильев В.В.", name: "Васильев В.В." },
          { value: "Грачев Г.Г.", name: "Грачев Г.Г." },
        ]}
      /> */}

      <div className={styles.buttons}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            editBtnHandler();
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
