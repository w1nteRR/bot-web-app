import { mainInstance } from './axios.config'
import { IConfigureInvoicePayload, IConfigureInvoiceResponse } from '../types/api/subscription.types'

const url = 'https://europe-west1-ia-bot-api.cloudfunctions.net/subscription'
export const subscriptionApi = {
  async configureInvoice(payload: IConfigureInvoicePayload) {
    return mainInstance.post<IConfigureInvoiceResponse>(url, payload)
  },
}
