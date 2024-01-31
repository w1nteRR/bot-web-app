import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useFavorites } from '../../hooks/favorites/useFavorites'

import { IFavoriteUser } from '../../types/favorites/favorites.types'

interface IAddToFavoritesProps {
  user: IFavoriteUser
}

export const AddToFavorites: FC<IAddToFavoritesProps> = ({ user }) => {
  const [isUserFavorite, setIsUserFavorite] = useState<boolean | 'pending'>(
    'pending',
  )

  const { patch, check, list } = useFavorites()
  const { themeParams, showAlert, showConfirm, HapticFeedback } = useTelegram()
  const { t } = useTranslation()

  const onButtonClick = async () => {
    const isUserExist = await check(user)

    if (isUserExist) {
      showConfirm(t('common.areUSure'), async (confirmed) => {
        if (confirmed) {
          await patch(user, 'remove')
          setIsUserFavorite(false)

          return
        }
      })
    }

    if (list.length >= 25) {
      HapticFeedback.notificationOccurred('error')
      showAlert(t('favorites.limitError'))

      return
    }

    await patch(user, 'add')

    setIsUserFavorite(true)
    showAlert(t('common.userAddedToFavorites'))
  }

  useEffect(() => {
    const checkIsUserFavorite = async () => {
      const result = await check(user)

      setIsUserFavorite(result)
    }

    checkIsUserFavorite()
  }, [])

  // if (isUserFavorite === 'pending')
  //   return <div className='p-3 w-full max-w-xs' />

  return (
    <button
      className='p-2 rounded-xl w-full  font-semibold'
      style={{
        backgroundColor: isUserFavorite
          ? themeParams.secondary_bg_color
          : themeParams.button_color,
        color: isUserFavorite
          ? themeParams.text_color
          : themeParams.button_text_color,
      }}
      onClick={onButtonClick}
    >
      {isUserFavorite ? t('favorites.removeFrom') : t('favorites.addTo')}
    </button>
  )
}
