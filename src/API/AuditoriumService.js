import Axios from "axios";

export default class AuditoriumService {
  static async getAll() {
    const response = await Axios.get(
      `http://localhost:5000/api/auditorium/all`
    );
    return response.data;
  }
  static async getById(id) {
    const response = await Axios.get(
      `http://localhost:5000/api/auditorium/${id}`
    );

    return response.data;
  }
}
