import React, { useContext, useState } from "react";
import styles from "./MakeScheduleBy.module.css";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import FormScheduleBy from "../FormScheduleBy/FormScheduleBy";
import { ScheduleContext } from "../../context/ScheduleContext";
import FormHeader from "../UI/FormHeader/FormHeader";

const MakeScheduleBy = () => {
  const { viewMode, setViewMode } = useContext(ScheduleContext);
  const [modal, setModal] = useState(false);

  function selectModeHandler(e) {
    e.preventDefault();
    setViewMode(e.target.value);
    setModal(true);
  }
  function onCancelHandler(e) {
    e.preventDefault();
    setModal(false);
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
          {viewMode !== "" ? (
            <FormScheduleBy mode={viewMode} onCancel={onCancelHandler} />
          ) : null}
        </Modal>
      </div>
    </div>
  );
};

export default MakeScheduleBy;
