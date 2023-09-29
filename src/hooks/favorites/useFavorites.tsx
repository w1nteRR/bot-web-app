import { useEffect, useState } from 'react'

import {
  FavoritesUserList,
  IFavoriteUser,
} from '../../types/favorites/favorites.types'
import { getFavorites, setFavorites } from '../../helpers/favorites.storage'

type UpdateType = 'remove' | 'add'

export const useFavorites = () => {
  const [list, setList] = useState<FavoritesUserList>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const updateFavorites = async (newList: FavoritesUserList) => {
    const value = JSON.stringify(newList)
    await setFavorites(value)
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
    const result = await getFavorites()

    return result.some((currentUser) => currentUser.id === user.id)
  }

  useEffect(() => {
    const loadFavoritesList = async () => {
      try {
        const result = await getFavorites()
        setList(result)
      } catch (error) {
        console.error('Favorites loading error.', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFavoritesList()
  }, [])

  console.log('LIST', list)

  return {
    isLoading,
    list,
    patch,
    check,
  }
}
