import React, { useEffect, useState } from "react";
import Select from "../UI/Select/Select";
import FormHeader from "../UI/FormHeader/FormHeader";
import styles from "./FormByAuditorium.module.css";
import Button from "../UI/Button/Button";
import auditoriumStore from "../../stores/auditoriumStore";
import { observer } from "mobx-react-lite";
import axios from "axios";

const initFormValue = {
  auditorium: { value: "", name: "" },
  semester: { value: "", name: "" },
};

const FormByAuditorium = observer(({ onSubmit, onCancel }) => {
  const [formValue, setFormValue] = useState(initFormValue);
  const { auditoriums, fetchAuditoriums } = auditoriumStore;

  const [auds, setAuds] = useState([]);

  function clearForm() {
    setFormValue(initFormValue);
  }

  useEffect(() => {
    fetchAuditoriums();
  }, []);

  return (
    <form className={styles.form}>
      <FormHeader>Расписание аудитории</FormHeader>
      <label>Семестр</label>
      {auds?.map((aud) => (
        <div>{aud?.number}</div>
      ))}

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
