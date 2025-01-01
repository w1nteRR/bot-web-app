import { mainInstance } from './axios.config'
import { IMessagesResponse } from '../types/api/messages.api'

export const MessagesApi = {
  async getMessages(userId: number) {
    return mainInstance.get<IMessagesResponse>(`/messages?id=${userId}`, {
      headers: { 'Content-Type': 'application/json' },
    })
  },

  async deleteMessage(userId: number) {
    return mainInstance.delete<void>(`/messages?id=${userId}`, {
      headers: { 'Content-Type': 'application/json' },
    })
  },
}
