import Dexie, { Table } from 'dexie'
import { IRecentUser } from '../types/user/user.types'

export class RecentUserClassDexie extends Dexie {
  recentUsers!: Table<IRecentUser>

  constructor() {
    super('recentUsersDb')
    this.version(1).stores({
      recentUsers: '++id, pk_id, profile_image, username, timestamp',
    })
  }
}

export const db = new RecentUserClassDexie()
