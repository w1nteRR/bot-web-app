import { FC, memo } from 'react'
import { IFavoriteUser } from '../../../types/favorites/favorites.types'
import { useTelegram } from '../../../hooks/telegram/useTelegram'

interface  IUserCardProps extends IFavoriteUser {
  onUserAvatarClick?: () => void
}
export const UserCard = memo<IUserCardProps>(({ profile_image, username, full_name, onUserAvatarClick }) => {

  const { themeParams } = useTelegram()

  return (
      <div className='flex'>
        <img
          src={profile_image}
          alt='avatar'
          className='rounded-full w-11 h-11 mr-2'
          onClick={onUserAvatarClick}
        />
        <div>
          <p
            style={{ color: themeParams.text_color }}
            className='text-sm'
          >
            {username}
          </p>
          <p
            style={{ color: themeParams.hint_color }}
            className='text-xs'
          >
            {full_name}
          </p>
        </div>
      </div>
  )
})