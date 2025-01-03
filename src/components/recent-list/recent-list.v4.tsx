import { FC, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import { useTranslation } from 'react-i18next'
import { IoClose } from 'react-icons/io5'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useRecentUsers } from '../../hooks/recent/useRecentUsers'

import { Pages } from '../../types/navigation/navigation.types'
import { UserCard } from '../shared/cards/user-card'
import { useRecentUsersStore } from '../../store/recent-users.store'

import noRecent from '../../assets/lottie/no-recents.json'

export const RecentListV4: FC = () => {
  const { themeParams, HapticFeedback } = useTelegram()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { removeUserFromRecentCloudStorage, resetRecentUsers } =
    useRecentUsers()

  const recentUsers = useRecentUsersStore((state) => state.recentUsers)

  const handleUserClick = useCallback((username: string) => {
    navigate(`${Pages.User.replace(':username', username)}`, {
      state: { from: location.pathname },
    })
  }, [])

  const handleUserDelete = useCallback(async (id: string) => {
    await removeUserFromRecentCloudStorage(id)
    HapticFeedback.impactOccurred('light')
  }, [])

  const handleResetRecentUsers = useCallback(() => {
    resetRecentUsers()

    HapticFeedback.impactOccurred('heavy')
  }, [])

  const reversedRecentUsers = useMemo(
    () => [...recentUsers].reverse(),
    [recentUsers.length],
  )

  if (!recentUsers?.length)
    return (
      <div className='relative'>
        <Lottie animationData={noRecent} className='h-80' />

        <div className='flex flex-col items-center absolute bottom-0 w-full'>
          <p className='font-medium' style={{ color: themeParams.text_color }}>
            {t('recentUsers.noRecentUsers.title')}
          </p>
          <p className='text-sm' style={{ color: themeParams.hint_color }}>
            {t('recentUsers.noRecentUsers.subtitle')}
          </p>
        </div>
      </div>
    )

  return (
    <div className='mt-12 pb-11 mx-3'>
      <div className='mb-3 flex justify-between items-center'>
        <p
          className='uppercase text-sm'
          style={{ color: themeParams.section_header_text_color }}
        >
          {t('home.recentSearch')}
        </p>

        <button onClick={handleResetRecentUsers}>
          <span style={{ color: themeParams.link_color }}>
            {t('common.clearAll')}
          </span>
        </button>
      </div>
      <div
        className='rounded-xl'
        style={{ backgroundColor: themeParams.section_bg_color }}
      >
        {reversedRecentUsers.map((user) => (
          <div key={user.id} className='p-3 flex justify-between '>
            <UserCard
              {...user}
              onUserAvatarClick={() => handleUserClick(user.username)}
            />

            <button
              className='flex items-center'
              onClick={() => handleUserDelete(user.id)}
            >
              <IoClose size={18} color={themeParams.hint_color} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
