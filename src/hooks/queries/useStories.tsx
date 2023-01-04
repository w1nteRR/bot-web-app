import { AxiosError, AxiosResponse } from 'axios'
import { useQuery } from 'react-query'

import { ScrapperApi } from '../../api/scrapper.api'
import { IStoriesResponse } from '../../types/api/stories.response'
import { Id } from '../../types/common'

export const useStories = (
  id: Id,
  config?: {
    retry?: number
    enabled?: boolean
  }
  // options: UseQueryOptions<any, any, IStory, string[]>
) => {
  const { isLoading, data, refetch, error, isError } = useQuery<
    AxiosResponse<IStoriesResponse>,
    AxiosError<{ message: string }>
  >(['user stories', id], () => ScrapperApi.getUserStories(id), {
    ...config,
  })

  return {
    isLoading,
    data: data?.data,
    refetch,
    error,
    isError,
  }
}
