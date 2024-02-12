import { mainInstance } from './axios.config'
import {
  INotificationCreatePayload,
  INotificationDeletePayload,
  Notifications,
} from '../types/notifications/notifications.types'

const url = '/notifications-queue'
export const NotificationsApi = {
  async createNotifications(payload: INotificationCreatePayload) {
    return mainInstance.post(url, JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  async getNotifications(accountId: number) {
    return mainInstance.get<Notifications>(url, {
      params: { id: accountId },
    })
  },

  async removeNotification(payload: INotificationDeletePayload) {
    const { account_id, id } = payload

    return mainInstance.delete(url, {
      params: { accountId: account_id, userId: id },
    })
  },
}
