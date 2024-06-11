import React, { useContext, useEffect, useState } from "react";
import { WeekSlotContext } from "../context/WeekSlotContext";
import WeekBar from "../components/WeekBar/WeekBar";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";
import ModalConfirm from "../components/UI/ModalConfirm/ModalConfirm";
import WeekSlot from "../components/WeekSlot/WeekSlot";
import CreateSlotForm from "../components/CreateSlotForm/CreateSlotForm";
import EditSlotForm from "../components/EditSlotForm/EditSlotForm";
import { ScheduleContext } from "../context/ScheduleContext";
import { observer } from "mobx-react-lite";
import currentScheduleStore from "../stores/currentScheduleStore";

// Страница с понедельным выводом расписания и возможностью управления слотами
const ScheduleByStore = observer(() => {
  const { scheduleParams, viewMode, findScheduleByGroup, findWeeksForTeacher } =
    useContext(ScheduleContext);
  const {
    currentWeekNumber,
    schedule,
    setSchedule,
    getCurrentWeek,
    getMaxWeeks,
    decrementWeekNumber,
    incrementWeekNumber,
    createSlot,
    deleteSlot,
    editSlot,
    getWeeks,
    setWeeks,
    getSlotById,
    setCurrentWeekNumber,
  } = currentScheduleStore;

  // отладка номера выбранной недели
  // autorun(() => {
  //   console.log(currentWeekNumber);
  // });

  // получение объектов текущей недели и максимального количества недель в расписании
  const currentWeek = getCurrentWeek();
  const maxWeeks = getMaxWeeks();

  // выбранные день-слот и ID пары-слота
  const [daySlotDate, setDaySlotDate] = useState(new Date());
  const [selectedSlotId, setSelectedSlotId] = useState(-1);

  // состояния модальных окон
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [title, setTitle] = useState("");

  function createBtnHandler(slot_id, dayslot_date, week_number) {
    createSlot(slot_id, dayslot_date, week_number);
    setDeleteModal(false);
  }
  function editBtnHandler(slot) {
    editSlot(slot, daySlotDate, currentWeek.number);
    setEditModal(false);
    clearSelectedItems();
  }
  function deleteBtnHandler() {
    deleteSlot(selectedSlotId, daySlotDate, currentWeek.number);
    setDeleteModal(false);
    clearSelectedItems();
  }
  function selectSlots(slot_id, dayslot_date) {
    setSelectedSlotId(slot_id);
    setDaySlotDate(dayslot_date);
  }
  function clearSelectedItems() {
    setSelectedSlotId(-1);
    setDaySlotDate(new Date());
  }

  // хук для загрузки уже существующего расписания по выбранным параметрам
  //  из глобального хранилища расписаний в состояние текущего расписания
  useEffect(() => {
    console.log(scheduleParams.mode);
  }, [scheduleParams]);

  return (
    <div className="container">
      <div className="page_title">
        {scheduleParams.mode === "group" ? (
          <div>Учебная группа {scheduleParams?.current.group}</div>
        ) : null}
        {scheduleParams.mode === "teacher" ? (
          <div>Преподаватель {scheduleParams?.teacher}</div>
        ) : null}
        {scheduleParams.mode === "auditorium" ? (
          <div>Аудитория{scheduleParams?.auditorium}</div>
        ) : null}
      </div>

      <div className="toolbar">
        <Button onClick={() => setCreateModal(true)}>Создать слот</Button>
      </div>

      <WeekSlotContext.Provider
        value={{
          maxWeeks,
          currentWeek,
          currentWeekNumber,
          selectedSlotId,
          daySlotDate,
          decrementWeekNumber,
          incrementWeekNumber,
          setDeleteModal,
          setEditModal,
          selectSlots,
          getSlotById,
          setCurrentWeekNumber,
        }}
      >
        <WeekBar />
        <WeekSlot week={currentWeek} />

        <Modal visible={deleteModal} setVisible={setDeleteModal}>
          <ModalConfirm
            onSubmit={deleteBtnHandler}
            onCancel={(e) => {
              e.preventDefault();
              clearSelectedItems();
              setDeleteModal(false);
            }}
          >
            Вы уверены, что хотите удалить слот?
          </ModalConfirm>
        </Modal>
        <Modal visible={createModal} setVisible={setCreateModal}>
          <CreateSlotForm
            onSubmit={createBtnHandler}
            onCancel={(e) => {
              e.preventDefault();
              setCreateModal(false);
            }}
          />
        </Modal>

        <Modal visible={editModal} setVisible={setEditModal}>
          <EditSlotForm
            onSubmit={editBtnHandler}
            onCancel={(e) => {
              e.preventDefault();
              clearSelectedItems();
              setEditModal(false);
            }}
          />
        </Modal>
      </WeekSlotContext.Provider>
    </div>
  );
});
export default ScheduleByStore;
