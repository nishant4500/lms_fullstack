import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://lmsbackend-gbcugef8cug0abh6.centralindia-01.azurewebsites.net'

export const TOKEN_KEY = 'lms_token'
export const USER_KEY = 'lms_user'

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status as number | undefined
    if (status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
    return Promise.reject(error)
  },
)
