import { authInstance } from './axios.config'
import { IGetSubscriptionExpirationDate, IGetSubscriptionExpirationDateResponse } from '../types/api/payments.api'

export const paymentsApi = {
  async getSubscriptionExpirationDate(payload: IGetSubscriptionExpirationDate) {
    return await authInstance(
      import.meta.env.VITE_PAYMENTS_SERVICE_URL,
    ).get<IGetSubscriptionExpirationDateResponse>(`/partial-payment?user_id=${payload.user_id}&fields_select=subscription_expiration_date`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
