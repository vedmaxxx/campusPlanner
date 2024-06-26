import React, { useContext, useEffect, useState } from "react";
import { WeekSlotContext } from "../../context/WeekSlotContext";
import styles from "./EditSlotForm.module.css";
import Button from "../UI/Button/Button";
import ControlledSelect from "../UI/ControlledSelect/ControlledSelect";
import { typeOptions } from "../../utils/selectData";

const initFormValue = {
  type: "",
  discipline: "",
  auditorium: "",
  teacher: "",
  group: "",
};

const EditSlotForm = ({ onSubmit, onCancel }) => {
  const {
    selectedSlotId,
    daySlotDate,
    currentWeek,
    getSlotById,
    disciplineOptions,
    groupOptions,
    auditoriumOptions,
    teacherOptions,
  } = useContext(WeekSlotContext);
  const [formValue, setFormValue] = useState(initFormValue);

  const scheduleParams = JSON.parse(localStorage.getItem("scheduleParams"));
  const { mode } = scheduleParams;

  const slot = getSlotById(selectedSlotId, daySlotDate, currentWeek?.number);

  let isError = false;

  function clearForm() {
    setFormValue(initFormValue);
  }

  function changeSlot(e) {
    e.preventDefault();

    // если хотя бы одно поле в состоянии формы пустое, ставим флаг ошиьки setError(true)
    for (let select in formValue) {
      if (formValue[select] === "" || formValue[select] === undefined) {
        alert("Заполните все поля формы!");
        isError = true;
        return;
      }
    }
    // находим слот-день
    const daySlot = currentWeek?.dayslots.find(
      (dayslot) => dayslot?.date === daySlotDate
    );
    // записываем в новый слот все значения с формы
    const newSlot = { ...slot, ...formValue };
    console.log(newSlot);

    onSubmit(newSlot);
    isError = false;
  }

  // заранее помещаем значение выбранной группы/преподавателя/аудитории
  //  в объект создаваемого слота

  useEffect(() => {
    const value = {
      ...formValue,
      type: slot?.type,
      discipline: slot?.discipline,
      auditorium: slot?.auditorium,
      teacher: slot?.teacher,
      group: slot?.group,
    };
    if (scheduleParams !== null) {
      value[mode] = scheduleParams.scheduleOptions[mode];
    }
    setFormValue(value);
  }, [slot]);

  return (
    <form className={styles.form}>
      <h3 className={styles.title}>Редактирование слота</h3>
      <hr />
      <label>Тип занятия</label>
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

      {mode !== "auditorium" ? (
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

      {mode !== "teacher" ? (
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
      {mode !== "group" ? (
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
        <Button
          onClick={(e) => {
            e.preventDefault();
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

export default EditSlotForm;
