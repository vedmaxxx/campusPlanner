import Axios from "axios";

export default class AuditoriumService {
  static async getAll() {
    try {
      const response = Axios.get(`https://localhost:7141/Auditorium/all`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
