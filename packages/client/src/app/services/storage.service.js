export class StorageService {
  /** @return {StorageService} */
  static instance() {
    if (StorageService.#instance) return StorageService.#instance

    StorageService.#instance = new StorageService()
    return StorageService.#instance
  }

  /** @type {StorageService} */
  static #instance

  /**
   * @param key {string}
   * @return {string}
   */
  getItem(key) {
    return localStorage.getItem(key)
  }

  /**
   * @param key {string}
   * @param value {string}
   * @return {void}
   */
  setItem(key, value) {
    localStorage.setItem(key, value)
  }

  /**
   * @param key {string}
   * @return {void}
   */
  removeItem(key) {
    localStorage.removeItem(key)
  }

  /** @return {void} */
  clear() {
    localStorage.clear()
  }
}
