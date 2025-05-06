import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { baseURL, urls } from "@/constants/urls";
import { authService } from "@/services/authService";

let isRefreshing = false;
type IWaitList = () => void;
const waitList: IWaitList[] = [];

const apiService = axios.create({ headers: { "Content-Type": "application/json" }, withCredentials: true, baseURL });

apiService.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig | null;

    if (error?.response?.status === 401) {
      // console.log(error?.response?.status);
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await authService.refresh();
          isRefreshing = false;
          runAfterRefresh();
          if (originalRequest) {
            return apiService(originalRequest);
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          isRefreshing = false;

          return Promise.reject(error);
        }
      }

      if (originalRequest?.url === urls.auth.refresh) {
        return Promise.reject(error);
      }

      return new Promise((resolve) => {
        subscribeToWaitList(() => {
          if (originalRequest) {
            resolve(apiService(originalRequest));
          }
        });
      });
    }
    return Promise.reject(error);
  }
);

const subscribeToWaitList = (cb: IWaitList): void => {
  waitList.push(cb);
};

const runAfterRefresh = (): void => {
  while (waitList.length > 0) {
    // Перевірка, чи масив не порожній
    const cb = waitList.shift(); // Використовуємо shift для видалення першого елемента
    if (cb) {
      // Перевірка, чи cb не є undefined
      cb();
    }
  }
};

export { apiService };
