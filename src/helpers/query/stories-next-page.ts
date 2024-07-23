import { GetNextPageParamFunction } from 'react-query'
import { AxiosResponse } from 'axios'
import { IStoriesResponse } from '../../types/api/stories.response'

const LIMIT = 10

export const getNextPageParam:
  | GetNextPageParamFunction<AxiosResponse<IStoriesResponse, any>>
  | undefined = (lastPage) => {
  const { media, media_count } = lastPage.data.stories

  if (media_count > LIMIT && media.length === LIMIT) {
    return lastPage.config.params.page + 1
  }

  return undefined
}
