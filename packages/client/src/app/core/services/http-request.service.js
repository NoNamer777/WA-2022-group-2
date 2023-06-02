import { notify } from '@kyvg/vue3-notification';
import axios from 'axios';
import { inject } from 'vue';

export class HttpRequestService {
  /** @return {HttpRequestService} */
  static instance() {
    if (HttpRequestService.#instance) return HttpRequestService.#instance;

    HttpRequestService.#instance = new HttpRequestService();
    return HttpRequestService.#instance;
  }

  /** @type {HttpRequestService} */
  static #instance;

  /** @type {import('axios').AxiosInstance} */
  #axiosInstance;

  constructor() {
    this.#axiosInstance = axios.create({ baseURL: inject('serverBaseUrl') });

    this.#configureInterceptor();
  }

  /**
   * @template T
   * @param path {string}
   * @return {Promise<T>}
   */
  async getRequest(path) {
    return await this.#axiosInstance.get(path);
  }

  /**
   * @template T
   * @param path {string}
   * @param data {*}
   * @return {Promise<T>}
   */
  async postRequest(path, data) {
    return await this.#axiosInstance.post(path, data);
  }

  /**
   @template T
   * @param path {string}
   * @param data {*}
   * @return {Promise<T>}
   */
  async putRequest(path, data) {
    return await this.#axiosInstance.put(path, data);
  }

  /**
   * @param path {string}
   * @return {Promise<void>}
   */
  async deleteRequest(path) {
    return await this.#axiosInstance.delete(path);
  }

  /** @return {void} */
  #configureInterceptor() {
    this.#axiosInstance.interceptors.request.use(
      (request) => this.#addAuthHeader(request),
      (error) => console.error(error)
    );

    this.#axiosInstance.interceptors.response.use((response) => this.#processAuthHeader(response));

    this.#axiosInstance.interceptors.response.use(
      (response) => (response?.data ? response.data : null),
      (errorResponse) => this.#processHttpErrorResponse(errorResponse)
    );
  }

  /**
   * @param request {import('axios').InternalAxiosRequestConfig}
   * @return {import('axios').InternalAxiosRequestConfig}
   */
  #addAuthHeader(request) {
    const token = localStorage.getItem('jwt-token');

    if (!token) return request;

    request.headers.setAuthorization('Bearer ' + token);
    return request;
  }

  /**
   * @param response {import('axios').AxiosResponse}
   * @return {import('axios').AxiosResponse}
   */
  #processAuthHeader(response) {
    if (!response.headers.hasAuthorization()) return response;

    const token = response.headers.getAuthorization();
    localStorage.setItem('jwt-token', token.replace('Bearer ', ''));
  }

  #processHttpErrorResponse(errorResponse) {
    const error = !errorResponse.response
      ? {
          error: errorResponse.code,
          message: errorResponse.message
        }
      : errorResponse.response.data;

    notify({ title: error.error, text: error.message, type: 'error' });
    return Promise.reject(error);
  }
}
