import { useState } from "react";
import "./styles/App.css";
import SubjectSlotForm from "./components/SubjectSlotForm/SubjectSlotForm";
import DaySlot from "./components/DaySlot/DaySlot";

function App() {
  const [daySlot, setDaySlot] = useState({
    id: 1,
    slots: [
      {
        id: 0,
        number: 1,
        day: "monday",
        type: "practice",
        discipline: "Программирование",
        auditorium: "6-204",
        group: "ПРО-430Б",
      },
      {
        id: 1,
        number: 2,
        day: "monday",
        type: "lecture",
        discipline: "Философия",
        auditorium: "6-202",
        group: "ПРО-430Б",
      },
      {
        id: 2,
        number: 3,
        day: "monday",
        type: "practice",
        discipline: "Программирование",
        auditorium: "6-204",
        group: "ПРО-430Б",
      },
    ],
    date: new Date(),
  });

  function createSlot(slot) {
    if (slot.number === undefined || slot.number === -1) {
      alert("Введите номер пары");
      return;
    }

    for (let sl of daySlot.slots) {
      if (slot.number == sl.number) {
        alert("Данный слот занят");
        return;
      }
    }
    const newSlots = [...daySlot.slots, slot];
    console.log("Новый массив слотов после добавления:", newSlots);
    setDaySlot({ ...daySlot, slots: newSlots });
  }

  function deleteSlot(slot) {
    const newSlots = daySlot.slots.filter((sl) => sl.id !== slot.id);
    setDaySlot({ ...daySlot, slots: newSlots });
  }

  return (
    <div className="App">
      <div className="container">
        <SubjectSlotForm createSlot={createSlot} />
        <DaySlot daySlot={daySlot} deleteSlot={deleteSlot} />
      </div>
    </div>
  );
}

export default App;
