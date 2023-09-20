import { db } from '../../db/recent-users.db'
import { IRecentUser } from '../../types/user/user.types'

export const useRecentUsers = () => {
  const addUserToRecentList = async (recentUser: IRecentUser) => {
    if (!recentUser) return

    const isUserExist = await db.recentUsers.get({ id: recentUser.id })

    if (isUserExist) return

    db.recentUsers.add(recentUser)
  }

  return {
    addUserToRecentList,
  }
}
