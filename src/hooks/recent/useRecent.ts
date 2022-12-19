import { useCallback, useEffect, useState } from 'react'

interface IRecentUser {
  pk_id: number
  profile_image: string
  full_name: string
  username: string
  timestamp: number
}

const RECENT_SEARCH_STORAGE = 'recent-search'

export const useRecent = () => {
  // const recentSearchList = JSON.parse(
  //   localStorage.getItem(RECENT_SEARCH_STORAGE) || '[]'
  // ) as IRecentUser[]

  const [recentSearchList, setRecentSearchList] = useState<IRecentUser[]>(
    JSON.parse(localStorage.getItem(RECENT_SEARCH_STORAGE) || '[]')
  )

  const addUserToRecent = useCallback(
    (user: IRecentUser) => {
      const isUserExist = recentSearchList.some(
        ({ pk_id }) => pk_id === user.pk_id
      )

      if (isUserExist) return

      recentSearchList.push(user)

      localStorage.setItem(
        RECENT_SEARCH_STORAGE,
        JSON.stringify(recentSearchList)
      )
    },
    [recentSearchList]
  )

  const removeUserFromRecent = useCallback(
    (pk_id: number) => {
      const newRecentSearchList = recentSearchList.filter(
        (value) => value.pk_id !== pk_id
      )

      localStorage.setItem(
        RECENT_SEARCH_STORAGE,
        JSON.stringify(newRecentSearchList)
      )

      setRecentSearchList(newRecentSearchList)
    },
    [recentSearchList]
  )

  useEffect(() => {
    // localStorage.setItem(RECENT_SEARCH_STORAGE)
  }, [recentSearchList])

  return {
    addUserToRecent,
    removeUserFromRecent,
    recentSearchList,
  }
}
