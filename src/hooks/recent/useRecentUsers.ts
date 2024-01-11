import { useEffect, useState } from 'react'
import { CloudStorage, CloudStorageKeys } from '../../helpers/cloud-storage'
import { IRecentUser } from '../../types/user/user.types'

type List = Array<IRecentUser>

export const useRecentUsers = () => {
  const [recentUsers, setRecentUsers] = useState<List>([])

  const updateRecentUsers = async (list: List) => {
    const value = JSON.stringify(list)

    await CloudStorage.setValue(CloudStorageKeys.Recent, value)

    setRecentUsers(list)
  }

  const addUserToRecentCloudStorage = async (user: IRecentUser) => {
    let list = [...recentUsers]

    try {
      const isUserExist = recentUsers.some(
        (recentUser) => recentUser.id === user.id
      )

      if (isUserExist) return

      list.push(user)

      await updateRecentUsers(list)
    } catch (error) {
      console.log('USER SAVE ERROR', error)
    }
  }

  const removeUserFromRecentCloudStorage = async (id: string) => {
    let list = [...recentUsers]

    try {
      list = list.filter((user) => user.id !== id)

      await updateRecentUsers(list)
    } catch (error) {
      console.log('USER REMOVE ERROR', error)
    }
  }

  const removeAllUsersFromRecentCloudStorage = async () => {
    try {
      await updateRecentUsers([])
    } catch (error) {
      console.log('RECENT REMOVE ALL ERROR', error)
    }
  }

  const loadRecentUsers = async () => {
    try {
      const recentUsers = await CloudStorage.values(CloudStorageKeys.Recent)

      setRecentUsers(recentUsers)
    } catch (error) {
      console.log('LOAD ERROR', error)
    }
  }

  useEffect(() => {
    loadRecentUsers()
  }, [])

  return {
    addUserToRecentCloudStorage,
    removeUserFromRecentCloudStorage,
    removeAllUsersFromRecentCloudStorage,
    recentUsers,
  }
}
