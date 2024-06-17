import { makeAutoObservable, runInAction } from "mobx";
import AuditoriumService from "../API/AuditoriumService";

class AuditoriumStore {
  _auditoriums = [];
  constructor() {
    makeAutoObservable(this);
  }

  get auditoriums() {
    return this._auditoriums;
  }

  fetchAuditoriums = async () => {
    const auditoriums = await AuditoriumService.getAll();
    runInAction(() => {
      this._auditoriums = auditoriums;
      console.log(this._auditoriums);
    });
  };
}

export default new AuditoriumStore();
