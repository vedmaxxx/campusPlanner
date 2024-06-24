import React, { useEffect, useState } from "react";
import Select from "../UI/Select/Select";
import FormHeader from "../UI/FormHeader/FormHeader";
import styles from "./FormByAuditorium.module.css";
import Button from "../UI/Button/Button";
import auditoriumStore from "../../stores/auditoriumStore";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { useFetching } from "../../hooks/useFetching";

const initFormValue = {
  auditorium: { value: "", name: "" },
  semester: { value: "", name: "" },
};

const FormByAuditorium = observer(({ onSubmit, onCancel }) => {
  const [formValue, setFormValue] = useState(initFormValue);
  const { auditoriums, fetchAuditoriums } = auditoriumStore;

  function clearForm() {
    setFormValue(initFormValue);
  }

  const [fetchForm, isLoading, error] = useFetching(async () => {
    await fetchAuditoriums();
  });

  useEffect(() => {
    fetchForm();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (error || auditoriums.length === 0) {
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
      <FormHeader>Расписание аудитории</FormHeader>
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
      <label>Номер аудитории</label>
      <Select
        name={"auditorium"}
        onChange={(value) => setFormValue({ ...formValue, auditorium: value })}
        defaultValue={"Аудитория"}
        options={auditoriums.map((aud) => ({
          value: aud.id,
          name: aud.number,
        }))}
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

export default FormByAuditorium;
