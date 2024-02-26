import { mainInstance } from './axios.config'
import { IConfigureInvoicePayload } from '../types/api/subscription.request'

const url = 'https://europe-west1-ia-bot-api.cloudfunctions.net/subscription'
export const subscriptionApi = {
  async configureInvoice(payload: IConfigureInvoicePayload) {
    return mainInstance.post(url, payload)
  },
}
