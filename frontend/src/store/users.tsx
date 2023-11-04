import { makeAutoObservable } from "mobx";
import { IUser } from "../models/users/users";

class UsersStore {
  private _user?: IUser;

  constructor() {
    makeAutoObservable(this);
  };

  set user(value: IUser | undefined) {
    this._user = value
  };

  get user(): IUser | undefined {
    return this._user;
  };

}

export default new UsersStore();
