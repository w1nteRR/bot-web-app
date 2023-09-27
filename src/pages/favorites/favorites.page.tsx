import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModeButton } from '../../components/favorites/mode.button'
import { FavoritesList } from '../../components/favorites/favorites.list'

import { useBackButton } from '../../hooks/telegram/useBackButton'

import { FavoritesModeList } from '../../types/favorites/favorites.types'

export const FavoritesPage: FC = () => {
  const [listMode, setListMode] = useState<FavoritesModeList>('stories')

  const navigate = useNavigate()

  useBackButton(() => navigate(-1))

  const handleListModeButton = (mode: FavoritesModeList) => {
    setListMode(mode)
  }

  return (
    <>
      <div className='flex justify-end items-center p-3'>
        <ModeButton mode={listMode} onClick={handleListModeButton} />
      </div>

      <div className='pt-10'>
        <FavoritesList listMode={listMode} />
      </div>
    </>
  )
}
