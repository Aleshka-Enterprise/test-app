import { CommonService } from "../common.service";
import axios from "axios";
import { ITest } from "../../models/tests/tests";
import { IPage } from "../../models/common";

class TestsService extends CommonService {
  protected url = `${this.baseURL}/api/tests`;

  /**
   * Получить список тестов
   */
  getTestsList(): Promise<IPage<ITest>> {
    return axios.get<IPage<ITest>>(`${this.url}/`).then(
      response => {
        return response.data;
      },
      reason => Promise.reject(reason)
    );
  };

  /**
   * Получить тест по id
   * @param id id теста
   */
  getTest(id: number): Promise<ITest> {
    return axios.get<ITest>(`${this.url}/${id}`).then(
        response => {
          return response.data;
        },
        reason => Promise.reject(reason)
      );
  }
}

export default new TestsService();
