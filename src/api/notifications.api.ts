import { mainInstance } from './axios.config'
import {
  INotification,
  INotificationCreatePayload,
  INotificationUpdatePayload,
} from '../types/notifications/notifications.types'

const url = import.meta.env.VITE_NOTIFICATIONS_SERVICE_URL

export const NotificationsApi = {
  async createNotifications(payload: INotificationCreatePayload) {
    return mainInstance.post(`${url}/notifications`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  async getNotifications(accountId: number) {
    return mainInstance.get<INotification>(
      `${url}/notifications/${accountId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  },

  async updateNotificationIds(payload: INotificationUpdatePayload) {
    return mainInstance.patch(`${url}/notifications/ids`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
