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

  get teacherOptions() {
    return this._teachers.map((item) => ({
      value: item.id,
      name: this.getTeacherFullNameByID(item.id),
    }));
  }

  fetchTeachers = async () => {
    const teachers = await TeacherService.getAll();
    runInAction(() => {
      this._teachers = teachers;
    });
  };

  getTeacherFullNameByID = (teacher_id) => {
    const teacher = this._teachers.find((teacher) => teacher.id === teacher_id);
    return (
      teacher.surname +
      " " +
      teacher.name[0] +
      "." +
      teacher.patronymic[0] +
      "."
    );
  };
}

export default new TeacherStore();
