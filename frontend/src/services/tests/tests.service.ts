import { CommonService } from "../common.service";
import axios from "axios";
import { IQuestion, ITest, ITestCategory, ITestEdit, ITestResult, IUserAnswer } from "../../models/tests/tests";
import { IPage } from "../../models/common";

class TestsService extends CommonService {
  protected url = `${this.baseURL}/api/tests`;

  /**
   * Получить список тестов
   */
  getTestsList(
    page = 1,
    params: { search?: string; categoryId?: number; author?: number; published?: boolean; pageSize?: number }
  ): Promise<IPage<ITest>> {
    return axios.get<IPage<ITest>>(`${this.url}/`, { params: { ...params, page } }).then(
      response => {
        return response.data;
      },
      reason => Promise.reject(reason)
    );
  }

  /**
   * Получить тест по id
   * @param id id теста
   */
  getTest(id: number): Promise<ITest> {
    return axios.get<ITest>(`${this.url}/${id}/`).then(
      response => response.data,
      reason => Promise.reject(reason)
    );
  }

  /**
   * Получает список ответов пользователя
   * @param testId id теста
   */
  getUserAnswersList(testId?: number): Promise<IUserAnswer[]> {
    return axios.get<IUserAnswer[]>(`${this.url}/user-answers/`, { params: { test_id: testId } }).then(
      response => response.data,
      reason => Promise.reject(reason)
    );
  }

  /**
   * Отправляет ответ пользователя на сервер
   */
  submitAnswer(answer: Omit<IUserAnswer, "id">): Promise<IUserAnswer[]> {
    return axios.post<IUserAnswer[]>(`${this.url}/user-answers/`, answer).then(
      response => response.data,
      reason => Promise.reject(reason)
    );
  }

  /**
   * Список всех категорий
   */
  getCategoriesList(): Promise<ITestCategory[]> {
    return axios.get<ITestCategory[]>(`${this.url}/category/`).then(
      response => response.data,
      reason => Promise.reject(reason)
    );
  }

  /**
   * Возвращает результаты по тесту
   */
  getTestResult(testId: number): Promise<ITestResult[]> {
    return axios.get<ITestResult[]>(`${this.url}/result/${testId}/`).then(
      response => response.data,
      reason => Promise.reject(reason)
    );
  }

  /**
   * Удаляет все результаты по тесты у пользователя
   */
  deleteTestResult(testId: number): Promise<{ message: string }> {
    return axios.delete<{ message: string }>(`${this.url}/result/${testId}/`).then(
      response => response.data,
      reason => Promise.reject(reason)
    );
  }

  /**
   * Изменяет тест
   */
  editTest(test: ITestEdit): Promise<ITestEdit> {
    return axios.put<ITestEdit>(`${this.url}/${test.id}/`, test).then(
      response => response.data,
      reason => Promise.reject(reason)
    );
  }

  /**
   * Изменяет картинку у теста
   */
  editImg(img: File, id: number): Promise<ITest> {
    return axios
      .patch<ITest>(`${this.url}/${id}/`, { img }, { headers: { "Content-Type": "multipart/form-data" } })
      .then(
        response => response.data,
        reason => Promise.reject(reason)
      );
  }

  /**
   * Создаёт тест
   */
  createTest(test: { title: string; description: string; author: number; category: number }): Promise<ITest> {
    return axios.post<ITest>(`${this.url}/`, test).then(
      response => response.data,
      reason => Promise.reject(reason)
    );
  }

  /**
   * Создаёт вопрос
   * @param testId id Теста
   * @param question Текст вопроса
   * @param options Варианты ответа
   * @param rightAnswer Правильный ответ
   */
  createQuestion(testId: number, question: string, options: string[], rightAnswer: string): Promise<IQuestion> {
    return axios
      .post<IQuestion>(`${this.url}/question/${testId}/`, { question, options, right_answer: rightAnswer })
      .then(
        response => response.data,
        reason => Promise.reject(reason)
      );
  }

  updateQuestion(
    testId: number,
    question: string,
    options: string[],
    rightAnswer: string,
    id: number
  ): Promise<IQuestion> {
    return axios
      .put<IQuestion>(`${this.url}/question/${testId}/`, {
        question,
        options,
        rightAnswer,
        id,
      })
      .then(
        response => response.data,
        reason => Promise.reject(reason)
      );
  }
}

export default new TestsService();
