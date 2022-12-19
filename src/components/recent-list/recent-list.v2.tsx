import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SwiperSlide, Swiper } from 'swiper/react'

import { RecentCard } from './recent.card'
import { MediaRender } from '../shared/media-render/media-render.shared'

import { useStories } from '../../hooks/queries/useStories'
import { useRecent } from '../../hooks/recent/useRecent'
import { useTelegram } from '../../hooks/telegram/useTelegram'

export const RecentListV2: FC = () => {
  const [activeUserId, setActiveUserId] = useState<null | number>(null)
  const [activeUsername, setActviveUsername] = useState('')

  const { refetch, data, isLoading, error, isError } = useStories(
    String(activeUserId),
    {
      retry: 0,
      enabled: false,
    }
  )

  const { themeParams, colorScheme } = useTelegram()
  const { recentSearchList } = useRecent()

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

  if (!recentSearchList.length) return null

  console.log('DATA', data)

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
        <Swiper spaceBetween={10} slidesPerView={5.2} className='mySwiper'>
          {recentSearchList.map(({ pk_id, profile_image, username }) => (
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
          ))}
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
                👀 Looking for the stories
              </p>
            )}

            {isError && (
              <p className='text-xs' style={{ color: themeParams.hint_color }}>
                😔 Stories not found
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
          </div>
          <Swiper spaceBetween={10} slidesPerView={2.3} className='mySwiper'>
            {data?.stories.media.map(
              ({ id, is_video, url, expiring_at, playback, thumbnail }) => {
                const expiringTime = new Date(expiring_at).toLocaleTimeString()

                return (
                  <SwiperSlide
                    key={id}
                    // onClick={() => navigate(`/user/${username}`)}
                  >
                    <div className='h-64 w-40 bg-zinc-900 rounded-xl'>
                      <MediaRender
                        isVideo={is_video}
                        image={url || ''}
                        playback={playback}
                        poster={thumbnail}
                      />
                    </div>
                    {/* <video src={video_dash_manifest} /> */}
                    {/* <Overline>{expiringTime}</Overline> */}
                  </SwiperSlide>
                )
              }
            )}
          </Swiper>
        </>
      )}
    </>
  )
}
