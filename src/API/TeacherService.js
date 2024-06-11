import Axios from "axios";

export default class TeacherService {
  static async getAll() {
    const response = await Axios.get(`http://localhost:5000/api/teacher/all`);
    return response.data;
  }
  static async getById(id) {
    const response = await Axios.get(`http://localhost:5000/api/teacher/${id}`);
    return response.data;
  }
}
