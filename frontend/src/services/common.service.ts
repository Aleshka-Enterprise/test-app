/**
 * Базовый класс для сервисов
 */
export abstract class CommonService {
  protected baseURL = "http://127.0.0.1:8000";
  protected abstract url: string;
}
