import Axios from "axios";

export default class SubjectService {
  static async getAll() {
    const response = await Axios.get(`http://localhost:5000/api/subject/all`);
    return response.data;
  }
  static async getById(id) {
    const response = await Axios.get(`http://localhost:5000/api/subject/${id}`);

    return response.data;
  }
}
