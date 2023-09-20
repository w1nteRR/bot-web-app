import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'

import { Title } from '../../components/ui/typography/title.ui'
import { MediaRender } from '../../components/shared/media-render/media-render.shared'

import { ScrapperApi } from '../../api/scrapper.api'

import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useTelegram } from '../../hooks/telegram/useTelegram'

export const UserStoriesPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  const { themeParams } = useTelegram()

  useBackButton(() => navigate(-1))

  const { data, isLoading, isError, error } = useQuery(
    ['user stories', params.id],
    () => ScrapperApi.getUserStories(params.id || ''),
    {
      retry: 0,
    }
  )

  const onUserPress = () => {
    navigate(`/user/${location.state.user.username}`)
  }

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
      <div className='mt-5 mx-5 flex items-center' onClick={onUserPress}>
        <div className='bg-gray-300 rounded-full mr-2 w-12 h-12' />
        <Title>{location.state.user.username}</Title>
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
