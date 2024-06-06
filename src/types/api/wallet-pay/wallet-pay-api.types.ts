import { WebAppUser } from '@twa-dev/types'

export interface ICreateOrderPayload {
  user: WebAppUser
}

export interface ICreateOrderResponse {
  payLink: string
  directPayLink: string
}
