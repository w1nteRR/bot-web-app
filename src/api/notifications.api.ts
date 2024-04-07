import { mainInstance } from './axios.config'
import {
  INotification,
  INotificationCreatePayload,
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

  async updateNotificationIds(payload: INotificationUpdatePayload) {
    return mainInstance.patch(`${url}/notifications/ids`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
