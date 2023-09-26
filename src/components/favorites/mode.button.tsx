import { FC } from 'react'

import { FavoritesModeList } from '../../types/favorites/favorites.types'

import { useTelegram } from '../../hooks/telegram/useTelegram'

interface IModeButtonProps {
  mode: FavoritesModeList
  onClick: (mode: FavoritesModeList) => void
}

export const ModeButton: FC<IModeButtonProps> = ({ mode, onClick }) => {
  const { themeParams } = useTelegram()

  return (
    <>
      {mode === 'stories' ? (
        <button className='bg-transparet' onClick={() => onClick('manage')}>
          <span style={{ color: themeParams.link_color }}>Manage</span>
        </button>
      ) : (
        <button onClick={() => onClick('stories')}>
          <span style={{ color: themeParams.link_color }}>Stories</span>
        </button>
      )}
    </>
  )
}
