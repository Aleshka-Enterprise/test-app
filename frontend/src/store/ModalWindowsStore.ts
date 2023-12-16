import { makeAutoObservable } from "mobx";

class ModalWindowsStore {
  private _errorMessage?: string;
  private _successMessage?: string;

  constructor() {
    makeAutoObservable(this);
  }

  set errorMessage(value: string | undefined) {
    this._errorMessage = value;
  }

  get errorMessage(): string | undefined {
    return this._errorMessage;
  }

  set successMessage(value: string | undefined) {
    this._successMessage = value;
  }

  get successMessage(): string | undefined {
    return this._successMessage;
  }
}

export default new ModalWindowsStore();
