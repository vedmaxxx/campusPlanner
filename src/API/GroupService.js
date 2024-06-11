import Axios from "axios";

export default class GroupService {
  static async getAll() {
    try {
      const response = await Axios.get(`http://localhost:5000/api/group/all`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  static async getById(id) {
    try {
      const response = await Axios.get(`http://localhost:5000/api/group/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
