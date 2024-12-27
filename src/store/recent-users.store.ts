import { create } from 'zustand'
import { IRecentUser } from '../types/user/user.types'
import { CloudStorageKeys } from '../helpers/cloud-storage'

interface IRecentUsersStore {
  recentUsers: IRecentUser[]
  init: () => void
  reset: () => void
  remove: (id: string) => void
  add: (user: IRecentUser) => void
}

const MAX_RECENT_USERS = 5
const cloudStorage = window.Telegram.WebApp.CloudStorage

export const useRecentUsersStore = create<IRecentUsersStore>()((set) => ({
  recentUsers: [],

  init: async () => {
    cloudStorage.getItem(CloudStorageKeys.Recent, (error, result) => {
      if (error) return new Error(error)

      const recentUsers = JSON.parse(result || '[]')

      set(() => ({ recentUsers }))
    })
  },

  reset: () => {
    cloudStorage.setItem(
      CloudStorageKeys.Recent,
      JSON.stringify([]),
    )

    set({ recentUsers: [] })
  },

  add: (user) => {
    set((state) => {
      let updatedRecentUsers = [...state.recentUsers, user]

      if (updatedRecentUsers.length > MAX_RECENT_USERS) {
        updatedRecentUsers = updatedRecentUsers.slice(-MAX_RECENT_USERS)
      }

      cloudStorage.setItem(
        CloudStorageKeys.Recent,
        JSON.stringify(updatedRecentUsers),
      )

      return {
        recentUsers: updatedRecentUsers,
      }
    })
  },
  remove: (id) =>
    set((state) => {
      const updatedRecentUsers = state.recentUsers.filter(
        (user) => user.id !== id,
      )

      cloudStorage.setItem(
        CloudStorageKeys.Recent,
        JSON.stringify(updatedRecentUsers),
      )

      return {
        recentUsers: updatedRecentUsers,
      }
    }),
}))
