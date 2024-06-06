import axios from 'axios'
import { AuthApi } from './auth.api'
import { validateUserError } from '../helpers/errors/validate-user.error'

export const mainInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

export const authInstance = (baseURL: string) => {
  const customInstance = axios.create({ baseURL })

  customInstance.interceptors.request.use(
    async (config) => {
      try {
        const initData = window.Telegram.WebApp.initData

        await AuthApi.validate(initData)

        return config
      } catch (err) {
        validateUserError()
        return Promise.reject(err)
      }
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return customInstance
}
