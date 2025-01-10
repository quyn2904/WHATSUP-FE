import http from "../../utils/http";
import { LoginRequestType, RegisterRequestType } from "./auth-req.type";
import { LoginResponseType } from "./auth-res.type";

const URL = "auth";

const authApi = {
  login(data: LoginRequestType) {
    return http.post<LoginResponseType>(`${URL}/login`, data);
  },

  register(data: RegisterRequestType) {
    return http.post(`${URL}/register`, data);
  }
};

export default authApi;
