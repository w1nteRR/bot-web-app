import axios from 'axios'

export const mainInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})
