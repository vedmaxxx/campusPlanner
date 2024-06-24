import { makeAutoObservable, runInAction } from "mobx";
import SubjectService from "../API/SubjectService";

class DisciplineStore {
  _disciplines = [];
  constructor() {
    makeAutoObservable(this);
  }

  get disciplines() {
    return this._disciplines;
  }

  get disciplineOptions() {
    return this._disciplines.map((item) => ({
      value: item.id,
      name: item.title,
    }));
  }

  getDisciplineByID = (aud_id) => {
    const auditorium = this._disciplines.find((aud) => aud.id === aud_id);
    return auditorium;
  };

  fetchDisciplines = async () => {
    const disciplines = await SubjectService.getAll();
    runInAction(() => {
      this._disciplines = disciplines;
    });
  };
}

export default new DisciplineStore();
