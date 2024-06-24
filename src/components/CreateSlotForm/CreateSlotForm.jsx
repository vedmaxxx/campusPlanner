import React, { useContext, useEffect, useState } from "react";
import { WeekSlotContext } from "../../context/WeekSlotContext";
import styles from "./CreateSlotForm.module.css";
import Button from "../UI/Button/Button";
import ControlledSelect from "../UI/ControlledSelect/ControlledSelect";
import { dayOptions, timeOptions, typeOptions } from "../../utils/selectData";

const initFormValue = {
  day: "",
  number: "",
  type: "",
  discipline: "",
  auditorium: "",
  teacher: "",
  group: "",
};

const CreateSlotForm = ({ onSubmit, onCancel }) => {
  const scheduleParams = JSON.parse(localStorage.getItem("scheduleParams"));
  const {
    currentWeek,
    disciplineOptions,
    groupOptions,
    auditoriumOptions,
    teacherOptions,
  } = useContext(WeekSlotContext);
  const { mode } = scheduleParams;

  const [formValue, setFormValue] = useState(initFormValue);

  const [isOptionsEmpty, setIsOptionsEmpty] = useState(false);
  let isError = false;

  // функция добавления нового слота в расписание
  function addNewSlot(e) {
    e.preventDefault();
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
      id: crypto.randomUUID(),
      number: Number(formValue.number),
      day: formValue.day,
      type: formValue.type,
      discipline: formValue.discipline,
      auditorium: formValue?.auditorium,
      teacher: formValue?.teacher,
      group: formValue?.group,
    };
    // находим нужный слот-день
    const newDaySlot = currentWeek.dayslots.find(
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
    console.log(newSlot);

    onSubmit(newSlot, newDaySlot.date, currentWeek.number);
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
      temp[mode] = scheduleParams.scheduleOptions[mode];
      setFormValue(temp);
    }
  }, [currentWeek]);

  // проверка на пустые options
  useEffect(() => {
    if (
      auditoriumOptions.length === 0 ||
      dayOptions.length === 0 ||
      disciplineOptions.length === 0 ||
      groupOptions.length === 0 ||
      teacherOptions.length === 0 ||
      timeOptions.length === 0 ||
      typeOptions.length === 0
    )
      setIsOptionsEmpty(true);
    else setIsOptionsEmpty(false);
  }, [
    auditoriumOptions,
    dayOptions,
    disciplineOptions,
    groupOptions,
    teacherOptions,
  ]);

  return (
    <form className={styles.form}>
      {isOptionsEmpty ? (
        <div className={styles.is_options_empty}>
          <div>
            Варианты выбора в форме были загружены неверно. Обратитесь к
            администратору.
          </div>
          <Button
            onClick={(e) => {
              onCancel(e);
            }}
          >
            Закрыть
          </Button>
        </div>
      ) : (
        <>
          <h3 className={styles.title}>Создание слота</h3>
          <hr />

          {mode !== "group" ? (
            <>
              <label>Группа</label>
              <ControlledSelect
                name={"group"}
                onChange={(value) =>
                  setFormValue({ ...formValue, group: value })
                }
                value={formValue.group}
                options={groupOptions}
              />
            </>
          ) : null}
          {mode !== "teacher" ? (
            <>
              <label>Преподаватель</label>
              <ControlledSelect
                name={"teacher"}
                onChange={(value) =>
                  setFormValue({ ...formValue, teacher: value })
                }
                value={formValue.teacher}
                options={teacherOptions}
              />
            </>
          ) : null}
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
            onChange={(value) =>
              setFormValue({ ...formValue, discipline: value })
            }
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
        </>
      )}
    </form>
  );
};

export default CreateSlotForm;
