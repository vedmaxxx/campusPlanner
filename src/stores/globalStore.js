import { makeAutoObservable } from "mobx";
import currentScheduleStore from "./currentScheduleStore";

class GlobalStore {
  _currentScheduleStore = currentScheduleStore;
  constructor() {
    makeAutoObservable(this);
  }
}

export default new GlobalStore();
