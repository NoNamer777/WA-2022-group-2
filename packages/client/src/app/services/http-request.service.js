import axios from 'axios'

export class HttpRequestService {
  /** @return {HttpRequestService} */
  static instance() {
    if (HttpRequestService.#instance) return HttpRequestService.#instance

    HttpRequestService.#instance = new HttpRequestService()
    return HttpRequestService.#instance
  }

  /** @type {HttpRequestService} */
  static #instance

  /** @type {import('axios').AxiosInstance} */
  #axiosInstance

  constructor() {
    this.#axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_BASE_URL ?? 'http://localhost:8080'
    })

    this.#configureInterceptor()
  }

  /**
   * @template T
   * @param path {string}
   * @return {Promise<T>}
   */
  async getRequest(path) {
    return await this.#axiosInstance.get(path)
  }

  /**
   * @template T
   * @param path {string}
   * @param data {*}
   * @return {Promise<T>}
   */
  async postRequest(path, data) {
    return await this.#axiosInstance.post(path, data)
  }

  /**
   @template T
   * @param path {string}
   * @param data {*}
   * @return {Promise<T>}
   */
  async putRequest(path, data) {
    return await this.#axiosInstance.put(path, data)
  }

  /**
   * @param path {string}
   * @return {Promise<void>}
   */
  async deleteRequest(path) {
    return await this.#axiosInstance.delete(path)
  }

  /** @return {void} */
  #configureInterceptor() {
    this.#axiosInstance.interceptors.response.use(
      (response) => response,
      (errorResponse) => console.log(errorResponse)
    )
  }
}
