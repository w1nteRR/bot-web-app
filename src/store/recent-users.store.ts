import { create } from 'zustand'
import { IRecentUser } from '../types/user/user.types'

interface IRecentUsersStore {
  recentUsers: IRecentUser[]
  init: (recentUsers: IRecentUser[]) => void
  reset: () => void
  remove: (id: string) => void
  add: (user: IRecentUser) => void
}

export const useRecentUsersStore = create<IRecentUsersStore>()((set) => ({
  recentUsers: [],
  init: (recentUsers) => set({ recentUsers }),
  reset: () => set({ recentUsers: [] }),
  add: (user) =>
    set((state) => ({ recentUsers: [...state.recentUsers, user] })),
  remove: (id) =>
    set((state) => ({
      recentUsers: state.recentUsers.filter((user) => user.id !== id),
    })),
}))
