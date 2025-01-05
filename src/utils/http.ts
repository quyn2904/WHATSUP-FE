import axios, { AxiosError, AxiosInstance, HttpStatusCode } from "axios";
import { getTokenFromLS, setTokenToLS } from "./localStorage";
class Http {
  instance: AxiosInstance;
  private accessToken: string;
  constructor() {
    this.accessToken = getTokenFromLS().accessToken;
    this.instance = axios.create({
      baseURL: "http://localhost:8000/api/v1",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (`${url}`.includes("/login")) {
          const { user, token } = response.data.data;
          this.accessToken = token.access_token;
          setTokenToLS({
            accessToken: token.access_token,
            refreshToken: token.refresh_token
          });

          localStorage.setItem("profile", JSON.stringify(user));
        }
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          // call refresh token get new access token
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

interface SuccessResponse<T> {
  status_code: HttpStatusCode;
  message: string;
  is_success: boolean;
  reason: string;
  data: T;
}

interface SuccessResponseWithPagination<T>
  extends Omit<SuccessResponse<T>, "data"> {
  data: T[];
  pagination_meta: {
    search: string;
    sort: {
      field_name: string;
      order: "ASC" | "DESC";
    };
    total_pages: number;
    total_items: number;
    current_page: number;
    page_size: number;
  };
}

export default http;
export type { SuccessResponse, SuccessResponseWithPagination };
