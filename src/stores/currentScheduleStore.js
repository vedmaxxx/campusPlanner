import { makeAutoObservable } from "mobx";

// Начальное состояние расписания
const initSchedule = {};

// Хранилище состояния текущего расписания
class CurrentScheduleStore {
  _schedule = {};
  currentWeekNumber = 1;

  constructor() {
    makeAutoObservable(this);

    this._schedule = initSchedule;
  }

  get schedule() {
    return this._schedule;
  }

  get scheduleWeeksIsEmpty() {
    console.log(Object.keys(this._schedule).length === 0 ? true : false);
    return Object.keys(this._schedule).length === 0 ? true : false;
  }

  setSchedule = (schedule) => {
    this._schedule = schedule;
  };

  getWeeks = () => {
    return this._schedule.weeks;
  };
  setWeeks = (weeks) => {
    this._schedule.weeks = weeks;
  };
  getCurrentWeek = () => {
    return this.getWeekByNumber(this.currentWeekNumber);
  };
  getMaxWeeks = () => {
    return this._schedule.weeksNumber;
  };

  incrementWeekNumber = () => {
    this.currentWeekNumber += 1;
  };
  decrementWeekNumber = () => {
    this.currentWeekNumber -= 1;
  };
  setCurrentWeekNumber = (number) => {
    this.currentWeekNumber = number;
  };

  // применение изменений в состоянии текущего расписания
  handleSlotsChanges = (slots, dayslot, week) => {
    const newDaySlot = { ...dayslot, slots: slots };
    const newDaySlots = week.dayslots.map((ds) => {
      if (ds.id === newDaySlot.id) {
        return newDaySlot;
      } else return ds;
    });
    const newCurrentWeek = { ...week, dayslots: newDaySlots };
    const newWeeks = this._schedule.weeks.map((wk) =>
      wk.number === week.number ? newCurrentWeek : wk
    );
    const newSchedule = { ...this._schedule, weeks: newWeeks };

    this._schedule = newSchedule;
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
    const week = this.getWeekByNumber(week_number);
    const dayslot = this.getDayslotByDate(dayslot_date, week);

    const slots = dayslot.slots.map((sl) => (sl.id === slot.id ? slot : sl));

    this.handleSlotsChanges(slots, dayslot, week);
  };

  // получение объекта слота по его ID, дате, номеру недели
  getSlotById = (slot_id, dayslot_date, week_number) => {
    const week = this.getWeekByNumber(week_number);
    const dayslot = this.getDayslotByDate(dayslot_date, week);
    return dayslot?.slots?.find((slot) => slot.id === slot_id);
  };
  // получение объекта недели по его номеру недели
  getWeekByNumber = (week_number) => {
    const week = this._schedule?.weeks?.find(
      (week) => week.number === week_number
    );
    if (week === undefined) return {};
    return week;
  };
  // получение объекта дневного слота по его дате
  getDayslotByDate = (dayslot_date, week) => {
    const dayslot = week?.dayslots?.find(
      (day) => day?.date?.getTime() === dayslot_date?.getTime()
    );
    return dayslot;
  };
}

export default new CurrentScheduleStore();
