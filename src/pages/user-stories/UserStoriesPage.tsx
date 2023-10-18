import { useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'

import { StoriesList } from '../../components/stories/stories.list'

import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useTelegram } from '../../hooks/telegram/useTelegram'

import { ScrapperApi } from '../../api/scrapper.api'

import { Pages } from '../../types/navigation/navigation.types'

export const UserStoriesPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  const { themeParams, MainButton } = useTelegram()

  useBackButton(() => navigate(location.state.from || '/'))

  const { data, isLoading, isError, error } = useQuery(
    ['user stories', params.id],
    () => ScrapperApi.getUserStories(params.id || ''),
    {
      retry: 0,
      enabled: false,
    }
  )

  useEffect(() => {
    MainButton.show()
    MainButton.setText('Go to profile')
    MainButton.onClick(() =>
      navigate(
        `${Pages.User.replace(':username', location.state.user.username)}`,
        {
          state: { from: location.pathname },
        }
      )
    )

    return () => {
      MainButton.hide()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MainButton, location.state.user])

  if (isLoading)
    return <p style={{ color: themeParams.text_color }}>Loading stories</p>

  if (isError)
    return (
      <p style={{ color: themeParams.text_color }}>
        {error instanceof AxiosError && error.response?.data.message}
      </p>
    )

  return (
    <div>
      <StoriesList stories={data?.data.stories.media || []} />
    </div>
  )
}
