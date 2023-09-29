import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModeButton } from '../../components/favorites/mode.button'
import { FavoriteCard } from '../../components/favorites/favorites.card'

import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useFavorites } from '../../hooks/favorites/useFavorites'

import {
  FavoritesModeList,
  IFavoriteUser,
} from '../../types/favorites/favorites.types'

export const FavoritesPage: FC = () => {
  const [listMode, setListMode] = useState<FavoritesModeList>('stories')

  const navigate = useNavigate()

  const { themeParams, showConfirm, HapticFeedback } = useTelegram()
  const { list, patch, isLoading } = useFavorites()

  useBackButton(() => navigate(-1))

  const handleListModeClick = (mode: FavoritesModeList) => {
    setListMode(mode)
  }

  const handleUserClick = (username: string) => {
    navigate(`/user/${username}`)
  }

  const handleStoriesClick = (user: IFavoriteUser) => {
    navigate(`/user/stories/${user.id}`, { state: { user } })
  }

  const handleRemoveFavorite = async (user: IFavoriteUser) => {
    try {
      showConfirm('Are you sure?', async (confirmed) => {
        if (confirmed) {
          await patch(user, 'remove')

          HapticFeedback.notificationOccurred('success')
        }
      })
    } catch (error) {}
  }

  if (isLoading)
    return (
      //refactor

      <p style={{ color: themeParams.text_color }} className='text-center'>
        Loading...
      </p>
    )

  if (!list.length)
    return (
      //refactor

      <p style={{ color: themeParams.text_color }} className='text-center'>
        No favorites users.
      </p>
    )

  return (
    <>
      <div className='flex justify-end items-center p-3'>
        <ModeButton mode={listMode} onClick={handleListModeClick} />
      </div>

      <div className='pt-10'>
        {list.map((user: IFavoriteUser) => (
          <FavoriteCard
            key={user.id}
            user={user}
            mode={listMode}
            onDeleteClick={() => handleRemoveFavorite(user)}
            onStoriesClick={() => handleStoriesClick(user)}
            onUserClick={() => handleUserClick(user.username)}
          />
        ))}
      </div>
    </>
  )
}
