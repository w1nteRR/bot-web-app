import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IoClose } from 'react-icons/io5'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useRecentUsers } from '../../hooks/recent/useRecentUsers'

import { Pages } from '../../types/navigation/navigation.types'

export const RecentListV4: FC = () => {
  const { themeParams } = useTelegram()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    recentUsers,
    removeUserFromRecentCloudStorage,
    removeAllUsersFromRecentCloudStorage,
  } = useRecentUsers()

  const handleUserClick = (username: string) => {
    navigate(`${Pages.User.replace(':username', username)}`, {
      state: { from: location.pathname },
    })
  }

  if (!recentUsers?.length) return null

  return (
    <div className='mt-20 pb-11 mx-3'>
      <div className='mb-3 flex justify-between items-center'>
        <p
          className='uppercase text-sm'
          style={{ color: themeParams.hint_color }}
        >
          {t('home.recentSearch')}
        </p>

        <button onClick={removeAllUsersFromRecentCloudStorage}>
          <span style={{ color: themeParams.link_color }}>
            {t('common.clearAll')}
          </span>
        </button>
      </div>
      <div
        className='rounded-xl'
        style={{ backgroundColor: themeParams.secondary_bg_color }}
      >
        {recentUsers.map((user) => (
          <div key={user.id} className='p-3 flex justify-between '>
            <div className='flex'>
              <img
                src={user.profile_image}
                alt='avatar'
                className='rounded-full w-11 h-11 mr-2'
                onClick={() => handleUserClick(user.username)}
              />
              <div>
                <p
                  style={{ color: themeParams.text_color }}
                  className='text-sm'
                >
                  {user.username}
                </p>
                <p
                  style={{ color: themeParams.hint_color }}
                  className='text-xs'
                >
                  {user.full_name}
                </p>
              </div>
            </div>

            <button
              className='flex items-center'
              onClick={async () =>
                await removeUserFromRecentCloudStorage(user.id)
              }
            >
              <IoClose size={18} color={themeParams.hint_color} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
