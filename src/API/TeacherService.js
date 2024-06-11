import Axios from "axios";

export default class TeacherService {
  static async getAll() {
    try {
      const response = await Axios.get(`http://localhost:5000/api/teacher/all`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  static async getById(id) {
    try {
      const response = await Axios.get(
        `http://localhost:5000/api/teacher/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
