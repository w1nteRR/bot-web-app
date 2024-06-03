import { authInstance } from './axios.config'
import {
  ICreateOrderPayload,
  ICreateOrderResponse,
} from '../types/api/wallet-pay/wallet-pay-api.types'

export const walletPayApi = {
  async createOrder(payload: ICreateOrderPayload) {
    return await authInstance(
      import.meta.env.VITE_WALLET_PAY_SERVICE_URL,
    ).post<ICreateOrderResponse>('/order', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
