import { makeAutoObservable } from "mobx";
import { ITest, ITestCategory } from "../models/tests/tests";

class TestsStore {
  private _selectedTest?: ITest;
  private _currentPage?: number;
  private _selectedTestCategory?: ITestCategory;
  private _search: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  set selectedTest(value: ITest | undefined) {
    this._selectedTest = value;
  }

  get selectedTest(): ITest | undefined {
    return this._selectedTest;
  }

  set currentPage(value: number | undefined) {
    this._currentPage = value;
  }

  get currentPage(): number | undefined {
    return this._currentPage;
  }

  set selectedTestCategory(value: ITestCategory | undefined) {
    this._selectedTestCategory = value;
    this._currentPage = undefined;
  }

  get selectedTestCategory(): ITestCategory | undefined {
    return this._selectedTestCategory;
  }

  set search(value: string) {
    this._search = value;
  }

  get search(): string {
    return this._search;
  }
}

export default new TestsStore();
