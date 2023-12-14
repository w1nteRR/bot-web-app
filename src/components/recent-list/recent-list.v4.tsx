import { FC } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate } from 'react-router-dom'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { db } from '../../db/recent-users.db'
import { Pages } from '../../types/navigation/navigation.types'

export const RecentListV4: FC = () => {
  const { themeParams } = useTelegram()
  const navigate = useNavigate()

  const recentUsers = useLiveQuery(() => db.recentUsers.toArray())

  const handleUserClick = (username: string) => {
    navigate(`${Pages.User.replace(':username', username)}`, {
      state: { from: location.pathname },
    })
  }

  if (!recentUsers?.length) return null

  return (
    <div className='mt-20 pb-11 mx-3'>
      <div className='mb-3'>
        <span
          className='uppercase text-sm'
          style={{ color: themeParams.hint_color }}
        >
          Recent search
        </span>
      </div>
      <div
        className='rounded-xl'
        style={{ backgroundColor: themeParams.secondary_bg_color }}
      >
        {recentUsers.map((user) => (
          <div key={user.id} className='p-3 flex items-center'>
            <img
              src={user.profile_image}
              alt='avatar'
              className='rounded-full w-11 h-11 mr-2'
              onClick={() => handleUserClick(user.username)}
            />
            <div>
              <p style={{ color: themeParams.text_color }} className='text-sm'>
                {user.username}
              </p>
              <p style={{ color: themeParams.hint_color }} className='text-xs'>
                {user.full_name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
