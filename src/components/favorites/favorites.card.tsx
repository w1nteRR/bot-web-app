import { memo } from 'react'
import { CgStories } from 'react-icons/cg'
import { RxCross2 } from 'react-icons/rx'

import { useTelegram } from '../../hooks/telegram/useTelegram'

import { IFavoriteUser } from '../../types/favorites/favorites.types'
import { FavoritesModeList } from '../../types/favorites/favorites.types'
import { useTranslation } from 'react-i18next'

interface IFavoritesCardProps {
  onUserClick: () => void
  onStoriesClick: () => void
  onDeleteClick: () => void
  mode: FavoritesModeList
  user: IFavoriteUser
  isLoading?: boolean
}

export const FavoriteCard = memo<IFavoritesCardProps>(
  ({ onUserClick, onDeleteClick, onStoriesClick, mode, user, isLoading }) => {
    const { themeParams } = useTelegram()
    const { t } = useTranslation()

    return (
      <div className='flex justify-between items-center px-4'>
        <div className='flex my-3 cursor-pointer' onClick={onUserClick}>
          <img
            src={user.profile_image}
            alt='avatar'
            className='w-12 h-12 mr-2 rounded-full'
          />
          <div className='flex flex-col items-start justify-center'>
            <p
              className='font-bold text-sm'
              style={{ color: themeParams.text_color }}
            >
              {user.username}
            </p>
            <p className='text-xs' style={{ color: themeParams.hint_color }}>
              {user.full_name}
            </p>
          </div>
          {isLoading && (
            <p className='ml-4 text-white text-xs'>{t('common.loading')}</p>
          )}
        </div>
        {mode === 'stories' ? (
          <button onClick={onStoriesClick}>
            <CgStories size={23} color={themeParams.hint_color} />
          </button>
        ) : (
          <button onClick={onDeleteClick}>
            <RxCross2 size={20} color={themeParams.hint_color} />
          </button>
        )}
      </div>
    )
  }
)
