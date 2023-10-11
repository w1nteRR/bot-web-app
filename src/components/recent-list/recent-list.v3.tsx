import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'

import { useTelegram } from '../../hooks/telegram/useTelegram'

import { IRecentUser } from '../../types/user/user.types'
import { db } from '../../db/recent-users.db'

import 'swiper/css/free-mode'
import { RecentCard } from './recent.card'

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
      <div className='w-full mt-5 whitespace-nowrap overflow-scroll no-scrollbar'>
        {recentUsers?.map((user) => (
          <RecentCard
            key={user.id}
            username={user.username}
            image={user.profile_image}
            onClick={() => onUserClick(user)}
          />
        ))}
      </div>
    </>
  )
}
