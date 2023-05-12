import axios from 'axios'

export class HttpRequestService {
  static instance() {
    if (HttpRequestService.#instance) return HttpRequestService.#instance

    HttpRequestService.#instance = new HttpRequestService()
    return HttpRequestService.#instance
  }
  static #instance

  /** @type {import('axios').AxiosInstance} */
  #axiosInstance

  constructor() {
    this.#axiosInstance = axios.create({
      baseURL: process.env.SERVER_BASE_URL ?? 'http://localhost:8080'
    })

    this.#configureInterceptor()
  }

  async getRequest(path) {
    return await this.#axiosInstance.get(path)
  }

  async postRequest(path, data) {
    return await this.#axiosInstance.post(path, data)
  }

  async putRequest(path, data) {
    return await this.#axiosInstance.put(path, data)
  }

  async deleteRequest(path) {
    return await this.#axiosInstance.delete(path)
  }

  #configureInterceptor() {
    this.#axiosInstance.interceptors.response.use(
      (response) => response,
      (errorResponse) => console.log(errorResponse)
    )
  }
}
