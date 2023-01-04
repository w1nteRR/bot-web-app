import { FC, useEffect, useState, useRef } from 'react'
import { SwiperSlide, Swiper, useSwiper, SwiperProps } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { IStory } from '../../types/stories/stories.types'
import { MediaRender } from '../shared/media-render/media-render.shared'

interface IStoriesViewerProps {
  stories: IStory[]
  onBackgroundClick?: () => void
  onCloseClick?: () => void
}

export const StoriesViewer: FC<IStoriesViewerProps> = ({
  stories,
  onBackgroundClick,
  onCloseClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(1)

  const { themeParams, MainButton, colorScheme } = useTelegram()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    MainButton.setText('Download')
    MainButton.show()

    return () => {
      MainButton.hide()
      document.body.style.overflow = 'auto'
    }
  }, [MainButton])

  const updateCounter = (swiper: SwiperType) => {
    setCurrentIndex(swiper.activeIndex + 1)
  }

  return (
    <>
      <div
        className='backdrop fixed bottom-0 h-screen w-full z-20'
        onClick={onBackgroundClick}
        style={{
          backgroundColor:
            colorScheme === 'dark'
              ? themeParams.secondary_bg_color
              : themeParams.bg_color,
        }}
      >
        <div slot='container-start' className='flex justify-between m-5'>
          <div>
            <span
              className='text-sm font-semibold'
              style={{ color: themeParams.text_color }}
            >
              {currentIndex}
            </span>{' '}
            <span className='text-xs' style={{ color: themeParams.hint_color }}>
              {stories.length}
            </span>
          </div>
          <button
            style={{ color: themeParams.link_color, height: '10%' }}
            onClick={onCloseClick}
          >
            Close
          </button>
        </div>

        <Swiper style={{ height: '90%' }} onSlideChange={updateCounter}>
          {stories.map(({ pk, videoPath, url, is_video, expiring_at }) => {
            const expiringTime = new Date(expiring_at * 1000).toUTCString()

            return (
              <SwiperSlide
                key={pk}
                onClick={(event) => {
                  event.stopPropagation()
                  event.preventDefault()
                }}
              >
                <div
                  className='h-3/4 rounded-xl mt-10 m-auto'
                  style={{ width: 'fit-content' }}
                >
                  <MediaRender
                    isVideo={is_video}
                    source={url || videoPath || ''}
                  />
                </div>
                <div className='m-5'>
                  <p
                    className='text-sm font-semibold'
                    style={{ color: themeParams.text_color }}
                  >
                    Expiring at
                  </p>
                  <p
                    className='text-xs'
                    style={{ color: themeParams.hint_color }}
                  >
                    {expiringTime}
                  </p>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </>
  )
}
