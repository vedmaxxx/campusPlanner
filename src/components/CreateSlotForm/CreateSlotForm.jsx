import React, { useContext, useEffect, useState } from "react";
import { SLOT_TIME_NUMBER } from "../utils/consts";
import { WeekSlotContext } from "../../context/WeekSlotContext";
import styles from "./CreateSlotForm.module.css";
import Button from "../UI/Button/Button";
import ControlledSelect from "../UI/ControlledSelect/ControlledSelect";
import { ScheduleContext } from "../../context/ScheduleContext";
import {
  auditoriumOptions,
  dayOptions,
  disciplineOptions,
  groupOptions,
  teacherOptions,
  timeOptions,
  typeOptions,
} from "../utils/selectData";

const initFormValue = {
  day: "",
  number: "",
  type: "",
  discipline: "",
  auditorium: "",
  teacher: "",
  group: "",
};

const CreateSlotForm = ({ handleCreateSlot, onCancel }) => {
  const { week } = useContext(WeekSlotContext);
  const { viewMode, scheduleParams } = useContext(ScheduleContext);
  const [formValue, setFormValue] = useState(initFormValue);

  let isError = false;

  // заглушка
  function handleSubmit(e) {
    e.preventDefault();
  }

  // функция добавления нового слота в расписание
  function addNewSlot(e) {
    e.preventDefault();
    console.log(formValue);
    // если хотя бы одно поле в состоянии формы пустое, ставим флаг ошиьки setError(true)
    for (let select in formValue) {
      if (formValue[select] === "" || formValue[select] === undefined) {
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
      group: formValue.group,
    };

    // находим нужный слот-день
    const newDaySlot = week.dayslots.find(
      (daySlot) => daySlot.day === formValue.day
    );
    // ищем в данном дне новую пару - если пара под этим номером существует, кидаем уведомление
    for (let sl of newDaySlot?.slots) {
      if (newSlot?.number === sl.number) {
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

  // заранее помещаем значение выбранной группы/преподавателя/аудитории
  //  в объект создаваемого слота
  useEffect(() => {
    if (scheduleParams !== null) {
      const temp = { ...formValue };
      temp[viewMode] = scheduleParams[viewMode];
      setFormValue(temp);
      console.log(temp);
    }
  }, [scheduleParams, viewMode]);

  return (
    <form className={styles.form} method="post" onSubmit={handleSubmit}>
      <h3 className={styles.title}>Создание слота</h3>
      <hr />

      {viewMode !== "group" ? (
        <>
          <label>Группа</label>
          <ControlledSelect
            name={"group"}
            onChange={(value) => setFormValue({ ...formValue, group: value })}
            value={formValue.group}
            options={groupOptions}
          />
        </>
      ) : null}
      {viewMode !== "teacher" ? (
        <>
          <label>Преподаватель</label>
          <ControlledSelect
            name={"teacher"}
            onChange={(value) => setFormValue({ ...formValue, teacher: value })}
            value={formValue.teacher}
            options={teacherOptions}
          />
        </>
      ) : null}
      {viewMode !== "auditorium" ? (
        <>
          <label>Аудитория</label>
          <ControlledSelect
            name={"auditorium"}
            onChange={(value) =>
              setFormValue({ ...formValue, auditorium: value })
            }
            value={formValue.auditorium}
            options={auditoriumOptions}
          />
        </>
      ) : null}

      <label>День недели</label>
      <ControlledSelect
        name={"day"}
        onChange={(value) => setFormValue({ ...formValue, day: value })}
        value={formValue.day}
        options={dayOptions}
      />

      <label>Номер пары</label>
      <ControlledSelect
        name={"number"}
        onChange={(value) => setFormValue({ ...formValue, number: value })}
        value={formValue.number}
        options={timeOptions}
      />

      <label>Вид занятия</label>
      <ControlledSelect
        name={"type"}
        onChange={(value) => setFormValue({ ...formValue, type: value })}
        value={formValue.type}
        options={typeOptions}
      />

      <label>Дисциплина</label>
      <ControlledSelect
        name={"discipline"}
        onChange={(value) => setFormValue({ ...formValue, discipline: value })}
        value={formValue.discipline}
        options={disciplineOptions}
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
