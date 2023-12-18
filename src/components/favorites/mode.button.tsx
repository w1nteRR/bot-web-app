import { FC } from 'react'

import { FavoritesModeList } from '../../types/favorites/favorites.types'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useTranslation } from 'react-i18next'

interface IModeButtonProps {
  mode: FavoritesModeList
  onClick: (mode: FavoritesModeList) => void
}

export const ModeButton: FC<IModeButtonProps> = ({ mode, onClick }) => {
  const { themeParams } = useTelegram()
  const { t } = useTranslation()

  return (
    <>
      {mode === 'stories' ? (
        <button className='bg-transparet' onClick={() => onClick('manage')}>
          <span style={{ color: themeParams.link_color }}>
            {t('common.manage')}
          </span>
        </button>
      ) : (
        <button onClick={() => onClick('stories')}>
          <span style={{ color: themeParams.link_color }}>
            {t('common.stories')}
          </span>
        </button>
      )}
    </>
  )
}
