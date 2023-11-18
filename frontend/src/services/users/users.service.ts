import { CommonService } from "../common.service";
import axios from "axios";
import { IToken, IUser } from "../../models/users/users";
import { PartialBy, logout } from "../../utils/utils";
import UsersStore from "../../store/users";

type IUserRegisteration = PartialBy<IUser, "id">;

class UsersService extends CommonService {
  protected url = `${this.baseURL}/api/user`;

  /**
   * Авторизация. После авторизации заносит токин пользователя в localStorage
   * @returns Token
   */
  autorization(data: { username: string; password: string }): Promise<IToken> {
    return axios.post<IToken>(`${this.url}/autorization/`, data).then(
      response => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        axios.defaults.headers.common = { Authorization: `Token ${token}` };
        return response.data;
      },
      reason => Promise.reject(reason)
    );
  }

  /**
   * Получить текущего пользователя
   */
  getCurrentUser(): Promise<IUser> {
    return axios.get<IUser>(`${this.url}/get_current_user/`).then(
      response => {
        const data = response.data;
        UsersStore.user = data;
        return response.data;
      },
      reason => {
        logout();
        return Promise.reject(reason);
      }
    );
  }

  /**
   * выходит из пользователя и удаляет токен из localStorage
   */
  logout(): Promise<void> {
    return axios.get<void>(`${this.url}/logout/`).then(
      () => {
        localStorage.removeItem("token");
        delete axios.defaults.headers?.common.Authorization;
        UsersStore.user = undefined;
      },
      reason => Promise.reject(reason)
    );
  }

  /**
   * Регистрация пользователя
   */
  registration(data: IUserRegisteration): Promise<IUserRegisteration> {
    return axios.post<IUserRegisteration>(`${this.url}/registration/`, data).then(
      response => {
        return response.data;
      },
      reason => Promise.reject(reason)
    );
  }

  /**
   * Получить поьзователя по id
   * @param id пользователя
   */
  getUser(id: number): Promise<IUser> {
    return axios.get<IUser>(`${this.url}/${id}/`).then(
      response => response.data,
      reason => Promise.reject(reason)
    );
  }
}

export default new UsersService();
