import { mainInstance } from './axios.config'
import {
  IConfigureInvoicePayload,
  IConfigureInvoiceResponse,
} from '../types/api/subscription.types'

export const subscriptionApi = {
  async configureInvoice(payload: IConfigureInvoicePayload) {
    return mainInstance.post<IConfigureInvoiceResponse>(
      '/subscription',
      payload,
    )
  },
}
