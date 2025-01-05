import http from "../../utils/http";
import { LoginRequestType } from "./auth-request.type";

const URL = "auth";

const authApi = {
  login(data: LoginRequestType) {
    return http.post(`${URL}/login`, data);
  }
};

export default authApi;
