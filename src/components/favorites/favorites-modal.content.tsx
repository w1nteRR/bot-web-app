import { FC } from 'react'
import { FaLock } from 'react-icons/fa'

import { SpinLoader } from '../ui/loaders/spin-loader'
import { UserCard } from '../shared/cards/user-card'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useFavoritesContext } from '../../hooks/context/useFavoritesContext'
import { useGetNotificationsQuery } from '../../hooks/queries/notifications/useGetNotificationsQuery'

export const FavoritesModalContent: FC = () => {
  const { data: notifications, isLoading } = useGetNotificationsQuery()

  const { themeParams } = useTelegram()
  const { favorites, remove } = useFavoritesContext()

  if (isLoading) return <SpinLoader fullscreen />

  const notificationsIds = notifications?.map(({ id }) => id) || []

  return (
    <div className='mx-5'>
      {favorites.map((user) => (
        <div className='py-2 flex items-center justify-between' key={user.id}>
          <UserCard {...user} />
          <div className='flex justify-center w-14 items-center'>
            {notificationsIds.includes(user.id) ? (
              <button
                className='rounded-full p-3 flex items-center justify-center'
                disabled
              >
                <FaLock size={12} color={themeParams.link_color} />
              </button>
            ) : (
              <button
                className='w-14 py-1 rounded-full flex items-center justify-center'
                style={{ backgroundColor: themeParams.secondary_bg_color }}
                onClick={async () => await remove(user.id)}
              >
                <span
                  className='text-xs'
                  style={{ color: themeParams.text_color }}
                >
                  Remove
                </span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
