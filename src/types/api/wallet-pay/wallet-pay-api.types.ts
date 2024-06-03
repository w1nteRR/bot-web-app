export interface ICreateOrderPayload {
  user_id: number
}

export interface ICreateOrderResponse {
  payLink: string
  directPayLink: string
}
