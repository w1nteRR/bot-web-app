export interface INotificationCreatePayload {
  last_time_visited: number
  ids: number[]
  account_id: string
}

export interface INotificationDeletePayload {
  id: string
  account_id: string
}

export type Notifications = Array<INotificationCreatePayload>
