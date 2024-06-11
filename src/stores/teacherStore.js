import { makeAutoObservable, runInAction } from "mobx";
import TeacherService from "../API/TeacherService";

class TeacherStore {
  _teachers = [];
  constructor() {
    makeAutoObservable(this);
  }

  get teachers() {
    return this._teachers;
  }

  fetchTeachers = async () => {
    const teachers = await TeacherService.getAll();
    runInAction(() => {
      this._teachers = teachers;
    });
  };
}

export default new TeacherStore();
