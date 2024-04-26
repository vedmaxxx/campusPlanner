import React, { useContext, useState } from "react";
import Button from "../UI/Button/Button";
import styles from "./EditSlotForm.module.css";
import Select from "../UI/Select/Select";
import { DISCIPLINES_CODES, SUBJECTS_TYPES } from "../utils/consts";
// import { SlotListContext } from "../../context/SlotListContext";

const EditSlotForm = ({ slot, setSlot }) => {
  // const { slotList, setSlotList } = useContext(SlotListContext);
  const [type, setType] = useState(slot.type);
  const [discipline, setDiscipline] = useState(slot.discipline);

  function saveChanges(e) {
    e.preventDefault();
    const editedSlot = {
      ...slot,
      type: type,
      discipline: discipline,
    };

    setSlot(editedSlot);
    // const newSlotList = [...slotList, editedSlot];
    // console.log(newSlotList);
  }

  return (
    <form action="" className={styles.form}>
      <h2>Изменить слот</h2>

      <Select
        value={discipline}
        onChange={(_discipline) => setDiscipline(_discipline)}
        defaultValue={"Название дисциплины"}
        // Здесь нужен будет массив предметов
        options={[
          { value: "Б1.О.01", name: DISCIPLINES_CODES["Б1.О.01"] },
          { value: "Б1.О.02", name: DISCIPLINES_CODES["Б1.О.02"] },
        ]}
        className={styles.select}
      />
      <Select
        value={type}
        onChange={(_type) => setType(_type)}
        defaultValue={"Вид занятия"}
        // Здесь нужен будет массив видов занятий
        options={[
          { value: "lecture", name: SUBJECTS_TYPES["lecture"] },
          { value: "practice", name: SUBJECTS_TYPES["practice"] },
          { value: "laboratory", name: SUBJECTS_TYPES["laboratory"] },
        ]}
        className={styles.select}
      />
      <Button onClick={saveChanges}>Сохранить</Button>
    </form>
  );
};

export default EditSlotForm;
