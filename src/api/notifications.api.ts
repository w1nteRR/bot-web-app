import { mainInstance } from './axios.config'
import {
  INotification,
  INotificationCreatePayload,
  INotificationDeletePayload,
  INotificationUpdatePayload,
} from '../types/notifications/notifications.types'

const url = 'https://ia-bot-notifications-yhawj2jxja-ez.a.run.app'

export const NotificationsApi = {
  async createNotifications(payload: INotificationCreatePayload) {
    return mainInstance.post(`${url}/notifications`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  async getNotifications(accountId: number) {
    return mainInstance.get<INotification>(`${url}/notifications/${accountId}`)
  },

  async updateNotification(payload: INotificationUpdatePayload) {
    return mainInstance.patch(`${url}/notifications`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  async removeNotification(payload: INotificationDeletePayload) {
    const { account_id, id } = payload

    return mainInstance.delete(url, {
      params: { accountId: account_id, userId: id },
    })
  },
}
