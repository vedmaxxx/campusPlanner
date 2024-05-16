import React, { useEffect, useState } from "react";
import { WeekSlotContext } from "../context/WeekSlotContext";
import Button from "../components/UI/Button/Button";
import WeekBar from "../components/WeekBar/WeekBar";
import WeekSlot from "../components/WeekSlot/WeekSlot";
import Modal from "../components/UI/Modal/Modal";
import EditSlotForm from "../components/EditSlotForm/EditSlotForm";
import CreateSlotForm from "../components/CreateSlotForm/CreateSlotForm";
import ModalConfirm from "../components/UI/ModalConfirm/ModalConfirm";

const ScheduleByTeacher = () => {
  const [schedule, setSchedule] = useState({
    id: Date.now(),
    semester: 1,
    teacher: "Иванов И.И.",
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

  // выбранные день-слот и ID пары-слота
  const [daySlotDate, setDaySlotDate] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(-1);

  // состояния модальных окон
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
      week.number === currentWeekNumber ? newCurrentWeek : week
    );
    const newSchedule = { ...schedule, weeks: newWeeks };
    setSchedule(newSchedule);
  }

  // обработчик создания слота-пары
  function handleCreateSlot(dayslot, slot) {
    const newSlots = [...dayslot?.slots, slot];
    handleSlotsChanges(dayslot, newSlots);
  }
  // обработчик удаления слота-пары
  function handleDeleteSlot(dayslot, slot_id) {
    const newSlots = dayslot.slots.filter((sl) => sl.id !== slot_id);
    handleSlotsChanges(dayslot, newSlots);
  }
  // обработчик изменения слота-пары
  function handleEditSlot(dayslot, slot) {
    const newSlots = dayslot.slots.map((sl) => (sl.id === slot.id ? slot : sl));
    handleSlotsChanges(dayslot, newSlots);
  }

  // запоминаем слот и на какой день нужно удалить, открываем окно удаления
  function selectForDelete(slot_id, date) {
    setDaySlotDate(date);
    setSelectedSlotId(slot_id);
    setDeleteModal(true);
  }
  // запоминаем слот и на какой день нужно изменить, открываем окно редактирования
  function selectForEdit(slot_id, date) {
    setDaySlotDate(date);
    setSelectedSlotId(slot_id);
    setEditModal(true);
  }

  // обработчик нажатия на кнопку удаления слота-пары
  function deleteBtnHandler() {
    let dayslot = currentWeek.dayslots.find(
      (dayslot) => dayslot.date === daySlotDate
    );
    handleDeleteSlot(dayslot, selectedSlotId);
    setDeleteModal(false);
  }

  // функция получения объекта по ID выбранного слота-пары
  function getSelectedSlot() {
    let dayslot = currentWeek?.dayslots?.find(
      (dayslot) => dayslot?.date === daySlotDate
    );
    return dayslot?.slots?.find((slot) => slot.id === selectedSlotId);
  }

  // очистка выбранных слота-дня и слота-пары
  function clearSelectedItems() {
    setSelectedSlotId(-1);
    setDaySlotDate(null);
  }

  useEffect(() => {
    if (schedule.weeks.length < currentWeekNumber) {
      setCurrentWeek([]);
    }
    setCurrentWeek(schedule.weeks[currentWeekNumber - 1]);
  }, [currentWeekNumber, schedule]);

  return (
    <>
      <div className="container">
        <Button onClick={() => setCreateModal(true)}>Создать слот</Button>

        <WeekSlotContext.Provider
          value={{
            viewMode: "teacher",
            week: currentWeek,
            daySlotDate,
            selectForDelete,
            selectForEdit,
          }}
        >
          <div className="group_title">Преподаватель {schedule.teacher}</div>
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
              handleCreateSlot={handleCreateSlot}
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

export default ScheduleByTeacher;
