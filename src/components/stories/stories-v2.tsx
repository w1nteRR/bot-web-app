import { FC, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'

import { StoriesViewer } from '../stories-viewer/stories.viewer'
import { MediaRender } from '../shared/media-render/media-render.shared'
import { Alert } from '../ui/alert/alert.ui'

import { useStories } from '../../hooks/queries/useStories'
import { useTelegram } from '../../hooks/telegram/useTelegram'

import { textConstants } from '../../constants/text.constants'

export const StoriesV2: FC<{ id: string }> = ({ id }) => {
  const [isStoriesViewerOpen, setIsStoriesViewerOpen] = useState(false)

  const { data, isLoading, isError, error, refetch } = useStories(id, {
    retry: 3,
  })

  const { themeParams } = useTelegram()

  if (isLoading)
    return (
      <Alert>
        <p className='text-xs' style={{ color: themeParams.hint_color }}>
          {textConstants.storiesSearch}
        </p>
      </Alert>
    )

  if (isError)
    return (
      <Alert>
        <p className='text-xs' style={{ color: themeParams.hint_color }}>
          😔 {error?.response?.data.message}
        </p>
        <p style={{ color: themeParams.link_color }} onClick={() => refetch()}>
          Retry
        </p>
      </Alert>
    )

  return (
    <>
      <div className='my-10 px-5 flex justify-between items-center'>
        <p></p>
        <p
          style={{ color: themeParams.link_color }}
          onClick={() => setIsStoriesViewerOpen(!isStoriesViewerOpen)}
        >
          See All
        </p>
      </div>
      <div className='px-5 pb-7'>
        <Swiper spaceBetween={10} slidesPerView={2.3} className='mySwiper'>
          {data?.stories.media.map(({ pk, is_video, url, videoPath }) => {
            return (
              <SwiperSlide key={pk}>
                <div className='h-64 w-40 rounded-xl'>
                  <MediaRender
                    isVideo={is_video}
                    source={url || videoPath || ''}
                  />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      {isStoriesViewerOpen && data && (
        <StoriesViewer
          stories={data?.stories.media}
          onCloseClick={() => setIsStoriesViewerOpen(false)}
        />
      )}
    </>
  )
}
