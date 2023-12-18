import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModeButton } from '../../components/favorites/mode.button'
import { FavoriteCard } from '../../components/favorites/favorites.card'

import { useBackButton } from '../../hooks/telegram/useBackButton'
import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useFavorites } from '../../hooks/favorites/useFavorites'
import { useStoriesQuery } from '../../hooks/stories/useStoriesQuery'

import {
  FavoritesModeList,
  IFavoriteUser,
} from '../../types/favorites/favorites.types'
import { Pages } from '../../types/navigation/navigation.types'
import { useTranslation } from 'react-i18next'

export const FavoritesPage: FC = () => {
  const [listMode, setListMode] = useState<FavoritesModeList>('stories')

  const navigate = useNavigate()

  const { t } = useTranslation()
  const { themeParams, HapticFeedback, showAlert } = useTelegram()
  const { list, remove, isLoading } = useFavorites()

  useBackButton(() => navigate(Pages.Home))

  const { setUser, query, user } = useStoriesQuery()

  const handleListModeClick = (mode: FavoritesModeList) => {
    setListMode(mode)
  }

  const handleUserClick = (username: string) => {
    navigate(`/user/${username}`, { state: { from: Pages.Favorites } })
  }

  const handleStoriesClick = (user: IFavoriteUser) => {
    HapticFeedback.selectionChanged()
    setUser(user)
  }

  useEffect(() => {
    if (user.id) {
      query.refetch().then((result) => {
        if (result.isError) {
          showAlert(t('common.storiesNotFound'))
        }
      })
    }
  }, [user.id])

  if (isLoading)
    return (
      //refactor

      <p style={{ color: themeParams.text_color }} className='text-center'>
        {t('common.loading')}
      </p>
    )

  if (!list.length)
    return (
      //refactor

      <p style={{ color: themeParams.text_color }} className='text-center'>
        {t('common.noFavoritesUsers')}
      </p>
    )

  return (
    <>
      <div className='flex justify-end items-center p-3'>
        <ModeButton mode={listMode} onClick={handleListModeClick} />
      </div>

      <div className='pt-10'>
        {list.map((currentUser: IFavoriteUser) => (
          <FavoriteCard
            key={currentUser.id}
            user={currentUser}
            mode={listMode}
            onDeleteClick={() => remove(currentUser)}
            onStoriesClick={() => handleStoriesClick(currentUser)}
            onUserClick={() => handleUserClick(currentUser.username)}
            isLoading={user.id === currentUser.id}
          />
        ))}
      </div>
    </>
  )
}
