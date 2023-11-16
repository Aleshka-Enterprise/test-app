import axios, { InternalAxiosRequestConfig } from "axios";

export const REQUIRED_FIELD_ERROR = "Поле не заполнено!";

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const logout = (): void => {
  localStorage.removeItem("token");
  axios.interceptors.request.use(
    config => ({ ...config, headers: { ...config.headers, Authorization: undefined } } as InternalAxiosRequestConfig),
    error => {
      return Promise.reject(error);
    }
  );
};
