import { IProfilePayload } from '../types/api/profile.request'
import { IProfilePictureResposne } from '../types/api/profile.response'
import { IUserSendChatPayload } from '../types/api/user.payload'
import { mainInstance } from './axios.config'

export const telegramApi = {
  async getMyProfilePicture(data: IProfilePayload) {
    return mainInstance.post<IProfilePictureResposne>(
      '/get-profile-picture',
      data
    )
  },
  async addUserToBotChat(data: IUserSendChatPayload) {
    return mainInstance.post('/send-user-to-chat', data)
  },
}
