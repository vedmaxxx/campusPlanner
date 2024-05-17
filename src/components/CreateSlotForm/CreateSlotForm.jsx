import React, { useContext, useState } from "react";
import { SLOT_TIME_NUMBER } from "../utils/consts";
import { WeekSlotContext } from "../../context/WeekSlotContext";
import styles from "./CreateSlotForm.module.css";
import Button from "../UI/Button/Button";
import ControlledSelect from "../UI/ControlledSelect/ControlledSelect";
import { ScheduleContext } from "../../context/ScheduleContext";

const initFormValue = {
  day: "",
  number: "",
  type: "",
  discipline: "",
  auditorium: "",
  teacher: "",
};

const CreateSlotForm = ({ handleCreateSlot, onCancel }) => {
  const { week } = useContext(WeekSlotContext);
  const { viewMode } = useContext(ScheduleContext);
  const [formValue, setFormValue] = useState(initFormValue);

  const timeOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  let isError = false;

  // заглушка
  function handleSubmit(e) {
    e.preventDefault();
  }

  function addNewSlot(e) {
    e.preventDefault();
    // если хотя бы одно поле в состоянии формы пустое, ставим флаг ошиьки setError(true)
    for (let select in formValue) {
      if (formValue[select] == "" || formValue[select] == undefined) {
        alert("Заполните все поля формы!");
        isError = true;
        return;
      }
    }

    // формируем новый слот-пару
    const newSlot = {
      id: Date.now(),
      number: Number(formValue.number),
      day: formValue.day,
      type: formValue.type,
      discipline: formValue.discipline,
      auditorium: formValue.auditorium,
      teacher: formValue.teacher,
    };

    // находим нужный слот-день
    const newDaySlot = week.dayslots.find(
      (daySlot) => daySlot.day === formValue.day
    );
    // ищем в данном дне новую пару - если пара под этим номером существует, кидаем уведомление
    for (let sl of newDaySlot?.slots) {
      if (newSlot?.number == sl.number) {
        alert("Данный слот занят");
        isError = true;
        return;
      }
    }

    // вызываем функцию добавления слота-пары в состояние расписания
    handleCreateSlot(newDaySlot, newSlot);
    isError = false;
  }

  // функция очистки состояния формы
  function clearForm() {
    setFormValue(initFormValue);
  }

  return (
    <form className={styles.form} method="post" onSubmit={handleSubmit}>
      <h3 className={styles.title}>Создание слота</h3>
      <hr />
      <label>День недели</label>
      <ControlledSelect
        name={"day"}
        onChange={(value) => setFormValue({ ...formValue, day: value })}
        value={formValue.day}
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
        name={"number"}
        onChange={(value) => setFormValue({ ...formValue, number: value })}
        value={formValue.number}
        options={timeOptions.map((option) => ({
          value: option,
          name: `${option} пара ${SLOT_TIME_NUMBER[option]}`,
        }))}
      />

      <label>Вид занятия</label>
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
        options={[{ value: "6-404", name: "6-404" }]}
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
          // если ошибки не было, после добавления элемента очищаем форму и выходим из модалки
          onClick={(e) => {
            addNewSlot(e);
            if (!isError) {
              onCancel(e);
              clearForm();
            }
          }}
        >
          Создать слот
        </Button>
        <Button
          // очищаем форму и выходим из модалки
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
