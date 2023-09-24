import { useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'

import { MediaRender } from '../../components/shared/media-render/media-render.shared'

import { ScrapperApi } from '../../api/scrapper.api'

import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useTelegram } from '../../hooks/telegram/useTelegram'

export const UserStoriesPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  const { themeParams, MainButton } = useTelegram()

  useBackButton(() => navigate(-1))

  const { data, isLoading, isError, error } = useQuery(
    ['user stories', params.id],
    () => ScrapperApi.getUserStories(params.id || ''),
    {
      retry: 0,
    }
  )

  const onUserPress = () => {
    navigate(`/user/${location.state.user.username}`, { replace: true })
  }

  useEffect(() => {
    if (isLoading) return

    if (location.state.user) {
      MainButton.show()
      MainButton.setText('Go to profile')
      MainButton.onClick(() =>
        navigate(`/user/${location.state.user.username}`)
      )
    }

    return () => {
      MainButton.hide()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MainButton, location.state.user, isLoading])

  if (isLoading)
    return <p style={{ color: themeParams.text_color }}>Loading...</p>

  if (isError)
    return (
      <p style={{ color: themeParams.text_color }}>
        {error instanceof AxiosError && error.response?.data.message}
      </p>
    )

  return (
    <div>
      <div className='mx-5 py-5 flex items-center' onClick={onUserPress}>
        {/* <img
          src={location.state.user.profile_image}
          alt='Avatar'
          className='rounded-full w-12 h-12 mr-2'
        /> */}
        {/* <div className='bg-gray-300 rounded-full mr-2 w-12 h-12' /> */}
        {/* <Title>{location.state.user.username}</Title> */}
      </div>

      <div>
        {data?.data.stories.media.map((story) => (
          <div key={story.id} className='h-96 my-5 mx-5 rounded-lg'>
            <MediaRender
              source={story.url || story.videoPath || ''}
              isVideo={story.is_video}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
