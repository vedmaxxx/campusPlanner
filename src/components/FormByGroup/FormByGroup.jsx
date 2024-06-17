import React, { useEffect, useState } from "react";
import Select from "../UI/Select/Select";
import FormHeader from "../UI/FormHeader/FormHeader";
import styles from "./FormByGroup.module.css";
import Button from "../UI/Button/Button";
import { observer } from "mobx-react-lite";
import groupStore from "../../stores/groupStore";
import auditoriumStore from "../../stores/auditoriumStore";
import { useFetching } from "../../hooks/useFetching";

const initFormValue = {
  group: "",
  faculty: "",
  department: "",
  curriculum: "",
  semester: "",
};

const FormByGroup = observer(({ onSubmit, onCancel }) => {
  const [formValue, setFormValue] = useState(initFormValue);
  const { groups, fetchGroups } = groupStore;

  // функция очистки состояния формы
  function clearForm() {
    setFormValue(initFormValue);
  }

  const [fetchForm, isLoading, error] = useFetching(async () => {
    await fetchGroups();
  });

  useEffect(() => {
    fetchForm();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (error || groups.length === 0) {
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
      <FormHeader>Расписание группы</FormHeader>
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
      <label>Учебная группа</label>
      <Select
        name={"group"}
        onChange={(value) => setFormValue({ ...formValue, group: value })}
        defaultValue={"Группа"}
        options={groups?.map((gr) => ({
          value: gr.id,
          name: gr.number,
        }))}
      />
      <label>Учебный план</label>
      <Select
        name={"curricilium"}
        onChange={(value) => setFormValue({ ...formValue, curriculum: value })}
        defaultValue={"Номер учебного плана"}
        options={[{ value: 1, name: "38.03.05 БИ БА 3 2021" }]}
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

export default FormByGroup;
