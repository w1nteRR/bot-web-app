import { FC } from 'react'
import { UserCard } from '../shared/cards/user-card'
import { useTelegram } from '../../hooks/telegram/useTelegram'
import { IFavoriteUser } from '../../types/favorites/favorites.types'

interface INotificationsManageModalContentProps {
  favorites: IFavoriteUser[]
  selectedNotificationsAccounts: IFavoriteUser[]
  isNotificationsAccountsLimit: boolean
  onAccountClick: (user: IFavoriteUser) => void
}

export const NotificationsManageModalContent: FC<
  INotificationsManageModalContentProps
> = ({
  favorites,
  selectedNotificationsAccounts,
  isNotificationsAccountsLimit,
  onAccountClick,
}) => {
  const { themeParams } = useTelegram()

  return (
    <>
      {favorites.map((user) => {
        const isSelected = selectedNotificationsAccounts.some(
          (selectedAccount) => selectedAccount.id === user.id,
        )

        return (
          <div key={user.id} className='p-3 flex justify-between'>
            <UserCard {...user} />

            <div className='flex items-center'>
              {isSelected ? (
                <button
                  className='w-14 py-1 rounded-full flex items-center justify-center'
                  style={{ backgroundColor: themeParams.secondary_bg_color }}
                  onClick={() => onAccountClick(user)}
                >
                  <span
                    className='text-xs'
                    style={{ color: themeParams.text_color }}
                  >
                    Remove
                  </span>
                </button>
              ) : (
                <button
                  disabled={isNotificationsAccountsLimit}
                  className='w-14 py-1 rounded-full flex items-center justify-center'
                  style={{ backgroundColor: themeParams.button_color }}
                  onClick={() => onAccountClick(user)}
                >
                  <span
                    className='text-xs'
                    style={{ color: themeParams.button_text_color }}
                  >
                    Add
                  </span>
                </button>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}
