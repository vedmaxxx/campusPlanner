import { useEffect, useState } from "react";
import "./styles/App.css";
import SubjectSlotForm from "./components/SubjectSlotForm/SubjectSlotForm";
import WeekSlot from "./components/WeekSlot/WeekSlot";
import { WeekSlotContext } from "./components/WeekSlotContext/WeekSlotContext";
import Modal from "./components/UI/Modal/Modal";
import Button from "./components/UI/Button/Button";
import NavBar from "./components/NavBar/NavBar";
import WeekBar from "./components/WeekBar/WeekBar";

function App() {
  const [scheduleGroup, setScheduleGroup] = useState({
    id: Date.now(),
    semester: 1,
    group: "ПРО-430Б",
    weeks: [
      {
        id: 1,
        number: 1,
        dayslots: [
          {
            id: 1,
            day: "monday",
            number: 1,
            slots: [
              {
                id: 0,
                number: 1,
                day: "monday",
                type: "practice",
                discipline: "Программирование",
                auditorium: "6-204",
                group: "ПРО-430Б",
                teacher: "",
              },
              {
                id: 1,
                number: 2,
                day: "monday",
                type: "lecture",
                discipline: "Философия",
                auditorium: "6-202",
                group: "ПРО-430Б",
                teacher: "",
              },
              {
                id: 2,
                number: 3,
                day: "monday",
                type: "practice",
                discipline: "Программирование",
                auditorium: "6-204",
                group: "ПРО-430Б",
                teacher: "",
              },
            ],
            date: new Date(2024, 3, 29),
          },
          {
            id: 2,
            slots: [
              {
                id: 5,
                number: 1,
                day: "monday",
                type: "practice",
                discipline: "Программирование",
                auditorium: "6-204",
                group: "ПРО-430Б",
                teacher: "",
              },
              {
                id: 6,
                number: 2,
                day: "monday",
                type: "lecture",
                discipline: "Философия",
                auditorium: "6-202",
                group: "ПРО-430Б",
                teacher: "",
              },
              {
                id: 7,
                number: 3,
                day: "monday",
                type: "practice",
                discipline: "Программирование",
                auditorium: "6-204",
                group: "ПРО-430Б",
                teacher: "",
              },
            ],
            day: "tuesday",
            date: new Date(2024, 3, 30),
          },
          {
            id: 3,
            slots: [],
            day: "wednesday",
            date: new Date(2024, 4, 1),
          },
          {
            id: 4,
            slots: [],
            day: "thursday",
            date: new Date(2024, 4, 2),
          },
          {
            id: 5,
            slots: [],
            day: "friday",
            date: new Date(2024, 4, 3),
          },
          {
            id: 6,
            slots: [],
            day: "saturday",
            date: new Date(2024, 4, 4),
          },
        ],
      },
      {
        id: 2,
        number: 2,
        dayslots: [
          {
            id: 1,
            day: "monday",
            number: 1,
            slots: [
              {
                id: 1,
                number: 2,
                day: "monday",
                type: "lecture",
                discipline: "Философия",
                auditorium: "6-202",
                group: "ПРО-430Б",
                teacher: "",
              },
              {
                id: 2,
                number: 3,
                day: "monday",
                type: "practice",
                discipline: "Программирование",
                auditorium: "6-204",
                group: "ПРО-430Б",
                teacher: "",
              },
            ],
            date: new Date(2024, 4, 6),
          },
          {
            id: 2,
            slots: [
              {
                id: 5,
                number: 1,
                day: "monday",
                type: "practice",
                discipline: "Программирование",
                auditorium: "6-204",
                group: "ПРО-430Б",
                teacher: "",
              },
              {
                id: 6,
                number: 2,
                day: "monday",
                type: "lecture",
                discipline: "Философия",
                auditorium: "6-202",
                group: "ПРО-430Б",
                teacher: "",
              },
              {
                id: 7,
                number: 3,
                day: "monday",
                type: "practice",
                discipline: "Программирование",
                auditorium: "6-204",
                group: "ПРО-430Б",
                teacher: "",
              },
            ],
            day: "tuesday",
            date: new Date(2024, 4, 7),
          },
          {
            id: 3,
            slots: [],
            day: "wednesday",
            date: new Date(2024, 4, 8),
          },
          {
            id: 4,
            slots: [],
            day: "thursday",
            date: new Date(2024, 4, 9),
          },
          {
            id: 5,
            slots: [],
            day: "friday",
            date: new Date(2024, 4, 10),
          },
          {
            id: 6,
            slots: [],
            day: "saturday",
            date: new Date(2024, 4, 11),
          },
        ],
      },
    ],
  });
  const [maxWeeks, setMaxWeeks] = useState(scheduleGroup.weeks.length);
  const [currentWeekNumber, setCurrentWeekNumber] = useState(1);
  const [currentWeek, setCurrentWeek] = useState(
    scheduleGroup.weeks[currentWeekNumber]
  );

  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [daySlotDate, setDaySlotDate] = useState(null);
  const [deletingSlotId, setDeletingSlotId] = useState(-1);

  function createSlot(daySlot, slot) {
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
    const newDaySlot = { ...daySlot, slots: [...daySlot.slots, slot] };
    const newDaySlots = currentWeek.dayslots.map((dayslot) => {
      if (dayslot.id === newDaySlot.id) {
        return newDaySlot;
      } else return dayslot;
    });
    const newCurrentWeek = { ...currentWeek, dayslots: newDaySlots };
    const newWeeks = scheduleGroup.weeks.map((week) => {
      if (week.number == currentWeekNumber) {
        return newCurrentWeek;
      } else return week;
    });
    const newScheduleGroup = { ...scheduleGroup, weeks: newWeeks };
    setScheduleGroup(newScheduleGroup);
  }

  function deleteSlot(dayslot, slot_id) {
    const newSlots = dayslot.slots.filter((sl) => sl.id !== slot_id);
    const newDaySlot = { ...dayslot, slots: newSlots };
    const newDaySlots = currentWeek.dayslots.map((dayslot) => {
      if (dayslot.id === newDaySlot.id) {
        return newDaySlot;
      } else return dayslot;
    });
    const newCurrentWeek = { ...currentWeek, dayslots: newDaySlots };
    setCurrentWeek(newCurrentWeek);
  }

  const selectForDelete = (slot_id, date) => {
    setDaySlotDate(date);
    setDeletingSlotId(slot_id);
    setDeleteModal(true);
  };

  function deleteBtnHandler() {
    let dayslot = currentWeek.dayslots.find(
      (dayslot) => dayslot.date == daySlotDate
    );
    deleteSlot(dayslot, deletingSlotId);
    setDeleteModal(false);
  }

  useEffect(() => {
    if (scheduleGroup.weeks.length < currentWeekNumber) return;
    setCurrentWeek(scheduleGroup.weeks[currentWeekNumber - 1]);
  }, [currentWeekNumber, scheduleGroup]);

  return (
    <div className="App">
      <NavBar>
        <Button mix={{ red: true }} onClick={() => setCreateModal(true)}>
          Создать слот
        </Button>
      </NavBar>
      <div className="container">
        <WeekSlotContext.Provider
          value={{ week: currentWeek, selectForDelete }}
        >
          <WeekBar
            maxWeeks={maxWeeks}
            number={currentWeekNumber}
            setNumber={setCurrentWeekNumber}
          />
          <Modal visible={deleteModal} setVisible={setDeleteModal}>
            <div className="modal_container">
              <div>Вы уверены, что хотите удалить пару?</div>
              <div className="modal_container__btns">
                <Button onClick={deleteBtnHandler}>Да</Button>
                <Button onClick={() => setDeleteModal(false)}>Нет</Button>
              </div>
            </div>
          </Modal>
          <Modal visible={createModal} setVisible={setCreateModal}>
            <SubjectSlotForm createSlot={createSlot} />
            <Button onClick={() => setCreateModal(false)}>Закрыть</Button>
          </Modal>
          <WeekSlot week={currentWeek} />
        </WeekSlotContext.Provider>
      </div>
    </div>
  );
}

export default App;
