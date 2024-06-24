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

  get auditoriumOptions() {
    return this._auditoriums.map((item) => ({
      value: item.id,
      name: item.number,
    }));
  }

  getAuditoriumByID = (aud_id) => {
    const auditorium = this._auditoriums.find((aud) => aud.id === aud_id);
    return auditorium;
  };

  fetchAuditoriums = async () => {
    const auditoriums = await AuditoriumService.getAll();
    runInAction(() => {
      this._auditoriums = auditoriums;
    });
  };
}

export default new AuditoriumStore();
