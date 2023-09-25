import { Id } from '../common'

export interface IUser {
  username: string
  full_name: string
  biography: string
  id: number
  followers: {
    count: number
  }
  following: {
    count: number
  }
  profile_image: string
  category_name: string
  is_private: boolean
  // has_highlight_reels: boolean
}

export interface IRecentUser {
  id: string
  profile_image: string
  full_name: string
  username: string
}

export interface IFavoriteUser extends IRecentUser {}

export type RecentUsersList = Array<IRecentUser>
export type FavoritesUserList = Array<IFavoriteUser>
