import { notify } from '@kyvg/vue3-notification'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true
})

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300 && response.data.message) {
      notify({
        title: response.data.message,
        type: 'success'
      })
    }

    return response
  },
  (error) => {
    const response = error.response
    if (response.status >= 300 && response.data.errors) {
      let validationErrors = response.data.errors
      for (const i in validationErrors) {
        notify({
          title: validationErrors[i].message,
          type: 'error'
        })
      }
    }

    if (response.status >= 300 && response.data.message) {
      notify({
        title: response.data.message,
        type: 'error'
      })
    }

    return Promise.reject(error)
  }
)
export default axiosInstance
