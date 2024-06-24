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
import { generateWeeks } from "../utils/calendarInfo";

import GroupService from "../API/GroupService";
import TeacherService from "../API/TeacherService";
import AuditoriumService from "../API/AuditoriumService";
import { useFetching } from "../hooks/useFetching";
import ScheduleService from "../API/ScheduleService";
import mapScheduleToAPIFormat from "../utils/mapper";
import { useStores } from "../context/RootStoreContext";

// Страница с понедельным выводом расписания и возможностью управления слотами
const ScheduleByStore = observer(() => {
  // параметры выбранного расписания

  const scheduleParams = JSON.parse(localStorage.getItem("scheduleParams"));
  const { scheduleOptions, mode } = scheduleParams;

  const {
    scheduleStore: {
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
      scheduleWeeksIsEmpty,
    },
    teacherStore: { fetchTeachers, getTeacherFullNameByID, teacherOptions },
    auditoriumStore: { fetchAuditoriums, getAuditoriumByID, auditoriumOptions },
    groupStore: { fetchGroups, getGroupNumberByID, groupOptions },
    disciplineStore: { fetchDisciplines, getDisciplineByID, disciplineOptions },
  } = useStores();

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

    setSchedule(newSchedule);
  }

  const SERVICES = {
    group: GroupService,
    teacher: TeacherService,
    auditorium: AuditoriumService,
  };

  const collisionsAlert = (response) => {
    switch (response.reason) {
      case "teacher":
        alert(
          `Найдено пересечение в занятиях у преподавателя ${getTeacherFullNameByID(
            response.teacherId
          )} на дату ${response.date}, ${response.classNumber} пара`
        );
        break;
      case "group":
        alert(
          `Найдено пересечение в занятиях у группы ${
            getGroupNumberByID(response.groupId).number
          } на дату ${response.date}, ${response.classNumber} пара`
        );
        break;
      case "auditorium":
        alert(
          `Найдено пересечение в занятиях у аудитории ${getAuditoriumByID(
            response.auditoriumId
          )} на дату ${response.date}, ${response.classNumber} пара`
        );
        break;
      default:
        break;
    }
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
      // если запрос
      .catch((error) => {
        const response = error.response.data;
        console.log(response);
        if (response.reason !== undefined) {
          collisionsAlert(response);
        } else {
          alert(
            "Не удалось сохранить. Возможно, вы неверно заполнили расписание. Проверьте."
          );
        }
      });
    return res;
  };

  const scheduleIsEmpty = (schedule) => {
    for (const week of schedule.weeks) {
      for (const dayslot of week.dayslots) {
        // нашли хотя бы один непустой слот
        if (dayslot.slots.length !== 0) {
          return false;
        }
      }
    }
    return true;
  };

  const saveSchedule = async () => {
    const isEmpty = scheduleIsEmpty(schedule);
    if (isEmpty) {
      alert("Нельзя сохранять расписание без слотов!");
      return;
    }

    const newSchedule = mapScheduleToAPIFormat(schedule, scheduleOptions);
    console.log("Новое расписание: ", newSchedule);

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

  // загрузка данных с сервера
  useEffect(() => {
    fetchTeachers();
    fetchAuditoriums();
    fetchGroups();
    fetchDisciplines();
    fetchTitle();
    setSchedule({});
    console.log("Текущее расписание: ", schedule);
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
            disabled={scheduleWeeksIsEmpty}
            onClick={() => setCreateModal(true)}
          >
            Создать слот
          </Button>
          <Button
            disabled={scheduleWeeksIsEmpty}
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
          getTeacherFullNameByID,
          getGroupNumberByID,
          getAuditoriumByID,
          getDisciplineByID,
          disciplineOptions,
          groupOptions,
          auditoriumOptions,
          teacherOptions,
        }}
      >
        {!scheduleWeeksIsEmpty ? (
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
