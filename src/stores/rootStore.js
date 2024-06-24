import { makeAutoObservable } from "mobx";
import currentScheduleStore from "./currentScheduleStore";
import teacherStore from "./teacherStore";
import auditoriumStore from "./auditoriumStore";
import groupStore from "./groupStore";
import disciplineStore from "./disciplineStore";

class RootStore {
  scheduleStore = currentScheduleStore;
  teacherStore = teacherStore;
  auditoriumStore = auditoriumStore;
  groupStore = groupStore;
  disciplineStore = disciplineStore;

  constructor() {
    makeAutoObservable(this);
  }
}

export default RootStore;
