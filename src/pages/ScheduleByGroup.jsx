import React, { useEffect, useReducer, useState } from "react";
import { WeekSlotContext } from "../components/WeekSlotContext/WeekSlotContext";
import WeekBar from "../components/WeekBar/WeekBar";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";
import ModalConfirm from "../components/UI/ModalConfirm/ModalConfirm";
import WeekSlot from "../components/WeekSlot/WeekSlot";
import NavBar from "../components/NavBar/NavBar";
import NavBarLink from "../components/NavBarLink/NavBarLink";
import CreateSlotForm from "../components/CreateSlotForm/CreateSlotForm";
import EditSlotForm from "../components/EditSlotForm/EditSlotForm";

const ScheduleByGroup = () => {
  const [schedule, setSchedule] = useState({
    id: Date.now(),
    semester: 1,
    group: "ПРО-430Б",
    weeksNumber: 20,
    weeks: [
      {
        id: 1,
        number: 1,
        dayslots: [
          {
            id: 1,

            slots: [
              {
                id: 0,
                number: 1,
                type: "practice",
                discipline: "Программирование",
                auditorium: "6-204",
                group: "ПРО-430Б",
                teacher: "",
              },
              {
                id: 1,
                number: 2,
                type: "lecture",
                discipline: "Философия",
                auditorium: "6-202",
                group: "ПРО-430Б",
                teacher: "",
              },
              {
                id: 2,
                number: 3,
                type: "practice",
                discipline: "Программирование",
                auditorium: "6-204",
                group: "ПРО-430Б",
                teacher: "",
              },
            ],
            day: "monday",
            date: new Date(2024, 3, 29),
          },
          {
            id: 2,
            slots: [
              {
                id: 5,
                number: 1,
                type: "practice",
                discipline: "Программирование",
                auditorium: "6-204",
                group: "ПРО-430Б",
                teacher: "",
              },
              {
                id: 6,
                number: 2,
                type: "lecture",
                discipline: "Философия",
                auditorium: "6-202",
                group: "ПРО-430Б",
                teacher: "",
              },
              {
                id: 7,
                number: 3,
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

  const [currentWeekNumber, setCurrentWeekNumber] = useState(1);
  const [currentWeek, setCurrentWeek] = useState(
    schedule.weeks[currentWeekNumber]
  );

  const [daySlotDate, setDaySlotDate] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(-1);

  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  // помещает исправленные слоты в массив schedule и состояние currentWeek
  function handleSlotsChanges(daySlot, slots) {
    const newDaySlot = { ...daySlot, slots: slots };
    const newDaySlots = currentWeek.dayslots.map((dayslot) => {
      if (dayslot.id === newDaySlot.id) {
        return newDaySlot;
      } else return dayslot;
    });
    const newCurrentWeek = { ...currentWeek, dayslots: newDaySlots };

    const newWeeks = schedule.weeks.map((week) =>
      week.number == currentWeekNumber ? newCurrentWeek : week
    );
    const newSchedule = { ...schedule, weeks: newWeeks };
    setSchedule(newSchedule);
    setCurrentWeek(newCurrentWeek);
    // const newSchedule = schedule.weeks.map((week) =>
    //   week.id == newCurrentWeek.id ? newCurrentWeek : week
    // );
    // setSchedule(newSchedule);

    // schedule.weeks[currentWeekNumber - 1].dayslots.map((dayslot) => {
    //   if (dayslot.id === newDaySlot.id) {
    //     return newDaySlot;
    //   } else return dayslot;
    // });
    // Изменили неделю в объекте расписания
    // schedule.weeks[currentWeekNumber - 1] = newCurrentWeek;
    // Установили в состояние текущее отображение
    // setCurrentWeek(newCurrentWeek);
  }

  function handleCreateSlot(dayslot, slot) {
    if (slot.number === undefined || slot.number === -1) {
      alert("Введите номер пары");
      return;
    }
    for (let sl of dayslot.slots) {
      if (slot.number == sl.number) {
        alert("Данный слот занят");
        return;
      }
    }
    const newSlots = [...dayslot.slots, slot];
    handleSlotsChanges(dayslot, newSlots);
  }
  function handleDeleteSlot(dayslot, slot_id) {
    const newSlots = dayslot.slots.filter((sl) => sl.id !== slot_id);
    handleSlotsChanges(dayslot, newSlots);
    console.log(schedule);
  }
  function handleEditSlot(dayslot, slot) {
    const newSlots = dayslot.slots.map((sl) => (sl.id == slot.id ? slot : sl));
    handleSlotsChanges(dayslot, newSlots);
  }

  function selectForDelete(slot_id, date) {
    setDaySlotDate(date);
    setSelectedSlotId(slot_id);
    setDeleteModal(true);
  }
  function selectForEdit(slot_id, date) {
    setDaySlotDate(date);
    setSelectedSlotId(slot_id);
    setEditModal(true);
  }

  function deleteBtnHandler() {
    let dayslot = currentWeek.dayslots.find(
      (dayslot) => dayslot.date == daySlotDate
    );
    handleDeleteSlot(dayslot, selectedSlotId);
    setDeleteModal(false);
  }

  function getSelectedSlot() {
    let dayslot = currentWeek?.dayslots?.find(
      (dayslot) => dayslot?.date == daySlotDate
    );
    // const dayslot = findDaySlotByDate(daySlotDate);
    return dayslot?.slots?.find((slot) => slot.id == selectedSlotId);
  }

  function clearSelectedItems() {
    setSelectedSlotId(-1);
    setDaySlotDate(null);
  }

  function findDaySlotByDate(daySlotDate) {
    let dayslot = currentWeek?.dayslots?.find(
      (daySlot) => daySlot?.date == daySlotDate
    );
    return dayslot;
  }

  useEffect(() => {
    if (schedule.weeks.length < currentWeekNumber) {
      setCurrentWeek([]);
    }
    setCurrentWeek(schedule.weeks[currentWeekNumber - 1]);
  }, [currentWeekNumber]);

  return (
    <>
      <NavBar>
        <NavBarLink to="/greeting">Главная</NavBarLink>

        <Button onClick={() => setCreateModal(true)}>Создать слот</Button>
      </NavBar>
      <div className="container">
        <WeekSlotContext.Provider
          value={{
            week: currentWeek,
            daySlotDate,
            selectForDelete,
            selectForEdit,
          }}
        >
          <WeekBar
            maxWeeks={schedule.weeksNumber}
            number={currentWeekNumber}
            setNumber={setCurrentWeekNumber}
          />
          <WeekSlot week={currentWeek} />

          <Modal visible={editModal} setVisible={setEditModal}>
            <EditSlotForm
              slot={getSelectedSlot()}
              daySlotDate={daySlotDate}
              editSlot={handleEditSlot}
              onCancel={(e) => {
                e.preventDefault();
                clearSelectedItems();
                setEditModal(false);
              }}
            />
          </Modal>
          <Modal visible={createModal} setVisible={setCreateModal}>
            <CreateSlotForm
              createSlot={handleCreateSlot}
              onCancel={(e) => {
                e.preventDefault();
                clearSelectedItems();
                setCreateModal(false);
              }}
            />
          </Modal>
          <Modal visible={deleteModal} setVisible={setDeleteModal}>
            <ModalConfirm
              onSubmit={deleteBtnHandler}
              onCancel={() => setDeleteModal(false)}
            >
              Вы уверены, что хотите удалить слот?
            </ModalConfirm>
          </Modal>
        </WeekSlotContext.Provider>
      </div>
    </>
  );
};

export default ScheduleByGroup;
