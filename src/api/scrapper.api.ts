import { mainInstance } from './axios.config'

import { Id } from '../types/common'

import { IUserInfoResponse } from '../types/api/user.response'
import { IHighlightsResponse } from '../types/api/highlights.response'
import { IStoriesResponse } from '../types/api/stories.response'

export const ScrapperApi = {
  // async findIdByUsername(username: string) {
  //   return mainInstance.get<IIdResponse>(`/user_id/`, {
  //     params: {
  //       user: username,
  //     },
  //   })
  // },
  async findUserByUsername(username: string) {
    return mainInstance.get<IUserInfoResponse>(`/get-user`, {
      params: {
        username,
      },
    })
  },
  async getUserHighlights(id_user: Id) {
    return mainInstance.get<IHighlightsResponse>(`/get-highlights`, {
      params: {
        id_user,
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
