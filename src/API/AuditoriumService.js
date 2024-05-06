import Axios from "axios";

export default class AuditoriumService {
  static async getAll() {
    try {
      const response = Axios.get(`http://localhost:5013/Auditorium/all`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
