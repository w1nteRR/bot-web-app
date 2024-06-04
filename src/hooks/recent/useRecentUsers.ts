import { useEffect } from 'react'
import { useRecentUsersStore } from '../../store/recent-users.store'

import { CloudStorage, CloudStorageKeys } from '../../helpers/cloud-storage'
import { IRecentUser } from '../../types/user/user.types'
import { useFavoritesContext } from '../context/useFavoritesContext'

type List = Array<IRecentUser>

export const useRecentUsers = () => {
  const recentUsers = useRecentUsersStore((state) => state.recentUsers)

  const initRecentUsers = useRecentUsersStore((state) => state.init)
  const removeRecentUser = useRecentUsersStore((state) => state.remove)
  const addRecentUser = useRecentUsersStore((state) => state.add)
  const resetRecentUsers = useRecentUsersStore((state) => state.reset)

  const { favorites } = useFavoritesContext()

  const updateRecentUsers = async (list: List) => {
    const value = JSON.stringify(list)

    await CloudStorage.setValue(CloudStorageKeys.Recent, value)
  }

  const addUserToRecentCloudStorage = (user: IRecentUser) => {
    const isUserFavorite = favorites.some(
      (favoriteUser) => favoriteUser.id === user.id,
    )

    const isUserExist = recentUsers.some(
      (recentUser) => recentUser.id === user.id,
    )

    if (isUserExist || isUserFavorite) return

    addRecentUser(user)
  }

  const loadRecentUsers = async () => {
    try {
      const recentUsers = await CloudStorage.values(CloudStorageKeys.Recent)

      initRecentUsers(recentUsers)
    } catch (error) {
      console.log('LOAD ERROR', error)
    }
  }

  useEffect(() => {
    const load = async () => {
      await loadRecentUsers()
    }

    load()
  }, [])

  useEffect(() => {
    const updateRecentUsersStorage = async () => {
      await updateRecentUsers(recentUsers)
    }

    updateRecentUsersStorage()
  }, [recentUsers.length])

  return {
    addUserToRecentCloudStorage,
    removeRecentUser,
    resetRecentUsers,
    recentUsers,
  }
}
