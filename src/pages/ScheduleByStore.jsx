import React, { useContext, useEffect, useState } from "react";
import { WeekSlotContext } from "../context/WeekSlotContext";
import WeekBar from "../components/WeekBar/WeekBar";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";
import ModalConfirm from "../components/UI/ModalConfirm/ModalConfirm";
import WeekSlot from "../components/WeekSlot/WeekSlot";
import CreateSlotForm from "../components/CreateSlotForm/CreateSlotForm";
import EditSlotForm from "../components/EditSlotForm/EditSlotForm";
import { observer } from "mobx-react-lite";
import currentScheduleStore from "../stores/currentScheduleStore";
import { generateWeeks } from "../utils/calendarInfo";

import GroupService from "../API/GroupService";
import TeacherService from "../API/TeacherService";
import AuditoriumService from "../API/AuditoriumService";
import { useFetching } from "../hooks/useFetching";
import ScheduleService from "../API/ScheduleService";
import mapScheduleToAPIFormat from "../utils/mapper";

// Страница с понедельным выводом расписания и возможностью управления слотами
const ScheduleByStore = observer(() => {
  // const { scheduleParams } = useContext(ScheduleContext);
  // параметры выбранного расписания

  const scheduleParams = JSON.parse(localStorage.getItem("scheduleParams"));
  const { scheduleOptions, mode } = scheduleParams;

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
    getSlotById,
    setCurrentWeekNumber,
  } = currentScheduleStore;

  const [title, setTitle] = useState("");

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

  const [scheduleIsFound, setScheduleIsFound] = useState(false);

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

  function createSchedule() {
    // здесь в будущем вторым параметром нужно узнавать кол-во недель из Curriculum
    const emptyWeeks = generateWeeks(scheduleOptions.semester, 21);

    const newSchedule = {
      id: crypto.randomUUID(),
      curriculum: scheduleOptions.curriculum,
      semester: scheduleOptions.semester,
      weeksNumber: 21,
      [mode]: scheduleOptions[mode],
      weeks: emptyWeeks,
    };
    setScheduleIsFound(true);
    setSchedule(newSchedule);
  }

  // в зависимости от режима будем грузить
  // fetch(Группы/Аудитории/Преподаватели, виды занятий, дисциплины)
  // ЗДЕСЬ ДОЛЖНА БЫТЬ ЗАГРУЗКА СУЩЕСТВУЮЩЕГО РАСПИСАНИЯ

  const SERVICES = {
    group: GroupService,
    teacher: TeacherService,
    auditorium: AuditoriumService,
  };

  // переписать на человеческий?
  const fetchSaveSchedule = async (newSchedule) => {
    let res;
    await ScheduleService.post(newSchedule)
      // если запрос корректен
      .then((response) => {
        res = response;
        alert(res.message);
      })
      // если запрос некорректен
      .catch((error) => {
        console.log(error);
        alert(
          "Не удалось сохранить. Возможно, вы неверно заполнили расписание. Проверьте."
        );
      });
    return res;
  };

  const fetchData = async () => {};

  const saveSchedule = async () => {
    // mapper на объект для API RDF-ки
    const newSchedule = mapScheduleToAPIFormat(schedule, scheduleOptions);

    console.log(newSchedule);
    const res = await fetchSaveSchedule(newSchedule);
    console.log(res);
  };

  const [fetchTitle, isTitleLoading, titleError] = useFetching(async () => {
    const res = await SERVICES[mode].getById(scheduleOptions[mode]);
    if (mode === "teacher") {
      setTitle(res.surname + " " + res.name + " " + res.patronymic);
      return;
    }
    setTitle(res.number);
  });

  useEffect(() => {
    setSchedule({});
    // загрузка тайтла
    fetchTitle();
    console.log(schedule);
  }, []);

  return (
    <div className="container">
      {mode ? (
        <>
          <div>{scheduleOptions.semester} cеместр</div>
          <div>Учебный план - {scheduleOptions.curriculum}</div>
          <div>Факультет {scheduleOptions.faculty}</div>
          <div>Кафедра {scheduleOptions.department}</div>
        </>
      ) : null}
      {mode === "group" ? (
        <div className="page_title">Учебная группа {title}</div>
      ) : null}
      {mode === "teacher" ? (
        <div className="page_title">Преподаватель {title}</div>
      ) : null}
      {mode === "auditorium" ? (
        <div className="page_title">Аудитория {title}</div>
      ) : null}

      {mode ? (
        <div className="toolbar">
          <Button
            disabled={!scheduleIsFound ? true : false}
            onClick={() => setCreateModal(true)}
          >
            Создать слот
          </Button>
          <Button
            disabled={
              Object.keys(schedule).length === 0 || schedule.weeks === undefined
            }
            onClick={() => saveSchedule()}
          >
            Сохранить расписание
          </Button>
        </div>
      ) : null}

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
        {scheduleIsFound ? (
          <>
            <WeekBar />
            <WeekSlot week={currentWeek} />
          </>
        ) : (
          <div className="schedule_not_found">
            <h2>Расписание не найдено</h2>
            <p>Желаете создать новое расписание для этих параметров?</p>
            <Button onClick={createSchedule}>Создать</Button>
          </div>
        )}

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
