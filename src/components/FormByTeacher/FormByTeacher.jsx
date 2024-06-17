import React, { useEffect, useState } from "react";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";
import FormHeader from "../UI/FormHeader/FormHeader";
import styles from "./FormByTeacher.module.css";
import teacherStore from "../../stores/teacherStore";
import { observer } from "mobx-react-lite";
import { useFetching } from "../../hooks/useFetching";

const initFormValue = {
  teacher: "",
  faculty: "",
  department: "",
  curriculum: "",
  semester: "",
};

const FormByTeacher = observer(({ onSubmit, onCancel }) => {
  const [formValue, setFormValue] = useState(initFormValue);
  const { teachers, fetchTeachers } = teacherStore;

  function clearForm() {
    setFormValue(initFormValue);
  }

  const [fetchForm, isLoading, error] = useFetching(async () => {
    await fetchTeachers();
  });

  useEffect(() => {
    fetchForm();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (error || teachers.length === 0) {
    console.log(error);
    return (
      <>
        <FormHeader>Ошибка</FormHeader>
        <p>
          Не удалось загрузить данные с сервера.
          <br /> Перезагрузите страницу или обратитесь к администратору.
        </p>
        <div className={styles.buttons}>
          <Button
            onClick={(e) => {
              onCancel(e);
            }}
          >
            Закрыть
          </Button>
        </div>
      </>
    );
  }

  return (
    <form className={styles.form}>
      <FormHeader>Расписание преподавателя</FormHeader>
      <label>Семестр</label>
      <Select
        name={"semester"}
        onChange={(value) => setFormValue({ ...formValue, semester: value })}
        defaultValue={"Семестр"}
        options={[
          { value: 1, name: "1 Осенний" },
          { value: 2, name: "2 Весенний" },
        ]}
      />
      <label>ФИО преподавателя</label>
      <Select
        name={"teacher"}
        onChange={(value) => setFormValue({ ...formValue, teacher: value })}
        defaultValue={"Преподаватель"}
        options={teachers?.map((teacher) => ({
          value: teacher.id,
          name: `${teacher.surname} ${teacher.name} ${teacher.patronymic}`,
        }))}
      />
      <label>Учебный план</label>
      <Select
        name={"curricilum"}
        onChange={(value) => setFormValue({ ...formValue, curriculum: value })}
        defaultValue={"Номер учебного плана"}
        options={[
          { value: "38.03.05 БИ БА 3 2021", name: "38.03.05 БИ БА 3 2021" },
          {
            value: "38.03.06 БП БА 3 2021",
            name: "38.03.06 БП БА 3 2021",
          },
        ]}
      />
      <label>Факультет</label>
      <Select
        name={"faculty"}
        onChange={(value) => setFormValue({ ...formValue, faculty: value })}
        defaultValue={"Факультет"}
        options={[
          { value: "ИИМРТ", name: "ИИМРТ" },
          { value: "ФАДЭТ", name: "ФАДЭТ" },
        ]}
      />
      <label>Кафедра</label>
      <Select
        name={"department"}
        onChange={(value) => setFormValue({ ...formValue, department: value })}
        defaultValue={"Кафедра"}
        options={[
          { value: "ВМиК", name: "ВМиК" },
          { value: "ИИиМО", name: "ИИиМО" },
        ]}
      />
      <div className={styles.buttons}>
        <Button onClick={(e) => onSubmit(e, formValue)}>
          Перейти к расписанию
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
});

export default FormByTeacher;
