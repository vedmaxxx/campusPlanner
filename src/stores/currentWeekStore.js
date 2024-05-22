import { makeAutoObservable } from "mobx";

class CurrentWeekStore {
  currentWeek = {};

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentWeek(week) {
    this.currentWeek = week;
  }
}
