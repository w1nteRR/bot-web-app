import { useEffect } from 'react'
import { useRecentUsersStore } from '../../store/recent-users.store'

import { CloudStorageKeys } from '../../helpers/cloud-storage'
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

    const cloudStorage = window.Telegram.WebApp.CloudStorage

    cloudStorage.setItem(CloudStorageKeys.Recent, value)
  }

  const addUserToRecentCloudStorage = async (user: IRecentUser) => {
    const isUserFavorite = favorites.some(
      (favoriteUser) => favoriteUser.id === user.id,
    )

    const isUserExist = recentUsers.some(
      (recentUser) => recentUser.id === user.id,
    )

    if (isUserExist || isUserFavorite) return

    const updatedRecentUsers = [...recentUsers, user]

    await updateRecentUsers(updatedRecentUsers)
    addRecentUser(user)
  }

  const removeUserFromRecentCloudStorage = async (id: string) => {
    if (!recentUsers.length) return
    removeRecentUser(id)
  }

  useEffect(() => {
    initRecentUsers()
  }, [])

  return {
    addUserToRecentCloudStorage,
    removeUserFromRecentCloudStorage,
    removeRecentUser,
    resetRecentUsers,
    recentUsers,
  }
}
