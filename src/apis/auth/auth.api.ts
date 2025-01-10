import http from "../../utils/http";
import { LoginRequestType, RegisterRequestType } from "./auth-request.type";

const URL = "auth";

const authApi = {
  login(data: LoginRequestType) {
    return http.post(`${URL}/login`, data);
  },

  register(data: RegisterRequestType) {
    return http.post(`${URL}/register`, data);
  }
};

export default authApi;
