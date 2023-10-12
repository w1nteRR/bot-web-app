import { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'

import { useTelegram } from '../telegram/useTelegram'

import { ScrapperApi } from '../../api/scrapper.api'

import { Pages } from '../../types/navigation/navigation.types'
import { IRecentUser } from '../../types/user/user.types'

export const useStoriesQuery = () => {
  const [user, setUser] = useState<IRecentUser>({} as IRecentUser)

  const QUERY_KEY = ['user stories', user.id]

  const navigate = useNavigate()
  const location = useLocation()

  const { HapticFeedback, showPopup } = useTelegram()

  const query = useQuery(QUERY_KEY, () => ScrapperApi.getUserStories(user.id), {
    enabled: false,
    retry: false,
    onSuccess: () => {
      navigate(`${Pages.UserStories.replace(':id', user.id)}`, {
        state: { user, from: location.pathname },
      })
    },

    onError: () => {
      setUser({} as IRecentUser)
      HapticFeedback.notificationOccurred('error')
    },
  })

  return {
    query,
    setUser,
    user,
  }
}
