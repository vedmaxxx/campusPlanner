import Axios from "axios";

export default class ChairService {
  static async getAll() {
    try {
      const response = await Axios.get(`http://localhost:5000/api/chair/all`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  static async getById(id) {
    try {
      const response = await Axios.get(`http://localhost:5000/api/chair/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
