import { FC } from 'react'
import { FaLock } from 'react-icons/fa'

import { SpinLoader } from '../ui/loaders/spin-loader'
import { UserCard } from '../shared/cards/user-card'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useFavoritesContext } from '../../hooks/context/useFavoritesContext'
import { useGetNotificationsQuery } from '../../hooks/queries/notifications/useGetNotificationsQuery'
import { useTranslation } from 'react-i18next'

export const FavoritesModalContent: FC = () => {
  const { data: notifications, isLoading, isError } = useGetNotificationsQuery()

  const { themeParams } = useTelegram()
  const { favorites, remove } = useFavoritesContext()
  const { t } = useTranslation()

  if (isLoading) return <SpinLoader fullscreen />

  const usersInTracking = () => {
    if (isError) return []

    return notifications?.map((user) => Number(user.id)) || []
  }

  return (
    <div
      className='m-5 p-2 rounded-xl'
      style={{ backgroundColor: themeParams.section_bg_color }}
    >
      {favorites.map((user) => (
        <div className='py-2 flex items-center justify-between' key={user.id}>
          <UserCard {...user} />
          <div className='flex justify-center w-14 items-center'>
            {usersInTracking().includes(Number(user.id)) ? (
              <button
                className='rounded-full p-3 flex items-center justify-center'
                disabled
              >
                <FaLock size={12} color={themeParams.link_color} />
              </button>
            ) : (
              <button
                className='px-2 py-1 mr-4 rounded-full flex items-center justify-center'
                style={{ backgroundColor: themeParams.secondary_bg_color }}
                onClick={async () => await remove(user.id)}
              >
                <span
                  className='text-xs'
                  style={{ color: themeParams.text_color }}
                >
                  {t('common.remove')}
                </span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
