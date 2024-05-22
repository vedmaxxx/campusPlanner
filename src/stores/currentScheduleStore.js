import { makeAutoObservable } from "mobx";
import {
  generateWeeks,
  insertWeeksInEmptySlots,
} from "../components/utils/calendarInfo";

class CurrentScheduleStore {
  schedule = {};
  currentWeekNumber = 1;
  currentWeek = {};
  maxWeeks = 0;

  constructor() {
    makeAutoObservable(this);

    this.schedule = {
      id: Date.now(),
      curricilium: 1,
      semester: 2,
      group: "",
      weeksNumber: 21,
    };
    this.maxWeeks = this.schedule.weeksNumber;

    const emptyWeeks = generateWeeks(
      this.schedule.semester,
      this.schedule.weeksNumber
    );
    this.schedule.weeks = emptyWeeks;
    this.currentWeek = this.schedule.weeks[0];
  }

  setCurrentSchedule = (schedule) => {
    // если пришло расписание без недель - заполняем пустыми неделями
    const weeks = insertWeeksInEmptySlots(schedule);
    console.log(weeks);
    this.schedule.weeks = weeks;
  };

  incrementWeekNumber = () => {
    this.currentWeekNumber += 1;
    const newWeek = this.schedule?.weeks?.find(
      (week) => week.number === this.currentWeekNumber
    );
    if (newWeek === undefined) this.currentWeek = {};
    this.currentWeek = newWeek;
  };
  decrementWeekNumber = () => {
    this.currentWeekNumber -= 1;
    this.currentWeek = this.schedule?.weeks?.find(
      (week) => week.number === this.currentWeekNumber
    );
  };

  handleSlotsChanges = (slots, dayslot, week) => {
    const newDaySlot = { ...dayslot, slots: slots };
    const newDaySlots = week.dayslots.map((ds) => {
      if (ds.id === newDaySlot.id) {
        return newDaySlot;
      } else return ds;
    });
    const newCurrentWeek = { ...week, dayslots: newDaySlots };
    const newWeeks = this.schedule.weeks.map((wk) =>
      wk.number === week.number ? newCurrentWeek : wk
    );
    const newSchedule = { ...this.schedule, weeks: newWeeks };

    this.schedule = newSchedule;
    this.currentWeek = newCurrentWeek;
  };

  getSlotById = (slot_id, dayslot_date, week_number) => {
    const week = this.getWeekByNumber(week_number);
    const dayslot = this.getDayslotByDate(dayslot_date, week);
    return dayslot?.slots?.find((slot) => slot.id === slot_id);
  };
  deleteSlot = (slot_id, dayslot_date, week_number) => {
    const week = this.getWeekByNumber(week_number);
    const dayslot = this.getDayslotByDate(dayslot_date, week);

    const slots = dayslot.slots.filter((sl) => sl.id !== slot_id);

    this.handleSlotsChanges(slots, dayslot, week);
  };
  createSlot = (slot, dayslot_date, week_number) => {
    const week = this.getWeekByNumber(week_number);
    const dayslot = this.getDayslotByDate(dayslot_date, week);

    const slots = [...dayslot?.slots, slot];
    this.handleSlotsChanges(slots, dayslot, week);
  };
  editSlot = (slot, dayslot_date, week_number) => {
    console.log(slot);
    const week = this.getWeekByNumber(week_number);
    const dayslot = this.getDayslotByDate(dayslot_date, week);

    const slots = dayslot.slots.map((sl) => (sl.id === slot.id ? slot : sl));

    this.handleSlotsChanges(slots, dayslot, week);
  };

  getWeekByNumber = (week_number) => {
    const week = this.schedule?.weeks?.find(
      (week) => week.number === week_number
    );
    return week;
  };
  getDayslotByDate = (dayslot_date, week) => {
    const dayslot = week?.dayslots.find(
      (day) => day?.date.getTime() === dayslot_date.getTime()
    );
    return dayslot;
  };
}

export default new CurrentScheduleStore();
