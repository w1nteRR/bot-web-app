import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'

import { ScrapperApi } from '../../api/scrapper.api'
import { Id } from '../../types/common'

export const useHighlights = (userId: Id) => {
  const [load, setIsLoad] = useState(false)

  const { isLoading, data, refetch, error } = useQuery(
    ['user highlights', userId],
    () => ScrapperApi.getUserHighlights(userId),
    {
      enabled: load,
      // onSuccess: () => {},
    }
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoad(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  console.log('ERROr', error)

  return {
    isLoading,
    data,
    refetch,
    error,
  }
}
