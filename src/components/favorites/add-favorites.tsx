import { FC, useEffect, useState } from 'react'

import { useFavorites } from '../../hooks/favorites/useFavorites'
import { useTelegram } from '../../hooks/telegram/useTelegram'

import { IFavoriteUser } from '../../types/user/user.types'

interface IAddToFavoritesProps {
  user: IFavoriteUser
}

export const AddToFavorites: FC<IAddToFavoritesProps> = ({ user }) => {
  const [isUserFavorite, setIsUserFavorite] = useState<boolean | 'pending'>(
    'pending'
  )

  const { add, check, remove } = useFavorites()
  const { themeParams, showAlert, showConfirm } = useTelegram()

  const onButtonClick = async () => {
    const isUserExist = await check(user.id)

    if (isUserExist) {
      showConfirm('Are u sure?', async (confirmed) => {
        if (confirmed) {
          await remove(user.id)
          setIsUserFavorite(false)
        }
      })
    }

    add(user.id, JSON.stringify(user))

    setIsUserFavorite(true)
    showAlert('User added to favorites.')
  }

  useEffect(() => {
    const checkIsUserFavorite = async () => {
      const result = await check(user.id)

      setIsUserFavorite(result)
    }

    checkIsUserFavorite()
  }, [])

  if (isUserFavorite === 'pending')
    return <div className='p-3 w-full max-w-xs' />

  return (
    <button
      className='p-3 rounded-xl w-full max-w-xs font-semibold'
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
      {isUserFavorite ? 'Remove from favorites' : 'Add to favorites'}
    </button>
  )
}
