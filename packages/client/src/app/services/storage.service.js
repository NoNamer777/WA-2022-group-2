export class StorageService {
  /** @return {StorageService} */
  static instance() {
    if (StorageService.#instance) return StorageService.#instance

    StorageService.#instance = new StorageService()
    return StorageService.#instance
  }

  /** @type {StorageService} */
  static #instance

  /** @return {string} */
  getItem(key) {
    return localStorage.getItem(key)
  }

  /** @return {void} */
  setItem(key, value) {
    localStorage.setItem(key, value)
  }

  /** @return {void} */
  removeItem(key) {
    localStorage.removeItem(key)
  }

  /** @return {void} */
  clear() {
    localStorage.clear()
  }
}
