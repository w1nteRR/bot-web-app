import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { SwiperSlide, Swiper } from 'swiper/react'

import { useHighlights } from '../../hooks/queries/useHighlights'
import { useTelegram } from '../../hooks/telegram/useTelegram'

import { Id } from '../../types/common'

import 'swiper/css'

interface IHighlightsProps {
  userId: Id
}

export const Highlights: FC<IHighlightsProps> = ({ userId }) => {
  const { isLoading, data, error } = useHighlights(userId)

  const navigate = useNavigate()
  const { themeParams } = useTelegram()

  const onHighlightClick = (id: string) => () => {
    console.log('REDIRECT', id)

    navigate(`highlight/${id}`)
  }

  if (!data) return <p className='text-gray-200'>loading highlights...</p>

  // if (error) return <p className='text-gray-200'>error</p>

  console.log('DATA', data)

  return (
    <>
      <Swiper className='mySwiper' spaceBetween={5} slidesPerView={4.3}>
        {data?.data.highlights.map(({ id, cover, title }) => (
          <SwiperSlide key={id} onClick={onHighlightClick(id)}>
            <>
              <img
                className='h-14 w-14 rounded-full cursor-pointer'
                src={cover}
                alt=''
              />
            </>
            <div className='mt-1 px-2'>
              <p
                className='truncate w-14 text-xs font-medium mt-1'
                style={{ color: themeParams.text_color }}
              >
                {title}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
