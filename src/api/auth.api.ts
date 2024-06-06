import { mainInstance } from './axios.config'
import { ITgUser } from '../types/user/tg-user.types'

export const AuthApi = {
  async validate(initData: string) {
    const mode = import.meta.env.MODE
    const url = `/user-validation${mode === 'development' && '-dev'}`

    return mainInstance.get<ITgUser>(url, {
      headers: { 'init-tg': initData, 'Content-Type': 'application/json' },
    })
  },
}
