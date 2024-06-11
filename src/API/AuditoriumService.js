import Axios from "axios";

export default class AuditoriumService {
  static async getAll() {
    try {
      const response = await Axios.get(
        `http://localhost:5000/api/auditorium/all`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  static async getById(id) {
    try {
      const response = await Axios.get(
        `http://localhost:5000/api/auditorium/${id}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
