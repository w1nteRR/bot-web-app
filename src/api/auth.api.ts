import axios from 'axios'
import { mainInstance } from './axios.config'
import { ITgUser } from '../types/user/tg-user.types'

export const AuthApi = {
  async validate(initData: string) {
    return mainInstance.get<ITgUser>('/user-validation', {
      headers: { 'init-tg': initData },
    })
  },
}
