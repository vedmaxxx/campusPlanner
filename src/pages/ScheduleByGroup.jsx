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
  // на самом деле достаточно get-ать неделю  для данной страницы, а массив недель хранить не
  // в стейте, а в обычном массиве

  const [scheduleGroup, setScheduleGroup] = useState({
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
            day: "monday",
            number: 1,
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
  const maxWeeks = scheduleGroup.weeksNumber;

  const [currentWeekNumber, setCurrentWeekNumber] = useState(1);
  const [currentWeek, setCurrentWeek] = useState(
    scheduleGroup.weeks[currentWeekNumber]
  );

  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  // дата редактируемого daySlot
  const [daySlotDate, setDaySlotDate] = useState(null);
  // дата удаляемого subjectSlot
  const [selectedSlotId, setSelectedSlotId] = useState(-1);

  // помещает исправленные слоты в расписание группы
  function updateSubjectSlotsInScheduleGroup(daySlot, slots) {
    const newDaySlot = { ...daySlot, slots: slots };
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

  function createSubjectSlot(dayslot, slot) {
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
    updateSubjectSlotsInScheduleGroup(dayslot, newSlots);
  }
  function deleteSubjectSlot(dayslot, slot_id) {
    const newSlots = dayslot.slots.filter((sl) => sl.id !== slot_id);
    updateSubjectSlotsInScheduleGroup(dayslot, newSlots);
  }
  function applyChanges(dayslot, slot) {
    const newSlots = dayslot.slots.map((sl) => (sl.id == slot.id ? slot : sl));
    updateSubjectSlotsInScheduleGroup(dayslot, newSlots);
  }

  function selectForDelete(slot_id, date) {
    setDaySlotDate(date);
    setSelectedSlotId(slot_id);
    setDeleteModal(true);
  }
  function selectForEdit(slot_id, date) {
    console.log(slot_id);
    console.log(date);

    setDaySlotDate(date);
    setSelectedSlotId(slot_id);
    setEditModal(true);
  }

  function deleteBtnHandler() {
    let dayslot = currentWeek.dayslots.find(
      (dayslot) => dayslot.date == daySlotDate
    );
    deleteSubjectSlot(dayslot, selectedSlotId);
    setDeleteModal(false);
  }

  function getSlot() {
    let dayslot = currentWeek?.dayslots?.find(
      (dayslot) => dayslot?.date == daySlotDate
    );
    return dayslot?.slots?.find((slot) => slot.id == selectedSlotId);
  }

  useEffect(() => {
    if (scheduleGroup.weeks.length < currentWeekNumber) {
      setCurrentWeek([]);
    }
    setCurrentWeek(scheduleGroup.weeks[currentWeekNumber - 1]);
  }, [currentWeekNumber, scheduleGroup]);

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
            maxWeeks={maxWeeks}
            number={currentWeekNumber}
            setNumber={setCurrentWeekNumber}
          />
          <WeekSlot week={currentWeek} />

          <Modal visible={editModal} setVisible={setEditModal}>
            <EditSlotForm
              slot={getSlot()}
              daySlotDate={daySlotDate}
              applyChanges={applyChanges}
              onCancel={(e) => {
                e.preventDefault();
                //
                setEditModal(false);
              }}
            />
          </Modal>
          <Modal visible={createModal} setVisible={setCreateModal}>
            <CreateSlotForm
              createSlot={createSubjectSlot}
              onCancel={(e) => {
                e.preventDefault();
                setSelectedSlotId(-1);
                setDaySlotDate(0);
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
