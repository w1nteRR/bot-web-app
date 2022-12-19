import { FC, useEffect } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { IStory } from '../../types/stories/stories.types'
import { MediaRender } from '../shared/media-render/media-render.shared'

interface IStoriesViewerProps {
  stories?: IStory[]
  onBackgroundClick?: () => void
}

export const StoriesViewer: FC<IStoriesViewerProps> = ({
  stories,
  onBackgroundClick,
}) => {
  const { themeParams, MainButton } = useTelegram()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    MainButton.show()
    MainButton.setText('Download')

    return () => {
      MainButton.hide()
      document.body.style.overflow = 'auto'
    }
  }, [MainButton])

  return (
    <>
      <div
        className='backdrop fixed bottom-0 h-screen w-full z-20'
        onClick={onBackgroundClick}
        style={{
          backgroundColor: 'rgba(142, 142, 142, 0.1)',
        }}
      >
        <Swiper>
          {[0, 1, 2, 3, 4, 5, 6].map((x) => {
            return (
              <SwiperSlide>
                <div
                  className='h-3/4 bg-zinc-800 rounded-xl mt-10 m-auto'
                  style={{ maxWidth: '85%' }}
                >
                  {x}
                </div>
                <div className=' my-5'>
                  <p style={{ color: themeParams.text_color }}>Expiring at</p>
                </div>
              </SwiperSlide>
            )
          })}
          {/* {[0, 1, 2, 3, 4, 5, 6].map(() => {})} */}
        </Swiper>
        {/* <div className='bg-zinc-800 p-2'>header</div> */}
        {/* <Swiper className='mySwiper' spaceBetween={10} slidesPerView={1}>
          {stories.map(({ id, is_video, url }) => (
            <SwiperSlide key={id}>
              <div className='h-96 bg-zinc-800 rounded-xl'>
                <MediaRender isVideo={is_video} source={url} />
              </div>
              <div className='flex justify-between items-center mt-4 px-2'>
              <Description>Expired today at 5:21 AM</Description>
              <AiOutlineCloudDownload className='text-blue-600' size={30} />
            </div>
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
    </>
  )
}
