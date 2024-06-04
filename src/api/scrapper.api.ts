import { mainInstance } from './axios.config'

import { IUserInfoResponse } from '../types/api/user.response'
import { IStoriesResponse } from '../types/api/stories.response'

export const ScrapperApi = {
  async findUserByUsername(username: string) {
    return mainInstance.get<IUserInfoResponse>(`/get-user`, {
      params: {
        username,
      },
    })
  },
  async getUserStories(payload: { id_user: string; pageParam: number }) {
    const { id_user, pageParam } = payload
    return mainInstance.get<IStoriesResponse>(`/get-stories`, {
      params: { id_user, page: pageParam },
    })
  },
}
