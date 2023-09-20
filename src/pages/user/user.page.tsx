import { FC, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'

import { Title } from '../../components/ui/typography/title.ui'
import { Chip } from '../../components/ui/chip/chip.ui'
import { MediaRender } from '../../components/shared/media-render/media-render.shared'

import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useTelegram } from '../../hooks/telegram/useTelegram'

import { ScrapperApi } from '../../api/scrapper.api'
import { db } from '../../db/recent-users.db'
import { useRecentUsers } from '../../hooks/recent/useRecentUsers'

export const UserPage: FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<null | number>(null)

  const tg = useTelegram()

  const navigate = useNavigate()
  const params = useParams()

  useBackButton(() => navigate(-1))

  const { addUserToRecentList } = useRecentUsers()

  const { data, isLoading, isError } = useQuery(
    ['user', params.username],
    () => ScrapperApi.findUserByUsername(params.username!),
    {
      retry: 1,
      onError: (error) => {
        if (error instanceof AxiosError) {
          tg.showAlert(error.response?.data.message, () => navigate(-1))
        }
      },
      onSuccess: ({ data }) => {
        addUserToRecentList({
          username: data.username,
          full_name: data.full_name,
          id: String(data.id),
          profile_image: data.profile_image,
        })
      },
    }
  )

  const {
    data: stories,
    isLoading: isStoriesLoading,
    // isError: isStoreisError,
    refetch: refetchStories,
  } = useQuery(
    ['user stories', data?.data.id],
    () => ScrapperApi.getUserStories(String(data?.data.id)),
    {
      enabled: false,
      retry: 0,
    }
  )

  const onChipClick = (chipIndex: number) => {
    setActiveTabIndex(chipIndex)

    if (chipIndex === 0) return refetchStories()
  }

  const onFavoritesClick = () => {
    const id = db.recentUsers.add({
      id: String(data?.data.id),
      profile_image: data?.data.profile_image || '',
      full_name: data?.data.full_name || '',
      username: data?.data.username || '',
    })

    console.log('i', id)
  }

  useEffect(() => {
    tg.MainButton.hide()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>error</p>

  console.log('stories', stories)

  return (
    <div>
      <img
        className='bg-gray-500 w-52 h-52 m-auto mt-10 rounded-lg'
        alt='avatar'
        src={data?.data.profile_image}
      />
      <div className='w-56 m-auto'>
        <div className='my-5 text-center'>
          <Title>{data?.data.username}</Title>
          <p style={{ color: tg.themeParams.hint_color }}>
            {data?.data.full_name}
          </p>
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <button
          className='p-3 rounded-xl w-full max-w-xs font-semibold'
          style={{
            backgroundColor: tg.themeParams.button_color,
            color: tg.themeParams.button_text_color,
          }}
          onClick={onFavoritesClick}
        >
          Add to favorites
        </button>
      </div>

      <div className='my-5 mx-5'>
        <pre className='text-xs'>{data?.data.biography}</pre>
      </div>
      <ul
        className='flex  mx-5 gap-x-1'
        style={{ color: tg.themeParams.hint_color, fontSize: 12 }}
      >
        <li>
          &#x2022;{' '}
          <span className='font-semibold'>{data?.data.followers.count}</span>{' '}
          followers
        </li>
        <li>
          &#x2022;{' '}
          <span className='font-semibold'>{data?.data.following.count}</span>{' '}
          following
        </li>
        {data?.data.category_name && (
          <li>&#x2022; {data.data.category_name}</li>
        )}
      </ul>

      <div className='flex items-center justify-center mt-10'>
        {['Stories', 'Highlights', 'Posts'].map((tab, index) => (
          <Chip
            key={index}
            isActive={activeTabIndex === index}
            onClick={() => onChipClick(index)}
          >
            {tab}
          </Chip>
        ))}
      </div>

      <div className='mt-10'>
        {isStoriesLoading && <p>Loading stories...</p>}

        {stories?.data.stories.media.map((story) => (
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
