import { FC, useMemo, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Grid } from 'swiper'
import { useNavigate } from 'react-router-dom'
import { BsList, BsGridFill } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'

import { Margin } from '../ui/spacing/margin.ui'
import { Title } from '../ui/typography/title.ui'

import { useRecent } from '../../hooks/recent/useRecent'

import 'swiper/css'
import 'swiper/css/grid'
import { Overline } from '../ui/typography/overline.ui'
import { useTelegram } from '../../hooks/telegram/useTelegram'

export const RecentList: FC = () => {
  const [view, setView] = useState<'list' | 'grid'>('list')

  const { recentSearchList } = useRecent()

  const { themeParams, colorScheme, showAlert, HapticFeedback } = useTelegram()
  const navigate = useNavigate()

  if (!recentSearchList.length) return null

  return (
    <>
      <Margin>
        <div className='flex justify-between items-center'>
          <Title>Recent Activity</Title>
          {/* {view !== 'list' ? (
            <BsList
              color={themeParams.link_color}
              size={25}
              onClick={() => setView('list')}
            />
          ) : (
            <BsGridFill
              color={themeParams.link_color}
              size={20}
              onClick={() => setView('grid')}
            />
          )} */}
        </div>
      </Margin>
      <Swiper
        slidesPerView={view === 'grid' ? 3 : 1}
        grid={{
          rows: view === 'grid' ? 2 : 4,
          fill: 'row',
        }}
        spaceBetween={view === 'grid' ? 30 : 5}
        modules={[Grid]}
        className='mySwiper'
      >
        {recentSearchList.map(({ pk_id, profile_image, username }) => (
          <SwiperSlide
            key={pk_id}
            onClick={() => navigate(`/user/${username}`)}
          >
            {view === 'grid' ? (
              <div>
                <div className='h-24 w-24'>
                  <img src={profile_image} className='rounded-md' alt='' />
                </div>
                <p
                  className='mt-2 text-xs font-bold'
                  style={{ color: themeParams.text_color }}
                >
                  {username}
                </p>
              </div>
            ) : (
              <div className='flex w-full rounded p-3'>
                <div className='w-14 h-14 flex-2'>
                  <img src={profile_image} alt='' className='rounded-xl' />
                </div>
                <div className='flex items-start flex-col justify-start flex-1 mx-3'>
                  <p
                    className='mt-2 text-md font-bold'
                    style={{ color: themeParams.text_color }}
                  >
                    {username}
                  </p>
                  <p style={{ color: 'gray' }} className='text-xs'>
                    Last visit today at 5 AM
                  </p>
                </div>
                <div className='flex items-center flex-3'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()

                      showAlert('No stories found')
                      HapticFeedback.notificationOccurred('error')
                      console.log('TRIGGER')
                    }}
                    className='px-4 py-2 text-sm rounded-xl font-bold'
                    style={{
                      color: themeParams.link_color,
                      backgroundColor:
                        colorScheme === 'dark'
                          ? themeParams.bg_color
                          : themeParams.secondary_bg_color,
                    }}
                  >
                    Check
                  </button>
                  {/* <MdCancel color='gray' size={20} /> */}
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* {recentSearchList.map(({ pk_id, profile_image, username }) => (
        <div key={pk_id} className=' flex  items-center justify-center mb-3'>
          <img
            src={profile_image}
            alt=''
            className='flex-none w-8 h-8 rounded-full'
          />
          <div className='flex flex-1  items-center mx-3'>
            <span className='text-slate-200 font-semibold'>{username}</span>
          </div>
          <button className='flex-2 items-center p-3'>
            <MdCancel color='gray' size={20} />
          </button>
        </div>
      ))} */}
    </>
  )
}
