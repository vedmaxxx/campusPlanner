import Axios from "axios";

export default class ScheduleService {
  static async getAll() {
    const response = await Axios.get(`http://localhost:5000/api/schedule/all`);
    return response.data;
  }
  static async getById(id) {
    const response = await Axios.get(
      `http://localhost:5000/api/schedule/${id}`
    );
    return response.data;
  }
  static async post(schedule) {
    const response = await Axios.post(
      `http://localhost:5000/api/schedule/`,
      schedule
    );
    return response.data;
  }
}
