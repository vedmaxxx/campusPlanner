import React, { useContext, useState } from "react";
import styles from "./MakeScheduleBy.module.css";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import FormScheduleBy from "../FormScheduleBy/FormScheduleBy";
import { ScheduleContext } from "../../context/ScheduleContext";
import FormHeader from "../UI/FormHeader/FormHeader";
import { useNavigate } from "react-router-dom";

const MakeScheduleBy = () => {
  // const { scheduleParams } = useContext(ScheduleContext);
  // const { mode, setMode, scheduleOptions, setScheduleOptions } = scheduleParams;
  const [mode, setMode] = useState("");
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  function selectModeHandler(e) {
    e.preventDefault();
    setMode(e.target.value);
    setModal(true);
  }
  function onCancelHandler(e) {
    e.preventDefault();
    setModal(false);
  }
  function onSubmitHandler(e, formValue) {
    e.preventDefault();
    for (let select in formValue) {
      if (formValue[select] === "" || formValue[select] === undefined) {
        alert("Заполните все поля формы!");
        return;
      }
    }
    // сохранение в локальное хранилище
    localStorage.setItem(
      "scheduleParams",
      JSON.stringify({ scheduleOptions: { ...formValue }, mode: mode })
    );
    navigate(`/schedule/${mode}`);
  }

  return (
    <div className="container">
      <div className={styles.form}>
        <FormHeader>Создание расписания</FormHeader>
        <div className={styles.buttons}>
          <p>Создать расписание для:</p>
          <Button value={"group"} onClick={selectModeHandler}>
            Группы
          </Button>
          <Button value={"teacher"} onClick={selectModeHandler}>
            Преподавателя
          </Button>
          <Button value={"auditorium"} onClick={selectModeHandler}>
            Аудитории
          </Button>
        </div>

        <Modal visible={modal} setVisible={setModal}>
          {mode !== "" ? (
            <FormScheduleBy
              mode={mode}
              onSubmit={onSubmitHandler}
              onCancel={onCancelHandler}
            />
          ) : null}
        </Modal>
      </div>
    </div>
  );
};

export default MakeScheduleBy;
