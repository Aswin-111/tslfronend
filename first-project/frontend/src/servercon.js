import axios from "axios";

const baseUrl = "https://reqres.in/api";

export default class ServerConnect {
  getAllUsers() {
    return axios.get(`${baseUrl}/users?page=2`);
  }
}
