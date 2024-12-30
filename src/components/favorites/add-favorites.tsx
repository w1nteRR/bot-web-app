import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useTelegram } from '../../hooks/telegram/useTelegram'
import { useFavoritesContext } from '../../hooks/context/useFavoritesContext'

import { IFavoriteUser } from '../../types/favorites/favorites.types'
import { useWebAppUserContext } from '../../hooks/context/useWebAppUserContext'
import { FavoritesLimits } from '../../types/subscription/subscription.types'

interface IAddToFavoritesProps {
  user: IFavoriteUser
  isUserInTracking: boolean
}

export const AddToFavorites: FC<IAddToFavoritesProps> = ({
  user,
  isUserInTracking,
}) => {
  const [isUserFavorite, setIsUserFavorite] = useState<boolean | 'pending'>(
    'pending',
  )

  const { themeParams, showAlert, showConfirm, HapticFeedback } = useTelegram()
  const { t } = useTranslation()
  const { user: webUser } = useWebAppUserContext()

  const {
    favorites,
    remove: removeUserFromFavorites,
    add: addUserToFavorites,
    check,
  } = useFavoritesContext()

  const onButtonClick = async () => {
    const isUserExist = check(user.id)

    const limit = webUser?.is_subscriber
      ? FavoritesLimits.Unlimited
      : FavoritesLimits.Limited

    if (isUserExist) {
      showConfirm(t('common.areUSure'), async (confirmed) => {
        if (confirmed) {
          await removeUserFromFavorites(user.id)
          HapticFeedback.notificationOccurred('warning')

          return
        }
      })

      return
    }

    if (favorites.length >= limit) {
      HapticFeedback.notificationOccurred('error')
      showAlert(t('favorites.limitError'))

      return
    }

    await addUserToFavorites(user)
    HapticFeedback.notificationOccurred('success')
  }

  useEffect(() => {
    const checkIsUserFavorite = async () => {
      const result = check(user.id)

      setIsUserFavorite(result)
    }

    void checkIsUserFavorite()
  }, [favorites.length])

  if (isUserInTracking) return null

  return (
    <button
      className='p-2 rounded-xl w-full  font-semibold'
      style={{
        backgroundColor: isUserFavorite
          ? themeParams.bg_color
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
