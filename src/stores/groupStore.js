import { makeAutoObservable, runInAction } from "mobx";
import GroupService from "../API/GroupService";

class GroupStore {
  _groups = [];
  constructor() {
    makeAutoObservable(this);
  }

  get groups() {
    return this._groups;
  }

  fetchGroups = async () => {
    const groups = await GroupService.getAll();
    runInAction(() => {
      this._groups = groups;
    });
  };
}

export default new GroupStore();
