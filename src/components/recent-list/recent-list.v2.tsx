import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SwiperSlide, Swiper } from 'swiper/react'
import { FreeMode } from 'swiper'

import { RecentCard } from './recent.card'
import { MediaRender } from '../shared/media-render/media-render.shared'

import { useStories } from '../../hooks/queries/useStories'
import { useTelegram } from '../../hooks/telegram/useTelegram'

import 'swiper/css/free-mode'
import { textConstants } from '../../constants/text.constants'
import { StoriesViewer } from '../stories-viewer/stories.viewer'

export const RecentListV2: FC = () => {
  const [activeUserId, setActiveUserId] = useState<null | number>(null)
  const [activeUsername, setActviveUsername] = useState('')
  const [isStoriesViewerOpen, setIsStoriesViewerOpen] = useState(false)

  const { refetch, data, isLoading, error, isError } = useStories(
    String(activeUserId),
    {
      retry: 0,
      enabled: false,
    }
  )

  const { themeParams, colorScheme } = useTelegram()

  const toggleActiveRecentUserId = (id: number, username: string) => {
    setActiveUserId((prev) => (prev === id ? null : id))

    setActviveUsername(username)
    // if (activeUserId) refetch()
  }

  useEffect(() => {
    if (activeUserId) {
      refetch()
    }
  }, [activeUserId, refetch])

  return (
    <>
      <div className='flex justify-between items-start  px-5 mt-5 mb-1'>
        <div>
          <p
            className='text-2xl font-bold'
            style={{ color: themeParams.text_color }}
          >
            Quick Pick
          </p>
          <p className='text-xs text-gray-600'>
            Your recent activity on this device
          </p>
        </div>
        <Link to='recent/manage' style={{ color: themeParams.link_color }}>
          Manage
        </Link>
      </div>

      <div className='p-3 my-4 relative'>
        <Swiper
          spaceBetween={10}
          slidesPerView={5.2}
          freeMode={true}
          modules={[FreeMode]}
          className='mySwiper'
        >
          {/* {recentSearchList.map(({ pk_id, profile_image, username }) => (
            <SwiperSlide
              key={pk_id}
              // onClick={() => navigate(`/user/${username}`)}
              onClick={() => toggleActiveRecentUserId(pk_id, username)}
            >
              <RecentCard
                username={username}
                profileImage={profile_image}
                isActive={pk_id === activeUserId}
              />
            </SwiperSlide>
          ))} */}
        </Swiper>
      </div>

      {activeUserId && (
        <>
          <div
            className='p-2 px-3 flex justify-between items-center my-5'
            style={{
              backgroundColor:
                colorScheme === 'light'
                  ? themeParams.secondary_bg_color
                  : themeParams.bg_color,
            }}
          >
            {isLoading && (
              <p className='text-xs' style={{ color: themeParams.hint_color }}>
                {textConstants.storiesSearch}
              </p>
            )}

            {isError && (
              <p className='text-xs' style={{ color: themeParams.hint_color }}>
                {textConstants.storiesError}
              </p>
            )}

            {data && (
              <p className='text-xs' style={{ color: themeParams.hint_color }}>
                ✅ Found {data.stories.media_count} stories
              </p>
            )}

            <Link
              to={`/user/${activeUsername}`}
              style={{ color: themeParams.link_color }}
            >
              Profile
            </Link>
            <p
              style={{ color: themeParams.link_color }}
              onClick={() => setIsStoriesViewerOpen(true)}
            >
              All
            </p>
          </div>

          <Swiper
            // freeMode={true}
            // modules={[FreeMode]}
            spaceBetween={10}
            slidesPerView={2.3}
            className='mySwiper'
          >
            {data?.stories.media.map(
              ({ id, is_video, url, expiring_at, videoPath }) => {
                const expiringTime = new Date(expiring_at).toLocaleTimeString()
                const source = url || videoPath || ''

                return (
                  <SwiperSlide key={id}>
                    <div className='h-64 w-40 rounded-xl'>
                      <MediaRender isVideo={is_video} source={source} />
                    </div>
                  </SwiperSlide>
                )
              }
            )}
          </Swiper>

          {isStoriesViewerOpen && data && (
            <StoriesViewer
              stories={data?.stories.media}
              onCloseClick={() => setIsStoriesViewerOpen(false)}
            />
          )}
        </>
      )}
    </>
  )
}
