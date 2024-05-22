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

// будет приходить объект с данными о группе, семестре, учебном плане и т.д.,
// по этому объекту потом будет GET-запрос на вытягивание расписания и работа с ним
const ScheduleByGroup = observer(() => {
  const { scheduleParams, viewMode, findScheduleByGroup } =
    useContext(ScheduleContext);
  const {
    currentWeek,
    currentWeekNumber,
    maxWeeks,
    schedule,
    setCurrentSchedule,
    decrementWeekNumber,
    incrementWeekNumber,
    createSlot,
    deleteSlot,
    editSlot,
    getSlotById,
  } = currentScheduleStore;

  // setCurrentSchedule({ ...schedule, group: scheduleParams.group });
  // console.log(first);
  // выбранные день-слот и ID пары-слота
  const [daySlotDate, setDaySlotDate] = useState(new Date());
  const [selectedSlotId, setSelectedSlotId] = useState(-1);
  console.log(schedule);

  // // состояния модальных окон
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

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
  function saveBtnHandler(e) {
    e.preventDefault();
  }

  useEffect(() => {
    const sched = findScheduleByGroup(scheduleParams.group, 2, 1);
    console.log(sched);
    if (sched) setCurrentSchedule(sched);
  }, [scheduleParams, viewMode, schedule]);

  return (
    <div className="container">
      <div className="page_title">
        {viewMode === "group" ? (
          <div>Учебная группа {scheduleParams?.group}</div>
        ) : null}
        {viewMode === "teacher" ? (
          <div>Преподаватель {scheduleParams?.teacher}</div>
        ) : null}
        {viewMode === "auditorium" ? (
          <div>Аудитория {scheduleParams?.auditorium}</div>
        ) : null}
      </div>

      <div className="toolbar">
        <Button onClick={() => setCreateModal(true)}>Создать слот</Button>
        <Button onClick={saveBtnHandler}>Сохранить расписание</Button>
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
export default ScheduleByGroup;
