import axios from "axios";

export abstract class CommonService {
  protected baseURL = "http://127.0.0.1:8000";
  protected abstract url: string;

  delete<T>(id: number): Promise<T> {
    return axios.delete<T>(`${this.url}/${id}/`).then(
      (response) => {
        return response.data;
      },
      reason => Promise.reject(reason)
    );
  };

  
}
