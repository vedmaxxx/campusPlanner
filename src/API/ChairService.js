import Axios from "axios";

export default class ChairService {
  static async getAll() {
    const response = await Axios.get(`http://localhost:5000/api/chair/all`);
    return response.data;
  }
  static async getById(id) {
    const response = await Axios.get(`http://localhost:5000/api/chair/${id}`);
    return response.data;
  }
}
