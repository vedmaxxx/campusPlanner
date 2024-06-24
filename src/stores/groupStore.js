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

  get groupOptions() {
    return this._groups.map((item) => ({
      value: item.id,
      name: item.number,
    }));
  }

  getGroupNumberByID = (group_id) => {
    const group = this._groups.find((group) => group.id === group_id);
    return group;
  };

  fetchGroups = async () => {
    const groups = await GroupService.getAll();
    runInAction(() => {
      this._groups = groups;
    });
  };
}

export default new GroupStore();
