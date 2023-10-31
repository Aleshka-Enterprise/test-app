import { CommonService } from "../common.service";
import axios from "axios";
import { IToken, IUser } from "../../models/users/users";
import { PartialBy, converCase } from "../../utils/utils";

type IUserRegisteration = PartialBy<IUser, 'id'>

class UsersService extends CommonService {
  protected url = `${this.baseURL}/api/user`;

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
  };

  getCurrentUser(): Promise<IUser> {
    return axios.get<IUser>(`${this.url}/get_current_user/`).then(
      response => {
        const data = converCase(response.data, "camel") as IUser;
        return response.data;
      },
      reason => Promise.reject(reason)
    );
  };

  logout(): Promise<void> {
    return axios.get<void>(`${this.url}/logout/`).then(
      () => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
      },
      reason => Promise.reject(reason)
    );
  };

  registration(data: IUserRegisteration): Promise<IUserRegisteration> {
    return axios.post<IUserRegisteration>(`${this.url}/registration/`, converCase(data, "snake")).then(
      (response) => {
        return converCase(response.data, "camel") as IUser;
      },
      reason => Promise.reject(reason)
    )
  };

  getUser(id: number): Promise<IUser> {
    return axios.get<IUser>(`${this.url}/${id}/`).then(
      (response) => {
        return converCase(response.data, "camel") as IUser;
      },
      reason => Promise.reject(reason)
    )
  }

  putUser(user: IUser): Promise<IUser> {
    return axios.put<IUser>(`${this.url}/${user.id}/`, converCase(user, "snake"), { headers: { 'Content-Type': 'multipart/form-data' } }).then(
      (response) => {
        return converCase(response.data, "camel") as IUser;
      },
      reason => Promise.reject(reason)
    )
  }
}

export default new UsersService();
