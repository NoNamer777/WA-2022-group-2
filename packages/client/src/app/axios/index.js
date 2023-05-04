import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true // send cookies with requests
})

export default axiosInstance
