import { makeAutoObservable } from "mobx";

class ErrorsStore {
  private _errorMessage?: string;

  constructor() {
    makeAutoObservable(this);
  }

  set errorMessage(value: string | undefined) {
    this._errorMessage = value;
  }

  get errorMessage(): string | undefined {
    return this._errorMessage;
  }
}

export default new ErrorsStore();
