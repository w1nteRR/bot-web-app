import { FC, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'

import { Title } from '../ui/typography/title.ui'

import { useStories } from '../../hooks/queries/useStories'
import { useTelegram } from '../../hooks/telegram/useTelegram'
import { StoriesViewer } from '../stories-viewer/stories.viewer'
import { MediaRender } from '../shared/media-render/media-render.shared'

export const StoriesV2: FC<{ id: string }> = ({ id }) => {
  const [isStoriesViewerOpen, setIsStoriesViewerOpen] = useState(false)

  const { data, isLoading } = useStories(id)

  const { themeParams } = useTelegram()

  if (isLoading)
    return <p style={{ color: themeParams.hint_color }}>Loading stories...</p>

  return (
    <>
      <div className='mt-10 px-5 flex justify-between items-center'>
        <Title>Stories</Title>
        <p
          style={{ color: themeParams.link_color }}
          onClick={() => setIsStoriesViewerOpen(!isStoriesViewerOpen)}
        >
          See All
        </p>
      </div>
      <div className='px-5 mt-5'>
        <Swiper spaceBetween={10} slidesPerView={2.3} className='mySwiper'>
          {data?.stories.media.map(({ pk, is_video, url, playback }) => {
            return (
              <SwiperSlide key={pk}>
                <div className='h-64 w-40 rounded-xl'>
                  <MediaRender
                    isVideo={is_video}
                    image={url || ''}
                    playback={playback!}
                  />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      {isStoriesViewerOpen && (
        <StoriesViewer
          onBackgroundClick={() => setIsStoriesViewerOpen(false)}
        />
      )}
    </>
  )
}
