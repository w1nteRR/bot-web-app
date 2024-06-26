import { useEffect, useState } from 'react'

import {
  FavoritesUserList,
  IFavoriteUser,
} from '../../types/favorites/favorites.types'
import {
  getFavoritesStorage,
  setFavoritesStorage,
} from '../../helpers/favorites.storage'
import { useTelegram } from '../telegram/useTelegram'

type UpdateType = 'remove' | 'add'

export const useFavorites = () => {
  const [list, setList] = useState<FavoritesUserList>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { showConfirm, HapticFeedback } = useTelegram()

  const updateFavorites = async (newList: FavoritesUserList) => {
    const value = JSON.stringify(newList)
    await setFavoritesStorage(value)
    setList(newList)
  }

  const patch = async (user: IFavoriteUser, type: UpdateType) => {
    let newList: FavoritesUserList = [...list]

    try {
      if (type === 'add') {
        newList.push(user)
      }

      if (type === 'remove') {
        newList = newList.filter((currentUser) => currentUser.id !== user.id)
      }

      await updateFavorites(newList)
    } catch (error) {
      console.error('Error patching favorites:', error)
    }
  }

  const check = async (user: IFavoriteUser) => {
    const result = await getFavoritesStorage()

    return result.some((currentUser) => currentUser.id === user.id)
  }

  const remove = async (user: IFavoriteUser) => {
    showConfirm('Are you sure?', async (confirmed) => {
      if (confirmed) {
        await patch(user, 'remove')

        HapticFeedback.notificationOccurred('success')
      }
    })
  }

  useEffect(() => {
    const loadFavoritesList = async () => {
      setIsLoading(true)
      try {
        const result = await getFavoritesStorage()
        setList(result)
      } catch (error) {
        console.error('Favorites loading error.', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFavoritesList()
  }, [])

  return {
    isLoading,
    list,
    patch,
    check,
    remove,
  }
}
