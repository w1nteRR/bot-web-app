import { SwiperSlide, Swiper } from 'swiper/react'
import { FreeMode } from 'swiper'
import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'

import { useTelegram } from '../../hooks/telegram/useTelegram'

import { users } from '../../mock/recent.mock'
import { IRecentUser } from '../../types/user/user.types'
import { db } from '../../db/recent-users.db'

export const RecentListV3 = () => {
  const { themeParams } = useTelegram()
  const navigate = useNavigate()

  const onUserClick = (user: IRecentUser) => {
    const { id } = user

    navigate(`user/stories/${id}`, { state: { user } })
  }

  const recentUsers = useLiveQuery(() => db.recentUsers.toArray())

  if (!recentUsers?.length) return null

  return (
    <>
      <div className='mx-5'>
        <span
          className='uppercase text-sm'
          style={{ color: themeParams.hint_color }}
        >
          recent search
        </span>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={5.2}
        style={{ paddingLeft: 20, paddingRight: 5 }}
        freeMode={true}
        modules={[FreeMode]}
        className='mySwiper mt-5'
      >
        {recentUsers?.map((user) => (
          <SwiperSlide key={user.id} onClick={() => onUserClick(user)}>
            <img
              className='w-16 h-16 rounded-full'
              alt=''
              src={user.profile_image}
            />
            <p
              className='truncate w-16 text-xs font-medium mt-1'
              style={{ color: themeParams.text_color }}
            >
              {user.username}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
