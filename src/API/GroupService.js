import Axios from "axios";

export default class GroupService {
  static async getAll() {
    const response = await Axios.get(`http://localhost:5000/api/group/all`);
    return response.data;
  }
  static async getById(id) {
    const response = await Axios.get(`http://localhost:5000/api/group/${id}`);
    return response.data;
  }
}
