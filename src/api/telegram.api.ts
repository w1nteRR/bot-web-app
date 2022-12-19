import { IProfilePayload } from '../types/api/profile.request'
import { IProfilePictureResposne } from '../types/api/profile.response'
import { telegramInstance } from './axios.config'

export const telegramApi = {
  async getMyProfilePicture(data: IProfilePayload) {
    return telegramInstance.post<IProfilePictureResposne>(
      'https://europe-west1-ia-bot-api.cloudfunctions.net/get-profile-picture',
      data
    )
  },
}
