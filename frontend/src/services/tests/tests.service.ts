import { CommonService } from "../common.service";
import axios from "axios";
import { ITest, ITestCategory, IUserAnswer } from "../../models/tests/tests";
import { IPage } from "../../models/common";
import { converCase } from "../../utils/utils";

class TestsService extends CommonService {
  protected url = `${this.baseURL}/api/tests`;

  /**
   * Получить список тестов
   */
  getTestsList(page: number, search?: string, categoryId?: number): Promise<IPage<ITest>> {
    return axios.get<IPage<ITest>>(`${this.url}/`, { params: { page, search, category_id: categoryId } }).then(
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
    return axios.get<ITest>(`${this.url}/${id}/`).then(
      response => response.data,
      reason => Promise.reject(reason)
    );
  };

  /**
   * Получает список ответов пользователя
   * @param testId id теста
   */
  getUserAnswersList(testId?: number): Promise<IUserAnswer[]> {
    return axios.get<IUserAnswer[]>(`${this.url}/user-answers/`, { params: { test_id: testId } }).then(
      response => converCase(response.data, "camel") as IUserAnswer[],
      reason => Promise.reject(reason)
    );
  };

  /**
   * Отправляет ответ пользователя на сервер
   */
  submitAnswer(answer: Omit<IUserAnswer, "id">): Promise<IUserAnswer[]> {
    return axios.post<IUserAnswer[]>(`${this.url}/user-answers/`, converCase(answer, "snake")).then(
      response => converCase(response.data, "camel") as IUserAnswer[],
      reason => Promise.reject(reason)
    );
  };

  /**
   * Список всех категорий
   */
  getCategoriesList() {
    return axios.get<ITestCategory[]>(`${this.url}/category/`).then(
      response => converCase(response.data, "camel") as ITestCategory[],
      reason => Promise.reject(reason)
    );
  };
};

export default new TestsService();
