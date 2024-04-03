export interface INotification {
  last_time_checked: number
  ids: number[]
  account_id: string
  task_id: string
}

export interface INotificationUpdatePayload {
  account_id: number
  ids: number[]
}
export interface INotificationCreatePayload {
  last_time_checked: number
  ids: number[]
  account_id: number
}

export interface INotificationDeletePayload {
  id: string
  account_id: string
}
