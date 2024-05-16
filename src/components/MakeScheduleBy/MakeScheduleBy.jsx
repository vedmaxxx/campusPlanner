import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MakeScheduleBy.module.css";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import FormScheduleBy from "../FormScheduleBy/FormScheduleBy";
import FormWrapper from "../UI/FormWrapper/FormWrapper";
import ModalFooter from "../UI/ModalFooter/ModalFooter";

const MakeScheduleBy = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState("group");

  function buttonHandler(e) {
    e.preventDefault();
    setMode(e.target.value);
    setModal(true);
  }

  return (
    <div className="container">
      <FormWrapper title={"Создание расписания"}>
        <Modal visible={modal} setVisible={setModal}>
          <FormScheduleBy mode={mode}></FormScheduleBy>
          <ModalFooter>
            <Button
              onClick={() => {
                navigate(`/${mode}/schedule`);
              }}
            >
              Перейти к расписанию
            </Button>
            <Button onClick={() => setModal(false)}>Закрыть</Button>
          </ModalFooter>
        </Modal>
        <div className={styles.buttons}>
          <p>Создать расписание для:</p>
          <Button value={"group"} onClick={buttonHandler}>
            Группы
          </Button>
          <Button value={"teacher"} onClick={buttonHandler}>
            Преподавателя
          </Button>
          <Button value={"auditorium"} onClick={buttonHandler}>
            Аудитории
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
};

export default MakeScheduleBy;
