import { useQuery, QueriesOptions, UseQueryOptions } from 'react-query'

import { ScrapperApi } from '../../api/scrapper.api'
import { Id } from '../../types/common'
import { IStory } from '../../types/stories/stories.types'

export const useStories = (
  id: Id,
  config?: {
    retry?: number
    enabled?: boolean
  }
  // options: UseQueryOptions<any, any, IStory, string[]>
) => {
  const { isLoading, data, refetch, error, isError } = useQuery(
    ['user stories', id],
    () => ScrapperApi.getUserStories(id),
    {
      ...config,
    }
  )

  return {
    isLoading,
    data: data?.data,
    refetch,
    error,
    isError,
  }
}
