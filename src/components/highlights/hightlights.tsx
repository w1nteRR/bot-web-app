import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { SwiperSlide, Swiper } from 'swiper/react'

import { useHighlights } from '../../hooks/queries/useHighlights'
import { useTelegram } from '../../hooks/telegram/useTelegram'

import { Id } from '../../types/common'

import 'swiper/css'
import { Title } from '../ui/typography/title.ui'
import { useTranslation } from 'react-i18next'

interface IHighlightsProps {
  userId: Id
}

export const Highlights: FC<IHighlightsProps> = ({ userId }) => {
  const { isLoading, data, error } = useHighlights(userId)

  const navigate = useNavigate()
  const { themeParams } = useTelegram()
  const { t } = useTranslation()

  const onHighlightClick = (id: string) => () => {
    console.log('REDIRECT', id)

    navigate(`highlight/${id}`)
  }

  if (!data)
    return (
      <div className='flex direction-row'>
        {[0, 1, 2, 3, 4].map((x) => (
          <div
            key={x}
            role='status'
            className='mr-4 space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center'
          >
            <div className='flex justify-center items-center w-14 h-14 bg-gray-300 rounded-full'></div>
          </div>
        ))}
      </div>
    )

  console.log('DATA', data)

  return (
    <>
      <div className='mb-10'>
        <Title>{t('common.highlights')}</Title>
      </div>
      <Swiper className='mySwiper' slidesPerView={4.3}>
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
